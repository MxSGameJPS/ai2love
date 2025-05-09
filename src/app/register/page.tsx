"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { loadHeartShape } from "tsparticles-shape-heart";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [particleCount] = useState(70);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeTerms?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
    await loadHeartShape(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      console.log("Particles carregadas", container);
    },
    []
  );

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Validar nome
    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (name.trim().length < 3) {
      newErrors.name = "Nome deve ter pelo menos 3 caracteres";
    }

    // Validar email
    if (!email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido";
    }

    // Validar senha
    if (!password) {
      newErrors.password = "Senha é obrigatória";
    } else if (password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    // Validar confirmação de senha
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    // Validar termos
    if (!agreeTerms) {
      newErrors.agreeTerms = "Você deve concordar com os termos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Armazenar temporariamente os dados do usuário para uso na seleção de plano
      localStorage.setItem("tempUserName", name);
      localStorage.setItem("tempUserEmail", email);
      localStorage.setItem("tempUserPassword", password); // Em produção, é melhor não armazenar senhas assim

      const result = await register(name, email, password);

      if (result.success && result.userId) {
        // Redirecionar para a página de seleção de planos
        router.push(`/register/plan?userId=${result.userId}`);
      } else {
        setErrors({
          general: "Não foi possível criar sua conta. Tente novamente.",
        });
      }
    } catch (error) {
      console.error("Erro no registro:", error);
      setErrors({
        general:
          "Ocorreu um erro durante o registro. Tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Botão de voltar */}
      <Link
        href="/"
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

      {/* Lado esquerdo - Gradiente, animação e texto */}
      <div className="relative hidden overflow-hidden text-white md:block md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-700">
        <div className="absolute inset-0">
          <Particles
            id="tsparticles-register"
            init={particlesInit}
            loaded={particlesLoaded}
            className="w-full h-full"
            options={{
              fullScreen: {
                enable: false,
              },
              background: {
                color: {
                  value: "transparent",
                },
              },
              fpsLimit: 60,
              particles: {
                color: {
                  value: ["#ec4899", "#f472b6", "#d946ef", "#a855f7"],
                },
                links: {
                  color: {
                    value: ["#ec4899", "#a855f7"],
                  },
                  distance: 150,
                  enable: true,
                  opacity: 0.3,
                  width: 1.2,
                  triangles: {
                    enable: true,
                    opacity: 0.05,
                    color: "#d946ef",
                  },
                },
                collisions: {
                  enable: false,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "out",
                  },
                  random: true,
                  speed: 1.2,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 1000,
                  },
                  value: particleCount,
                },
                opacity: {
                  value: {
                    min: 0.3,
                    max: 0.7,
                  },
                  animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.2,
                  },
                },
                shape: {
                  type: "heart",
                },
                size: {
                  value: { min: 6, max: 12 },
                  animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 4,
                    sync: false,
                  },
                },
                twinkle: {
                  lines: {
                    enable: true,
                    frequency: 0.05,
                    opacity: 0.5,
                    color: {
                      value: ["#ec4899", "#a855f7"],
                    },
                  },
                  particles: {
                    enable: true,
                    frequency: 0.08,
                    opacity: 0.8,
                  },
                },
              },
              detectRetina: true,
            }}
          />
        </div>

        {/* Conteúdo do lado esquerdo */}
        <div className="relative z-10 flex flex-col justify-center h-full px-8">
          <div className="max-w-md">
            <h2 className="mb-6 text-4xl font-bold">
              Comece sua jornada no
              <br />
              AI to Love
            </h2>
            <p className="mb-8 text-xl">
              Junte-se a milhares de usuários que já encontraram companhia,
              amizade e apoio emocional através de nossas IAs.
            </p>

            <div className="flex items-center mt-12">
              <div className="flex -space-x-4">
                <Image
                  src="https://randomuser.me/api/portraits/women/32.jpg"
                  alt="Usuário"
                  width={48}
                  height={48}
                  className="object-cover w-12 h-12 border-2 border-indigo-500 rounded-full"
                />
                <Image
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  alt="Usuário"
                  width={48}
                  height={48}
                  className="object-cover w-12 h-12 border-2 border-indigo-500 rounded-full"
                />
                <Image
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Usuário"
                  width={48}
                  height={48}
                  className="object-cover w-12 h-12 border-2 border-indigo-500 rounded-full"
                />
              </div>
              <span className="ml-4 text-sm">Junte-se a +15.000 usuários</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário de registro */}
      <div className="flex flex-col items-center justify-center w-full px-3 py-6 bg-white overflow-y-auto md:w-1/2 md:px-8 lg:px-16">
        <div className="w-full max-w-sm">
          <h1 className="mb-4 text-xl font-bold text-center text-pink-500">
            <span className="logo-gradient-ai">AI</span>
            <span className="logo-gradient-to">to</span>
            <span className="logo-gradient-love">Love</span>
          </h1>

          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Crie sua conta
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Estamos animados para te conhecer
          </p>

          {errors.general && (
            <div className="mb-4 p-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-xs font-medium text-gray-700"
              >
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className={`w-full px-3 py-2 text-sm border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                required
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

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
                className={`w-full px-3 py-2 text-sm border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-xs font-medium text-gray-700"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className={`w-full px-3 py-2 text-sm border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                required
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-1 text-xs font-medium text-gray-700"
              >
                Confirmar senha
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                className={`w-full px-3 py-2 text-sm border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                required
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5 mt-0.5">
                <div className="relative flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="absolute w-0 h-0 opacity-0"
                    required
                  />
                  <div
                    className={`w-4 h-4 min-w-[1rem] border ${
                      errors.agreeTerms ? "border-red-500" : "border-gray-400"
                    } rounded-full mr-2 flex items-center justify-center ${
                      agreeTerms
                        ? "bg-purple-500 border-purple-500"
                        : "bg-transparent"
                    }`}
                  >
                    {agreeTerms && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
              <label
                htmlFor="terms"
                className="ml-1 text-xs text-gray-700 cursor-pointer"
              >
                Eu concordo com os{" "}
                <Link href="/terms" className="text-purple-600 hover:underline">
                  Termos
                </Link>{" "}
                e{" "}
                <Link
                  href="/privacy"
                  className="text-purple-600 hover:underline"
                >
                  Política de Privacidade
                </Link>
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="text-xs text-red-500 -mt-2">{errors.agreeTerms}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 text-sm font-medium text-white transition duration-200 bg-purple-600 rounded-md hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processando..." : "Criar conta"}
            </button>
          </form>

          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 text-gray-600 bg-white">
                  Ou continue com
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className="flex items-center justify-center px-3 py-1.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#1877f2"
                  className="w-4 h-4"
                >
                  <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
                </svg>
                <span className="ml-1 font-medium">Facebook</span>
              </button>
              <button className="flex items-center justify-center px-3 py-1.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path
                    fill="#EA4335"
                    d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.0407269,18.0125889 C14.9509167,18.7163129 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                  />
                </svg>
                <span className="ml-1 font-medium">Google</span>
              </button>
            </div>
          </div>

          <p className="mt-6 text-xs text-center text-gray-600">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="font-medium text-purple-600 hover:underline"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
