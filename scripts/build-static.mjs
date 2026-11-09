import { rename } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const apiDir = path.join(root, "app/api");
const stash = path.join(root, ".api-stash");

/**
 * `output: export` no puede incluir /api/wp (proxy de Vercel).
 * El sitio estático llama a WordPress directo. Esta ruta se aparta solo durante el build.
 */
async function main() {
  await rename(apiDir, stash);

  const code = await new Promise((resolve) => {
    const child = spawn("npx", ["next", "build"], {
      cwd: root,
      env: { ...process.env, NEXT_STATIC_EXPORT: "1" },
      stdio: "inherit",
    });
    child.on("exit", (exitCode) => resolve(exitCode ?? 1));
    child.on("error", () => resolve(1));
  });

  await rename(stash, apiDir);
  process.exit(code);
}

main().catch(async (error) => {
  console.error(error);
  try {
    await rename(stash, apiDir);
  } catch {
    // The API folder was already restored, or the stash was never created.
  }
  process.exit(1);
});
