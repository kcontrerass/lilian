"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html lang="es">
      <body className="min-h-screen flex items-center justify-center bg-white text-[#3d246a] font-sans p-6">
        <div className="max-w-md w-full text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#ff8f2d]/10 text-[#ff8f2d] flex items-center justify-center text-3xl mb-4 font-bold">
            !
          </div>
          <h2 className="text-2xl font-bold mb-2 font-serif">Algo salió mal</h2>
          <p className="text-sm text-[#3d246a]/70 mb-6">
            Ha ocurrido un problema inesperado. Por favor intenta recargar la página.
          </p>
          <button
            onClick={() => reset()}
            className="bg-[#ff8f2d] hover:bg-[#ef6f28] text-white font-medium px-6 py-2.5 rounded-full transition-colors cursor-pointer shadow-md"
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
