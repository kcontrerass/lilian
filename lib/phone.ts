/**
 * Separa teléfonos que vienen juntos, sin cambiar el texto de cada uno.
 * "+503 2452-4570 / +503 2566-3365" queda en dos cadenas tal como las envió la API.
 */
export function splitPhoneNumbers(raw: string): string[] {
  const text = raw.replace(/^Tel\.\s*/i, "");
  const pattern = /(?:\+?503[\s.-]*)?\d(?:[\s.-]*\d){7}/g;
  const found = [...text.matchAll(pattern)].map((match) => match[0].trim());

  if (found.length > 0) return [...new Set(found)];

  const trimmed = text.trim();
  return trimmed ? [trimmed] : [];
}

/** href internacional para El Salvador, sin guiones ni espacios. */
export function toTelHref(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  const local =
    digits.startsWith("503") && digits.length > 8 ? digits.slice(3) : digits;
  return `tel:+503${local}`;
}

/** El botón muestra el teléfono tal como llegó de la API. */
export function formatPhoneDisplay(raw: string): string {
  return raw.trim();
}
