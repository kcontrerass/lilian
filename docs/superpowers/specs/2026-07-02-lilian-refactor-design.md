# Lilian Frontend Refactor — Design Spec

> **Goal:** Reorganizar la página principal de `app/page.tsx` en features independientes, componetizadas, con Clean Code, custom hooks para lógica, sin magic strings y sin modificar estilos.

---

## 1. Contexto actual

La aplicación es un sitio Next.js 16.2.10 + React 19 + Tailwind CSS v4 con App Router. Actualmente `app/page.tsx` contiene ~270 líneas que mezclan tres secciones distintas:

1. **Hero**
2. **Misión / Visión**
3. **Catálogo de productos con búsqueda**

El único componente extraído hasta ahora es `components/Header.tsx`.

---

## 2. Arquitectura elegida: Feature-based media (Enfoque A)

Se optó por una arquitectura **feature-based sin capas formales de Clean Architecture**. Cada feature es autónoma y contiene sus componentes, constantes, tipos y hooks. No se introducen carpetas técnicas (`ui/`, `logic/`, `model/`) ni Atomic Design, para evitar over-engineering en un proyecto de tres secciones.

> **Referencia oficial (Context7 — Next.js v16.2.9):** Next.js App Router separa Server Components por defecto y Client Components se usan solo cuando se necesita interactividad o APIs del navegador. Se mantendrá `page.tsx` como Client Component porque la búsqueda de productos requiere `useState`, y la lógica se moverá a un hook personalizado.

---

## 3. Estructura de carpetas final

```
lilian/
├── app/
│   ├── page.tsx              # Orquesta Header + Hero + Mission + Catalog
│   ├── layout.tsx            # Sin cambios
│   ├── globals.css           # Sin cambios
│   └── ...
├── components/
│   └── Header.tsx            # Updated to use lib/constants
├── features/
│   ├── hero/
│   │   ├── components/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HeroBackground.tsx
│   │   │   ├── HeroHeadline.tsx
│   │   │   └── HeroSliderProgress.tsx
│   │   ├── constants.ts
│   │   └── types.ts            # Solo si emergen tipos locales
│   ├── mission/
│   │   ├── components/
│   │   │   ├── MissionSection.tsx
│   │   │   ├── MissionImage.tsx
│   │   │   └── MissionText.tsx
│   │   ├── constants.ts
│   │   └── types.ts            # Solo si emergen tipos locales
│   └── catalog/
│       ├── components/
│       │   ├── CatalogSection.tsx
│       │   ├── CatalogTitle.tsx
│       │   ├── DecorativeArrow.tsx
│       │   ├── ProductSearch.tsx
│       │   ├── ProductGrid.tsx
│       │   ├── ProductCard.tsx
│       │   └── LoadMoreButton.tsx
│       ├── hooks/
│       │   └── useProductSearch.ts
│       ├── constants.ts
│       └── types.ts
└── lib/
    └── constants.ts          # Constantes globales (nav, CTA, brand)
├── public/assets/
└── ...
```

---

## 4. Componentes por feature

### 4.1 Hero

| Componente | Responsabilidad |
|------------|-----------------|
| `HeroSection` | Orquesta layout, fondo, headline, CTA y slider progress. |
| `HeroBackground` | Renderiza la imagen de fondo con opacidad. |
| `HeroHeadline` | Renderiza el título principal con "amor" resaltado. |
| `HeroSliderProgress` | Barra de progreso inferior del hero. |

### 4.2 Mission

| Componente | Responsabilidad |
|------------|-----------------|
| `MissionSection` | Grid de dos columnas, posiciona imagen y texto. |
| `MissionImage` | Imagen principal con decoradores (dots, logo, sticker). |
| `MissionText` | Bloques de Misión y Visión. |

### 4.3 Catalog

| Componente | Responsabilidad |
|------------|-----------------|
| `CatalogSection` | Orquesta título, búsqueda, grid y botón de cargar más. |
| `CatalogTitle` | Título decorado con SVGs de ramas. |
| `DecorativeArrow` | SVG decorativo reutilizable para el título. |
| `ProductSearch` | Input controlado + botón buscar. |
| `ProductGrid` | Grid de tarjetas con estado vacío. |
| `ProductCard` | Tarjeta individual de producto. |
| `LoadMoreButton` | Botón "Cargar más" (visual por ahora). |

---

## 5. Custom hooks

Solo se creará un hook donde existe lógica real de negocio/estado:

### `features/catalog/hooks/useProductSearch.ts`

Responsabilidades:
- Manejar el estado `searchTerm`.
- Filtrar el listado de productos.
- Exponer `{ searchTerm, setSearchTerm, filteredProducts, hasResults }`.

> **Referencia oficial (Context7 — React v19.2.7):** Los hooks deben llamarse solo dentro de componentes o custom hooks, y los custom hooks permiten extraer lógica reutilizable fuera de los componentes.

No se crearán hooks vacíos o con una sola línea de lógica (YAGNI).

---

## 6. Constantes y tipos

### 6.1 Constantes por feature

Cada feature tendrá su `constants.ts` con:
- Textos visibles.
- Rutas de assets.
- Labels de accesibilidad.
- Anchors/rutas locales.

### 6.2 Constantes globales (`lib/constants.ts`)

Valores usados por más de una feature:
- `NAV_LINKS`: anchors de navegación (`#catalogo`, `#historia`, `#galeria`, `#testimonios`).
- `CTA`: href y label del botón principal (compartido por Header y Hero).
- `BRAND`: datos de marca reutilizables (ej. alt del logo).

### 6.3 Tipos

- `features/catalog/types.ts`: `Product`, `ProductColor`, etc.
- `features/hero/types.ts` y `features/mission/types.ts`: se crearán solo si emergen tipos locales.

---

## 7. Decisiones técnicas

- **`app/page.tsx` como orquestador Server Component**: quedará reducido a importar `Header`, `HeroSection`, `MissionSection` y `CatalogSection`. Como la interactividad (búsqueda) vive dentro de `CatalogSection`, la página puede ser un Server Component.
- **Sin cambios de estilos**: todos los `className`, tamaños, colores y espaciados se conservan idénticos.
- **Client Components**: `CatalogSection` declara `"use client"` porque usa `useProductSearch`. `Header` ya era Client Component. El resto de secciones son Server Components.
- **No se agregan librerías externas**: React + Next.js nativos.
- **Assets**: se mantienen en `public/assets/` y se referencian con rutas absolutas.
- **Tailwind v4**: la configuración CSS-first en `app/globals.css` no cambia.

> **Referencia oficial (Context7 — Tailwind CSS v4):** En Tailwind v4 se usa `@import "tailwindcss"` y el bloque `@theme` para definir design tokens. El proyecto ya cumple esto, por lo que no se requieren ajustes.

---

## 8. Criterios de aceptación

- [ ] `app/page.tsx` no contiene JSX de secciones; solo importa y renderiza componentes.
- [ ] Cada feature vive en su carpeta bajo `features/`.
- [ ] El array `PRODUCTS` y el filtrado se extraen a `features/catalog/`.
- [ ] No hay magic strings duplicados; textos y rutas de assets viven en `constants.ts`.
- [ ] `npm run lint` y `npm run build` pasan sin errores.
- [ ] La UI visual es idéntica a la versión anterior (no cambios de estilos).

---

## 9. Alcance explícitamente fuera

- No se agregan tests (el proyecto no tiene framework de testing configurado).
- No se conecta a API real; los productos permanecen estáticos.
- No se cambian colores, tipografías, layouts ni animaciones.
- No se refactoriza `layout.tsx`.
- `Header.tsx` se actualiza solo para usar las constantes globales de navegación y CTA; no se reestructura.
