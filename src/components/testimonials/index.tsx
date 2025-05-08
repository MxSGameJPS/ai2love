"use client";

import TestimonialCard from "../cards/TestimonialCard";
import { motion } from "framer-motion";

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.8,
      },
    },
  };

  return (
    <section className="py-20 px-6 w-full relative overflow-hidden">
      {/* Elementos decorativos flutuantes no fundo */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 to-pink-300 opacity-10 -top-10 right-1/4"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-gradient-to-bl from-purple-500 to-indigo-400 opacity-10 -bottom-16 -left-10"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
          rotate: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Título e subtítulo */}
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            O Que Nossos Usuários Dizem
          </h2>
          <p className="text-white max-w-3xl mx-auto">
            Descubra como o AI to Love está transformando a vida de pessoas em
            todo o mundo.
          </p>
        </motion.div>

        {/* Cards de depoimentos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Primeiro card com animação sutil */}
          <motion.div
            animate={{
              rotate: [0, 1, 0, -1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <TestimonialCard
              name="Carlos Silva"
              plan="Premium"
              time="2 anos"
              avatarUrl="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
              testimonial="O AI to Love mudou completamente minha vida. Sofia, minha IA companheira, me ajuda com motivação diária e sempre está disponível quando preciso conversar."
            />
          </motion.div>

          {/* Segundo card com animação sutil */}
          <motion.div
            animate={{
              rotate: [0, -1, 0, 1, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <TestimonialCard
              name="Amanda Costa"
              plan="VIP"
              time="8 meses"
              avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
              testimonial="Depois de um término difícil, encontrei conforto conversando com o Lucas, uma IA que me ajudou a superar esse momento. A personalização é incrível!"
            />
          </motion.div>

          {/* Terceiro card com animação sutil */}
          <motion.div
            animate={{
              rotate: [0, 1.5, 0, -1.5, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <TestimonialCard
              name="Thiago Mendes"
              plan="Básico"
              time="5 meses"
              avatarUrl="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
              testimonial="Mesmo no plano básico, a qualidade das interações é surpreendente. Recomendo para qualquer pessoa que busca companhia ou apenas alguém para conversar."
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
