"use client";

import { fetchApi } from "./index";

export interface Plan {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  price: number;
  billingCycle: string;
  maxConversationLimit: number;
  hasVoiceCalls: boolean;
  hasVideoCalls: boolean;
  isActive: boolean;
  listOfExclusiveContent: number;
}

// Obter todos os planos ativos
export const getActivePlans = async (): Promise<Plan[]> => {
  return fetchApi<Plan[]>("/api/v1/plan", {
    method: "GET",
  });
};

// Criar um novo plano (para uso administrativo)
export const createPlan = async (
  planData: Omit<Plan, "id" | "createdAt">
): Promise<Plan> => {
  return fetchApi<Plan>("/api/v1/plan", {
    method: "POST",
    body: JSON.stringify(planData),
  });
};

// Obter um plano específico por ID
export const getPlanById = async (planId: string): Promise<Plan> => {
  return fetchApi<Plan>(`/api/v1/plan/${planId}`, {
    method: "GET",
  });
};

// Obter todos os planos disponíveis (para testes)
export const getAvailablePlans = async () => {
  return fetchApi("/api/v1/plans");
};

// Obter o plano atual do usuário
export const getUserPlan = async () => {
  return fetchApi("/api/v1/user/plan");
};

// Selecionar um plano
export const selectPlan = async (planId: string) => {
  return fetchApi("/api/v1/user/select-plan", {
    method: "POST",
    body: JSON.stringify({ planId }),
  });
};
