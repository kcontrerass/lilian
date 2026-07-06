# Footer Section Estilo Mockup — Design Spec

> **Goal:** Implementar una nueva feature `footer` mobile-first, visualmente fiel al mockup adjunto (imagen izquierda + bloque de contenido a la derecha), usando `features/footer/constants.ts` como fuente única de contenido y respetando la arquitectura por features del proyecto.

---

## 1. Contexto actual

- `app/page.tsx` orquesta secciones (`Header`, `HeroSection`, `MissionSection`, `CatalogSection`, `GallerySection`) y aún no renderiza footer.
- Ya existe `features/footer/constants.ts` con:
  - `FOOTER_IMAGES.main` (`/assets/footer/footer.webp`) y `FOOTER_IMAGES.logo`.
  - `FOOTER_TEXTS` (`tagline`, `contactTitle`, `email`, `phone`, `address`, `rights`, etc.).
  - `FOOTER_SOCIAL` (Instagram, Facebook, TikTok).
- En `app/globals.css` están definidos tokens de marca bajo `@theme`.

---

## 2. Decisiones validadas con usuario

- Se mantiene la **estructura del mockup** (no layout de columnas literal por campos).
- Se usa `features/footer/constants.ts` para el contenido (sin copy hardcodeado dentro del componente).
- Enfoque **mobile-first**.
- Se toma el color de `app/globals.css` más cercano al fondo del diseño: `--color-lilian-orange-dark` (`bg-lilian-orange-dark`).
- La imagen izquierda usa `public/assets/footer/footer.webp`.

---

## 3. Guía técnica (Context7)

- **Next.js 16 (`/vercel/next.js/v16.2.9`)**:
  - Usar `next/image` para assets de `public/` con rutas raíz (`/assets/...`).
  - Declarar `sizes` cuando la imagen sea responsive para mejor selección de recursos.
- **Tailwind CSS v4 (`/tailwindlabs/tailwindcss.com`)**:
  - Los tokens definidos con `@theme` generan utilidades (`bg-*`, `text-*`, etc.).
  - Estrategia de estilos mobile-first con prefijos de breakpoint (`md:`, `lg:`).

---

## 4. Arquitectura y componentes

- Crear `features/footer/components/FooterSection.tsx` (Server Component).
- `app/page.tsx` agrega `<FooterSection />` al final del árbol actual.
- No mover contenido a `app/page.tsx`; conservar `app/page.tsx` como orquestador fino.
- No introducir librerías nuevas.

---

## 5. Composición visual y mapeo de datos

### 5.1 Estructura visual

- Contenedor principal con esquinas redondeadas y fondo naranja oscuro.
- **Mobile**: flujo vertical
  1) imagen,
  2) bloque contacto,
  3) bloque protagonista (tagline),
  4) franja inferior legal/redes.
- **Desktop (`lg`)**: grid de 3 zonas
  - izquierda: imagen producto,
  - centro: bloque contacto,
  - derecha: texto protagonista.

### 5.2 Mapeo desde `features/footer/constants.ts`

- `FOOTER_IMAGES.main` → imagen principal izquierda.
- `FOOTER_TEXTS.contactTitle`, `phone`, `email`, `address` → bloque de información lateral.
- `FOOTER_TEXTS.tagline` → titular principal (tratamiento tipográfico destacado).
- `FOOTER_TEXTS.rights` + `FOOTER_SOCIAL` + `FOOTER_IMAGES.logo` → franja inferior.
- `navigationTitle` y `followTitle` pueden funcionar como labels visuales en el bloque inferior/secundario si aporta jerarquía sin romper fidelidad del mockup.

---

## 6. Responsive y accesibilidad

- Mobile-first con `px`/`py` base y mejoras progresivas en `md`/`lg`.
- Evitar overflow horizontal del bloque de imagen/tipografía en viewport pequeños.
- Imagen con `next/image` y `sizes` explícito según breakpoints del layout.
- Enlaces semánticos:
  - teléfono con `tel:`
  - email con `mailto:`
  - redes con `<a>` y texto visible.
- Mantener contraste de texto suficiente sobre `bg-lilian-orange-dark`.

---

## 7. Archivos afectados

| Archivo | Cambio |
|---|---|
| `features/footer/components/FooterSection.tsx` | Nuevo componente de sección footer |
| `app/page.tsx` | Import y render de `FooterSection` al final |

No se requieren cambios funcionales en `features/footer/constants.ts` para esta iteración.

---

## 8. Verificación

- Validación visual en mobile y desktop contra el mockup.
- Confirmar que la imagen carga desde `/assets/footer/footer.webp` y no se deforma.
- Confirmar jerarquía visual: contacto secundario + tagline protagonista.
- Ejecutar:
  - `npm run lint`
  - `npm run build`

---

## 9. Criterios de aceptación

- [ ] Existe `FooterSection` en `features/footer/components/FooterSection.tsx`.
- [ ] `app/page.tsx` renderiza `FooterSection` como última sección.
- [ ] Layout respeta estructura del mockup (imagen izquierda + contenido derecha en desktop; stack en mobile).
- [ ] Se usa `features/footer/constants.ts` como fuente de textos/assets del footer.
- [ ] Fondo usa el token elegido desde `globals.css` (`bg-lilian-orange-dark`).
- [ ] Imagen implementada con `next/image` y `sizes` responsive.
- [ ] `npm run lint && npm run build` pasan sin errores.

---

## 10. Fuera de alcance

- Cambiar paleta/tokens globales en `app/globals.css`.
- Rediseñar otras secciones (`Hero`, `Mission`, `Catalog`, `Gallery`, `Header`).
- Introducir animaciones complejas no presentes en el mockup de referencia.
- Incorporar nuevas librerías de íconos/UI.
