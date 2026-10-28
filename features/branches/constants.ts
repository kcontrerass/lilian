import { Branch } from "./types";

export const BRANCHES_TEXTS = {
  sectionId: "sucursales",
  badge: "Puntos de Venta",
  titleBefore: "Nuestras ",
  highlightedTitle: "Sucursales",
  titleAfter: " por departamento",
  subtitle:
    "Encuentra la sucursal de Pastelería Lilian más cercana a ti. Disfruta de la mejor calidad y servicio en cada departamento.",
  allDepartmentsLabel: "Todos",
  callUsLabel: "Llamar",
  mapsButtonLabel: "Ver en Google Maps",
  hoursLabel: "Horario de atención:",
  emptyMessage: "No se encontraron sucursales en este departamento.",
} as const;

export const DEPARTMENTS = [
  "Todos",
  "San Salvador",
  "La Libertad",
  "Santa Ana",
  "San Miguel",
] as const;

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: "san-salvador-delgado",
    name: "Sucursal Ciudad Delgado (Matriz)",
    department: "San Salvador",
    address: "Calle Principal y Avenida Paleca, Ciudad Delgado, San Salvador",
    description:
      "Nuestra sede principal y taller matriz donde nació la tradición Lilian. Variedad completa de pasteles para ocasiones especiales, postres individuales y pan fresco horneado diariamente.",
    phones: ["+503 2511 9608", "+503 2511 9609"],
    mapsUrl:
      "https://maps.google.com/?q=Panaderia+y+Pasteleria+Lilian+Ciudad+Delgado+San+Salvador",
    image: "/assets/grid/grid_1.webp",
    schedule: "Lunes a Sábado: 6:00 AM - 8:00 PM | Domingo: 7:00 AM - 7:00 PM",
  },
  {
    id: "la-libertad-tecla",
    name: "Sucursal Santa Tecla",
    department: "La Libertad",
    address: "Paseo El Carmen / Centro de Santa Tecla, La Libertad",
    description:
      "Atendiendo a las familias tecleñas con cafetería, porciones personales, pasteles listos para llevar y servicio para encargos personalizados.",
    phones: ["+503 2511 9608"],
    mapsUrl:
      "https://maps.google.com/?q=Panaderia+Lilian+Santa+Tecla+La+Libertad",
    image: "/assets/grid/grid_2.webp",
    schedule: "Lunes a Sábado: 7:00 AM - 7:30 PM | Domingo: 8:00 AM - 6:00 PM",
  },
  {
    id: "santa-ana-centro",
    name: "Sucursal Santa Ana Centro",
    department: "Santa Ana",
    address: "Centro Histórico, Avenida Independencia, Santa Ana",
    description:
      "Nuestra sucursal en la Ciudad Heroica para que disfrutes de toda la dulzura y textura de nuestras recetas clásicas y pedidos para tus eventos especiales.",
    phones: ["+503 2511 9608"],
    mapsUrl:
      "https://maps.google.com/?q=Pasteleria+Lilian+Santa+Ana+Centro",
    image: "/assets/grid/grid_3.webp",
    schedule: "Lunes a Domingo: 7:00 AM - 7:00 PM",
  },
  {
    id: "san-miguel-roosevelt",
    name: "Sucursal San Miguel (Roosevelt)",
    department: "San Miguel",
    address: "Avenida Roosevelt Sur, San Miguel",
    description:
      "La pasión por la buena pastelería en el oriente del país. Pasteles helados, tortas tradicionales y pan de mesa con la calidad de siempre.",
    phones: ["+503 2511 9608"],
    mapsUrl:
      "https://maps.google.com/?q=Pasteleria+Lilian+San+Miguel+Roosevelt",
    image: "/assets/grid/grid_4.webp",
    schedule: "Lunes a Sábado: 7:00 AM - 8:00 PM | Domingo: 8:00 AM - 6:00 PM",
  },
];
