"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [mensagemEnviada, setMensagemEnviada] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar o email de recuperação
    console.log({ email });
    // Simulando envio de email
    setMensagemEnviada(true);
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Botão de voltar */}
      <Link
        href="/login"
        className="absolute top-4 left-4 z-50 flex items-center text-gray-800 hover:text-pink-500 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1"
        >
          <path d="M19 12H5"></path>
          <path d="M12 19l-7-7 7-7"></path>
        </svg>
        <span className="text-sm">Voltar</span>
      </Link>

      {/* Conteúdo centralizado */}
      <div className="flex flex-col items-center justify-center w-full px-3 py-6 bg-white md:px-8 lg:px-16">
        <div className="w-full max-w-sm">
          <h1 className="mb-6 text-xl font-bold text-center text-pink-500">
            <span className="logo-gradient-ai">AI</span>
            <span className="logo-gradient-to">to</span>
            <span className="logo-gradient-love">Love</span>
          </h1>

          <h2 className="mb-2 text-2xl font-bold text-gray-800 text-center">
            Recuperar senha
          </h2>
          <p className="mb-6 text-sm text-gray-600 text-center">
            Digite seu email para receber instruções de recuperação
          </p>

          {mensagemEnviada ? (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-500"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Email enviado!
              </h3>
              <p className="text-gray-600 mb-6">
                Enviamos instruções de recuperação para seu email.
                <br />
                Verifique sua caixa de entrada.
              </p>
              <Link
                href="/login"
                className="block w-full py-2 text-sm font-medium text-white transition duration-200 bg-pink-500 rounded-md hover:bg-pink-600 text-center"
              >
                Voltar para o login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-xs font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 text-sm font-medium text-white transition duration-200 bg-purple-600 rounded-md hover:bg-purple-700"
              >
                Recuperar senha
              </button>

              <p className="mt-6 text-xs text-center text-gray-600">
                Lembrou sua senha?{" "}
                <Link
                  href="/login"
                  className="font-medium text-purple-600 hover:underline"
                >
                  Fazer login
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 