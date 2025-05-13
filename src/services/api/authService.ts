"use client";

import { fetchApi } from "./index";

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    plan?: string;
    emotionalProfile?: any;
  };
}

export interface RegisterResponse {
  success: boolean;
  userId?: string;
  message?: string;
}

export interface EmailVerificationResponse {
  success: boolean;
  message?: string;
}

export interface PasswordResetResponse {
  success: boolean;
  message?: string;
}

// Login
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  return fetchApi<LoginResponse>("/api/v1/user/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

// Registro
export const register = async (
  name: string,
  email: string,
  password: string,
  cpf: string,
  acceptedTermsAndConditions: boolean,
  birthdate: string
): Promise<RegisterResponse> => {
  return fetchApi<RegisterResponse>("/api/v1/user/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      cpf,
      acceptedTermsAndConditions,
      birthdate,
    }),
  });
};

// Verificação de email
export const verifyEmail = async (
  token: string
): Promise<EmailVerificationResponse> => {
  return fetchApi<EmailVerificationResponse>(
    `/api/v1/user/verify-email/${token}`,
    {
      method: "POST",
    }
  );
};

// Recuperação de senha
export const requestPasswordReset = async (
  email: string
): Promise<PasswordResetResponse> => {
  return fetchApi<PasswordResetResponse>("/api/v1/user/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

// Redefinição de senha
export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<PasswordResetResponse> => {
  return fetchApi<PasswordResetResponse>(
    `/api/v1/user/reset-password/${token}`,
    {
      method: "POST",
      body: JSON.stringify({ password: newPassword }),
    }
  );
};

// Seleção de plano (parte do processo de registro)
export const selectPlan = async (
  userId: string,
  plan: string
): Promise<RegisterResponse> => {
  return fetchApi<RegisterResponse>(`/api/v1/user/select-plan`, {
    method: "POST",
    body: JSON.stringify({ userId, plan }),
  });
};
