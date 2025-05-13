"use client";

import { fetchApi } from "./index";

export interface Preference {
  id?: string;
  createdAt?: string;
  preferences: {
    id?: string;
    name: string;
    category: string;
    value: string;
  }[];
}

// Obter todas as preferências disponíveis
export const getAllPreferences = async (): Promise<Preference[]> => {
  return fetchApi<Preference[]>("/api/v1/preferences", {
    method: "GET",
  });
};

// Obter preferências de um usuário específico
export const getUserPreferences = async () => {
  return fetchApi("/api/v1/user/preferences");
};

// Definir preferências para um usuário
export const setUserPreferences = async (
  preferences: Preference
): Promise<Preference> => {
  return fetchApi<Preference>("/api/v1/preferences", {
    method: "POST",
    body: JSON.stringify(preferences),
  });
};

// Atualizar preferências de um usuário
export const updateUserPreferences = async (preferences: any) => {
  return fetchApi("/api/v1/user/preferences", {
    method: "PATCH",
    body: JSON.stringify(preferences),
  });
};

// Resetar as preferências do usuário para os valores padrão
export const resetUserPreferences = async () => {
  return fetchApi("/api/v1/user/preferences/reset", {
    method: "POST",
  });
};
