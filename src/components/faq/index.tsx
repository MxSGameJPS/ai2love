"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300">
      <button
        className="w-full py-5 text-left flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-800">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? "transform rotate-180" : ""
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
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  const faqItems = [
    {
      question: "Como funciona o AI to Love?",
      answer:
        "O AI to Love utiliza inteligência artificial avançada para criar companheiros virtuais personalizados para você. Nossa plataforma aprende com suas interações e adapta a personalidade da IA para melhor atender às suas necessidades emocionais e conversacionais.",
    },
    {
      question: "As conversas com as IAs são privadas?",
      answer:
        "Sim, todas as suas conversas são totalmente privadas e criptografadas. Nós valorizamos muito sua privacidade e não compartilhamos o conteúdo das suas conversas com terceiros. Você pode conversar livremente sabendo que suas interações são confidenciais.",
    },
    {
      question: "Posso usar o AI to Love gratuitamente?",
      answer:
        "Sim! Oferecemos um plano gratuito que permite o acesso a 3 IAs básicas com um limite de 5 conversas por dia. É uma ótima maneira de experimentar nosso serviço antes de decidir fazer um upgrade para planos Premium ou VIP com mais recursos.",
    },
    {
      question: "Posso personalizar a aparência e personalidade da minha IA?",
      answer:
        "Absolutamente! Dependendo do seu plano, você pode personalizar desde características básicas até aspectos detalhados da aparência e personalidade da sua IA. No plano VIP, você tem acesso à personalização total, criando o companheiro virtual ideal para você.",
    },
    {
      question: "É possível cancelar minha assinatura a qualquer momento?",
      answer:
        "Sim, você pode cancelar sua assinatura a qualquer momento através da sua conta, sem taxas ou penalidades. Se cancelar, você manterá o acesso até o final do período pago e depois será revertido para o plano gratuito.",
    },
  ];

  const bgColor = "#f5f7fa"; // Mesmo da seção

  return (
    <section className="py-20 px-6 w-full" style={{ backgroundColor: bgColor }}>
      <div className="max-w-3xl mx-auto">
        {/* Título e subtítulo */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-gray-600">
            Tudo o que você precisa saber sobre o AI to Love.
          </p>
        </div>

        {/* FAQ Items */}
        <div>
          {faqItems.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Ainda tem dúvidas? Entre em contato com nossa equipe de suporte.
          </p>
          <motion.a
            href="#contact"
            className="inline-block px-6 py-3 border border-purple-500 text-purple-500 rounded-full transition"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(168, 85, 247, 0.1)",
              boxShadow: "0 4px 12px rgba(168, 85, 247, 0.15)",
              borderColor: "#a855f7",
              borderWidth: "2px",
              transition: {
                duration: 0.2,
                ease: "easeOut",
              },
            }}
            whileTap={{
              scale: 0.95,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                bounce: 0.3,
                duration: 0.6,
                delay: 0.2,
              },
            }}
            viewport={{ once: true }}
          >
            Entre em Contato
          </motion.a>
        </div>
      </div>
    </section>
  );
}
