"use client";

import { fetchApi } from "./index";

export interface PaymentRequest {
  userId: string;
  planId: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  status?: string;
  message?: string;
}

// Criar nova transação de pagamento
export const createPayment = async (
  userId: string,
  planId: string
): Promise<PaymentResponse> => {
  return fetchApi<PaymentResponse>("/api/v1/payment", {
    method: "POST",
    body: JSON.stringify({ userId, planId }),
  });
};

// Verificar status de uma transação
export const checkPaymentStatus = async (
  transactionId: string
): Promise<PaymentResponse> => {
  return fetchApi<PaymentResponse>(`/api/v1/payment/${transactionId}`, {
    method: "GET",
  });
};

// Criar uma sessão de pagamento (Stripe/outros)
export const createPaymentSession = async (planId: string) => {
  return fetchApi("/api/v1/payment/create-session", {
    method: "POST",
    body: JSON.stringify({ planId }),
  });
};

// Obter status de uma sessão de pagamento
export const getPaymentStatus = async (sessionId: string) => {
  return fetchApi(`/api/v1/payment/status/${sessionId}`);
};

// Obter histórico de pagamentos do usuário
export const getPaymentHistory = async () => {
  return fetchApi("/api/v1/payment/history");
};
