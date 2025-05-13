"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import PaymentForm from "@/components/payment/PaymentForm";
import { Plan } from "@/services/api/planService";

interface PriceCardProps {
  plan: Plan;
  isPopular?: boolean;
  buttonText?: string;
  buttonColor?: string;
}

export default function PriceCard({
  plan,
  isPopular = false,
  buttonText,
  buttonColor = "bg-pink-500 hover:bg-pink-600",
}: PriceCardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Se o plano não estiver disponível, renderizar um placeholder ou retornar null
  if (!plan) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center">
        <p className="text-gray-400">Carregando informações do plano...</p>
      </div>
    );
  }

  // Configurar o texto do botão baseado no preço do plano
  const defaultButtonText =
    plan.price === 0 ? "Começar Grátis" : `Escolher ${plan.name}`;

  const finalButtonText = buttonText || defaultButtonText;

  // Variantes de animação para o card
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    hover: {
      y: -10,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Variantes para os itens dentro do card
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  // Variantes para o badge de popular
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        yoyo: Infinity,
        duration: 0.8,
      },
    },
  };

  // Variante para o botão
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  // Mapeamento do nome do plano para o tipo de plano
  const getPlanType = (planName: string): "basic" | "premium" | "vip" => {
    const planType = planName.toLowerCase();
    if (
      planType.includes("básico") ||
      planType.includes("basico") ||
      planType.includes("free") ||
      planType.includes("gratuito")
    ) {
      return "basic";
    } else if (planType.includes("premium")) {
      return "premium";
    } else {
      return "vip";
    }
  };

  // Função para lidar com o clique no botão
  const handleButtonClick = () => {
    // Identificar qual plano foi selecionado com base no nome
    const planType = getPlanType(plan.name);

    // Se o usuário já estiver logado, mostrar o formulário de pagamento
    if (user) {
      setShowPaymentForm(true);
      return;
    }

    // Para usuários não logados, salvar a seleção e redirecionar para o cadastro
    localStorage.setItem("selectedPlan", planType);
    localStorage.setItem("selectedPlanId", plan.id);
    router.push("/register");
  };

  // Gerar lista de recursos com base nas propriedades do plano
  const generateFeatures = () => {
    const features = [];

    // Limite de conversas
    if (plan.maxConversationLimit === 0) {
      features.push("Conversas ilimitadas");
    } else {
      features.push(`${plan.maxConversationLimit} conversas por dia`);
    }

    // Chamadas de voz/vídeo
    if (plan.hasVoiceCalls && plan.hasVideoCalls) {
      features.push("Chamadas de voz e vídeo");
    } else if (plan.hasVoiceCalls) {
      features.push("Chamadas de voz");
    }

    // Conteúdo exclusivo
    if (plan.listOfExclusiveContent > 0) {
      features.push(`${plan.listOfExclusiveContent} conteúdos exclusivos`);
    }

    // Outros recursos
    if (plan.price > 0) {
      features.push("Sem anúncios");
      features.push("Personalização avançada");
    }

    return features;
  };

  // Formato de preço
  const formattedPrice =
    plan.price === 0 ? "Grátis" : `R$ ${plan.price.toFixed(2)}`;

  const features = generateFeatures();

  if (showPaymentForm && user) {
    return (
      <PaymentForm
        userId={user.id}
        selectedPlan={getPlanType(plan.name)}
        onCancel={() => setShowPaymentForm(false)}
      />
    );
  }

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-md overflow-hidden relative ${
        isPopular ? "border-2 border-pink-400" : ""
      } flex flex-col h-full`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
    >
      {isPopular && (
        <motion.div
          className="absolute top-0 right-0 bg-pink-500 text-white text-xs font-medium px-3 py-1 rounded-bl-lg"
          variants={badgeVariants}
          whileHover="hover"
        >
          Mais Popular
        </motion.div>
      )}

      <motion.div className="p-8 flex flex-col flex-grow">
        <motion.h3
          className="text-lg font-semibold text-gray-800 mb-1"
          variants={itemVariants}
        >
          {plan.name}
        </motion.h3>

        <motion.div
          className="flex items-baseline mt-2 mb-4"
          variants={itemVariants}
        >
          <motion.span
            className="text-3xl font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                delay: 0.2,
                type: "spring",
                stiffness: 300,
              },
            }}
          >
            {formattedPrice}
          </motion.span>
          {plan.price !== 0 && (
            <span className="text-gray-500 text-sm ml-1">
              {plan.billingCycle === "monthly"
                ? "/mês"
                : plan.billingCycle === "yearly"
                ? "/ano"
                : plan.billingCycle === "weekly"
                ? "/semana"
                : ""}
            </span>
          )}
        </motion.div>

        <motion.p
          className="text-gray-600 text-sm mb-6"
          variants={itemVariants}
        >
          {plan.description}
        </motion.p>

        <motion.div className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start"
              variants={itemVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 0.3 + index * 0.1,
              }}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                stroke="currentColor"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  transition: {
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  },
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </motion.svg>
              <span className="text-sm text-gray-600">{feature}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className={`w-full py-3 rounded-full text-white font-medium ${buttonColor} mt-auto`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleButtonClick}
        >
          {finalButtonText}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
