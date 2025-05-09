"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams } from "next/navigation";

function VerificarEmailContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const searchParams = useSearchParams();
  const { verifyEmail } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    const verificarToken = async () => {
      try {
        const result = await verifyEmail(token);
        setStatus(result ? "success" : "error");
      } catch (error) {
        console.error("Erro ao verificar email:", error);
        setStatus("error");
      }
    };

    verificarToken();
  }, [searchParams, verifyEmail]);

  return (
    <div className="w-full max-w-sm px-4 py-6">
      <h1 className="mb-6 text-xl font-bold text-center text-pink-500">
        <span className="logo-gradient-ai">AI</span>
        <span className="logo-gradient-to">to</span>
        <span className="logo-gradient-love">Love</span>
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        {status === "loading" && (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="animate-spin h-12 w-12 text-purple-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Verificando seu email
            </h2>
            <p className="text-gray-600">
              Estamos confirmando seu endereço de email...
            </p>
          </div>
        )}

        {status === "success" && (
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
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Email verificado!
            </h2>
            <p className="text-gray-600 mb-6">
              Seu endereço de email foi verificado com sucesso. Agora você pode
              aproveitar todos os recursos da plataforma.
            </p>
            <Link
              href="/"
              className="block w-full py-2 text-sm font-medium text-white transition duration-200 bg-purple-600 rounded-md hover:bg-purple-700 text-center"
            >
              Ir para o início
            </Link>
          </div>
        )}

        {status === "error" && (
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
                className="text-red-500"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Falha na verificação
            </h2>
            <p className="text-gray-600 mb-6">
              Não foi possível verificar seu email. O link pode ter expirado ou
              ser inválido.
            </p>
            <Link
              href="/login"
              className="block w-full py-2 text-sm font-medium text-white transition duration-200 bg-pink-500 rounded-md hover:bg-pink-600 text-center"
            >
              Voltar para o login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerificarEmail() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Suspense
        fallback={
          <div className="w-full max-w-sm px-4 py-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
          </div>
        }
      >
        <VerificarEmailContent />
      </Suspense>
    </div>
  );
}
