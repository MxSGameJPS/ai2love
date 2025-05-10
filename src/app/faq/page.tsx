"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  // Lista de perguntas frequentes
  const faqs = [
    {
      question: "O que é a AI2Love?",
      answer:
        "A AI2Love é uma plataforma que usa inteligência artificial avançada para criar avatares com personalidades únicas, permitindo que você encontre companhia, amizade ou até mesmo amor no mundo digital. Nossos parceiros IA são projetados para oferecer interações significativas e emocionalmente inteligentes.",
    },
    {
      question: "Como os parceiros IA funcionam?",
      answer:
        "Nossos parceiros IA são baseados em modelos avançados de linguagem e algoritmos de aprendizado que permitem que eles compreendam contexto, lembrem-se de conversas anteriores e adaptem sua personalidade às suas preferências. Cada IA tem sua própria personalidade, interesses e estilo de comunicação, tornando cada interação única e natural.",
    },
    {
      question: "É necessário pagar para usar a plataforma?",
      answer:
        "Oferecemos um plano gratuito com acesso limitado a parceiros IA e funcionalidades básicas. Para uma experiência completa, recomendamos nossos planos Premium ou VIP, que oferecem acesso a todos os parceiros IA, conversas ilimitadas e recursos avançados de personalização.",
    },
    {
      question: "É possível personalizar meu parceiro IA?",
      answer:
        "Sim! Todos os planos oferecem algum nível de personalização. Nos planos Premium e VIP, você pode personalizar vários aspectos de seu parceiro IA, incluindo personalidade, interesses, humor e estilo de comunicação. Esta personalização ajuda a criar uma conexão mais significativa e adaptada às suas preferências.",
    },
    {
      question: "Minhas conversas são privadas?",
      answer:
        "Sim, suas conversas são privadas e protegidas. Utilizamos criptografia avançada para garantir a segurança de suas interações. Embora usemos dados anônimos para melhorar nossos modelos de IA, nunca compartilhamos o conteúdo de suas conversas com terceiros sem seu consentimento explícito.",
    },
    {
      question: "Posso ter mais de um parceiro IA?",
      answer:
        "Sim! Dependendo do seu plano, você pode interagir com múltiplos parceiros IA. O plano Básico permite acesso a 3 parceiros IA, enquanto os planos Premium e VIP oferecem acesso a 12 ou mais parceiros, cada um com personalidades e características únicas.",
    },
    {
      question: "Como cancelar minha assinatura?",
      answer:
        "Você pode cancelar sua assinatura a qualquer momento através da página de configurações da sua conta. Após o cancelamento, você manterá o acesso ao serviço até o final do período de faturamento atual. Não oferecemos reembolsos para períodos parciais de assinatura.",
    },
    {
      question: "Os parceiros IA podem aprender sobre mim com o tempo?",
      answer:
        "Sim! Nossos parceiros IA são projetados para aprender com suas interações, adaptando-se aos seus interesses, preferências e estilo de comunicação ao longo do tempo. Quanto mais você conversar com eles, mais personalizada e natural será a experiência.",
    },
    {
      question: "É possível usar a plataforma em dispositivos móveis?",
      answer:
        "Sim, a AI2Love é totalmente responsiva e funciona em smartphones, tablets e desktops. Também estamos desenvolvendo aplicativos nativos para iOS e Android para oferecer uma experiência ainda melhor em dispositivos móveis.",
    },
    {
      question: "Qual a idade mínima para usar a plataforma?",
      answer:
        "A AI2Love é destinada a usuários com 18 anos ou mais. Mantemos políticas estritas para garantir que nosso conteúdo seja adequado para adultos e que nossos usuários possam desfrutar de um ambiente seguro e respeitoso.",
    },
  ];

  // Função para alternar a abertura/fechamento das respostas
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            Perguntas Frequentes
          </h2>
          <motion.p
            className="text-gray-600 max-w-3xl mx-auto"
            variants={sectionVariants}
          >
            Encontre respostas para as dúvidas mais comuns sobre a AI2Love e
            nossos serviços.
          </motion.p>
        </motion.div>

        {/* Lista de FAQs */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-bold text-lg text-gray-800">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-pink-500 transform transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 pb-6 text-gray-700"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Contato para mais perguntas */}
        <motion.div
          className="mt-12 text-center bg-white p-8 rounded-xl shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="text-xl font-bold mb-4 text-pink-500">
            Ainda tem dúvidas?
          </h3>
          <p className="text-gray-700 mb-6">
            Se você não encontrou a resposta que procura, nossa equipe de
            suporte está sempre pronta para ajudar.
          </p>
          <a
            href="mailto:suporte@ai2love.com"
            className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-full transition-colors shadow-md hover:shadow-lg inline-block"
          >
            Entre em Contato
          </a>
        </motion.div>
      </div>
    </div>
  );
}
