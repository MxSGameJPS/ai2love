"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StatusVerificacaoEmail() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se o usuário não estiver logado, redirecionar para o login
    if (!user) {
      router.push("/login");
    }

    // Se o email já foi verificado, redirecionar para a página inicial
    if (user?.emailVerified) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-xl font-bold text-center text-pink-500">
          <span className="logo-gradient-ai">AI</span>
          <span className="logo-gradient-to">to</span>
          <span className="logo-gradient-love">Love</span>
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-sm">
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
                className="text-yellow-500"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Verifique seu email
            </h2>
            <p className="text-gray-600 mb-6">
              Enviamos um link de verificação para{" "}
              <span className="font-semibold">{user?.email}</span>.
              <br />
              Por favor, verifique sua caixa de entrada e clique no link para
              ativar sua conta.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Não recebeu o email? Verifique sua pasta de spam ou clique no
              botão abaixo para reenviar.
            </p>
            <button
              className="w-full mb-3 py-2 text-sm font-medium text-white transition duration-200 bg-purple-600 rounded-md hover:bg-purple-700"
              onClick={() => {
                // Aqui você implementaria a funcionalidade de reenvio
                alert("Funcionalidade de reenvio seria implementada aqui");
              }}
            >
              Reenviar email de verificação
            </button>
            <Link
              href="/login"
              className="block w-full py-2 text-sm font-medium text-gray-600 transition duration-200 bg-gray-100 rounded-md hover:bg-gray-200 text-center"
            >
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
