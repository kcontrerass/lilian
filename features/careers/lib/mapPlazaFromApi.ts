import type { JobPosition } from "../types";

type ApiRecord = Record<string, unknown>;

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function asString(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return "";
}

function parseRequirements(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((entry) => asString(entry)).filter(Boolean);
  }

  const raw = asString(value);
  if (!raw) return [];

  return raw
    .split(/\r?\n|•|;/)
    .map((part) => part.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
}

export function extractPlazasPayload(data: unknown): ApiRecord[] {
  if (Array.isArray(data)) {
    return data.filter((item): item is ApiRecord => typeof item === "object" && item !== null);
  }

  if (typeof data === "object" && data !== null) {
    const record = data as ApiRecord;
    for (const key of ["plazas", "jobs", "data", "items"]) {
      const nested = record[key];
      if (Array.isArray(nested)) {
        return nested.filter(
          (item): item is ApiRecord => typeof item === "object" && item !== null
        );
      }
    }
  }

  return [];
}

export function mapPlazaFromApi(item: ApiRecord): JobPosition | null {
  const title = asString(
    item.title ?? item.titulo ?? item.puesto ?? item.nombre ?? item.name
  );
  if (!title) return null;

  const id =
    asString(item.id ?? item.slug) ||
    slugify(title) ||
    `job-${Math.random().toString(36).slice(2, 9)}`;

  return {
    id,
    title,
    department: asString(item.department ?? item.departamento ?? item.area),
    ageRange: asString(
      item.ageRange ?? item.age_range ?? item.rango_edad ?? item.edad
    ),
    schedule: asString(item.schedule ?? item.horario),
    location: asString(item.location ?? item.ubicacion ?? item.lugar),
    description: asString(item.description ?? item.descripcion),
    requirements: parseRequirements(
      item.requirements ?? item.requisitos ?? item.requisito
    ),
  };
}
