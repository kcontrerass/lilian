const DEPARTMENTS = [
  "Ahuachapán",
  "Chalatenango",
  "Cuscatlán",
  "La Libertad",
  "La Paz",
  "Morazán",
  "San Salvador",
  "Santa Ana",
  "Sonsonate",
] as const;

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/** Infiere departamento cuando la API no envía categoría (p. ej. solo dirección). */
export function inferBranchDepartment(name: string, address: string): string {
  const text = normalize(`${name} ${address}`);

  for (const department of DEPARTMENTS) {
    if (text.includes(normalize(department))) {
      return department;
    }
  }

  if (/\b(s\.?\s*s\.?|san salvador)\b/.test(text)) {
    return "San Salvador";
  }

  const rules: { department: (typeof DEPARTMENTS)[number]; patterns: RegExp[] }[] = [
    {
      department: "Sonsonate",
      patterns: [/acajutla/, /armenia/, /sonsonate/, /nahuilingo/],
    },
    {
      department: "La Paz",
      patterns: [/aeroman/, /zacatecoluca/],
    },
    {
      department: "Chalatenango",
      patterns: [
        /chalatenango/,
        /tejutla/,
        /el poy\b/,
        /la palma\b/,
        /la reina\b/,
        /nueva concepcion/,
        /el coyolito/,
      ],
    },
    {
      department: "La Libertad",
      patterns: [
        /ciudad arce/,
        /la libertad/,
        /lourdes/,
        /colon\b/,
        /col\. el progreso/,
        /huizucar/,
        /marsella/,
        /quezaltepeque/,
        /opico/,
        /santa tecla/,
        /zaragoza/,
        /versalles/,
      ],
    },
    {
      department: "Morazán",
      patterns: [/gotera/, /morazan/],
    },
    {
      department: "Santa Ana",
      patterns: [/metapan/, /santa ana\b/],
    },
    {
      department: "Cuscatlán",
      patterns: [/suchitoto/, /cuscatlan/],
    },
    {
      department: "Ahuachapán",
      patterns: [/ahuachapan/, /mediterraneo/],
    },
    {
      department: "San Salvador",
      patterns: [
        /aguilares/,
        /ciudad delgado/,
        /mejicanos/,
        /soyapango/,
        /apopa/,
        /renderos/,
        /metrosur/,
        /comalapa/,
        /montelimar/,
        /san martin/,
        /salvador del mundo/,
        /valle dulce/,
        /paseo venecia/,
        /plaza mundo/,
        /centro historico/,
        /binaes/,
        /ex cine metro/,
      ],
    },
  ];

  for (const rule of rules) {
    if (rule.patterns.some((pattern) => pattern.test(text))) {
      return rule.department;
    }
  }

  return "";
}

export function readDepartmentFromApi(item: Record<string, unknown>): string {
  const direct = [
    item.department,
    item.departamento,
    item.categoria,
    item.category,
    item.ubicacion_categoria,
    item.location_category,
  ]
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .find(Boolean);

  if (direct) return direct;

  const nested = item.meta;
  if (typeof nested === "object" && nested !== null) {
    const meta = nested as Record<string, unknown>;
    const fromMeta = [meta.departamento, meta.department, meta.categoria]
      .map((value) => (typeof value === "string" ? value.trim() : ""))
      .find(Boolean);
    if (fromMeta) return fromMeta;
  }

  const collections = [item.categories, item.categorias, item.terms, item.taxonomies];
  for (const collection of collections) {
    if (!Array.isArray(collection)) continue;
    for (const entry of collection) {
      if (typeof entry === "string" && entry.trim()) {
        return entry.trim();
      }
      if (typeof entry === "object" && entry !== null) {
        const record = entry as Record<string, unknown>;
        const name = [record.name, record.nombre, record.label, record.slug]
          .map((value) => (typeof value === "string" ? value.trim() : ""))
          .find(Boolean);
        if (name) return name;
      }
    }
  }

  return "";
}
