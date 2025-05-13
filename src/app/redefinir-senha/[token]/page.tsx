"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import * as authService from "@/services/api/authService";

export default function RedefinirSenha() {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const validatePasswords = () => {
    if (!password) {
      setError("Por favor, informe uma nova senha");
      return false;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return false;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validatePasswords()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authService.resetPassword(
        token as string,
        password
      );

      if (response.success) {
        setSuccess(true);
        // Redirecionar para login após 3 segundos
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setError(
          "Não foi possível redefinir sua senha. O token pode ser inválido ou ter expirado."
        );
      }
    } catch (error) {
      console.error("Erro na redefinição de senha:", error);
      setError(
        "Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Redefinir Senha
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Crie uma nova senha para sua conta
            </p>
          </div>

          {success ? (
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
                Senha Redefinida!
              </h3>
              <p className="text-sm text-green-700">
                Sua senha foi alterada com sucesso. Você será redirecionado para
                a página de login.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-100 rounded-md">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Nova Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Confirmar Senha
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 text-sm font-medium text-white transition-colors bg-pink-500 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:bg-pink-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processando..." : "Redefinir Senha"}
              </button>

              <div className="text-sm text-center text-gray-500">
                <Link
                  href="/login"
                  className="font-medium text-pink-500 hover:text-pink-600"
                >
                  Voltar para o login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
