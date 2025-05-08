"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PriceCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  isPopular?: boolean;
  features: string[];
  buttonText: string;
  buttonColor: string;
}

export default function PriceCard({
  title,
  price,
  period = "/mês",
  description,
  isPopular = false,
  features,
  buttonText,
  buttonColor,
}: PriceCardProps) {
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
          {title}
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
            {price}
          </motion.span>
          {price !== "Grátis" && (
            <span className="text-gray-500 text-sm ml-1">{period}</span>
          )}
        </motion.div>

        <motion.p
          className="text-gray-600 text-sm mb-6"
          variants={itemVariants}
        >
          {description}
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
        >
          {buttonText}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
