"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={`fixed top-0 left-0 w-full py-2 flex items-center justify-between px-24 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-pink-100 bg-opacity-80 backdrop-blur-md shadow-sm"
          : "bg-pink-100"
      }`}
      style={{ height: "56px" }}
    >
      {/* Logo com gradiente */}
      <div className="text-xl font-semibold flex items-center gap-1">
        <span className="logo-gradient-ai">AI</span>
        <span className="logo-gradient-to">to</span>
        <span className="logo-gradient-love">Love</span>
      </div>

      {/* Menu */}
      <nav className="flex items-center gap-5 text-sm ml-auto mr-8">
        <a href="#" className="text-gray-700 hover:text-pink-500">
          Início
        </a>
        <a href="#" className="text-gray-700 hover:text-pink-500">
          Planos
        </a>
        <a href="#" className="text-gray-700 hover:text-pink-500">
          Sobre
        </a>
      </nav>

      {/* Botões */}
      <div className="flex items-center space-x-2">
        <button className="px-4 py-1 rounded-full border border-pink-500 text-pink-500 text-sm btn-gradient-secondary">
          Login
        </button>
        <button className="px-4 py-1 rounded-full text-white text-sm btn-gradient-primary">
          Registre-se
        </button>
      </div>
    </header>
  );
}
