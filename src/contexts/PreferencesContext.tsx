"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Preference,
  getUserPreferences,
  setUserPreferences,
  updateUserPreferences,
} from "@/services/api/preferencesService";

// Definição das categorias possíveis para preferências
export type PreferenceCategory =
  | "interface"
  | "notification"
  | "privacy"
  | "theme"
  | "language";

// Interface para gerenciar as preferências no contexto
interface PreferencesContextType {
  preferences: Preference | null;
  isLoading: boolean;
  error: string | null;
  getPreferenceValue: (
    category: PreferenceCategory,
    name: string
  ) => string | null;
  setPreference: (
    category: PreferenceCategory,
    name: string,
    value: string
  ) => Promise<boolean>;
  savePreferences: () => Promise<boolean>;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined
);

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated } = useAuth();
  const [preferences, setPreferences] = useState<Preference | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Carregar preferências do usuário quando autenticado
  useEffect(() => {
    const loadPreferences = async () => {
      if (!isAuthenticated) {
        setPreferences(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const userPrefs = await getUserPreferences();

        if (userPrefs && userPrefs.length > 0) {
          setPreferences(userPrefs[0]);
        } else {
          // Criar objeto de preferências vazio se não existir
          setPreferences({
            preferences: [],
          });
        }
      } catch (err) {
        console.error("Erro ao carregar preferências:", err);
        setError(
          "Não foi possível carregar suas preferências. Por favor, tente novamente mais tarde."
        );

        // Definir preferências padrão em caso de erro
        setPreferences({
          preferences: [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, [isAuthenticated]);

  // Função para obter o valor de uma preferência específica
  const getPreferenceValue = (
    category: PreferenceCategory,
    name: string
  ): string | null => {
    if (!preferences) return null;

    const preference = preferences.preferences.find(
      (pref) => pref.category === category && pref.name === name
    );

    return preference ? preference.value : null;
  };

  // Função para definir uma preferência
  const setPreference = async (
    category: PreferenceCategory,
    name: string,
    value: string
  ): Promise<boolean> => {
    if (!preferences) return false;

    // Verificar se a preferência já existe
    const existingIndex = preferences.preferences.findIndex(
      (pref) => pref.category === category && pref.name === name
    );

    // Criar cópia das preferências atuais
    const updatedPreferences = { ...preferences };

    if (existingIndex >= 0) {
      // Atualizar preferência existente
      updatedPreferences.preferences[existingIndex].value = value;
    } else {
      // Adicionar nova preferência
      updatedPreferences.preferences.push({
        name,
        category,
        value,
      });
    }

    // Atualizar estado
    setPreferences(updatedPreferences);
    setHasChanges(true);

    return true;
  };

  // Função para salvar as alterações nas preferências
  const savePreferences = async (): Promise<boolean> => {
    if (!preferences || !hasChanges) return true;

    setIsLoading(true);
    setError(null);

    try {
      if (preferences.id) {
        // Atualizar preferências existentes
        await updateUserPreferences(preferences);
      } else {
        // Criar novas preferências
        const newPrefs = await setUserPreferences(preferences);
        setPreferences(newPrefs);
      }

      setHasChanges(false);
      return true;
    } catch (err) {
      console.error("Erro ao salvar preferências:", err);
      setError(
        "Não foi possível salvar suas preferências. Por favor, tente novamente mais tarde."
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Salvar automaticamente quando o usuário deslogar
  useEffect(() => {
    return () => {
      if (hasChanges) {
        savePreferences();
      }
    };
  }, [hasChanges]);

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        isLoading,
        error,
        getPreferenceValue,
        setPreference,
        savePreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error(
      "usePreferences deve ser usado dentro de um PreferencesProvider"
    );
  }
  return context;
}
