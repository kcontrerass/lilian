# Lilian Frontend Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganizar `app/page.tsx` en features independientes (`hero`, `mission`, `catalog`) con componentes pequeños, custom hooks, constantes centralizadas y sin modificar estilos.

**Architecture:** Feature-based media. Cada feature bajo `features/<name>/` contiene sus propios componentes, constantes, tipos y hooks. `app/page.tsx` pasa a ser un orquestador. Se crea `lib/constants.ts` para los anchors de navegación compartidos y se actualiza `Header.tsx` para eliminar magic strings duplicados.

**Tech Stack:** Next.js 16.2.10, React 19.2.4, TypeScript 5, Tailwind CSS v4.

---

## File Structure

```
lilian/
├── app/
│   └── page.tsx                 # Orquestador
├── components/
│   └── Header.tsx               # Updated to use lib/constants
├── features/
│   ├── hero/
│   │   ├── components/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HeroBackground.tsx
│   │   │   ├── HeroHeadline.tsx
│   │   │   └── HeroSliderProgress.tsx
│   │   └── constants.ts
│   ├── mission/
│   │   ├── components/
│   │   │   ├── MissionSection.tsx
│   │   │   ├── MissionImage.tsx
│   │   │   └── MissionText.tsx
│   │   └── constants.ts
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
    └── constants.ts
```

---

### Task 1: Create shared navigation constants

**Files:**
- Create: `lib/constants.ts`

- [ ] **Step 1: Write `lib/constants.ts`**

```ts
export const NAV_LINKS = {
  home: { href: "/", label: "Inicio" },
  history: { href: "#historia", label: "Nuestra Historia" },
  catalog: { href: "#catalogo", label: "Catálogo" },
  gallery: { href: "#galeria", label: "Galería" },
  testimonials: { href: "#testimonios", label: "Testimonios" },
} as const;

export const CTA_LABELS = {
  orderNow: "Ordena en Pedidos ya",
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add lib/constants.ts
git commit -m "feat: add shared navigation and CTA constants"
```

---

### Task 2: Update Header to use shared constants

**Files:**
- Modify: `components/Header.tsx`

- [ ] **Step 1: Replace hardcoded nav links and CTA with constants**

Add import at the top:

```tsx
import { CTA_LABELS, NAV_LINKS } from "@/lib/constants";
```

Replace the desktop navigation block:

```tsx
<nav className="hidden lg:flex items-center gap-8 text-[17px] font-medium text-lilian-purple font-chronica">
  <Link href={NAV_LINKS.home.href} className="hover:text-lilian-orange transition-colors">
    {NAV_LINKS.home.label}
  </Link>
  <Link href={NAV_LINKS.history.href} className="hover:text-lilian-orange transition-colors">
    {NAV_LINKS.history.label}
  </Link>
  <Link href={NAV_LINKS.catalog.href} className="hover:text-lilian-orange transition-colors">
    {NAV_LINKS.catalog.label}
  </Link>
  <Link href={NAV_LINKS.gallery.href} className="hover:text-lilian-orange transition-colors">
    {NAV_LINKS.gallery.label}
  </Link>
  <Link href={NAV_LINKS.testimonials.href} className="hover:text-lilian-orange transition-colors">
    {NAV_LINKS.testimonials.label}
  </Link>
</nav>
```

Replace desktop CTA text:

```tsx
<span className="w-4 h-4 block bg-white rounded-sm" />
{CTA_LABELS.orderNow}
```

Replace mobile navigation block:

```tsx
<nav className="flex flex-col px-6 py-8 gap-4 text-[17px] font-chronica font-medium text-lilian-purple">
  <Link
    href={NAV_LINKS.home.href}
    onClick={() => setMobileMenuOpen(false)}
    className="hover:text-lilian-orange transition-colors py-2 border-b border-lilian-purple/10"
  >
    {NAV_LINKS.home.label}
  </Link>
  <Link
    href={NAV_LINKS.history.href}
    onClick={() => setMobileMenuOpen(false)}
    className="hover:text-lilian-orange transition-colors py-2 border-b border-lilian-purple/10"
  >
    {NAV_LINKS.history.label}
  </Link>
  <Link
    href={NAV_LINKS.catalog.href}
    onClick={() => setMobileMenuOpen(false)}
    className="hover:text-lilian-orange transition-colors py-2 border-b border-lilian-purple/10"
  >
    {NAV_LINKS.catalog.label}
  </Link>
  <Link
    href={NAV_LINKS.gallery.href}
    onClick={() => setMobileMenuOpen(false)}
    className="hover:text-lilian-orange transition-colors py-2 border-b border-lilian-purple/10"
  >
    {NAV_LINKS.gallery.label}
  </Link>
  <Link
    href={NAV_LINKS.testimonials.href}
    onClick={() => setMobileMenuOpen(false)}
    className="hover:text-lilian-orange transition-colors py-2 border-b border-lilian-purple/10"
  >
    {NAV_LINKS.testimonials.label}
  </Link>
  <Link
    href="#"
    onClick={() => setMobileMenuOpen(false)}
    className="inline-flex justify-center bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white px-6 py-3 mt-4 rounded-full"
  >
    {CTA_LABELS.orderNow}
  </Link>
</nav>
```

- [ ] **Step 2: Commit**

```bash
git add components/Header.tsx
git commit -m "refactor: use shared constants in Header"
```

---

### Task 3: Create Hero constants

**Files:**
- Create: `features/hero/constants.ts`

- [ ] **Step 1: Write `features/hero/constants.ts`**

```ts
export const HERO_IMAGES = {
  background: "/assets/1cac87c18c1468d2888af44c8b9eaf900c8113fd.png",
} as const;

export const HERO_TEXTS = {
  headlinePrefix: "Hecho con",
  highlightedWord: "amor",
  headlineSuffix: "y horneado para ti.",
  cta: "Ordena en Pedidos Ya",
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add features/hero/constants.ts
git commit -m "feat: add hero constants"
```

---

### Task 4: Create HeroBackground component

**Files:**
- Create: `features/hero/components/HeroBackground.tsx`

- [ ] **Step 1: Write the component**

```tsx
import Image from "next/image";
import { HERO_IMAGES } from "../constants";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#e7ebf0]">
      <Image
        src={HERO_IMAGES.background}
        alt="Bakery background"
        fill
        className="object-cover opacity-30"
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add features/hero/components/HeroBackground.tsx
git commit -m "feat: add HeroBackground component"
```

---

### Task 5: Create HeroHeadline component

**Files:**
- Create: `features/hero/components/HeroHeadline.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { HERO_TEXTS } from "../constants";

export default function HeroHeadline() {
  return (
    <h1 className="flex items-center flex-wrap justify-center gap-4 text-[40px] md:text-[73px] uppercase text-lilian-purple tracking-normal font-chronica">
      <span className="font-medium">{HERO_TEXTS.headlinePrefix}</span>
      <span className="font-owl-cute text-[60px] md:text-[93px] text-lilian-orange lowercase normal-case mt-[-10px]">
        {HERO_TEXTS.highlightedWord}
      </span>
      <span className="font-medium">{HERO_TEXTS.headlineSuffix}</span>
    </h1>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add features/hero/components/HeroHeadline.tsx
git commit -m "feat: add HeroHeadline component"
```

---

### Task 6: Create HeroSliderProgress component

**Files:**
- Create: `features/hero/components/HeroSliderProgress.tsx`

- [ ] **Step 1: Write the component**

```tsx
export default function HeroSliderProgress() {
  return (
    <div className="absolute bottom-10 w-[90%] max-w-[1130px] mx-auto z-10">
      <div className="w-full h-[13px] bg-white/50 backdrop-blur-md rounded-full overflow-hidden">
        <div className="h-full bg-lilian-orange w-[25%] rounded-full"></div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add features/hero/components/HeroSliderProgress.tsx
git commit -m "feat: add HeroSliderProgress component"
```

---

### Task 7: Assemble HeroSection

**Files:**
- Create: `features/hero/components/HeroSection.tsx`

- [ ] **Step 1: Write the component**

```tsx
import Link from "next/link";
import HeroBackground from "./HeroBackground";
import HeroHeadline from "./HeroHeadline";
import HeroSliderProgress from "./HeroSliderProgress";
import { HERO_TEXTS } from "../constants";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[840px] flex flex-col items-center justify-center overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 flex flex-col items-center justify-center mt-32 text-center">
        <HeroHeadline />

        <Link
          href="#"
          className="mt-8 bg-gradient-to-r from-lilian-orange-light to-lilian-orange-dark text-white px-8 py-4 rounded-full font-chronica text-[20px] uppercase flex items-center gap-3 hover:scale-105 transition-transform"
        >
          <span className="w-4 h-4 block bg-white rounded-sm" />
          {HERO_TEXTS.cta}
        </Link>
      </div>

      <HeroSliderProgress />
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add features/hero/components/HeroSection.tsx
git commit -m "feat: add HeroSection component"
```

---

### Task 8: Create Mission constants

**Files:**
- Create: `features/mission/constants.ts`

- [ ] **Step 1: Write the constants**

```ts
export const MISSION_IMAGES = {
  main: "/assets/a92c92b1efcd065cb45b45ee8829992627c1d38d.png",
  dots: "/assets/35d89ec71c4436f403a57a0e9f4398e046db8aba.svg",
  whiteLogo: "/assets/e01406bd27c2a730171ccbfdf33cc1ef24c179da.svg",
  sticker: "/assets/de26de4eadb76eac4b1836ae5c8f3afc248ab9a6.svg",
  backgroundShape: "/assets/95483b2bb3649200ddd8d916da6ca91a9821833c.svg",
} as const;

export const MISSION_TEXTS = {
  titlePart1: "Cada ",
  highlightedWord: "receta",
  titlePart2: " tiene",
  titlePart3: "una historia",
  missionLabel: "Nuestra Misión:",
  missionText:
    "Atender y satisfacer las necesidades de nuestros clientes, brindando productos y servicios de alta calidad, pertenecientes a la industria pastelera, con un personal altamente motivado y capacitado, contribuyendo al desarrollo del país y de nuestros colaboradores.",
  visionLabel: "Nuestra Visión:",
  visionText:
    "Queremos que en cada bocado que disfrutes te lleves una experiencia única del sabor, que por una vida ha venido a mis manos y poder compartir estas vivencias a través de recetas únicas.",
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add features/mission/constants.ts
git commit -m "feat: add mission constants"
```

---

### Task 9: Create MissionImage component

**Files:**
- Create: `features/mission/components/MissionImage.tsx`

- [ ] **Step 1: Write the component**

```tsx
import Image from "next/image";
import { MISSION_IMAGES } from "../constants";

export default function MissionImage() {
  return (
    <div className="relative w-full aspect-[4/3] lg:aspect-[1.1] max-w-[650px] mx-auto lg:mx-0">
      <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-2xl">
        <Image
          src={MISSION_IMAGES.main}
          alt="Panadería Lilian sucursal"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute top-0 left-0 w-[120px] h-[120px] opacity-70">
        <Image src={MISSION_IMAGES.dots} alt="" fill className="object-cover" />
      </div>

      <div className="absolute bottom-6 left-6 w-[120px] sm:w-[150px] h-[50px]">
        <Image
          src={MISSION_IMAGES.whiteLogo}
          alt="Lilian Logo"
          fill
          className="object-contain object-left"
        />
      </div>

      <div className="absolute top-[-20px] right-[-20px] sm:top-[-30px] sm:right-[-30px] w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] z-20">
        <Image
          src={MISSION_IMAGES.sticker}
          alt="Sticker Lilian"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add features/mission/components/MissionImage.tsx
git commit -m "feat: add MissionImage component"
```

---

### Task 10: Create MissionText component

**Files:**
- Create: `features/mission/components/MissionText.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { MISSION_TEXTS } from "../constants";

export default function MissionText() {
  return (
    <div className="flex flex-col text-left max-w-[600px] mx-auto lg:mx-0">
      <div className="mb-10 text-center lg:text-left">
        <h2 className="font-chronica text-[40px] sm:text-[50px] md:text-[60px] leading-[1.1] uppercase font-bold">
          <span className="text-lilian-orange">{MISSION_TEXTS.titlePart1}</span>
          <span className="font-owl-cute text-lilian-teal text-[50px] sm:text-[65px] md:text-[75px] normal-case lowercase inline-block -mb-2">
            {MISSION_TEXTS.highlightedWord}
          </span>
          <span className="text-lilian-orange">{MISSION_TEXTS.titlePart2}</span>
          <br />
          <span className="text-lilian-orange">{MISSION_TEXTS.titlePart3}</span>
        </h2>
      </div>

      <div className="text-lilian-purple font-gotham text-[16px] md:text-[18px] leading-relaxed flex flex-col gap-8 text-center lg:text-left">
        <p>
          <span className="font-bold">{MISSION_TEXTS.missionLabel}</span>{" "}
          {MISSION_TEXTS.missionText}
        </p>
        <p>
          <span className="font-bold">{MISSION_TEXTS.visionLabel}</span>{" "}
          {MISSION_TEXTS.visionText}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add features/mission/components/MissionText.tsx
git commit -m "feat: add MissionText component"
```

---

### Task 11: Assemble MissionSection

**Files:**
- Create: `features/mission/components/MissionSection.tsx`

- [ ] **Step 1: Write the component**

```tsx
import Image from "next/image";
import MissionImage from "./MissionImage";
import MissionText from "./MissionText";
import { MISSION_IMAGES } from "../constants";

export default function MissionSection() {
  return (
    <section className="relative w-full py-24 flex flex-col items-center overflow-hidden">
      <div className="absolute top-0 right-[-100px] w-[50%] h-full z-0 opacity-40 pointer-events-none">
        <Image
          src={MISSION_IMAGES.backgroundShape}
          alt=""
          fill
          className="object-cover object-left"
        />
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        <MissionImage />
        <MissionText />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add features/mission/components/MissionSection.tsx
git commit -m "feat: add MissionSection component"
```

---

### Task 12: Create Catalog types

**Files:**
- Create: `features/catalog/types.ts`

- [ ] **Step 1: Write the types**

```ts
export type ProductColor =
  | "bg-lilian-teal"
  | "bg-lilian-pink"
  | "bg-[#2c1d54]"
  | "bg-[#e2b18a]"
  | "bg-[#c6687a]";

export interface Product {
  id: number;
  name: string;
  image: string;
  color: ProductColor;
}
```

- [ ] **Step 2: Commit**

```bash
git add features/catalog/types.ts
git commit -m "feat: add catalog types"
```

---

### Task 13: Create Catalog constants

**Files:**
- Create: `features/catalog/constants.ts`

- [ ] **Step 1: Write the constants**

```ts
import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Quesadillas",
    image: "/assets/667f005659eab89dce25f856885b0cf2158efc71.png",
    color: "bg-lilian-teal",
  },
  {
    id: 2,
    name: "Pastel Cup",
    image: "/assets/a3abd80c1bd41edcc14aa9dede23028d804222a5.png",
    color: "bg-lilian-pink",
  },
  {
    id: 3,
    name: "Dona de Oreo",
    image: "/assets/1ff05a6b7598114c6fb1b1ea359890d5a56accb8.png",
    color: "bg-[#2c1d54]",
  },
  {
    id: 4,
    name: "Tostadas de Curtido",
    image: "/assets/174d0aeb253eb37158edd975fd1841e3a016b509.png",
    color: "bg-[#e2b18a]",
  },
  {
    id: 5,
    name: "Pastel de Moras",
    image: "/assets/b4eff3dc8591a8935337a4beadedb6f2892d7c50.png",
    color: "bg-[#2c1d54]",
  },
  {
    id: 6,
    name: "Tamalitos",
    image: "/assets/6b9f3a1ffd556516edd2d630812755b3e8406bd9.png",
    color: "bg-[#e2b18a]",
  },
  {
    id: 7,
    name: "Relámpago Relleno",
    image: "/assets/a1d44b28b02a58376b1a20dce458848550800f4f.png",
    color: "bg-lilian-teal",
  },
  {
    id: 8,
    name: "Pastel de Fresas",
    image: "/assets/f4f9e98f856f909c012d5996e71d70f92a797f87.png",
    color: "bg-[#c6687a]",
  },
];

export const CATALOG_TEXTS = {
  titleLine1: "Escoge aquí",
  titleLine2Prefix: "tu próxima ",
  highlightedWord: "delicia",
  searchPlaceholder: "Paninis, Pasteles, desayunos...",
  searchButton: "Buscar",
  buyHere: "Comprar aquí",
  loadMore: "Cargar más",
  noResults: "No se encontraron productos que coincidan con tu búsqueda.",
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add features/catalog/constants.ts
git commit -m "feat: add catalog constants"
```

---

### Task 14: Create useProductSearch hook

**Files:**
- Create: `features/catalog/hooks/useProductSearch.ts`

- [ ] **Step 1: Write the hook**

```ts
import { useMemo, useState } from "react";
import { Product } from "../types";

interface UseProductSearchOptions {
  products: Product[];
}

interface UseProductSearchResult {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filteredProducts: Product[];
  hasResults: boolean;
}

export function useProductSearch({
  products,
}: UseProductSearchOptions): UseProductSearchResult {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return products.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  const hasResults = filteredProducts.length > 0;

  return {
    searchTerm,
    setSearchTerm,
    filteredProducts,
    hasResults,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add features/catalog/hooks/useProductSearch.ts
git commit -m "feat: add useProductSearch hook"
```

---

### Task 15: Create CatalogTitle component

**Files:**
- Create: `features/catalog/components/CatalogTitle.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { CATALOG_TEXTS } from "../constants";

export default function CatalogTitle() {
  return (
    <div className="flex flex-col items-center mb-12 text-center w-full max-w-[1440px]">
      <div className="flex items-center justify-center gap-4 sm:gap-8 w-full">
        <div className="w-[100px] sm:w-[150px] h-[40px] sm:h-[60px] relative hidden sm:block opacity-50">
          <svg
            viewBox="0 0 100 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[#e2b18a] rotate-180 transform scale-y-[-1]"
          >
            <path
              d="M10 20 Q 30 5 50 20 T 90 20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path d="M30 13 Q 40 5 50 13 Z" fill="currentColor" />
            <path d="M60 27 Q 70 35 80 27 Z" fill="currentColor" />
            <path d="M20 25 Q 25 35 30 25 Z" fill="currentColor" />
            <path d="M70 15 Q 75 5 80 15 Z" fill="currentColor" />
          </svg>
        </div>

        <h2 className="font-chronica text-lilian-purple text-[32px] sm:text-[45px] md:text-[55px] font-bold leading-[1.2] whitespace-nowrap">
          {CATALOG_TEXTS.titleLine1}
          <br />
          {CATALOG_TEXTS.titleLine2Prefix}
          <span className="font-owl-cute text-lilian-orange text-[42px] sm:text-[60px] md:text-[70px] normal-case lowercase inline-block -mb-2">
            {CATALOG_TEXTS.highlightedWord}
          </span>
        </h2>

        <div className="w-[100px] sm:w-[150px] h-[40px] sm:h-[60px] relative hidden sm:block opacity-50">
          <svg
            viewBox="0 0 100 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[#e2b18a]"
          >
            <path
              d="M10 20 Q 30 5 50 20 T 90 20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path d="M30 13 Q 40 5 50 13 Z" fill="currentColor" />
            <path d="M60 27 Q 70 35 80 27 Z" fill="currentColor" />
            <path d="M20 25 Q 25 35 30 25 Z" fill="currentColor" />
            <path d="M70 15 Q 75 5 80 15 Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add features/catalog/components/CatalogTitle.tsx
git commit -m "feat: add CatalogTitle component"
```

---

### Task 16: Create ProductSearch component

**Files:**
- Create: `features/catalog/components/ProductSearch.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { CATALOG_TEXTS } from "../constants";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div className="w-full max-w-[800px] mx-auto mb-16 px-4">
      <div className="flex items-center gap-4 border-b border-[#df8d40] pb-2">
        <div className="w-[45px] h-[45px] rounded-full bg-[#fcf2ea] flex items-center justify-center shrink-0">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#df8d40"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        <input
          type="text"
          placeholder={CATALOG_TEXTS.searchPlaceholder}
          className="w-full bg-transparent outline-none font-gotham text-[16px] text-lilian-purple placeholder-lilian-purple/50"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <button className="bg-lilian-purple text-white px-8 py-2.5 rounded-[100px] font-gotham font-medium text-[15px] shrink-0 hover:bg-lilian-purple-light transition-colors">
          {CATALOG_TEXTS.searchButton}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add features/catalog/components/ProductSearch.tsx
git commit -m "feat: add ProductSearch component"
```

---

### Task 17: Create ProductCard component

**Files:**
- Create: `features/catalog/components/ProductCard.tsx`

- [ ] **Step 1: Write the component**

```tsx
import Image from "next/image";
import { Product } from "../types";
import { CATALOG_TEXTS } from "../constants";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative w-full aspect-[0.9] flex flex-col bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300 border-[6px] border-white/50">
      <div className={`w-full h-[65%] relative ${product.color}`}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="absolute inset-[-10px] sm:inset-[-20px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="w-full h-[35%] bg-white px-4 pt-3 pb-4 flex flex-col justify-between z-10">
        <h3 className="font-gotham font-bold uppercase text-[12px] sm:text-[13px] text-lilian-purple tracking-wide line-clamp-2">
          {product.name}
        </h3>

        <div className="flex justify-end w-full">
          <span className="font-gotham font-bold text-[13px] text-lilian-purple border-b-2 border-lilian-purple pb-0.5">
            {CATALOG_TEXTS.buyHere}
          </span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add features/catalog/components/ProductCard.tsx
git commit -m "feat: add ProductCard component"
```

---

### Task 18: Create ProductGrid component

**Files:**
- Create: `features/catalog/components/ProductGrid.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { Product } from "../types";
import { CATALOG_TEXTS } from "../constants";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto w-full z-10 px-4">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-full text-center py-8 text-lilian-purple/70 font-gotham">
          {CATALOG_TEXTS.noResults}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add features/catalog/components/ProductGrid.tsx
git commit -m "feat: add ProductGrid component"
```

---

### Task 19: Create LoadMoreButton component

**Files:**
- Create: `features/catalog/components/LoadMoreButton.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { CATALOG_TEXTS } from "../constants";

export default function LoadMoreButton() {
  return (
    <div className="mt-16 text-center w-full relative z-10">
      <button className="bg-lilian-purple text-white px-8 py-3.5 rounded-[100px] font-gotham font-medium text-[15px] hover:bg-lilian-purple-light transition-colors inline-flex items-center justify-center gap-2 shadow-md">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        {CATALOG_TEXTS.loadMore}
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add features/catalog/components/LoadMoreButton.tsx
git commit -m "feat: add LoadMoreButton component"
```

---

### Task 20: Assemble CatalogSection

**Files:**
- Create: `features/catalog/components/CatalogSection.tsx`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { useProductSearch } from "../hooks/useProductSearch";
import { PRODUCTS } from "../constants";
import CatalogTitle from "./CatalogTitle";
import ProductSearch from "./ProductSearch";
import ProductGrid from "./ProductGrid";
import LoadMoreButton from "./LoadMoreButton";

export default function CatalogSection() {
  const { searchTerm, setSearchTerm, filteredProducts } = useProductSearch({
    products: PRODUCTS,
  });

  return (
    <section
      id="catalogo"
      className="py-16 px-4 w-full bg-white flex flex-col items-center relative overflow-hidden"
    >
      <CatalogTitle />
      <ProductSearch value={searchTerm} onChange={setSearchTerm} />
      <ProductGrid products={filteredProducts} />
      <LoadMoreButton />

      <div className="absolute bottom-[-50px] left-[-100px] w-full max-w-[800px] h-[300px] opacity-30 z-0 pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full text-lilian-purple"
          fill="currentColor"
        >
          <path d="M0,50 Q25,25 50,50 T100,50 L100,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add features/catalog/components/CatalogSection.tsx
git commit -m "feat: add CatalogSection component"
```

---

### Task 21: Refactor `app/page.tsx` to orchestrate features

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the entire content of `app/page.tsx`**

```tsx
import Header from "@/components/Header";
import HeroSection from "@/features/hero/components/HeroSection";
import MissionSection from "@/features/mission/components/MissionSection";
import CatalogSection from "@/features/catalog/components/CatalogSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-lilian-purple font-gotham overflow-x-hidden">
      <Header />
      <HeroSection />
      <MissionSection />
      <CatalogSection />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "refactor: simplify page.tsx to orchestrate feature sections"
```

---

### Task 22: Final verification

**Files:**
- Verify: All files above

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

Expected: No ESLint errors.

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: Build completes successfully.

- [ ] **Step 3: Commit verification results (if clean)**

```bash
git add .
git commit -m "chore: verify refactor with lint and build"
```

---

## Self-Review Checklist

- [ ] Spec coverage: every requirement from the design spec maps to a task.
- [ ] Placeholder scan: no `TBD`, `TODO`, or vague steps.
- [ ] Type consistency: `Product`, `ProductColor`, and hook interfaces match across tasks.
- [ ] No style changes: every `className` is copied exactly from the original `page.tsx`.
