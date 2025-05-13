"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function VerificarEmail() {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const { verifyEmail } = useAuth();

  useEffect(() => {
    const verificarToken = async () => {
      try {
        if (!token) {
          setStatus("error");
          setMessage("Token de verificação inválido.");
          return;
        }

        const success = await verifyEmail(token as string);

        if (success) {
          setStatus("success");
          setMessage("Seu email foi verificado com sucesso!");
        } else {
          setStatus("error");
          setMessage(
            "Não foi possível verificar seu email. O token pode ser inválido ou já ter expirado."
          );
        }
      } catch (error) {
        console.error("Erro na verificação de email:", error);
        setStatus("error");
        setMessage(
          "Ocorreu um erro durante a verificação. Por favor, tente novamente mais tarde."
        );
      }
    };

    verificarToken();
  }, [token, verifyEmail]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-12">
        {/* Logo */}
        <div className="mb-6 text-xl font-bold text-center text-pink-500">
          <span className="logo-gradient-ai">AI</span>
          <span className="logo-gradient-to">to</span>
          <span className="logo-gradient-love">Love</span>
        </div>

        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Verificação de Email
            </h2>
          </div>

          {status === "loading" && (
            <div className="p-4 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-700">Verificando seu email...</p>
            </div>
          )}

          {status === "success" && (
            <div className="p-4 space-y-4 text-center bg-green-50 rounded-md">
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-green-800">
                Email Verificado!
              </h3>
              <p className="text-sm text-green-700">{message}</p>
              <Link
                href="/dashboard"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600"
              >
                Ir para o Dashboard
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="p-4 space-y-4 text-center bg-red-50 rounded-md">
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-red-800">
                Verificação Falhou
              </h3>
              <p className="text-sm text-red-700">{message}</p>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 justify-center">
                <Link
                  href="/login"
                  className="inline-block px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600"
                >
                  Ir para Login
                </Link>
                <Link
                  href="/suporte"
                  className="inline-block px-4 py-2 text-sm font-medium text-pink-500 bg-white border border-pink-500 rounded-md hover:bg-pink-50"
                >
                  Contatar Suporte
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
