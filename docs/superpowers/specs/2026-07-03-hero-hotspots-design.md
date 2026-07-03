# Hotspots en el Hero Carousel — Design Spec

> **Goal:** Agregar puntos interactivos ("hotspots") sobre las imágenes del carrusel del hero, que al hacer hover (desktop) o tap (táctil) muestran una burbuja con ícono + texto describiendo un producto. Construir los componentes reutilizables y el flujo de datos; el posicionamiento real sobre cada slide se define en una iteración posterior.

---

## 1. Contexto actual

`features/hero/` implementa el carrusel principal (`HeroSection` → `HeroSlide` → `HeroBackground`/`HeroHeadline`). No existe librería de íconos ni sistema de tooltips/hotspots en el proyecto. `app/globals.css` define la paleta de marca vía `@theme` (Tailwind v4), incluyendo `--color-lilian-teal-light: #ceebec` y `--color-lilian-purple: #3d246a`, que calzan visualmente con los mockups compartidos (burbuja azul-grisácea clara, texto morado oscuro).

Referencia visual:
1. Burbuja de mensaje: fondo azul claro, ícono de pastel + texto en mayúsculas, bold, morado oscuro, con colita apuntando hacia el marcador.
2. Marcador: círculo de anillos concéntricos (halo difuminado exterior, anillo translúcido, punto interior sólido azul claro).

---

## 2. Decisiones ya validadas con el usuario

- **Íconos**: sin librería externa. Se construye un registro pequeño de SVG inline por nombre (`HeroHotspotIcon`), empezando con `"cake"` (el único mostrado en el mockup). Agregar íconos nuevos después es solo añadir una entrada al registro.
- **Interacción táctil**: dado que no existe `hover` en touch, el tap alterna mostrar/ocultar la burbuja (toggle), y tocar fuera del hotspot la cierra. En desktop se activa con hover/focus.
- **Animación del marcador**: pulso continuo sutil (loop), respetando `prefers-reduced-motion`.
- **Dirección de la burbuja**: el componente soporta una prop `direction` (`"top" | "bottom" | "left" | "right"`) para orientar la burbuja y su colita según dónde quede el hotspot en el slide, evitando recortes en los bordes.

---

## 3. Componentes nuevos

Todos viven en `features/hero/components/`, según la regla de Clean Architecture del proyecto (nada de carpetas técnicas nuevas).

| Componente | Tipo | Responsabilidad |
|------------|------|------------------|
| `HeroHotspotIcon` | Server (svg puro) | Registro de íconos SVG inline por nombre. Implementa `"cake"` ahora. |
| `HeroHotspotMarker` | Server (presentacional) | Círculo de anillos concéntricos con pulso. Cambia de escala según prop `isOpen`. |
| `HeroHotspotMessage` | Server (presentacional) | Burbuja con ícono + texto, colita orientable, controlada por props `isOpen`/`direction`. |
| `HeroHotspot` | Client (`"use client"`) | Compone marker + message. Posiciona absoluto (`top`/`left` en %). Maneja estado de interacción (hover/focus/tap + click-outside). |

`HeroSlide.tsx` se modifica para mapear `slide.hotspots ?? []` y renderizar un `HeroHotspot` por cada uno, dentro del wrapper `absolute inset-0` ya existente.

---

## 4. Datos y tipos

En `features/hero/types.ts`:

```ts
export type HotspotDirection = "top" | "bottom" | "left" | "right";
export type HotspotIconName = "cake";

export type HotspotData = {
  id: string;
  top: string;   // porcentaje, ej. "62%"
  left: string;  // porcentaje, ej. "38%"
  direction?: HotspotDirection; // default "top"
  icon: HotspotIconName;
  label: string;
};
```

`HeroSlideData` gana un campo opcional:

```ts
hotspots?: HotspotData[];
```

En `features/hero/constants.ts` no se agrega ningún hotspot todavía — los slides existentes quedan sin `hotspots` (campo opcional, sin efecto visual). Cuando el usuario indique las posiciones, se añaden entradas ahí sin tocar componentes.

---

## 5. Interacción y accesibilidad

`HeroHotspot` maneja un estado `isOpen`:

- `onMouseEnter`/`onFocus` → `setIsOpen(true)` (desktop).
- `onMouseLeave`/`onBlur` → `setIsOpen(false)` (desktop).
- `onClick` → toggle `isOpen` (cubre tap en táctil).
- Listener de click fuera del componente (via `useEffect` + `ref`) para cerrar en táctil al tocar otra parte de la pantalla.
- El marcador es un `button` (no `div`) con `aria-expanded={isOpen}` y `aria-label` igual al `label` del hotspot, para foco por teclado y lectores de pantalla.
- La burbuja usa `role="tooltip"` y se asocia vía `aria-describedby`.
- Animación de pulso envuelta en `motion-safe:animate-ping` (Tailwind ya soporta el prefijo `motion-safe`) para respetar `prefers-reduced-motion`.

---

## 6. Estilos y colores (Tailwind v4, mobile-first)

- Marcador: punto interior `bg-lilian-teal-light`, anillo `bg-white/60` con `blur-sm`, halo `bg-white/30`. Tamaño táctil mínimo `size-7` (28px) en mobile, `md:size-8`.
- Burbuja: `bg-lilian-teal-light`, texto `text-lilian-purple font-chronica font-bold uppercase tracking-wide text-[11px] md:text-xs`, `rounded-2xl shadow-md px-3 py-2`, colita implementada con un `div` cuadrado rotado 45° (`rotate-45`) del mismo color, posicionado según `direction`.
- Transición de aparición: `opacity`/`scale` con `transition-all duration-200`, controlada por clases condicionales según `isOpen` (sin librería de animación externa).
- Todo dimensionado con clases base para mobile y variantes `md:`/`lg:` para pantallas mayores, siguiendo el patrón ya usado en `HeroSlide.tsx`.

> **Referencia oficial (Context7 — Tailwind CSS v4):** `animate-ping` y `animate-pulse` están documentados en `tailwindcss.com/docs/animation`; `group-hover`/variantes de estado en `docs/hover-focus-and-other-states`. Se usará `motion-safe:` para envolver la animación continua.

---

## 7. Criterios de aceptación

- [ ] `HeroHotspot`, `HeroHotspotMarker`, `HeroHotspotMessage`, `HeroHotspotIcon` creados en `features/hero/components/`.
- [ ] `HotspotData`/`HotspotDirection`/`HotspotIconName` agregados a `features/hero/types.ts`; `HeroSlideData.hotspots` opcional.
- [ ] `HeroSlide.tsx` renderiza `slide.hotspots ?? []` sin romper slides existentes (que no tienen el campo).
- [ ] Hover/focus muestra la burbuja en desktop; tap la alterna en táctil; click/tap fuera la cierra.
- [ ] Marcador con pulso continuo respetando `motion-safe:`.
- [ ] Colores tomados de `app/globals.css` (`lilian-teal-light`, `lilian-purple`), sin colores nuevos hardcodeados.
- [ ] Mobile-first: tamaños base para mobile, ajustes en `md:`/`lg:`.
- [ ] `npm run lint && npm run build` pasan sin errores.
- [ ] Ningún slide existente muestra hotspots todavía (0 entradas en `constants.ts`) hasta que el usuario indique posiciones.

---

## 8. Alcance explícitamente fuera

- No se definen las posiciones (`top`/`left`) reales de ningún hotspot en ningún slide — eso lo indica el usuario en una iteración posterior.
- No se agregan íconos adicionales al registro más allá de `"cake"` hasta que se conozca el contenido real de cada hotspot.
- No se agrega librería de animación ni de tooltips externa.
- No se modifican `HeroBackground`, `HeroHeadline`, `HeroArrows`, `HeroProgress` ni los hooks del carrusel.
- No se agregan tests (el proyecto no tiene framework de testing configurado).
