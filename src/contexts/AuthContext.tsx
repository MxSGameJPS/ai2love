"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

type PlanType = "basic" | "premium" | "vip" | null;

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  plan?: PlanType;
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
    password: string
  ) => Promise<{ success: boolean; userId?: string }>;
  selectPlan: (userId: string, plan: PlanType) => Promise<boolean>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
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
      const TEST_EMAIL = "teste@exemplo.com";
      const TEST_PASSWORD = "senha123";

      // Verificar se são as credenciais de teste
      if (email === TEST_EMAIL && password === TEST_PASSWORD) {
        const testUser: User = {
          id: "test123",
          name: "Usuário de Teste",
          email: TEST_EMAIL,
          emailVerified: true,
          plan: "premium",
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

      // Simulação de chamada de API para outras credenciais
      // Na implementação real, substitua por uma chamada fetch para sua API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulando um login bem-sucedido
      const mockUser: User = {
        id: "user123",
        name: "Usuário Teste",
        email: email,
        emailVerified: true,
        plan: "basic",
      };

      const mockToken = "jwt-token-example";

      // Salvar dados no localStorage
      localStorage.setItem("authToken", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));

      // Atualizar estado
      setUser(mockUser);
      setToken(mockToken);

      return true;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Registro - primeira etapa
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; userId?: string }> => {
    try {
      setIsLoading(true);

      // Simulação de chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulando um registro bem-sucedido (sem token e usuário completo ainda)
      // Agora retornamos apenas um ID temporário para usar na seleção de plano
      const tempUserId = "newuser" + Date.now();

      // Aqui não salvamos nada no localStorage ainda, pois primeiro o usuário precisa escolher um plano

      return { success: true, userId: tempUserId };
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

      // Simulação de chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Agora sim criamos o usuário completo com o plano escolhido
      const mockUser: User = {
        id: userId,
        name: localStorage.getItem("tempUserName") || "Novo Usuário",
        email: localStorage.getItem("tempUserEmail") || "email@exemplo.com",
        emailVerified: false,
        plan: plan,
      };

      const mockToken = "jwt-token-example";

      // Salvar dados no localStorage
      localStorage.setItem("authToken", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));

      // Remover dados temporários
      localStorage.removeItem("tempUserName");
      localStorage.removeItem("tempUserEmail");

      // Atualizar estado
      setUser(mockUser);
      setToken(mockToken);

      return true;
    } catch (error) {
      console.error("Erro na seleção de plano:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    router.push("/login");
  };

  // Recuperação de senha
  const requestPasswordReset = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Simulação de chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Em uma implementação real, a API enviaria um email de recuperação
      return true;
    } catch (error) {
      console.error("Erro na recuperação de senha:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Verificação de email
  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Simulação de chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Em uma implementação real, você verificaria o token na API
      // e atualizaria o status de verificação do usuário

      if (user) {
        const updatedUser = { ...user, emailVerified: true };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      return true;
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
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        selectPlan,
        logout,
        requestPasswordReset,
        verifyEmail,
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
