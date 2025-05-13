"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import PriceCard from "@/components/cards/PriceCard";
import { useAuth } from "@/contexts/AuthContext";
import { usePlans } from "@/contexts/PlanContext";
import Link from "next/link";

export default function PlanosPage() {
  const { user } = useAuth();
  const { plans, isLoading, error } = usePlans();

  // Variantes de animação para o container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Variantes para título e descrição
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  // Mostrar animação de entrada ao carregar a página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título e subtítulo */}
        <motion.div
          className="text-center mb-16 mt-12"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <h1 className="text-xl font-bold text-center text-pink-500 mb-2">
            <span className="logo-gradient-ai">AI</span>
            <span className="logo-gradient-to">to</span>
            <span className="logo-gradient-love">Love</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Planos para Todos os Tipos de Relação
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Escolha o plano ideal para suas necessidades e comece a se conectar
            com nossas IAs. Cada plano foi pensado para oferecer uma experiência
            única e personalizada.
          </p>

          {error && (
            <p className="mt-4 text-sm text-pink-600 bg-pink-50 p-2 rounded inline-block">
              {error}
            </p>
          )}
        </motion.div>

        {/* Estado de carregamento */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          /* Cards de planos */
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {plans.map((plan, index) => (
              <PriceCard
                key={plan.id}
                plan={plan}
                isPopular={index === 1} // Geralmente o plano do meio é o mais popular
                buttonColor={
                  index === 1
                    ? "bg-pink-500 hover:bg-pink-600"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }
              />
            ))}
          </motion.div>
        )}

        {/* Comparação de planos detalhada */}
        <motion.div
          className="mt-24 bg-white p-8 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            Comparação Detalhada de Planos
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-4 pr-4">Recursos</th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className={`pb-4 px-4 text-center ${
                        plan.name.toLowerCase().includes("premium")
                          ? "text-pink-500"
                          : "text-indigo-600"
                      }`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4 pr-4 font-medium">
                    Parceiros de IA disponíveis
                  </td>
                  {plans.map((plan) => (
                    <td key={plan.id} className="py-4 px-4 text-center">
                      {plan.name.toLowerCase().includes("basic") ||
                      plan.price === 0
                        ? "3"
                        : plan.name.toLowerCase().includes("premium")
                        ? "12"
                        : "Todos"}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 pr-4 font-medium">Conversas diárias</td>
                  {plans.map((plan) => (
                    <td key={plan.id} className="py-4 px-4 text-center">
                      {plan.maxConversationLimit === 0
                        ? "Ilimitadas"
                        : `${plan.maxConversationLimit} por dia`}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 pr-4 font-medium">Personalização</td>
                  {plans.map((plan) => (
                    <td key={plan.id} className="py-4 px-4 text-center">
                      {plan.name.toLowerCase().includes("basic") ||
                      plan.price === 0
                        ? "Básica"
                        : plan.name.toLowerCase().includes("premium")
                        ? "Avançada"
                        : "Completa"}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 pr-4 font-medium">Anúncios</td>
                  {plans.map((plan) => (
                    <td key={plan.id} className="py-4 px-4 text-center">
                      {plan.price === 0 ? "Sim" : "Não"}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 pr-4 font-medium">Suporte</td>
                  {plans.map((plan) => (
                    <td key={plan.id} className="py-4 px-4 text-center">
                      {plan.name.toLowerCase().includes("basic") ||
                      plan.price === 0
                        ? "Email"
                        : plan.name.toLowerCase().includes("premium")
                        ? "Prioritário"
                        : "24/7 VIP"}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 pr-4 font-medium">
                    Memória de conversas
                  </td>
                  {plans.map((plan) => (
                    <td key={plan.id} className="py-4 px-4 text-center">
                      {plan.name.toLowerCase().includes("basic") ||
                      plan.price === 0
                        ? "7 dias"
                        : plan.name.toLowerCase().includes("premium")
                        ? "1 ano"
                        : "Ilimitada"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium">Recursos exclusivos</td>
                  {plans.map((plan) => (
                    <td key={plan.id} className="py-4 px-4 text-center">
                      {plan.listOfExclusiveContent === 0
                        ? "-"
                        : plan.name.toLowerCase().includes("premium")
                        ? "Alguns"
                        : "Todos"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            Perguntas Frequentes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2">
                Posso mudar de plano depois?
              </h4>
              <p className="text-gray-600">
                Sim, você pode fazer upgrade ou downgrade do seu plano a
                qualquer momento através da sua página de perfil.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2">
                Como funciona o período de teste?
              </h4>
              <p className="text-gray-600">
                Novos usuários podem experimentar recursos premium gratuitamente
                por 7 dias antes de decidir qual plano escolher.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2">
                Posso cancelar a assinatura?
              </h4>
              <p className="text-gray-600">
                Sim, você pode cancelar sua assinatura a qualquer momento pela
                página de perfil, sem taxas adicionais.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2">
                Quais métodos de pagamento são aceitos?
              </h4>
              <p className="text-gray-600">
                Aceitamos cartões de crédito, débito, PayPal e PIX para todos os
                planos.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">
            Pronto para encontrar sua conexão ideal?
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Escolha o plano que melhor atende às suas necessidades e comece sua
            jornada no AI to Love hoje mesmo.
          </p>
          <Link href={user ? "/dashboard" : "/register"}>
            <button className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-full transition-colors shadow-md hover:shadow-lg">
              {user ? "Ir para o Dashboard" : "Criar Conta Agora"}
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
