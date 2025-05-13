"use client";

import { fetchApi } from "./index";

export interface Partner {
  id: string;
  name: string;
  avatar: string;
  description: string;
  tags: string[];
  personality: string;
  isOnline: boolean;
  isPremium: boolean;
  interests: string[];
  compatibility?: number;
}

export interface PartnerResponse {
  success: boolean;
  partners: Partner[];
  message?: string;
}

export interface PartnerDetailsResponse {
  success: boolean;
  partner: Partner;
  message?: string;
}

// Obter todos os parceiros disponíveis
export const getAvailablePartners = async (): Promise<Partner[]> => {
  const response = await fetchApi<PartnerResponse>("/api/v1/partner", {
    method: "GET",
  });

  if (response.success) {
    return response.partners;
  }

  return [];
};

// Obter detalhes de um parceiro específico
export const getPartnerById = async (
  partnerId: string
): Promise<Partner | null> => {
  const response = await fetchApi<PartnerDetailsResponse>(
    `/api/v1/partner/${partnerId}`,
    {
      method: "GET",
    }
  );

  if (response.success) {
    return response.partner;
  }

  return null;
};

// Buscar histórico de mensagens com um parceiro
export const getMessageHistory = async (
  partnerId: string,
  page: number = 1,
  limit: number = 20
): Promise<any> => {
  return fetchApi(`/api/v1/chat/${partnerId}/history`, {
    method: "GET",
    headers: {
      "X-Page": page.toString(),
      "X-Limit": limit.toString(),
    },
  });
};

// Enviar mensagem para um parceiro
export const sendMessage = async (
  partnerId: string,
  message: string
): Promise<any> => {
  return fetchApi(`/api/v1/chat/${partnerId}/message`, {
    method: "POST",
    body: JSON.stringify({ message }),
  });
};

// Calcular compatibilidade com um parceiro (opcional)
export const calculateCompatibility = async (
  partnerId: string
): Promise<number> => {
  const response = await fetchApi<{ score: number }>(
    `/api/v1/partner/${partnerId}/compatibility`,
    {
      method: "GET",
    }
  );

  return response.score;
};
