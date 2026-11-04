"use client";

import { useCallback, useState } from "react";
import { wpRestUrl } from "@/lib/wp";

export type UploadPdfExtra = {
  title?: string;
  context?: string;
};

export type UploadPdfResult = {
  id: number;
  url: string;
  filename: string;
  mime_type: string;
};

export function useUploadPdf() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadPdfResult | null>(null);

  const upload = useCallback(async (file: File, extra?: UploadPdfExtra) => {
    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (extra?.title) {
        formData.append("title", extra.title);
      }
      if (extra?.context) {
        formData.append("context", extra.context);
      }

      const response = await fetch(wpRestUrl("/lilian/v1/upload/pdf"), {
        method: "POST",
        body: formData,
      });

      const data = (await response.json().catch(() => null)) as
        | UploadPdfResult
        | { message?: string; code?: string }
        | null;

      if (!response.ok) {
        const message =
          data && typeof data === "object" && "message" in data && data.message
            ? String(data.message)
            : `Error al subir el PDF (${response.status}).`;
        throw new Error(message);
      }

      const uploaded = data as UploadPdfResult;
      setResult(uploaded);
      return uploaded;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al subir el PDF.";
      setError(message);
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  return { upload, uploading, error, result };
}
