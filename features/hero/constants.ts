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
        { text: "Disfruta", highlight: false, color: "orange" },
        { text: " de nuestra", highlight: false },
      ],
      [
        { text: "nueva ", highlight: false },
        { text: "temporada", highlight: true, color: "teal" },
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
      [{ text: "Siempre con", highlight: false }],
      [{ text: "ingredientes", highlight: true, color: "teal" }],
      [{ text: "de alta calidad...", highlight: false }],
    ],
    align: "left",
    cta: {
      label: "Ordena en Pedidos ya",
      href: "https://www.pedidosya.com",
    },
  },
];
