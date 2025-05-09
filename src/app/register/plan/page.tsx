"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

// Tipo para planos
type PlanType = "basic" | "premium" | "vip";

interface PlanProps {
  type: PlanType;
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonColor: string;
  popular?: boolean;
}

const PlanCard = ({
  type,
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonColor,
  popular = false,
  onSelect,
  isLoading,
}: PlanProps & { onSelect: (plan: PlanType) => void; isLoading: boolean }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden relative ${
        popular ? "border-2 border-pink-400" : ""
      } flex flex-col h-full hover:shadow-lg transition-all duration-300`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-pink-500 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
          Mais Popular
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>

        <div className="flex items-baseline mt-2 mb-4">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Grátis" && (
            <span className="text-gray-500 text-sm ml-1">{period}</span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-6">{description}</p>

        <div className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => onSelect(type)}
          className={`w-full py-3 rounded-full text-white font-medium ${buttonColor} mt-auto ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Processando..." : buttonText}
        </button>
      </div>
    </div>
  );
};

// Componente principal envolto em Suspense
function PlanSelectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const { selectPlan } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      router.push("/register");
    }
  }, [userId, router]);

  const handleSelectPlan = async (plan: PlanType) => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const success = await selectPlan(userId, plan);

      if (success) {
        // Após selecionar o plano com sucesso, redirecionar para a verificação de email
        router.push("/verificar-email?status=pendente");
      } else {
        setError("Não foi possível selecionar o plano. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao selecionar plano:", err);
      setError("Ocorreu um erro ao selecionar o plano. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const plans: PlanProps[] = [
    {
      type: "basic",
      title: "Básico",
      price: "Grátis",
      period: "",
      description: "Para quem está começando a explorar.",
      buttonText: "Começar Grátis",
      buttonColor: "bg-indigo-600 hover:bg-indigo-700",
      features: [
        "Acesso a 3 IAs básicas",
        "5 conversas por dia",
        "Personalização limitada",
        "Suporte por email",
      ],
    },
    {
      type: "premium",
      title: "Premium",
      price: "R$29,90",
      period: "/mês",
      description: "Para quem deseja uma experiência mais completa.",
      buttonText: "Escolher Premium",
      buttonColor: "bg-pink-500 hover:bg-pink-600",
      popular: true,
      features: [
        "Acesso a todas as IAs",
        "Conversas ilimitadas",
        "Personalização avançada",
        "Suporte prioritário",
        "Sem anúncios",
      ],
    },
    {
      type: "vip",
      title: "VIP",
      price: "R$49,90",
      period: "/mês",
      description: "A experiência definitiva para conexões profundas.",
      buttonText: "Escolher VIP",
      buttonColor: "bg-indigo-600 hover:bg-indigo-700",
      features: [
        "Todos os benefícios Premium",
        "IAs exclusivas VIP",
        "Personalização total",
        "Recursos experimentais",
        "Atendimento 24/7",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Botão de voltar */}
        <Link
          href="/register"
          className="flex items-center text-gray-800 hover:text-pink-500 transition-colors mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
          <span className="text-sm">Voltar</span>
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-xl font-bold text-center text-pink-500 mb-2">
            <span className="logo-gradient-ai">AI</span>
            <span className="logo-gradient-to">to</span>
            <span className="logo-gradient-love">Love</span>
          </h1>
          <h2 className="text-3xl font-bold mb-4">Escolha seu plano</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Complete seu cadastro escolhendo o plano ideal para suas
            necessidades. Você pode alterar seu plano a qualquer momento após
            criar sua conta.
          </p>
        </div>

        {error && (
          <div className="mb-6 max-w-md mx-auto p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PlanCard
              key={plan.type}
              {...plan}
              onSelect={handleSelectPlan}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente pai que envolve com Suspense
export default function PlanSelectPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      }
    >
      <PlanSelectContent />
    </Suspense>
  );
}
