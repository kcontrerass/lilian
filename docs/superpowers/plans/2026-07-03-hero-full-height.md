# Hero a Alto Completo de Viewport con Escalado Fluido — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hacer que `HeroSection` ocupe el alto disponible del viewport (con piso mínimo de respaldo por ancho) escalando headline/imagen(es)/eyebrow proporcionalmente al alto real del contenedor vía container query units (`cqh`), y rediseñar el contenido del slide 3 (deja de ser video, pasa a fondo con patrón + dos platos + eyebrow, layout centrado).

**Architecture:** `HeroSection` se marca `@container-size` y crece con `h-dvh` sobre un piso mínimo por breakpoint de ancho (los valores fijos actuales). Dentro de cada `HeroSlide`, los tamaños de headline, imagen(es) de producto y eyebrow pasan de píxeles fijos a porcentajes `cqh`, derivados matemáticamente de los píxeles actuales divididos por el piso de su breakpoint (para que el resultado sea pixel-perfecto en el piso y crezca proporcionalmente por encima de él). La lógica de imagen de producto se extrae de `HeroSlide.tsx` a un componente nuevo `HeroForegroundImage.tsx` que gana un cuarto modo `"dual"` para los dos platos del slide 3.

**Tech Stack:** Next.js 16 (App Router) + React 19 + Tailwind CSS v4 (arbitrary values con unidades `cqh`/`cqb`, confirmado soportado nativamente vía Context7). Sin librerías nuevas.

## Global Constraints

- Verificación del proyecto: `npm run lint && npm run build` (no hay framework de tests — ver `AGENTS.md`).
- Todo dimensionado sigue el patrón mobile-first existente (clases base + `sm:`/`md:`/`lg:`).
- Colores solo desde `app/globals.css` (`@theme`) o grises neutros genéricos de Tailwind cuando no exista token de marca (caso del overlay gris) — no se hardcodean hex nuevos.
- No se agregan tests automatizados (no hay framework configurado).
- No se toca `Header.tsx`, `HeroArrows.tsx`, `HeroProgress.tsx`, `HeroVideo.tsx`, `useCarousel`, `useSwipe`, ni `Mission`/`Catalog`/`Gallery`.
- No se elimina `bg_video.mp4`/`bg_video_poster.webp` del repo, solo dejan de referenciarse desde slide 3.
- Referencia visual del slide 3 guardada en `docs/superpowers/specs/assets/2026-07-03-hero-slide3-reference.png` (el mockup original compartido en el chat es efímero, por eso se copió al repo).
- Assets ya presentes en el repo (no se crean ni recomprimen): `public/assets/carrousel/bg-item-2.webp` (idéntico a `bg-item-1.webp`, byte-a-byte), `public/assets/carrousel/plate1.webp` (4096×2731, contenido útil dentro de esa lona en el bbox `x:[992,3125] y:[301,2491]`, aspect ≈ 0.97), `public/assets/carrousel/plate2.webp` (4096×2731, bbox `x:[858,3202] y:[314,2659]`, aspect ≈ 1.0).
- Spec completo: `docs/superpowers/specs/2026-07-03-hero-full-height-design.md`.

---

### Task 1: Overlay configurable por color (teal/gray)

**Files:**
- Modify: `features/hero/types.ts:12`
- Modify: `features/hero/components/HeroBackground.tsx:42-59`
- Modify: `features/hero/constants.ts:19`

**Interfaces:**
- Consumes: nada de tasks previos (primer task).
- Produces: `HeroBackground` (tipo, variante `image`) con `overlay?: "teal" | "gray"`. Tasks 3 y 4 usan `overlay: "gray"` para el slide 3.

- [ ] **Step 1: Cambiar el tipo de `overlay` en `features/hero/types.ts`**

Reemplazar la línea 12:

```ts
export type HeroBackground =
  | { type: "image"; src: string; alt: string; overlay?: "teal" | "gray" }
  | { type: "video"; src: string; alt: string; poster?: string }
  | { type: "color"; color: string };
```

- [ ] **Step 2: Actualizar `HeroBackground.tsx` para renderizar el overlay según color**

Reemplazar las líneas 42-59 de `features/hero/components/HeroBackground.tsx`:

```tsx
const OVERLAY_CLASS: Record<"teal" | "gray", string> = {
  teal: "bg-lilian-teal-light/95",
  gray: "bg-slate-100/90",
};

// ...

  return (
    <>
      <Image
        src={background.src}
        alt={background.alt}
        fill
        className="object-cover"
        priority={priority}
        sizes="100vw"
      />
      {background.overlay && (
        <div
          className={`absolute inset-0 ${OVERLAY_CLASS[background.overlay]}`}
          aria-hidden="true"
        />
      )}
    </>
  );
}
```

La constante `OVERLAY_CLASS` va antes de la función `HeroBackground`, junto a los demás imports (después de la línea 9, antes de `export default function HeroBackground`).

- [ ] **Step 3: Actualizar el slide 1 en `constants.ts` para usar el valor string**

En `features/hero/constants.ts:19`, cambiar:

```ts
      overlay: true,
```

por:

```ts
      overlay: "teal",
```

- [ ] **Step 4: Verificar que compila**

Run: `npm run lint && npm run build`
Expected: ambos comandos terminan sin errores (0 errores de ESLint, build de Next.js completa "Compiled successfully").

- [ ] **Step 5: Verificar que el slide 1 no cambió visualmente**

Con el dev server corriendo (`npm run dev`), capturar y comparar contra el estado actual:

```bash
npx playwright screenshot --viewport-size=1440,900 http://localhost:3000 /tmp/task1-slide1.png
```

Abrir `/tmp/task1-slide1.png` y confirmar que el fondo del slide 1 se ve igual que antes (tono turquesa claro sobre el patrón, sin cambios). Si el dev server no está corriendo, iniciarlo primero con `npm run dev` en background.

- [ ] **Step 6: Commit**

```bash
git add features/hero/types.ts features/hero/components/HeroBackground.tsx features/hero/constants.ts
git commit -m "feat(hero): overlay configurable por color (teal/gray)"
```

---

### Task 2: Extraer `HeroForegroundImage.tsx` (refactor sin cambio de comportamiento)

**Files:**
- Create: `features/hero/components/HeroForegroundImage.tsx`
- Modify: `features/hero/components/HeroSlide.tsx:1-71`

**Interfaces:**
- Consumes: `HeroSlideData["foregroundImage"]` (tipo actual, sin cambios en este task — sigue siendo `{ src, alt, fit? }`).
- Produces: componente `HeroForegroundImage({ foregroundImage: NonNullable<HeroSlideData["foregroundImage"]> })` que Task 3 extiende con el modo `"dual"`.

- [ ] **Step 1: Crear `features/hero/components/HeroForegroundImage.tsx`**

Copiar tal cual (sin cambios de clases ni de comportamiento) los 3 modos que hoy viven inline en `HeroSlide.tsx`:

```tsx
import Image from "next/image";
import { HeroSlideData } from "../types";

type HeroForegroundImageProps = {
  foregroundImage: NonNullable<HeroSlideData["foregroundImage"]>;
};

export default function HeroForegroundImage({
  foregroundImage,
}: HeroForegroundImageProps) {
  if (foregroundImage.fit === "compact") {
    return (
      <div className="absolute right-0 bottom-[-26px] sm:bottom-[-75px] md:bottom-[-54px] lg:bottom-[-42px] z-[1] pointer-events-none h-[280px] sm:h-[320px] md:h-[370px] lg:h-[420px] aspect-[1920/820]">
        <Image
          src={foregroundImage.src}
          alt={foregroundImage.alt}
          fill
          priority
          className="object-contain object-bottom"
          sizes="(max-width: 640px) 655px, (max-width: 768px) 750px, (max-width: 1024px) 866px, 983px"
        />
      </div>
    );
  }

  if (foregroundImage.fit === "cover") {
    return (
      <div className="absolute inset-x-0 bottom-0 z-[1] pointer-events-none w-full aspect-[1920/820]">
        <Image
          src={foregroundImage.src}
          alt={foregroundImage.alt}
          fill
          priority
          className="object-cover object-bottom"
          sizes="100vw"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 z-[1] pointer-events-none flex justify-center top-[325px] sm:top-[357px] md:top-[409px] lg:top-[444px]">
      <div className="relative h-[527px] sm:h-[578px] md:h-[663px] lg:h-[714px] aspect-[1920/820]">
        <Image
          src={foregroundImage.src}
          alt={foregroundImage.alt}
          fill
          priority
          className="object-contain object-top"
          sizes="(max-width: 768px) 130vw, 110vw"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Simplificar `HeroSlide.tsx` para usar el componente nuevo**

Reemplazar el archivo completo `features/hero/components/HeroSlide.tsx`:

```tsx
import { memo } from "react";
import CtaButton from "@/components/CtaButton";
import HeroBackground from "./HeroBackground";
import HeroForegroundImage from "./HeroForegroundImage";
import HeroHeadline from "./HeroHeadline";
import { HeroSlideData } from "../types";
import { getHeroPanelId, getHeroTabId } from "../constants";

type HeroSlideProps = {
  slide: HeroSlideData;
  index: number;
  isActive: boolean;
};

function HeroSlide({ slide, index, isActive }: HeroSlideProps) {
  return (
    <div
      id={getHeroPanelId(index)}
      role="tabpanel"
      aria-labelledby={getHeroTabId(index)}
      className={`absolute inset-0 transition-opacity duration-700 ease-out ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
      aria-hidden={!isActive}
    >
      <div className="absolute inset-0">
        <HeroBackground
          background={slide.background}
          isActive={isActive}
          priority
        />
      </div>

      {slide.foregroundImage && (
        <HeroForegroundImage foregroundImage={slide.foregroundImage} />
      )}

      <div
        className={`relative z-10 flex flex-col px-4 sm:px-8 ${
          slide.align === "left"
            ? "h-full justify-center items-start text-left md:pl-24 lg:pl-32"
            : "pt-[195px] md:pt-[200px] lg:pt-[210px] items-center text-center"
        }`}
      >
        <HeroHeadline lines={slide.headline} align={slide.align} />

        <CtaButton
          href={slide.cta.href}
          label={slide.cta.label}
          external
          className="mt-8"
        />
      </div>
    </div>
  );
}

export default memo(HeroSlide);
```

Nota: se elimina el import de `next/image` de `HeroSlide.tsx` (ya no se usa directamente ahí).

- [ ] **Step 3: Verificar que compila**

Run: `npm run lint && npm run build`
Expected: sin errores.

- [ ] **Step 4: Verificar que slide 1 y slide 2 no cambiaron visualmente**

```bash
npx playwright screenshot --viewport-size=1440,900 http://localhost:3000 /tmp/task2-slide1.png
```

Ir al slide 2 en el navegador (o usar el hook de carrusel/click en el segundo punto de progreso) y capturar también ese estado. Comparar ambas contra las capturas del Task 1 — deben verse idénticas pixel a pixel (mismo recorte del pastel, mismo full-width de la imagen del slide 2).

- [ ] **Step 5: Commit**

```bash
git add features/hero/components/HeroForegroundImage.tsx features/hero/components/HeroSlide.tsx
git commit -m "refactor(hero): extraer HeroForegroundImage de HeroSlide"
```

---

### Task 3: Rediseño de contenido del slide 3 (platos duales + eyebrow + fondo gris, sin video)

**Files:**
- Modify: `features/hero/types.ts:16-32`
- Modify: `features/hero/constants.ts:65-83`
- Modify: `features/hero/components/HeroForegroundImage.tsx` (agrega modo `"dual"`)
- Create: `features/hero/components/HeroEyebrow.tsx`
- Modify: `features/hero/components/HeroSlide.tsx` (renderiza `HeroEyebrow`)

**Interfaces:**
- Consumes: `OVERLAY_CLASS`/overlay de Task 1; `HeroForegroundImage` de Task 2.
- Produces: `HeroSlideData.eyebrow?: string`; `HeroSlideData["foregroundImage"]` incluye la variante `{ fit: "dual"; left: {src, alt}; right: {src, alt} }`; componente `HeroEyebrow({ text: string })`. Task 4 escala ambos con `cqh`.

- [ ] **Step 1: Extender el modelo de datos en `features/hero/types.ts`**

Reemplazar las líneas 16-32 (el tipo `HeroSlideData` completo):

```ts
export type HeroSlideData = {
  id: string;
  background: HeroBackground;
  foregroundImage?:
    | {
        src: string;
        alt: string;
        /** "contain" (default) shows the full image inside a fixed-height box; "cover" anchors it full-width to the bottom edge; "compact" shows it uncropped in a smaller box anchored to the bottom-right corner, so it always touches the right edge. */
        fit?: "contain" | "cover" | "compact";
      }
    | {
        /** "dual" shows two images anchored to the top-left and top-right corners, each bleeding off its edge. */
        fit: "dual";
        left: { src: string; alt: string };
        right: { src: string; alt: string };
      };
  /** Small uppercase label with side rules, rendered above the headline (e.g. "EST. 1979"). Omitted when not set. */
  eyebrow?: string;
  headline: HeadlineSegment[][];
  /** "center" (default) or "left" text/CTA alignment. */
  align?: "center" | "left";
  cta: {
    label: string;
    href: string;
  };
};
```

- [ ] **Step 2: Crear `features/hero/components/HeroEyebrow.tsx`**

```tsx
type HeroEyebrowProps = {
  text: string;
};

export default function HeroEyebrow({ text }: HeroEyebrowProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="h-px w-8 bg-lilian-purple/40" aria-hidden="true" />
      <span className="text-[11px] md:text-xs font-chronica font-bold uppercase tracking-[0.2em] text-lilian-purple">
        {text}
      </span>
      <span className="h-px w-8 bg-lilian-purple/40" aria-hidden="true" />
    </div>
  );
}
```

- [ ] **Step 3: Agregar el modo `"dual"` a `HeroForegroundImage.tsx`**

En `features/hero/components/HeroForegroundImage.tsx`, agregar esta rama **antes** del `if (foregroundImage.fit === "compact")`:

```tsx
  if (foregroundImage.fit === "dual") {
    return (
      <>
        <div className="absolute -left-16 top-0 sm:-left-20 md:-left-24 z-[1] pointer-events-none h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] aspect-square">
          <Image
            src={foregroundImage.left.src}
            alt={foregroundImage.left.alt}
            fill
            priority
            className="object-contain object-top"
            sizes="(max-width: 640px) 180px, (max-width: 1024px) 260px, 300px"
          />
        </div>
        <div className="absolute -right-16 top-0 sm:-right-20 md:-right-24 z-[1] pointer-events-none h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] aspect-square">
          <Image
            src={foregroundImage.right.src}
            alt={foregroundImage.right.alt}
            fill
            priority
            className="object-contain object-top"
            sizes="(max-width: 640px) 180px, (max-width: 1024px) 260px, 300px"
          />
        </div>
      </>
    );
  }

```

Estos valores (posición/alto) son un punto de partida — se calibran visualmente en el Step 5 contra la referencia guardada en `docs/superpowers/specs/assets/2026-07-03-hero-slide3-reference.png`, donde ambos platos tocan el borde superior y quedan parcialmente cortados por los bordes izquierdo/derecho de la pantalla.

- [ ] **Step 4: Reemplazar el contenido del slide 3 en `constants.ts`**

Reemplazar las líneas 65-83 de `features/hero/constants.ts` (el objeto completo de `slide-3`):

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
  },
```

- [ ] **Step 5: Renderizar `HeroEyebrow` en `HeroSlide.tsx` y calibrar el slide 3 visualmente**

En `features/hero/components/HeroSlide.tsx`, importar `HeroEyebrow` y renderizarlo antes de `HeroHeadline`:

```tsx
import HeroEyebrow from "./HeroEyebrow";
```

```tsx
        {slide.eyebrow && <HeroEyebrow text={slide.eyebrow} />}
        <HeroHeadline lines={slide.headline} align={slide.align} />
```

Con el dev server corriendo, navegar al slide 3 (click en el tercer punto de progreso o esperar el autoplay) y capturar:

```bash
npx playwright screenshot --viewport-size=1440,900 http://localhost:3000 /tmp/task3-slide3.png
```

Comparar visualmente contra `docs/superpowers/specs/assets/2026-07-03-hero-slide3-reference.png`: fondo gris/lavanda (no turquesa), plato izquierdo y derecho tocando el borde superior y cortados por los bordes laterales, "EST. 1979" con líneas arriba del título, título y CTA centrados. Si la posición/tamaño de los platos no calza, ajustar los valores de alto (`h-[...]`) y desplazamiento (`-left-16`/`-right-16` etc.) del Step 3 y volver a capturar hasta que la composición se aproxime a la referencia.

- [ ] **Step 6: Verificar que compila y que slide 1/2 no cambiaron**

Run: `npm run lint && npm run build`
Expected: sin errores.

```bash
npx playwright screenshot --viewport-size=1440,900 http://localhost:3000 /tmp/task3-slide1-check.png
```

Confirmar que el slide 1 (primer punto de progreso) sigue idéntico a las capturas de Task 2.

- [ ] **Step 7: Commit**

```bash
git add features/hero/types.ts features/hero/constants.ts features/hero/components/HeroForegroundImage.tsx features/hero/components/HeroEyebrow.tsx features/hero/components/HeroSlide.tsx
git commit -m "feat(hero): rediseñar slide 3 con platos duales, eyebrow y fondo gris"
```

---

### Task 4: Contenedor fluido (`h-dvh` + piso + `@container-size`) y escalado `cqh`

**Files:**
- Modify: `features/hero/components/HeroSection.tsx:18`
- Modify: `features/hero/components/HeroHeadline.tsx:16,26`
- Modify: `features/hero/components/HeroForegroundImage.tsx` (los 4 modos)
- Modify: `features/hero/components/HeroSlide.tsx` (padding/margin del bloque de texto)
- Modify: `features/hero/components/HeroEyebrow.tsx` (tamaño/gap)

**Interfaces:**
- Consumes: todo lo de Tasks 1-3 (tipos, componentes y datos ya en su forma final).
- Produces: comportamiento final del feature — no hay tasks posteriores.

Los valores `cqh` de este task se derivan matemáticamente de los píxeles actuales divididos por el piso (`min-h`) de cada breakpoint de ancho, para que el resultado sea pixel-perfecto exactamente en el piso y crezca proporcionalmente por encima. Pisos: base=620px, sm=680px, md=780px, lg=840px.

- [ ] **Step 1: Marcar el contenedor como fluido y size-container en `HeroSection.tsx`**

En `features/hero/components/HeroSection.tsx:18`, reemplazar:

```tsx
      className="relative w-full h-[620px] sm:h-[680px] md:h-[780px] lg:h-[840px] overflow-hidden"
```

por:

```tsx
      className="relative w-full h-dvh min-h-[620px] sm:min-h-[680px] md:min-h-[780px] lg:min-h-[840px] overflow-hidden @container-size"
```

- [ ] **Step 2: Convertir `HeroHeadline.tsx` a `cqh`**

En `features/hero/components/HeroHeadline.tsx:16`, reemplazar:

```tsx
      className={`text-[36px] md:text-[64px] lg:text-[73px] text-lilian-purple tracking-normal font-chronica font-bold ${
```

por:

```tsx
      className={`text-[5.8cqh] md:text-[8.2cqh] lg:text-[8.7cqh] text-lilian-purple tracking-normal font-chronica font-bold ${
```

Y en la línea 26, reemplazar:

```tsx
                className={`font-owl-cute font-normal text-[50px] md:text-[80px] lg:text-[93px] align-middle ${
```

por:

```tsx
                className={`font-owl-cute font-normal text-[8.1cqh] md:text-[10.3cqh] lg:text-[11.1cqh] align-middle ${
```

- [ ] **Step 3: Convertir los 4 modos de `HeroForegroundImage.tsx` a `cqh`**

Reemplazar el archivo completo `features/hero/components/HeroForegroundImage.tsx`:

```tsx
import Image from "next/image";
import { HeroSlideData } from "../types";

type HeroForegroundImageProps = {
  foregroundImage: NonNullable<HeroSlideData["foregroundImage"]>;
};

export default function HeroForegroundImage({
  foregroundImage,
}: HeroForegroundImageProps) {
  if (foregroundImage.fit === "dual") {
    return (
      <>
        <div className="absolute -left-16 top-0 sm:-left-20 md:-left-24 z-[1] pointer-events-none h-[29cqh] sm:h-[32.4cqh] md:h-[33.3cqh] lg:h-[35.7cqh] aspect-square">
          <Image
            src={foregroundImage.left.src}
            alt={foregroundImage.left.alt}
            fill
            priority
            className="object-contain object-top"
            sizes="(max-width: 640px) 180px, (max-width: 1024px) 260px, 300px"
          />
        </div>
        <div className="absolute -right-16 top-0 sm:-right-20 md:-right-24 z-[1] pointer-events-none h-[29cqh] sm:h-[32.4cqh] md:h-[33.3cqh] lg:h-[35.7cqh] aspect-square">
          <Image
            src={foregroundImage.right.src}
            alt={foregroundImage.right.alt}
            fill
            priority
            className="object-contain object-top"
            sizes="(max-width: 640px) 180px, (max-width: 1024px) 260px, 300px"
          />
        </div>
      </>
    );
  }

  if (foregroundImage.fit === "compact") {
    return (
      <div className="absolute right-0 bottom-[-4.2cqh] sm:bottom-[-11cqh] md:bottom-[-6.9cqh] lg:bottom-[-5cqh] z-[1] pointer-events-none h-[45.2cqh] sm:h-[47.1cqh] md:h-[47.4cqh] lg:h-[50cqh] aspect-[1920/820]">
        <Image
          src={foregroundImage.src}
          alt={foregroundImage.alt}
          fill
          priority
          className="object-contain object-bottom"
          sizes="(max-width: 640px) 655px, (max-width: 768px) 750px, (max-width: 1024px) 866px, 983px"
        />
      </div>
    );
  }

  if (foregroundImage.fit === "cover") {
    return (
      <div className="absolute inset-x-0 bottom-0 z-[1] pointer-events-none w-full aspect-[1920/820]">
        <Image
          src={foregroundImage.src}
          alt={foregroundImage.alt}
          fill
          priority
          className="object-cover object-bottom"
          sizes="100vw"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 z-[1] pointer-events-none flex justify-center top-[52.4cqh] sm:top-[52.5cqh] md:top-[52.4cqh] lg:top-[52.9cqh]">
      <div className="relative h-[85cqh] aspect-[1920/820]">
        <Image
          src={foregroundImage.src}
          alt={foregroundImage.alt}
          fill
          priority
          className="object-contain object-top"
          sizes="(max-width: 768px) 130vw, 110vw"
        />
      </div>
    </div>
  );
}
```

Nota: el modo `"dual"` cambia de `object-square` fijo en px a `cqh`, usando la misma proporción alto/piso que se calibró visualmente en el Task 3 (220/680≈32.4, etc. — recalculado sobre los pisos reales de cada breakpoint).

- [ ] **Step 4: Convertir el padding/margin del bloque de texto en `HeroSlide.tsx` a `cqh`**

En `features/hero/components/HeroSlide.tsx`, reemplazar:

```tsx
            ? "h-full justify-center items-start text-left md:pl-24 lg:pl-32"
            : "pt-[195px] md:pt-[200px] lg:pt-[210px] items-center text-center"
```

por:

```tsx
            ? "h-full justify-center items-start text-left md:pl-24 lg:pl-32"
            : "pt-[31.5cqh] md:pt-[25.6cqh] lg:pt-[25cqh] items-center text-center"
```

Y reemplazar la prop `className="mt-8"` del `CtaButton` por:

```tsx
          className="mt-[5.2cqh] sm:mt-[4.7cqh] md:mt-[4.1cqh] lg:mt-[3.8cqh]"
```

- [ ] **Step 5: Convertir el espaciado de `HeroEyebrow.tsx` a `cqh`**

En `features/hero/components/HeroEyebrow.tsx`, reemplazar:

```tsx
    <div className="flex items-center gap-3 mb-4">
```

por:

```tsx
    <div className="flex items-center gap-3 mb-[2.6cqh] sm:mb-[2.4cqh] md:mb-[2.1cqh] lg:mb-[1.9cqh]">
```

- [ ] **Step 6: Verificar build**

Run: `npm run lint && npm run build`
Expected: sin errores.

- [ ] **Step 7: Verificar la matriz completa de alturas**

Con el dev server corriendo, capturar cada combinación (los 3 slides — usar los puntos de progreso del carrusel para cambiar de slide entre capturas):

```bash
npx playwright screenshot --viewport-size=390,620 http://localhost:3000 /tmp/task4-floor-mobile.png
npx playwright screenshot --viewport-size=768,680 http://localhost:3000 /tmp/task4-floor-sm.png
npx playwright screenshot --viewport-size=1024,780 http://localhost:3000 /tmp/task4-floor-md.png
npx playwright screenshot --viewport-size=1440,840 http://localhost:3000 /tmp/task4-floor-lg.png
npx playwright screenshot --viewport-size=1440,900 http://localhost:3000 /tmp/task4-tall-1440x900.png
npx playwright screenshot --viewport-size=1920,1080 http://localhost:3000 /tmp/task4-tall-fhd.png
npx playwright screenshot --viewport-size=2560,1440 http://localhost:3000 /tmp/task4-tall-2k.png
npx playwright screenshot --viewport-size=1366,700 http://localhost:3000 /tmp/task4-squished-laptop.png
```

Verificar en cada captura:
1. En los 4 "floor" (390×620, 768×680, 1024×780, 1440×840): el slide 1 se ve pixel-igual a las capturas de Task 2/3 (esto confirma que la derivación matemática de los `cqh` fue correcta).
2. En las alturas "tall" (1440×900, 1920×1080, 2560×1440): ya NO debe aparecer el hueco vacío entre el headline y la imagen que se vio en el experimento inicial con `h-screen` — el pastel/headline deben crecer proporcionalmente y verse tan compuestos como en el piso.
3. En el caso "squished" (1366×700, ancho de escritorio pero bajo): el piso `lg:min-h-[840px]` debe activarse (el contenedor mide 840px aunque el viewport mida 700px de alto) y el CTA no debe superponerse con la imagen del pastel.
4. Repetir la revisión visual para slide 2 y slide 3 en al menos las alturas 1440×840 (piso) y 1920×1080 (tall) — ninguno debe verse recortado ni con huecos.

- [ ] **Step 8: Commit**

```bash
git add features/hero/components/HeroSection.tsx features/hero/components/HeroHeadline.tsx features/hero/components/HeroForegroundImage.tsx features/hero/components/HeroSlide.tsx features/hero/components/HeroEyebrow.tsx
git commit -m "feat(hero): contenedor fluido h-dvh con piso y escalado cqh"
```
