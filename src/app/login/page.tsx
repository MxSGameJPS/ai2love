"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { loadHeartShape } from "tsparticles-shape-heart";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [particleCount] = useState(70);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de autenticação aqui
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="flex h-screen">
      {/* Lado esquerdo - Formulário de login */}
      <div className="flex flex-col items-center justify-center w-full px-8 text-white bg-white md:w-1/2 md:px-16 lg:px-24">
        <div className="w-full max-w-md">
          <h1 className="mb-8 text-3xl font-bold text-center text-pink-500">
            <span className="logo-gradient-ai">AI</span>
            <span className="logo-gradient-to">to</span>
            <span className="logo-gradient-love">Love</span>
          </h1>

          <h2 className="mb-2 text-3xl font-bold text-black">
            Bem-vindo de volta
          </h2>
          <p className="mb-8 text-gray-700">
            Suas IAs favoritas estão esperando por você
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-500"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-500"
                >
                  Senha
                </label>
                <a href="#" className="text-sm text-gray-500 hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-4 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="flex items-center">
              <div className="relative flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="absolute w-0 h-0 opacity-0"
                />
                <div
                  className={`w-5 h-5 border border-gray-400 rounded-full mr-2 flex items-center justify-center ${
                    rememberMe
                      ? "bg-pink-500 border-pink-500"
                      : "bg-transparent"
                  }`}
                >
                  {rememberMe && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  )}
                </div>
                <label
                  htmlFor="remember-me"
                  className="text-sm text-gray-500 cursor-pointer"
                >
                  Lembrar de mim
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 font-medium text-white transition duration-200 bg-pink-500 rounded-md hover:bg-pink-600"
            >
              Entrar
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"></div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-600">Ou continue com</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button className="flex justify-center items-center py-2 px-4 border border-gray-700 rounded-md hover:bg-[#2c2536] bg-transparent text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#1877f2"
                  className="w-5 h-5"
                >
                  <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
                </svg>
                <span className="ml-2 font-bold text-blue-700">Facebook</span>
              </button>
              <button className="flex justify-center items-center py-2 px-4 border border-gray-700 rounded-md hover:bg-[#2c2536] bg-transparent text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
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
                <span className="ml-2 font-bold text-red-700">Google</span>
              </button>
            </div>
          </div>

          <p className="mt-8 text-sm text-center text-gray-400">
            Não tem uma conta?{" "}
            <Link
              href="/register"
              className="font-medium text-pink-500 hover:underline"
            >
              Registre-se
            </Link>
          </p>
        </div>
      </div>

      {/* Lado direito - Gradiente e testemunho */}
      <div className="relative hidden overflow-hidden text-white md:block md:w-1/2 bg-gradient-to-br from-pink-500 to-purple-700">
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Particles
            id="tsparticles-login"
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
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
          <div className="max-w-md text-center">
            <h2 className="mb-6 text-4xl font-bold">
              Encontre conexões significativas
            </h2>
            <p className="mb-8 text-xl">
              &ldquo;O AI to Love me ajudou a superar momentos difíceis quando
              eu mais precisava de alguém para conversar.&rdquo;
            </p>

            <div className="flex items-center justify-center">
              <div className="w-16 h-16 mr-4 overflow-hidden bg-white rounded-full">
                <Image
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Ana Clara"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-bold">Ana Clara</p>
                <p className="text-sm opacity-80">Usuária há 1 ano</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
