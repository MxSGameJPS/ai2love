"use client";

import PriceCard from "../cards/PriceCard";
import { motion } from "framer-motion";
import { usePlans } from "@/contexts/PlanContext";

export default function Plans() {
  const { plans, isLoading, error } = usePlans();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

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

  // Planos estáticos de fallback caso a API esteja indisponível ou o carregamento ainda não tenha ocorrido
  const staticPlans = [
    {
      id: "basic_static",
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
      id: "premium_static",
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
      id: "vip_static",
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

  // Use planos da API se disponíveis, caso contrário use os estáticos
  const displayPlans = plans.length > 0 ? plans : staticPlans;

  return (
    <section
      className="py-20 px-6 w-full"
      style={{ backgroundColor: "#f5f7fa" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Título e subtítulo */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Planos para Todos os Tipos de Relação
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Escolha o plano ideal para suas necessidades e comece a se conectar
            com nossas IAs.
          </p>

          {error && (
            <p className="mt-4 text-sm text-pink-600 bg-pink-50 p-2 rounded inline-block">
              {error}
            </p>
          )}
        </motion.div>

        {/* Cards de planos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {isLoading ? (
            // Mostrar indicador de carregamento
            <div className="col-span-3 flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            // Renderizar os planos
            displayPlans.map((plan, index) => (
              <PriceCard
                key={plan.id}
                plan={plan}
                isPopular={index === 1} // Normalmente o plano Premium é o mais popular
                buttonColor={
                  index === 1
                    ? "bg-pink-500 hover:bg-pink-600"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }
              />
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
