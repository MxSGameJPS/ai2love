"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePlans } from "@/contexts/PlanContext";
import { useRouter } from "next/navigation";

interface PaymentFormProps {
  userId: string;
  selectedPlan: "basic" | "premium" | "vip";
  onCancel: () => void;
}

export default function PaymentForm({
  userId,
  selectedPlan,
  onCancel,
}: PaymentFormProps) {
  const { selectPlan } = useAuth();
  const { getPlanByType } = usePlans();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  // Obter o plano completo baseado no tipo
  const plan = getPlanByType(selectedPlan);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");

    try {
      // Verificar se o plano existe
      if (!plan) {
        setError("Plano não encontrado. Por favor, tente novamente.");
        return;
      }

      // Usar o ID do plano da API para o pagamento
      localStorage.setItem("selectedPlanId", plan.id);

      const success = await selectPlan(userId, selectedPlan);

      if (success) {
        // Redirecionar para o dashboard após o pagamento bem-sucedido
        router.push("/dashboard");
      } else {
        setError("Não foi possível processar o pagamento. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao processar pagamento:", err);
      setError(
        "Ocorreu um erro ao processar o pagamento. Tente novamente mais tarde."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Se não encontrar o plano, mostrar mensagem de erro
  if (!plan) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-red-500">
          Plano não encontrado
        </h2>
        <p className="mb-6">
          Não foi possível encontrar o plano selecionado. Por favor, escolha
          outro plano.
        </p>
        <button
          onClick={onCancel}
          className="w-full py-2 text-sm font-medium text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Voltar para planos
        </button>
      </div>
    );
  }

  // Informações do plano para exibir na tela
  const planInfo = {
    name: plan.name,
    price: plan.price === 0 ? "Grátis" : `R$ ${plan.price.toFixed(2)}`,
    billingCycle:
      plan.billingCycle === "monthly"
        ? "/mês"
        : plan.billingCycle === "yearly"
        ? "/ano"
        : plan.billingCycle === "weekly"
        ? "/semana"
        : "",
    features: [],
  };

  // Gerar lista de recursos com base nas propriedades do plano
  if (plan.maxConversationLimit === 0) {
    planInfo.features.push("Conversas ilimitadas");
  } else {
    planInfo.features.push(`${plan.maxConversationLimit} conversas por dia`);
  }

  if (plan.hasVoiceCalls && plan.hasVideoCalls) {
    planInfo.features.push("Chamadas de voz e vídeo");
  } else if (plan.hasVoiceCalls) {
    planInfo.features.push("Chamadas de voz");
  }

  if (plan.listOfExclusiveContent > 0) {
    planInfo.features.push(
      `${plan.listOfExclusiveContent} conteúdos exclusivos`
    );
  }

  if (plan.price > 0) {
    planInfo.features.push("Sem anúncios");
    planInfo.features.push("Personalização avançada");
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Finalizar Assinatura</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Plano {planInfo.name}</h3>
        <p className="text-lg text-pink-500 font-medium mb-2">
          {planInfo.price}
          {plan.price > 0 && (
            <span className="text-sm text-gray-500 ml-1">
              {planInfo.billingCycle}
            </span>
          )}
        </p>
        <ul className="mb-4">
          {planInfo.features.map((feature, index) => (
            <li key={index} className="flex items-center my-1">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-500 px-4 py-2 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Simulação de campos de pagamento */}
        <div>
          <label
            htmlFor="card-number"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Número do Cartão
          </label>
          <input
            type="text"
            id="card-number"
            placeholder="0000 0000 0000 0000"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="expiry"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Validade
            </label>
            <input
              type="text"
              id="expiry"
              placeholder="MM/AA"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label
              htmlFor="cvv"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              placeholder="123"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome no Cartão
          </label>
          <input
            type="text"
            id="name"
            placeholder="Nome completo"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="mt-6 flex space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="w-1/2 py-2 text-sm font-medium text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={isProcessing}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-1/2 py-2 text-sm font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600 disabled:bg-pink-300"
            disabled={isProcessing}
          >
            {isProcessing ? "Processando..." : "Confirmar Pagamento"}
          </button>
        </div>
      </form>
    </div>
  );
}
