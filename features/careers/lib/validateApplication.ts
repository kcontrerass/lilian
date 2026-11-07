export type ApplicationField =
  | "fullName"
  | "age"
  | "position"
  | "email"
  | "phone";

const NAME_PATTERN = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ '\-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const PHONE_PATTERN = /^(?:\+503[\s-]?)?\d{4}[\s-]?\d{4}$/;

export function validateApplicationField(
  field: ApplicationField,
  value: string,
): string | null {
  const trimmed = value.trim();

  if (field === "fullName") {
    if (!trimmed) return "Escribe tu nombre completo.";
    if (!NAME_PATTERN.test(trimmed)) {
      return "Usa solo letras, espacios y tildes.";
    }
  }

  if (field === "age") {
    if (!trimmed) return "Indica tu edad.";
    const age = Number(trimmed);
    if (!Number.isInteger(age) || age < 16 || age > 70) {
      return "La edad debe estar entre 16 y 70 años.";
    }
  }

  if (field === "position") {
    if (!trimmed) return "Selecciona un puesto.";
  }

  if (field === "email") {
    if (!trimmed) return "Escribe tu correo.";
    if (!EMAIL_PATTERN.test(trimmed)) {
      return "Usa un correo con dominio, por ejemplo nombre@correo.com.";
    }
  }

  if (field === "phone") {
    if (!trimmed) return "Escribe tu teléfono.";
    if (!PHONE_PATTERN.test(trimmed)) {
      return "Usa 8 dígitos, por ejemplo 7000-0000 o +503 7000-0000.";
    }
  }

  return null;
}
