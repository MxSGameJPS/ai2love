"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      className="py-20 px-6 w-full text-white"
      style={{
        background: "linear-gradient(to right, #f85fa3, #a762e5)",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Pronto para Encontrar sua Conexão Perfeita?
        </h2>
        <p className="mb-10 max-w-2xl mx-auto">
          Junte-se a milhares de usuários que já encontraram companhia, amizade
          e romance virtual no AI to Love.
        </p>

        <motion.button
          className="px-8 py-3 bg-white text-pink-500 font-medium rounded-full shadow-md transition mx-auto block"
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            textShadow: "0px 0px 8px rgb(255,255,255)",
            backgroundColor: "#ffffff",
            color: "#d946ef",
            transition: {
              duration: 0.2,
              ease: "easeOut",
            },
          }}
          whileTap={{
            scale: 0.95,
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              bounce: 0.4,
              duration: 0.8,
            },
          }}
          viewport={{ once: true }}
        >
          Crie sua Conta Gratuitamente
        </motion.button>
      </div>
    </section>
  );
}
