import { TimelineMilestone } from "./types";

export const MISSION_IMAGES = {
  main: "/assets/historia/main.webp",
  whiteLogo: "/assets/historia/white-logo.svg",
  sticker: "/assets/historia/sticker.svg",
  backgroundShape: "/assets/historia/figure_1.svg",
} as const;

export const MISSION_TEXTS = {
  sectionBadge: "Quiénes Somos",
  titleBefore: "Cada ",
  highlightedWord: "receta",
  titleAfter: " tiene",
  subtitle: "una historia",
  missionLabel: "Nuestra Misión:",
  missionText:
    "Atender y satisfacer las necesidades de nuestros clientes, brindando productos y servicios de alta calidad, pertenecientes a la industria pastelera, con un personal altamente motivado y capacitado, contribuyendo al desarrollo del país y de nuestros colaboradores.",
  visionLabel: "Nuestra Visión:",
  visionText:
    "Queremos que en cada bocado que disfrutes te lleves una experiencia única del sabor, que por una vida ha venido a mis manos y poder compartir estas vivencias a través de recetas únicas.",
  timelineTitle: "Nuestra Trayectoria",
  timelineSubtitle: "Más de cuatro décadas creando memorias dulces desde 1979",
} as const;

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: "1979",
    title: "El Inicio de la Tradición",
    description:
      "Nace Panadería y Pastelería Lilian con hornos artesanales y el compromiso inquebrantable de llevar recetas caseras de alta calidad a los hogares.",
    badge: "Fundación",
    highlight: true,
  },
  {
    year: "1995",
    title: "Consolidación y Crecimiento",
    description:
      "Nuestras recetas clásicas de tortas y panes tradicionales se convierten en el preferido de la comunidad, abriendo camino a nuestras primeras expansiones.",
    badge: "Expansión",
  },
  {
    year: "2012",
    title: "Innovación y Nuevos Sabores",
    description:
      "Incorporamos técnicas vanguardistas de pastelería moderna, pasteles personalizados para eventos y una variedad renovada de postres finos.",
    badge: "Innovación",
  },
  {
    year: "Hoy",
    title: "Tradición Familiar Viva",
    description:
      "Con más de cuatro décadas de historia, seguimos horneando con el mismo amor, evolucionando para estar cada día más cerca de ti.",
    badge: "Actualidad",
    highlight: true,
  },
];
