"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error caught:", error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-lilian-orange/15 text-lilian-orange flex items-center justify-center text-2xl mb-4 font-bold">
          !
        </div>
        <h3 className="font-chronica text-xl font-bold text-lilian-purple mb-2">
          Ha ocurrido un error inesperado
        </h3>
        <p className="font-gotham text-sm text-lilian-purple/70 mb-6">
          No pudimos cargar esta sección. Por favor intenta nuevamente.
        </p>
        <button
          onClick={() => reset()}
          className="bg-lilian-orange hover:bg-lilian-orange-dark text-white font-chronica font-semibold px-6 py-2.5 rounded-full transition-colors cursor-pointer shadow-sm"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
