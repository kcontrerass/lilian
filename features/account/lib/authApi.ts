import { buildWooApiUrl } from "@/lib/wooApiUrl";
import { getAuthToken, setAuthToken } from "./tokenStorage";
import type {
  AuthApiErrorBody,
  AuthUser,
  CustomerOrder,
  LoginResult,
  ProfileUpdatePayload,
  RegisterPayload,
  RegisterResult,
} from "../types";

export class AuthApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "AuthApiError";
    this.status = status;
    this.code = code;
  }
}

async function authFetch<T>(
  path: string,
  init: RequestInit = {},
  options: { auth?: boolean } = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth !== false) {
    const token = getAuthToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(buildWooApiUrl(path), {
      ...init,
      headers,
    });
  } catch (err) {
    const message =
      err instanceof Error && err.message.includes("NEXT_PUBLIC_WOO_STORE_URL")
        ? err.message
        : "No se pudo conectar con la tienda.";
    throw new AuthApiError(message, 500);
  }

  const text = await response.text();
  const data = text ? (JSON.parse(text) as unknown) : null;

  if (!response.ok) {
    const err = data as AuthApiErrorBody | null;
    throw new AuthApiError(
      err?.message || `Error de autenticación (${response.status})`,
      response.status,
      err?.code,
    );
  }

  return data as T;
}

export async function loginRequest(
  username: string,
  password: string,
): Promise<LoginResult> {
  const result = await authFetch<LoginResult>(
    "/wp-json/jwt-auth/v1/token",
    {
      method: "POST",
      body: JSON.stringify({ username, password }),
    },
    { auth: false },
  );
  setAuthToken(result.token);
  return result;
}

export async function registerRequest(
  payload: RegisterPayload,
): Promise<RegisterResult> {
  return authFetch<RegisterResult>(
    "/wp-json/lilian/v1/auth/register",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    { auth: false },
  );
}

export async function validateToken(): Promise<boolean> {
  const token = getAuthToken();
  if (!token) return false;
  try {
    await authFetch("/wp-json/jwt-auth/v1/token/validate", {
      method: "POST",
    });
    return true;
  } catch {
    setAuthToken(null);
    return false;
  }
}

export async function fetchProfile(): Promise<AuthUser> {
  return authFetch<AuthUser>("/wp-json/lilian/v1/me");
}

export async function updateProfile(
  payload: ProfileUpdatePayload,
): Promise<AuthUser> {
  return authFetch<AuthUser>("/wp-json/lilian/v1/me", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchMyOrders(): Promise<CustomerOrder[]> {
  return authFetch<CustomerOrder[]>("/wp-json/lilian/v1/me/orders");
}

export function logoutRequest(): void {
  setAuthToken(null);
}
