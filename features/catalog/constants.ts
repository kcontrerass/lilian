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
    image: "/assets/c6943b6ff875f7e6f7c288f30a9528184ef7ceb9.png",
    color: "bg-[#2c1d54]",
  },
  {
    id: 4,
    name: "Tostadas de Curtido",
    image: "/assets/972f874b1a6a467dae58733f1c931f7819b15759.png",
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

export const CATALOG_IMAGES = {
  leafLeft: "/assets/buscador/leaft_left.svg",
  leafRight: "/assets/buscador/leaft_right.svg",
} as const;

export const CATALOG_TEXTS = {
  titleLine1: "Somos la primer",
  highlightedWord: "Panadería",
  titleLine2Suffix: " a nivel regional",
  searchPlaceholder: "Paninis, Pasteles, desayunos...",
  searchButton: "Buscar",
  buyHere: "Comprar aquí",
  loadMore: "Cargar más",
  noResults: "No se encontraron productos que coincidan con tu búsqueda.",
} as const;
