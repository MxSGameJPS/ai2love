"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Fechar o menu mobile quando a tela for redimensionada para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full py-2 flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-24 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-pink-100 bg-opacity-80 backdrop-blur-md shadow-sm"
          : "bg-pink-100"
      }`}
      style={{ height: "56px" }}
    >
      {/* Logo com gradiente */}
      <motion.div
        className="text-xl font-semibold flex items-center gap-1"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="logo-gradient-ai">AI</span>
        <span className="logo-gradient-to">to</span>
        <span className="logo-gradient-love">Love</span>
      </motion.div>

      {/* Menu para desktop */}
      <nav className="hidden md:flex items-center gap-5 text-sm ml-auto mr-8">
        <a
          href="#"
          className="text-gray-700 hover:text-pink-500 transition-colors"
        >
          Início
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-pink-500 transition-colors"
        >
          Planos
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-pink-500 transition-colors"
        >
          Sobre
        </a>
      </nav>

      {/* Botões para desktop */}
      <div className="hidden md:flex items-center space-x-2">
        <motion.button
          className="px-4 py-1 rounded-full border border-pink-500 text-pink-500 text-sm btn-gradient-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
        <motion.button
          className="px-4 py-1 rounded-full text-white text-sm btn-gradient-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Registre-se
        </motion.button>
      </div>

      {/* Botão do menu mobile */}
      <motion.button
        className={`md:hidden ml-auto p-1.5 rounded-md text-gray-700 ${
          mobileMenuOpen ? "bg-pink-50" : ""
        }`}
        onClick={toggleMobileMenu}
        aria-label="Menu"
        whileTap={{ scale: 0.9 }}
        initial={false}
        animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {mobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </motion.button>

      {/* Menu mobile com AnimatePresence para animar a entrada e saída */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="absolute top-14 left-0 right-0 bg-white shadow-lg rounded-b-lg p-5 md:hidden flex flex-col space-y-4 z-50"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="flex flex-col space-y-3">
              {["Início", "Planos", "Sobre"].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-pink-500 py-1.5 px-2 rounded-md hover:bg-pink-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="flex flex-col space-y-2 pt-3 mt-1 border-t border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <motion.button
                className="w-full px-4 py-2 rounded-full border border-pink-500 text-pink-500 text-sm btn-gradient-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Login
              </motion.button>
              <motion.button
                className="w-full px-4 py-2 rounded-full text-white text-sm btn-gradient-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Registre-se
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
