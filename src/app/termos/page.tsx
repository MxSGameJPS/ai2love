"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function TermosPage() {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Termos de Uso</h2>
          <motion.p
            className="text-gray-600 max-w-3xl mx-auto"
            variants={sectionVariants}
          >
            Ao utilizar nossa plataforma, você concorda com os seguintes termos
            e condições. Por favor, leia atentamente.
          </motion.p>
        </motion.div>

        {/* Conteúdo principal */}
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-pink-500">
              1. Aceitação dos Termos
            </h3>
            <p className="text-gray-700">
              Ao acessar ou usar a plataforma AI2Love, você concorda em cumprir
              e estar sujeito a estes Termos de Uso. Se você não concordar com
              algum aspecto destes termos, recomendamos que não utilize nossos
              serviços.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-pink-500">
              2. Elegibilidade
            </h3>
            <p className="text-gray-700 mb-4">
              Para utilizar a plataforma AI2Love, você deve:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Ter pelo menos 18 anos de idade</li>
              <li>
                Ter capacidade legal para estabelecer contratos vinculativos
              </li>
              <li>
                Não ter sido suspenso ou removido da plataforma anteriormente
              </li>
              <li>
                Cumprir todas as leis aplicáveis ao utilizar nossos serviços
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-pink-500">
              3. Contas e Segurança
            </h3>
            <p className="text-gray-700 mb-4">Ao criar uma conta na AI2Love:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Você é responsável por manter a confidencialidade de sua senha
              </li>
              <li>
                Você concorda em nos notificar imediatamente sobre qualquer uso
                não autorizado de sua conta
              </li>
              <li>
                Você é responsável por todas as atividades que ocorrem sob sua
                conta
              </li>
              <li>
                Reservamo-nos o direito de encerrar contas ou recusar serviços a
                qualquer pessoa por qualquer motivo
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-pink-500">
              4. Uso da Plataforma
            </h3>
            <p className="text-gray-700 mb-4">
              Durante o uso da plataforma AI2Love, você concorda em não:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Violar quaisquer leis aplicáveis</li>
              <li>Compartilhar conteúdo ofensivo, abusivo ou ilegal</li>
              <li>Tentar acessar áreas restritas da plataforma</li>
              <li>Usar técnicas de engenharia reversa em nosso código</li>
              <li>Interferir na segurança ou no desempenho da plataforma</li>
              <li>Usar a plataforma para spam ou publicidade não solicitada</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-pink-500">
              5. Assinaturas e Pagamentos
            </h3>
            <p className="text-gray-700 mb-4">
              Em relação às assinaturas e pagamentos:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                As assinaturas são renovadas automaticamente até que sejam
                canceladas
              </li>
              <li>
                Você pode cancelar sua assinatura a qualquer momento através da
                sua conta
              </li>
              <li>
                Não oferecemos reembolsos para períodos de assinatura
                parcialmente utilizados
              </li>
              <li>
                Reservamo-nos o direito de alterar os preços das assinaturas com
                aviso prévio
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-pink-500">
              6. Propriedade Intelectual
            </h3>
            <p className="text-gray-700">
              Todos os direitos de propriedade intelectual relacionados à
              plataforma AI2Love, incluindo design, textos, gráficos, logos,
              ícones e imagens, bem como o software subjacente, são de
              propriedade exclusiva da AI2Love ou de seus licenciadores.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-pink-500">
              7. Mudanças nos Termos
            </h3>
            <p className="text-gray-700">
              Reservamo-nos o direito de modificar estes Termos de Uso a
              qualquer momento. Alterações substanciais serão notificadas
              através da plataforma. O uso continuado da plataforma após tais
              modificações constitui sua aceitação dos novos termos.
            </p>
          </div>
        </motion.div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>
        </div>
      </div>
    </div>
  );
}
