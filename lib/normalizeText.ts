/** Compara textos ignorando mayúsculas y tildes. */
export function foldText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function includesFolded(haystack: string, needle: string): boolean {
  const term = foldText(needle);
  if (!term) return true;
  return foldText(haystack).includes(term);
}
