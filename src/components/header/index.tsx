"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
        className="flex items-center gap-1 text-xl font-semibold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="logo-gradient-ai">AI</span>
        <span className="logo-gradient-to">to</span>
        <span className="logo-gradient-love">Love</span>
      </motion.div>

      {/* Menu para desktop */}
      <nav className="items-center hidden gap-5 ml-auto mr-8 text-sm md:flex">
        <Link
          href="/"
          className="text-gray-700 transition-colors hover:text-pink-500"
        >
          Início
        </Link>
        <a
          href="#"
          className="text-gray-700 transition-colors hover:text-pink-500"
        >
          Planos
        </a>
        <a
          href="#"
          className="text-gray-700 transition-colors hover:text-pink-500"
        >
          Sobre
        </a>
      </nav>

      {/* Botões para desktop */}
      <div className="items-center hidden space-x-2 md:flex">
        <Link href="/login">
          <motion.button
            className="px-4 py-1 text-sm text-pink-500 border border-pink-500 rounded-full btn-gradient-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </Link>
        <Link href="/register">
          <motion.button
            className="px-4 py-1 text-sm text-white rounded-full btn-gradient-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Registre-se
          </motion.button>
        </Link>
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
          className="w-6 h-6"
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
            className="absolute left-0 right-0 z-50 flex flex-col p-5 space-y-4 bg-white rounded-b-lg shadow-lg top-14 md:hidden"
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
              className="flex flex-col pt-3 mt-1 space-y-2 border-t border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Link href="/login" className="w-full">
                <motion.button
                  className="w-full px-4 py-2 text-sm text-pink-500 border border-pink-500 rounded-full btn-gradient-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Login
                </motion.button>
              </Link>
              <Link href="/register" className="w-full">
                <motion.button
                  className="w-full px-4 py-2 text-sm text-white rounded-full btn-gradient-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Registre-se
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
