"use client";

import React, {
  createContext,
  use,
  useEffect,
  useRef,
  useState,
  startTransition,
  type ReactNode,
} from "react";
import {
  fetchProfile,
  loginRequest,
  logoutRequest,
  registerRequest,
  updateProfile,
  validateToken,
  AuthApiError,
} from "../lib/authApi";
import { getAuthToken } from "../lib/tokenStorage";
import type {
  AuthUser,
  ProfileUpdatePayload,
  RegisterPayload,
} from "../types";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  authenticating: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  saveProfile: (payload: ProfileUpdatePayload) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bootstrapped = useRef(false);

  const refreshProfile = async () => {
    const profile = await fetchProfile();
    setUser(profile);
  };

  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;

    startTransition(() => {
      void (async () => {
        try {
          if (!getAuthToken()) {
            setUser(null);
            return;
          }
          const valid = await validateToken();
          if (!valid) {
            setUser(null);
            return;
          }
          await refreshProfile();
        } catch {
          logoutRequest();
          setUser(null);
        } finally {
          setLoading(false);
        }
      })();
    });
  }, []);

  const login = async (username: string, password: string) => {
    setAuthenticating(true);
    setError(null);
    try {
      await loginRequest(username, password);
      await refreshProfile();
    } catch (err) {
      setError(
        err instanceof AuthApiError
          ? err.message
          : "No pudimos iniciar sesión.",
      );
      throw err;
    } finally {
      setAuthenticating(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setAuthenticating(true);
    setError(null);
    try {
      await registerRequest(payload);
      await loginRequest(payload.email, payload.password);
      await refreshProfile();
    } catch (err) {
      setError(
        err instanceof AuthApiError
          ? err.message
          : "No pudimos crear la cuenta.",
      );
      throw err;
    } finally {
      setAuthenticating(false);
    }
  };

  const logout = () => {
    logoutRequest();
    setUser(null);
    setError(null);
  };

  const saveProfile = async (payload: ProfileUpdatePayload) => {
    setAuthenticating(true);
    setError(null);
    try {
      const next = await updateProfile(payload);
      setUser(next);
    } catch (err) {
      setError(
        err instanceof AuthApiError
          ? err.message
          : "No pudimos guardar el perfil.",
      );
      throw err;
    } finally {
      setAuthenticating(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authenticating,
        error,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
        refreshProfile,
        saveProfile,
        clearError: () => setError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return value;
}
