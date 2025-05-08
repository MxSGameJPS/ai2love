"use client";

import PriceCard from "../cards/PriceCard";
import { motion } from "framer-motion";

export default function Plans() {
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
        </motion.div>

        {/* Cards de planos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Plano Básico */}
          <PriceCard
            title="Básico"
            price="Grátis"
            description="Para quem está começando a explorar."
            isPopular={false}
            features={[
              "Acesso a 3 IAs básicas",
              "5 conversas por dia",
              "Personalização limitada",
              "Suporte por email",
            ]}
            buttonText="Começar Grátis"
            buttonColor="bg-indigo-600 hover:bg-indigo-700"
          />

          {/* Plano Premium */}
          <PriceCard
            title="Premium"
            price="R$29,90"
            description="Para quem deseja uma experiência mais completa."
            isPopular={true}
            features={[
              "Acesso a todas as IAs",
              "Conversas ilimitadas",
              "Personalização avançada",
              "Suporte prioritário",
              "Sem anúncios",
            ]}
            buttonText="Escolher Premium"
            buttonColor="bg-pink-500 hover:bg-pink-600"
          />

          {/* Plano VIP */}
          <PriceCard
            title="VIP"
            price="R$49,90"
            description="A experiência definitiva para conexões profundas."
            isPopular={false}
            features={[
              "Todos os benefícios Premium",
              "IAs exclusivas VIP",
              "Personalização total",
              "Recursos experimentais",
              "Atendimento 24/7",
            ]}
            buttonText="Escolher VIP"
            buttonColor="bg-indigo-600 hover:bg-indigo-700"
          />
        </motion.div>
      </div>
    </section>
  );
}
