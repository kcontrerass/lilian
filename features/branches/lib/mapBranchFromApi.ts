import { BRANCH_IMAGE } from "../constants";
import { inferBranchDepartment, readDepartmentFromApi } from "./inferBranchDepartment";
import type { Branch } from "../types";

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

function parsePhones(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((entry) => asString(entry)).filter(Boolean);
  }

  const raw = asString(value);
  if (!raw) return [];

  return raw
    .replace(/^Tel\.\s*/i, "")
    .split(/\s*\/\s*/)
    .map((part) => part.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function pickImageValue(item: ApiRecord): unknown {
  const candidate =
    item.image ??
    item.imagen ??
    item.featured_image ??
    item.thumbnail ??
    item.image_url;

  if (typeof candidate === "object" && candidate !== null) {
    const media = candidate as ApiRecord;
    return media.url ?? media.source_url ?? media.guid ?? media.src;
  }

  return candidate;
}

function resolveImage(value: unknown, storeUrl: string): string {
  const raw = asString(value);
  if (!raw || raw.toLowerCase() === "null" || raw === "false") {
    return BRANCH_IMAGE;
  }
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }
  if (raw.startsWith("/assets/")) {
    return raw;
  }
  if (raw.startsWith("/wp-content/") || raw.startsWith("/")) {
    return `${storeUrl}${raw}`;
  }
  // Nombre suelto o ruta desconocida → imagen local por defecto
  return BRANCH_IMAGE;
}

export function extractBranchesPayload(data: unknown): ApiRecord[] {
  if (Array.isArray(data)) {
    return data.filter((item): item is ApiRecord => typeof item === "object" && item !== null);
  }

  if (typeof data === "object" && data !== null) {
    const record = data as ApiRecord;
    for (const key of ["sucursales", "branches", "data", "items"]) {
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

export function mapBranchFromApi(item: ApiRecord, storeUrl: string): Branch | null {
  const name = asString(item.name ?? item.nombre);
  if (!name) return null;

  const id =
    asString(item.id ?? item.slug) ||
    slugify(name) ||
    `branch-${Math.random().toString(36).slice(2, 9)}`;

  const mapsUrl = asString(
    item.mapsUrl ?? item.maps_url ?? item.ubicacion_url ?? item.link ?? item.url
  );

  const address = asString(item.address ?? item.direccion);
  const departmentFromApi = readDepartmentFromApi(item);
  const department =
    departmentFromApi || inferBranchDepartment(name, address);

  return {
    id,
    name,
    department,
    address,
    description: asString(item.description ?? item.descripcion) || undefined,
    phones: parsePhones(item.phones ?? item.phone ?? item.telefono),
    mapsUrl,
    image: resolveImage(pickImageValue(item), storeUrl),
    schedule: asString(item.schedule ?? item.horario) || undefined,
  };
}
