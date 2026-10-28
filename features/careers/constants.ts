import { JobPosition } from "./types";

export const HR_EMAIL = "rrhh@panlilian.com";

export const CAREERS_TEXTS = {
  sectionId: "trabaja-con-nosotros",
  badge: "Bolsa de Empleo",
  titleBefore: "Trabaja con ",
  highlightedTitle: "Nosotros",
  titleAfter: "",
  subtitle:
    "Únete a una familia que desde 1979 hornea con pasión y compromiso. Conoce nuestras plazas vacantes y postúlate hoy mismo.",
  jobsHeaderTitle: "Plazas Disponibles",
  jobsHeaderSubtitle: "Selecciona una plaza para aplicar directamente a la vacante:",
  searchPlaceholder: "Buscar por puesto, área o ubicación…",
  searchEmptyMessage: "No encontramos plazas con ese criterio. Prueba con otra búsqueda.",
  applyButtonLabel: "Postularme a esta plaza",
  formTitle: "Envía tu Postulación",
  formSubtitle: "Completa tus datos y adjunta tu Hoja de Vida (CV) para Recursos Humanos:",
  fullNameLabel: "Nombre Completo",
  fullNamePlaceholder: "Ej. Ana María Rodríguez",
  ageLabel: "Edad (años)",
  agePlaceholder: "Ej. 25",
  positionLabel: "Puesto al que aplica",
  positionPlaceholder: "Selecciona una plaza",
  emailLabel: "Correo Electrónico",
  emailPlaceholder: "tu.correo@ejemplo.com",
  phoneLabel: "Teléfono / WhatsApp de contacto",
  phonePlaceholder: "+503 7000 0000",
  cvLabel: "Adjunta tu Hoja de Vida (CV)",
  cvHelpText: "Formatos permitidos: PDF, Word (.doc, .docx). Máximo 10MB.",
  commentsLabel: "Mensaje o experiencia relevante (opcional)",
  commentsPlaceholder: "Cuéntanos brevemente sobre tu experiencia previa en el área...",
  submitButtonLabel: "Enviar Postulación a RRHH",
  submittingLabel: "Procesando postulación...",
  successTitle: "¡Postulación Preparada!",
  successSubtitle:
    "Tu información ha sido registrada. Para completar la entrega de tu CV a Recursos Humanos, haz clic en el botón de abajo para enviar el correo directamente a rrhh@panlilian.com.",
  sendMailActionLabel: "Enviar correo a Recursos Humanos con mi CV",
  sendAnotherLabel: "Postular a otra plaza",
} as const;

export const INITIAL_JOB_POSITIONS: JobPosition[] = [
  {
    id: "pastelero-decorador",
    title: "Pastelero / Decorador Artístico",
    department: "Producción & Pastelería",
    ageRange: "22 a 40 años",
    schedule: "Tiempo Completo / Turnos Rotativos",
    location: "San Salvador (Planta Matriz)",
    description:
      "Elaboración, armado y decoración de pasteles tradicionales y temáticos para celebraciones especiales con altos estándares de calidad artesanal.",
    requirements: [
      "Experiencia mínima comprobable de 1 año en pastelería",
      "Manejo de coberturas (chantilly, crema de mantequilla y fondant)",
      "Creatividad, puntualidad y limpieza en su área de trabajo",
    ],
  },
  {
    id: "atencion-mostrador",
    title: "Auxiliar de Mostrador y Atención al Cliente",
    department: "Ventas & Servicio",
    ageRange: "18 a 30 años",
    schedule: "Tiempo Completo",
    location: "San Salvador / Santa Tecla",
    description:
      "Atención amable a nuestros clientes en sala de ventas, despacho de pasteles y panadería, cobro en caja y cuidado de la exhibición de producto.",
    requirements: [
      "Excelente actitud de servicio, proactividad y amabilidad",
      "Experiencia en manejo de caja y terminales de pago POS (deseable)",
      "Disponibilidad de horarios (incluyendo fines de semana)",
    ],
  },
  {
    id: "panadero-artesanal",
    title: "Panadero Artesanal",
    department: "Taller de Panadería",
    ageRange: "20 a 45 años",
    schedule: "Turno Mañanero (4:00 AM - 12:00 PM)",
    location: "San Salvador",
    description:
      "Preparación de masas, amasado y horneado de pan dulce salvadoreño tradicional y pan francés de la casa.",
    requirements: [
      "Conocimiento práctico en horneado tradicional y levaduras",
      "Puntualidad rigurosa y sentido de trabajo en equipo",
      "Compromiso con la higiene y manipulación de alimentos",
    ],
  },
  {
    id: "motorista-repartidor",
    title: "Motorista / Repartidor de Pasteles",
    department: "Logística y Entregas",
    ageRange: "23 a 45 años",
    schedule: "Tiempo Completo",
    location: "Área Metropolitana de San Salvador",
    description:
      "Transporte seguro y entrega puntual de pasteles de eventos especiales y suministros a nuestras diferentes sucursales.",
    requirements: [
      "Licencia de conducir vigente (liviana o pesada)",
      "Historial de tránsito limpio y responsabilidad vial",
      "Cuidado meticuloso en el manejo y traslado de pasteles",
    ],
  },
];
