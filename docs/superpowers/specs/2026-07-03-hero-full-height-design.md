# Hero a Alto Completo de Viewport con Escalado Fluido — Design Spec

> **Goal:** Hacer que `HeroSection` ocupe el alto disponible del viewport (con un piso mínimo de respaldo) para mejorar impacto visual y composición de imágenes, escalando headline/imagen(es) de producto proporcionalmente al alto real del contenedor via container query units (`cqh`). Incluye el rediseño de contenido del slide 3 (deja de ser video, pasa a fondo con patrón + dos platos), ya que su nuevo layout centrado debe convivir con el mismo sistema de escalado que slide 1 y 2.

---

## 1. Contexto actual

`features/hero/` implementa el carrusel principal: `HeroSection` (contenedor + hooks de carrusel/swipe) → `HeroSlide` (por slide: fondo, imagen de producto, headline, CTA) → `HeroBackground`/`HeroHeadline`/`HeroArrows`/`HeroProgress`. El contenedor hoy usa alturas fijas por breakpoint de ancho (`h-[620px] sm:h-[680px] md:h-[780px] lg:h-[840px]`), y cada elemento interno (tamaño de fuente del headline, alto de la imagen de producto, offsets) también usa píxeles fijos por el mismo set de breakpoints.

Se probó experimentalmente cambiar el contenedor a `h-screen` sin tocar el resto: en pantallas altas (1080p, 1440p) aparece un hueco vacío entre el headline y la imagen (porque la imagen no crece), y en pantallas bajas (laptop ~768px) el CTA termina tapando la imagen. Confirma que el alto del contenedor y el tamaño de los elementos internos deben escalar juntos, no por separado.

---

## 2. Decisiones ya validadas con el usuario

- **Objetivo**: mejorar impacto visual y composición de imágenes por igual (no solo uno de los dos).
- **Piso mínimo**: el contenedor usa un alto mínimo de respaldo (los valores actuales por breakpoint de ancho) para no comprimirse demasiado en pantallas bajas. Sin techo máximo (no se limita en monitores gigantes).
- **Alcance**: el rediseño aplica a los 3 slides, no solo al del pastel.
- **Mecanismo de escalado**: container query units (`cqh`), no `clamp()` con `vh` ni más breakpoints discretos. Es la única opción de las 3 evaluadas que sigue funcionando correctamente cuando se activa el piso mínimo (los elementos escalan al alto *real* del contenedor, no al del viewport crudo). Confirmado con Context7 que Tailwind v4 soporta esto nativamente (`@container-size` + unidades `cqb`/`cqh` en valores arbitrarios).
- **Slide 3 — contenido nuevo**: deja de usar video de fondo. Pasa a: fondo con el mismo patrón ilustrado que slide 1 (asset `bg-item-2.webp`, ya presente en el repo, idéntico a `bg-item-1.webp`) pero con un overlay gris/lavanda en vez de teal; dos imágenes de producto (`plate1.webp`/`plate2.webp`) ancladas a los bordes izquierdo y derecho; texto "eyebrow" nuevo (`EST. 1979`) arriba del headline; headline y CTA centrados (mismo layout que slide 1, ya no alineado a la izquierda); mismo CTA de siempre.
- **Overlay configurable por color**: `background.overlay` pasa de `boolean` a `"teal" | "gray"` para poder dar el tono correcto a cada slide sin nuevos colores hardcodeados fuera de `app/globals.css`.
- **Imagen doble**: nuevo modo de `foregroundImage` (`fit: "dual"`) con dos imágenes (izquierda/derecha), en vez de generalizar a un arreglo — slide 1 y 2 no cambian su forma de datos.
- **Eyebrow**: campo opcional `eyebrow?: string` en `HeroSlideData`, sin efecto en slides que no lo definen.
- **Componente de video**: `HeroVideo` y el tipo `"video"` de `HeroBackground` no se eliminan (quedan sin uso), solo dejan de referenciarse desde slide 3.

---

## 3. Modelo de datos (`features/hero/types.ts`)

```ts
export type HeroBackground =
  | { type: "image"; src: string; alt: string; overlay?: "teal" | "gray" }
  | { type: "video"; src: string; alt: string; poster?: string }
  | { type: "color"; color: string };

export type HeroSlideData = {
  id: string;
  background: HeroBackground;
  foregroundImage?:
    | { src: string; alt: string; fit?: "contain" | "cover" | "compact" }
    | { fit: "dual"; left: { src: string; alt: string }; right: { src: string; alt: string } };
  eyebrow?: string;
  headline: HeadlineSegment[][];
  align?: "center" | "left";
  cta: { label: string; href: string };
};
```

Cambios respecto al tipo actual:
- `HeroBackground` (variante `image`): `overlay?: boolean` → `overlay?: "teal" | "gray"`.
- `foregroundImage` pasa a ser una unión discriminada: la forma existente (`src`/`alt`/`fit: "contain" | "cover" | "compact"`) más una nueva variante `{ fit: "dual"; left; right }`.
- Nuevo campo opcional `eyebrow?: string`.

---

## 4. Contenido nuevo de slide 3 (`features/hero/constants.ts`)

```ts
{
  id: "slide-3",
  background: {
    type: "image",
    src: "/assets/carrousel/bg-item-2.webp",
    alt: "Fondo de panadería Lilian",
    overlay: "gray",
  },
  foregroundImage: {
    fit: "dual",
    left: { src: "/assets/carrousel/plate1.webp", alt: "Postre Lilian" },
    right: { src: "/assets/carrousel/plate2.webp", alt: "Postre Lilian" },
  },
  eyebrow: "EST. 1979",
  headline: [
    [{ text: "Productos elaborados", highlight: false }],
    [
      { text: "con la más alta ", highlight: false },
      { text: "calidad", highlight: true, color: "teal" },
    ],
  ],
  align: "center",
  cta: {
    label: "Ordena en Pedidos ya",
    href: "https://www.pedidosya.com",
  },
}
```

Se elimina la referencia a `bg_video.mp4` / `bg_video_poster.webp` desde `constants.ts` (los archivos y el componente `HeroVideo` quedan en el repo sin uso).

`app/globals.css` no define ningún token de marca gris/lavanda (solo purple/orange/teal/pink/beige). La variante `overlay: "gray"` de `HeroBackground` usa un gris neutro genérico de Tailwind (ej. `bg-slate-100/90` o similar), calibrado visualmente contra la imagen de referencia durante la implementación — no se agrega un token nuevo a `@theme`.

---

## 5. Arquitectura del contenedor y escalado fluido

- `HeroSection`: el contenedor pasa de alto fijo a **fluido con piso por ancho**:
  ```
  h-dvh min-h-[620px] sm:min-h-[680px] md:min-h-[780px] lg:min-h-[840px] @container-size
  ```
  - `dvh` en vez de `vh` para manejar correctamente la barra de direcciones en navegadores móviles.
  - Los mínimos reutilizan los valores actuales por breakpoint de ancho como piso — nunca se ve más apretado que hoy; en pantallas más altas que esos mínimos, crece hasta ocupar el alto real del viewport.
  - `@container-size` habilita las unidades de tamaño completo (`cqh`/`cqb`), no solo `cqw`/`cqi`.
- Dentro de cada `HeroSlide`, el headline (`HeroHeadline`), la(s) imagen(es) de producto (`HeroForegroundImage`), el eyebrow (`HeroEyebrow`) y los espaciados verticales se dimensionan con unidades `cqh` (valores arbitrarios de Tailwind, ej. `text-[6cqh]`, `h-[45cqh]`) en vez de píxeles fijos por breakpoint de ancho.
- El botón CTA (`CtaButton`, componente compartido, usado también en `Header`) **no cambia** su tamaño de fuente/padding — solo su posición dentro del flujo del hero.
- Los porcentajes `cqh` exactos se calibran visualmente durante la implementación (capturas en la matriz de alturas de la sección 7), no se derivan matemáticamente de los píxeles actuales — el diseño actual ya no era perfectamente proporcional entre sus propios breakpoints.

---

## 6. Componentes afectados

| Archivo | Cambio |
|---|---|
| `features/hero/types.ts` | Cambios de modelo de datos (sección 3) |
| `features/hero/constants.ts` | Nuevo contenido de slide 3 (sección 4) |
| `features/hero/components/HeroSection.tsx` | Contenedor fluido + `@container-size` (sección 5) |
| `features/hero/components/HeroForegroundImage.tsx` **(nuevo)** | Extrae de `HeroSlide.tsx` la lógica de imagen de producto; maneja los 4 modos (`contain`/`cover`/`compact`/`dual`) con tamaños en `cqh` |
| `features/hero/components/HeroEyebrow.tsx` **(nuevo)** | Texto pequeño + líneas laterales decorativas; se renderiza solo si `slide.eyebrow` existe; el texto no es `aria-hidden` (tiene significado), las líneas sí |
| `features/hero/components/HeroSlide.tsx` | Usa `HeroForegroundImage` y `HeroEyebrow`; layout de texto/CTA en `cqh` |
| `features/hero/components/HeroHeadline.tsx` | Tamaños de fuente pasan de píxeles por breakpoint a `cqh` |
| `features/hero/components/HeroBackground.tsx` | `overlay` acepta `"teal" \| "gray"` en vez de `boolean`; agrega variante de tinte gris/lavanda |

No se tocan `HeroArrows.tsx`, `HeroProgress.tsx`, `HeroVideo.tsx`, `useCarousel`, `useSwipe`, `Header.tsx`, ni las demás secciones de la página (`Mission`, `Catalog`, `Gallery`).

---

## 7. Verificación

Sin framework de tests en el proyecto (por convención de `AGENTS.md`) — validación visual + build:

- Capturas con Playwright en: 390×620 (piso mobile), 768×680, 1024×780, 1440×840 (pisos actuales por breakpoint), y alturas reales altas: 1440×900, 1920×1080, 2560×1440.
- Caso límite explícito: viewport de escritorio pero bajo (ej. 1366×700) para confirmar que el piso mínimo se activa y el contenido escala correctamente vía `cqh`, sin huecos ni recortes.
- Confirmar los 3 slides (compacta, cover, dual) en cada punto de la matriz.
- Confirmar que el eyebrow "EST. 1979" no queda tapado por el header (`absolute`, 190px de alto) en el piso mínimo de 620px.
- `npm run lint && npm run build` deben pasar sin errores.

---

## 8. Criterios de aceptación

- [ ] `HeroSection` usa `h-dvh min-h-[...] @container-size` con los pisos actuales por breakpoint de ancho.
- [ ] `HeroForegroundImage` y `HeroEyebrow` creados en `features/hero/components/`.
- [ ] `HeroSlideData`/`HeroBackground` actualizados según sección 3; slide 1 y 2 siguen funcionando sin cambios en su forma de datos.
- [ ] Slide 3 usa el nuevo contenido de la sección 4 (sin video, fondo `bg-item-2.webp` + overlay gris, platos duales, eyebrow, layout centrado).
- [ ] Headline, imagen(es) de producto y eyebrow escalan con `cqh` en los 3 slides, verificado visualmente en la matriz de alturas de la sección 7.
- [ ] Ningún slide se ve recortado ni con huecos vacíos en la matriz de verificación, incluyendo el caso límite de piso mínimo activado.
- [ ] `npm run lint && npm run build` pasan sin errores.

---

## 9. Alcance explícitamente fuera

- No se toca `Header.tsx`, `HeroArrows.tsx`, `HeroProgress.tsx`, hooks del carrusel, ni `Mission`/`Catalog`/`Gallery`.
- No se agrega framework de testing.
- No se re-exportan/optimizan `plate1.webp`/`plate2.webp` más allá de ajustar el atributo `sizes` de `next/image` — no se recomprimen ni recortan los archivos.
- No se elimina `bg_video.mp4`/`bg_video_poster.webp` del repo ni el componente `HeroVideo`, solo dejan de referenciarse desde slide 3.
- No se cambia `HERO_CAROUSEL_CONFIG` (autoplay/interval/loop).
- No se agregan hotspots (spec separado: `2026-07-03-hero-hotspots-design.md`, sin implementar aún) — si se implementan después, deberán revisarse contra el nuevo sistema de escalado `cqh`.
