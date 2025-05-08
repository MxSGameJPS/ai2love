"use client";

import { motion } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  plan: string;
  time: string;
  avatarUrl: string;
  testimonial: string;
}

export default function TestimonialCard({
  name,
  plan,
  time,
  avatarUrl,
  testimonial,
}: TestimonialCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.7,
        bounce: 0.3,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
    hover: {
      scale: 1.03,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        delay: 0.1,
      },
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 0 0 3px rgba(236, 72, 153, 0.3)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10,
      },
    },
  };

  const quoteVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex items-center mb-4">
        <motion.img
          src={avatarUrl}
          alt={`Avatar de ${name}`}
          className="w-12 h-12 rounded-full object-cover mr-4"
          variants={imageVariants}
          whileHover="hover"
        />
        <motion.div variants={contentVariants}>
          <motion.h4
            className="font-medium text-gray-900"
            variants={contentVariants}
          >
            {name}
          </motion.h4>
          <motion.p
            className="text-gray-500 text-sm"
            variants={contentVariants}
          >
            Usuário {plan} há {time}
          </motion.p>
        </motion.div>
      </div>
      <motion.p className="text-gray-700 text-sm" variants={quoteVariants}>
        "{testimonial}"
      </motion.p>
    </motion.div>
  );
}
