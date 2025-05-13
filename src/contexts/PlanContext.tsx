"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { Plan, getActivePlans } from "@/services/api/planService";

interface PlanContextType {
  plans: Plan[];
  isLoading: boolean;
  error: string | null;
  refreshPlans: () => Promise<void>;
  getPlanByType: (type: "basic" | "premium" | "vip") => Plan | undefined;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

// Mapeamento de tipos de plano para nomes que podem aparecer na API
const planTypeToName: Record<string, string[]> = {
  basic: ["básico", "basico", "basic", "gratuito", "free"],
  premium: ["premium", "intermediário", "intermediario"],
  vip: ["vip", "avançado", "avancado", "pro", "professional"],
};

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para carregar os planos da API
  const fetchPlans = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Tentar carregar da API
      const activePlans = await getActivePlans();

      if (activePlans && activePlans.length > 0) {
        setPlans(activePlans);
      } else {
        // Se não houver planos ou ocorrer um erro, carregar os planos padrão
        loadDefaultPlans();
      }
    } catch (err) {
      console.error("Erro ao carregar planos:", err);
      setError("Não foi possível carregar os planos. Usando planos padrão.");

      // Carregar planos padrão em caso de erro
      loadDefaultPlans();
    } finally {
      setIsLoading(false);
    }
  };

  // Função para carregar planos padrão (fallback)
  const loadDefaultPlans = () => {
    // Planos padrão para usar quando a API estiver indisponível
    const defaultPlans: Plan[] = [
      {
        id: "basic_default",
        createdAt: new Date().toISOString(),
        name: "Básico",
        description: "Para quem está começando a explorar.",
        price: 0,
        billingCycle: "monthly",
        maxConversationLimit: 5,
        hasVoiceCalls: false,
        hasVideoCalls: false,
        isActive: true,
        listOfExclusiveContent: 0,
      },
      {
        id: "premium_default",
        createdAt: new Date().toISOString(),
        name: "Premium",
        description: "Para quem deseja uma experiência mais completa.",
        price: 29.9,
        billingCycle: "monthly",
        maxConversationLimit: 0, // ilimitado
        hasVoiceCalls: true,
        hasVideoCalls: false,
        isActive: true,
        listOfExclusiveContent: 5,
      },
      {
        id: "vip_default",
        createdAt: new Date().toISOString(),
        name: "VIP",
        description: "A experiência definitiva para conexões profundas.",
        price: 49.9,
        billingCycle: "monthly",
        maxConversationLimit: 0, // ilimitado
        hasVoiceCalls: true,
        hasVideoCalls: true,
        isActive: true,
        listOfExclusiveContent: 15,
      },
    ];

    setPlans(defaultPlans);
  };

  // Função para obter um plano pelo seu tipo ("basic", "premium", "vip")
  const getPlanByType = (
    type: "basic" | "premium" | "vip"
  ): Plan | undefined => {
    const matchingNames = planTypeToName[type] || [];

    return plans.find((plan) =>
      matchingNames.some((name) =>
        plan.name.toLowerCase().includes(name.toLowerCase())
      )
    );
  };

  // Função para recarregar os planos
  const refreshPlans = async () => {
    await fetchPlans();
  };

  // Carregar planos quando o componente montar
  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <PlanContext.Provider
      value={{
        plans,
        isLoading,
        error,
        refreshPlans,
        getPlanByType,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlans() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error("usePlans deve ser usado dentro de um PlanProvider");
  }
  return context;
}
