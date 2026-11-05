/**
 * Comprime public/mapa.jpg → mapa.jpg (reemplazo) + mapa-preview.webp (vista previa).
 * Ejecutar una vez: npm install sharp --save-dev && node scripts/optimize-mapa.mjs
 */
import { access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public");
const source = path.join(publicDir, "mapa.jpg");
const previewWebp = path.join(publicDir, "mapa-preview.webp");
const optimizedJpg = path.join(publicDir, "mapa-optimized.jpg");

async function main() {
  try {
    await access(source);
  } catch {
    console.error("No existe public/mapa.jpg");
    process.exit(1);
  }

  console.log("Generando vista previa WebP (recorte + ancho 1400px)…");
  await sharp(source)
    .rotate()
    .trim({ threshold: 12 })
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(previewWebp);

  console.log("Generando JPG optimizado (recorte + ancho 2400px)…");
  await sharp(source)
    .rotate()
    .trim({ threshold: 12 })
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(optimizedJpg);

  console.log("Listo:");
  console.log("  ", previewWebp);
  console.log("  ", optimizedJpg);
  console.log(
    "Reemplaza public/mapa.jpg por mapa-optimized.jpg si el peso bajó, y en constants usa timelineMapPreview: '/mapa-preview.webp'.",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
