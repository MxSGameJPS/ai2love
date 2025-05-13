"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as authService from "@/services/api/authService";
import * as paymentService from "@/services/api/paymentService";

type PlanType = "basic" | "premium" | "vip" | null;

// Interface para o perfil emocional
interface EmotionalProfile {
  personalityTraits: string[];
  interests: string[];
  companionshipGoals: string[];
  communicationStyle: string;
  emotionalNeeds: string[];
  idealPartnerTraits: string[];
  dealBreakers: string[];
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  plan?: PlanType;
  emotionalProfile?: EmotionalProfile;
}

interface ProfileUpdateData {
  name?: string;
  email?: string;
  emotionalProfile?: EmotionalProfile;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string,
    cpf: string,
    acceptedTermsAndConditions: boolean,
    birthdate: string
  ) => Promise<{ success: boolean; userId?: string }>;
  selectPlan: (userId: string, plan: PlanType) => Promise<boolean>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  updateUserProfile: (data: ProfileUpdateData) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  // Login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Credenciais de teste para desenvolvimento
      const TEST_EMAIL = "teste@email.com";
      const TEST_PASSWORD = "Teste@123";

      // Verificar se são as credenciais de teste
      if (email === TEST_EMAIL && password === TEST_PASSWORD) {
        const testUser: User = {
          id: "test123",
          name: "Usuário de Teste",
          email: TEST_EMAIL,
          emailVerified: true,
          plan: "premium",
          emotionalProfile: {
            personalityTraits: ["Empático", "Criativo", "Introvertido"],
            interests: ["Literatura", "Música", "Tecnologia", "Filosofia"],
            companionshipGoals: ["Conversas profundas", "Crescimento pessoal"],
            communicationStyle: "Reflexivo e profundo",
            emotionalNeeds: ["Escuta ativa", "Compreensão sem julgamentos"],
            idealPartnerTraits: ["Inteligente", "Empático", "Calmo"],
            dealBreakers: ["Negatividade constante", "Falta de empatia"],
          },
        };

        const testToken = "jwt-token-test";

        // Salvar dados no localStorage
        localStorage.setItem("authToken", testToken);
        localStorage.setItem("user", JSON.stringify(testUser));

        // Atualizar estado
        setUser(testUser);
        setToken(testToken);

        return true;
      }

      // Chamada para a API real
      try {
        const response = await authService.login(email, password);

        if (response && response.token) {
          const apiUser: User = {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            emailVerified: response.user.emailVerified || false,
            plan: response.user.plan as PlanType,
            emotionalProfile: response.user
              .emotionalProfile as EmotionalProfile,
          };

          // Salvar dados no localStorage
          localStorage.setItem("authToken", response.token);
          localStorage.setItem("user", JSON.stringify(apiUser));

          // Atualizar estado
          setUser(apiUser);
          setToken(response.token);

          return true;
        }

        return false;
      } catch (error) {
        console.error("Erro na chamada da API de login:", error);

        // Fallback para modo de desenvolvimento
        if (process.env.NODE_ENV === "development") {
          console.log("Usando login simulado para ambiente de desenvolvimento");

          // Simulando um login bem-sucedido
          const mockUser: User = {
            id: "user123",
            name: "Usuário Teste",
            email: email,
            emailVerified: true,
            plan: "basic",
            emotionalProfile: {
              personalityTraits: [],
              interests: [],
              companionshipGoals: [],
              communicationStyle: "",
              emotionalNeeds: [],
              idealPartnerTraits: [],
              dealBreakers: [],
            },
          };

          const mockToken = "jwt-token-example";

          // Salvar dados no localStorage
          localStorage.setItem("authToken", mockToken);
          localStorage.setItem("user", JSON.stringify(mockUser));

          // Atualizar estado
          setUser(mockUser);
          setToken(mockToken);

          return true;
        }

        return false;
      }
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar perfil do usuário
  const updateUserProfile = async (
    data: ProfileUpdateData
  ): Promise<boolean> => {
    try {
      setIsLoading(true);

      if (!user) {
        return false;
      }

      // TODO: Implementar chamada para a API real
      // const response = await api.put(`/api/users/${user.id}`, data);

      // Por enquanto, simulação de chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Atualizar os dados do usuário
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return true;
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Registro - primeira etapa
  const register = async (
    name: string,
    email: string,
    password: string,
    cpf: string,
    acceptedTermsAndConditions: boolean,
    birthdate: string
  ): Promise<{ success: boolean; userId?: string }> => {
    try {
      setIsLoading(true);

      // Chamada para a API real
      try {
        const response = await authService.register(
          name,
          email,
          password,
          cpf,
          acceptedTermsAndConditions,
          birthdate
        );

        if (response.success) {
          // Salvar temporariamente os dados para usar depois
          localStorage.setItem("tempUserName", name);
          localStorage.setItem("tempUserEmail", email);

          return {
            success: true,
            userId: response.userId,
          };
        }

        return { success: false };
      } catch (error) {
        console.error("Erro na chamada da API de registro:", error);

        // Fallback para modo de desenvolvimento
        if (process.env.NODE_ENV === "development") {
          console.log(
            "Usando registro simulado para ambiente de desenvolvimento"
          );

          // Salvar temporariamente os dados para usar depois
          localStorage.setItem("tempUserName", name);
          localStorage.setItem("tempUserEmail", email);

          // Simulando um registro bem-sucedido
          const tempUserId = "newuser" + Date.now();

          return { success: true, userId: tempUserId };
        }

        return { success: false };
      }
    } catch (error) {
      console.error("Erro no registro:", error);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  // Seleção de plano - segunda etapa do registro
  const selectPlan = async (
    userId: string,
    plan: PlanType
  ): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Obter o ID do plano salvo no localStorage ou usar o mapeamento padrão
      const storedPlanId = localStorage.getItem("selectedPlanId");

      // Mapeamento de planos para IDs (caso não tenha ID armazenado)
      const planIds: Record<string, string> = {
        basic: "plan_basic_001",
        premium: "plan_premium_001",
        vip: "plan_vip_001",
      };

      // Usar o ID armazenado ou o ID do mapeamento
      const planId = storedPlanId || planIds[plan as keyof typeof planIds];

      // Limpar o ID do plano armazenado após uso
      localStorage.removeItem("selectedPlanId");

      // Chamada para a API de pagamento
      try {
        const paymentResponse = await paymentService.createPayment(
          userId,
          planId
        );

        if (paymentResponse.success) {
          // Após o pagamento bem-sucedido, ativar o plano do usuário
          const response = await authService.selectPlan(userId, plan as string);

          if (response.success) {
            const mockUser: User = {
              id: userId,
              name: localStorage.getItem("tempUserName") || "Novo Usuário",
              email:
                localStorage.getItem("tempUserEmail") || "email@exemplo.com",
              emailVerified: false,
              plan: plan,
              emotionalProfile: {
                personalityTraits: [],
                interests: [],
                companionshipGoals: [],
                communicationStyle: "",
                emotionalNeeds: [],
                idealPartnerTraits: [],
                dealBreakers: [],
              },
            };

            const mockToken = "jwt-token-example";

            localStorage.setItem("authToken", mockToken);
            localStorage.setItem("user", JSON.stringify(mockUser));

            setUser(mockUser);
            setToken(mockToken);

            return true;
          }

          return false;
        }

        return false;
      } catch (error) {
        console.error("Erro na chamada da API de pagamento:", error);

        // Fallback para modo de desenvolvimento
        if (process.env.NODE_ENV === "development") {
          console.log(
            "Usando pagamento simulado para ambiente de desenvolvimento"
          );

          // Simular ativação de plano bem-sucedida
          const mockUser: User = {
            id: userId,
            name: localStorage.getItem("tempUserName") || "Novo Usuário",
            email: localStorage.getItem("tempUserEmail") || "email@exemplo.com",
            emailVerified: false,
            plan: plan,
            emotionalProfile: {
              personalityTraits: [],
              interests: [],
              companionshipGoals: [],
              communicationStyle: "",
              emotionalNeeds: [],
              idealPartnerTraits: [],
              dealBreakers: [],
            },
          };

          const mockToken = "jwt-token-example";

          localStorage.setItem("authToken", mockToken);
          localStorage.setItem("user", JSON.stringify(mockUser));

          setUser(mockUser);
          setToken(mockToken);

          return true;
        }

        return false;
      }
    } catch (error) {
      console.error("Erro na seleção de plano:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  // Recuperação de senha
  const requestPasswordReset = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      try {
        const response = await authService.requestPasswordReset(email);
        return response.success;
      } catch (error) {
        console.error("Erro na chamada da API de recuperação de senha:", error);

        // Simulação para desenvolvimento
        if (process.env.NODE_ENV === "development") {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return true;
        }

        return false;
      }
    } catch (error) {
      console.error("Erro na solicitação de recuperação de senha:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Verificação de email
  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      try {
        const response = await authService.verifyEmail(token);

        if (response.success) {
          // Se tivermos um usuário já logado, atualizamos o status de verificação de email
          if (user) {
            const updatedUser = { ...user, emailVerified: true };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }

          return true;
        }

        return false;
      } catch (error) {
        console.error("Erro na chamada da API de verificação de email:", error);

        // Simulação para desenvolvimento
        if (process.env.NODE_ENV === "development") {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          if (user) {
            const updatedUser = { ...user, emailVerified: true };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }

          return true;
        }

        return false;
      }
    } catch (error) {
      console.error("Erro na verificação de email:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        selectPlan,
        logout,
        requestPasswordReset,
        verifyEmail,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
