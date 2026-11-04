import { CAREERS_TEXTS } from "../constants";
import { CareerApplicationSubmission } from "../types";

type SubmitApplicationResult = { ok: true } | { ok: false; message: string };

const MAX_FIELD_LENGTH = 200;
const MAX_COMMENTS_LENGTH = 2000;
const MAX_URL_LENGTH = 2000;

function requiredText(value: string, maxLength: number): string | null {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength) {
    return null;
  }
  return trimmed;
}

export async function submitCareerApplication(
  payload: CareerApplicationSubmission,
): Promise<SubmitApplicationResult> {
  const webhookUrl = process.env.NEXT_PUBLIC_CAREERS_WEBHOOK_URL;
  if (!webhookUrl) {
    return { ok: false, message: CAREERS_TEXTS.submitFailedError };
  }

  const fullName = requiredText(payload.fullName ?? "", MAX_FIELD_LENGTH);
  const age = requiredText(payload.age ?? "", 3);
  const position = requiredText(payload.position ?? "", MAX_FIELD_LENGTH);
  const email = requiredText(payload.email ?? "", MAX_FIELD_LENGTH);
  const phone = requiredText(payload.phone ?? "", 40);
  const comments = (payload.comments ?? "").trim().slice(0, MAX_COMMENTS_LENGTH);
  const pdfUrl = requiredText(payload.pdfUrl ?? "", MAX_URL_LENGTH);

  if (!fullName || !age || !position || !email || !phone || !pdfUrl) {
    return { ok: false, message: CAREERS_TEXTS.missingFieldsError };
  }

  let parsedPdfUrl: URL;
  try {
    parsedPdfUrl = new URL(pdfUrl);
  } catch {
    return { ok: false, message: CAREERS_TEXTS.missingPdfUrlError };
  }

  if (parsedPdfUrl.protocol !== "https:" && parsedPdfUrl.protocol !== "http:") {
    return { ok: false, message: CAREERS_TEXTS.missingPdfUrlError };
  }

  const application = {
    fullName,
    age,
    position,
    email,
    phone,
    comments,
    pdfUrl: parsedPdfUrl.toString(),
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(application),
    });

    if (!response.ok) {
      return { ok: false, message: CAREERS_TEXTS.submitFailedError };
    }

    return { ok: true };
  } catch {
    // Static sites have no server. If the webhook omits CORS headers, the
    // JSON call is blocked before it is sent. A form POST is a simple request
    // and still delivers the PDF link.
    try {
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(application),
      });
    } catch {
      return { ok: false, message: CAREERS_TEXTS.submitFailedError };
    }

    return { ok: true };
  }
}
