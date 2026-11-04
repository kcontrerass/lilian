import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center font-gotham text-lilian-purple bg-white">
      <h1 className="font-chronica text-3xl font-bold">Página no encontrada</h1>
      <p className="text-sm text-lilian-purple/75 max-w-md">
        La dirección que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="rounded-full bg-lilian-orange px-6 py-3 text-sm font-chronica font-bold text-white"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
