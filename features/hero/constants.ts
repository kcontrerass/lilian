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
      overlay: true,
    },
    foregroundImage: {
      src: "/assets/carrousel/pastel.webp",
      alt: "Pastel de Lilian",
    },
    headline: [
      [
        { text: "Hecho con ", highlight: false },
        { text: "amor", highlight: true },
        { text: " y", highlight: false },
      ],
      [{ text: "horneado para ti.", highlight: false }],
    ],
    cta: {
      label: "Ordena en Pedidos ya",
      href: "https://www.pedidosya.com",
    },
  },
  {
    id: "slide-2",
    background: {
      type: "image",
      src: "/assets/carrousel/item_carrousel.webp",
      alt: "Nueva temporada de productos Lilian",
    },
    headline: [
      [
        { text: "Disfruta", highlight: true },
        { text: " de nuestra ", highlight: false },
        { text: "nueva", highlight: true },
        { text: " temporada", highlight: false },
      ],
    ],
    cta: {
      label: "Ordena en Pedidos ya",
      href: "https://www.pedidosya.com",
    },
  },
  {
    id: "slide-3",
    background: {
      type: "video",
      src: "/assets/carrousel/bg_video.mp4",
      poster: "/assets/carrousel/bg_video_poster.webp",
      alt: "Video de productos Lilian",
    },
    headline: [
      [
        { text: "Siempre con ingredientes de ", highlight: false },
        { text: "alta calidad", highlight: true },
        { text: "...", highlight: false },
      ],
    ],
    cta: {
      label: "Ordena en Pedidos ya",
      href: "https://www.pedidosya.com",
    },
  },
];
