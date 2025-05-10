"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function PrivacidadePage() {
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
            Política de Privacidade
          </h2>
          <motion.p
            className="text-gray-600 max-w-3xl mx-auto"
            variants={sectionVariants}
          >
            Na AI2Love, levamos a sua privacidade muito a sério. Esta página
            detalha como coletamos, usamos e protegemos suas informações
            pessoais.
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
              Informações que Coletamos
            </h3>
            <p className="text-gray-700 mb-4">
              Coletamos informações que você nos fornece diretamente, como:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Informações de perfil (nome, e-mail, senha)</li>
              <li>Preferências de personalidade e relacionamento</li>
              <li>Histórico de conversas com parceiros IA</li>
              <li>
                Informações de pagamento (processadas por terceiros seguros)
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-pink-500">
              Como Usamos Suas Informações
            </h3>
            <p className="text-gray-700 mb-4">
              Utilizamos suas informações para:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Personalizar sua experiência com nossos parceiros IA</li>
              <li>Melhorar nossos algoritmos e serviços</li>
              <li>Processar pagamentos e administrar sua conta</li>
              <li>Comunicar atualizações e ofertas relacionadas ao serviço</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-pink-500">
              Proteção de Dados
            </h3>
            <p className="text-gray-700 mb-4">
              Implementamos medidas técnicas e organizacionais para proteger
              suas informações:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Criptografia de ponta a ponta para mensagens</li>
              <li>Acesso restrito a dados pessoais por funcionários</li>
              <li>Sistemas de segurança regularmente atualizados</li>
              <li>Monitoramento contínuo de possíveis vulnerabilidades</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-pink-500">
              Seus Direitos
            </h3>
            <p className="text-gray-700 mb-4">Você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir informações imprecisas</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Restringir o processamento de suas informações</li>
              <li>Receber seus dados em formato portável</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-pink-500">Contato</h3>
            <p className="text-gray-700">
              Para questões relacionadas à privacidade, entre em contato com
              nosso Oficial de Proteção de Dados em:{" "}
              <span className="text-pink-500">privacidade@ai2love.com</span>
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
