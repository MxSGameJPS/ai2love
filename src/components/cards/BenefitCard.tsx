"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BenefitCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function BenefitCard({
  icon,
  title,
  description,
}: BenefitCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.8,
        bounce: 0.35,
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1,
      },
    },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
        },
      },
    },
    tap: { scale: 0.9 },
  };

  return (
    <motion.div
      className="bg-gray-50 p-8 rounded-lg text-center flex flex-col items-center"
      variants={cardVariants}
      whileHover={{
        y: -10,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <motion.div
        className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white mb-5"
        variants={iconVariants}
        whileHover="hover"
        whileTap="tap"
      >
        {icon}
      </motion.div>
      <motion.h3
        className="text-xl font-semibold mb-3"
        variants={childVariants}
      >
        {title}
      </motion.h3>
      <motion.p className="text-gray-600 text-sm" variants={childVariants}>
        {description}
      </motion.p>
    </motion.div>
  );
}
