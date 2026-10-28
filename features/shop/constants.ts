import { WHATSAPP_URL } from "@/lib/constants";

export const SHOP_ASSETS = {
  heroCakes: "/assets/carrousel/item_carrousel.webp",
  leafLeft: "/assets/buscador/leaft_left.svg",
  leafRight: "/assets/buscador/leaft_right.svg",
  freshCake: "/assets/carrousel/pastel.webp",
  pedidosYaLogo: "/assets/pedidosya.png",
} as const;

export const SHOP_TEXTS = {
  sectionId: "tienda",
  eyebrowBadge: "Panadería & Pastelería Lilian • Est. 1979",
  statusBadge: "En Construcción • Próximamente",
  titleLine1: "Estamos preparando nuestra",
  titleHighlight: "Tienda Online",
  titleLine2: "para ti",
  subtitle:
    "El aroma inconfundible de nuestras recetas artesanales y la frescura de nuestros pasteles muy pronto estarán a un solo clic de tu mesa. Estamos cuidando cada detalle para ofrecerte una experiencia dulce, ágil y segura.",
  orderCardTitle: "¿Deseas hacer un pedido hoy mismo?",
  orderCardSubtitle:
    "¡No te quedes con el antojo! Te atendemos de inmediato con la calidez de siempre por WhatsApp o con entrega rápida a domicilio por PedidosYa.",
  whatsappButton: "Hacer Pedido en WhatsApp",
  pedidosYaButton: "Pedir en PedidosYa",
  backHome: "← Volver al Inicio",
  perks: [
    {
      title: "Tradición desde 1979",
      description:
        "Recetas auténticas salvadoreñas elaboradas con dedicación artesanal y el sabor de toda una vida.",
      icon: "cake",
    },
    {
      title: "Horneado Fresco al Día",
      description:
        "Ingredientes de la más alta calidad y horneado diario para que recibas siempre lo mejor en tu mesa.",
      icon: "sparkles",
    },
    {
      title: "Atención Cercana y Cálida",
      description:
        "Nuestro equipo está listo para ayudarte a endulzar cada cumpleaños, reunión o celebración especial.",
      icon: "heart",
    },
  ],
} as const;

export const SHOP_WHATSAPP_LINK = `${WHATSAPP_URL}?text=Hola%20Panader%C3%ADa%20y%20Pasteler%C3%ADa%20Lilian,%20deseo%20hacer%20un%20pedido`;
