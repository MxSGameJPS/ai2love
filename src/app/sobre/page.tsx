"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function SobrePage() {
  const { user } = useAuth();

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

  // Variantes para as seções
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Sobre a AI2Love
          </h2>
          <motion.p
            className="text-gray-600 max-w-3xl mx-auto"
            variants={sectionVariants}
          >
            A AI2Love é uma startup que une tecnologia de ponta e emoções
            humanas. Desenvolvemos avatares de inteligência artificial com
            personalidades únicas, permitindo que você encontre companhia,
            amizade ou até mesmo amor no ambiente digital.
          </motion.p>
        </motion.div>

        {/* Conteúdo principal */}
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Missão */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-md"
            variants={sectionVariants}
          >
            <h3 className="text-2xl font-bold mb-4 text-pink-500">Missão</h3>
            <p className="text-gray-700">
              Integrar inteligência artificial e emoções humanas para criar
              experiências de relacionamento significativas e personalizadas.
            </p>
          </motion.div>

          {/* Visão */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-md"
            variants={sectionVariants}
          >
            <h3 className="text-2xl font-bold mb-4 text-pink-500">Visão</h3>
            <p className="text-gray-700">
              Transformar a maneira como as pessoas se conectam, utilizando IA
              para construir relacionamentos profundos e duradouros no mundo
              virtual.
            </p>
          </motion.div>

          {/* Valores */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-md"
            variants={sectionVariants}
          >
            <h3 className="text-2xl font-bold mb-4 text-pink-500">Valores</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg mb-2">
                  Tecnologia Humanizada
                </h4>
                <p className="text-gray-700">
                  Desenvolvemos IA com foco na experiência emocional do usuário.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">Segurança</h4>
                <p className="text-gray-700">
                  Priorizamos a privacidade e o bem-estar dos nossos usuários.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">Acessibilidade</h4>
                <p className="text-gray-700">
                  Queremos que todos tenham a oportunidade de se conectar e
                  amar, independentemente de onde estejam.
                </p>
              </div>
            </div>
          </motion.div>
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
            Comece sua jornada no AI2Love hoje e descubra novas possibilidades
            de conexão.
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
