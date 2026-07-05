import { CarouselConfig, HeroSlideData } from "./types";

export const HERO_CAROUSEL_CONFIG: CarouselConfig = {
  autoplay: true,
  interval: 6000,
  loop: true,
};

export const getHeroTabId = (index: number) => `hero-tab-${index}`;
export const getHeroPanelId = (index: number) => `hero-panel-${index}`;

export const HERO_SLIDES: HeroSlideData[] = [
  {
    id: "slide-1",
    background: {
      type: "image",
      src: "/assets/carrousel/bg-item-1.webp",
      alt: "Fondo de panadería Lilian",
      overlay: "teal",
    },
    foregroundImage: {
      src: "/assets/carrousel/pastel.webp",
      alt: "Pastel de Lilian",
      fit: "compact",
    },
    headline: [
      [
        { text: "La ", highlight: false },
        { text: "tradición", highlight: true },
      ],
      [{ text: "que nos une", highlight: false }],
    ],
    cta: {
      label: "Ordena en Pedidos ya",
      href: "https://www.pedidosya.com",
    },
    hotspots: [
      {
        id: "slide-1-pastel-frutos-rojos",
        top: "top-[84%] sm:top-[72%] md:top-[67%] lg:top-[62%] xl:top-[58%]",
        left: "left-[47%] sm:left-[26%] md:left-[39%] lg:left-[47%] xl:left-[58%]",
        direction: "top",
        icon: "cake",
        label: "Pastel frutos rojos",
      },
    ],
  },
  {
    id: "slide-2",
    background: {
      type: "color",
      color: "#f6f1ea",
    },
    foregroundImage: {
      src: "/assets/carrousel/item_carrousel.webp",
      alt: "Nueva temporada de productos Lilian",
      fit: "cover",
    },
    headline: [
      [
        { text: "Nuestro primer ", highlight: false },
        { text: "amor", highlight: true, color: "teal" },
      ],
      [{ text: "es el pan.", highlight: false }],
    ],
    description: "Somos especialistas en pan, pasteles y postres",
    cta: {
      label: "Ordena en Pedidos ya",
      href: "https://www.pedidosya.com",
    },
  },
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
];
