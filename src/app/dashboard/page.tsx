"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";

// Dados fictícios de parceiros IA
const featuredPartners = [
  {
    id: "1",
    name: "Sofia",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/67.jpg",
    description: "Companheira afetuosa e compreensiva",
    tags: ["Romântica", "Atenciosa", "Empática"],
    isOnline: true,
    compatibility: 92,
  },
  {
    id: "2",
    name: "Lucas",
    avatar: "https://xsgames.co/randomusers/assets/avatars/male/43.jpg",
    description: "Amigo para conversas profundas e filosóficas",
    tags: ["Intelectual", "Calmo", "Pensativo"],
    isOnline: true,
    compatibility: 85,
  },
  {
    id: "3",
    name: "Mei",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/22.jpg",
    description: "Aventureira que adora discutir literatura e viagens",
    tags: ["Entusiasta", "Viajante", "Criativa"],
    isOnline: false,
    compatibility: 78,
  },
];

// Dados fictícios de chats recentes
const recentChats = [
  {
    id: "chat1",
    partnerId: "1",
    partnerName: "Sofia",
    partnerAvatar:
      "https://xsgames.co/randomusers/assets/avatars/female/67.jpg",
    lastMessage: "Estou com saudades das nossas conversas!",
    timestamp: "2h atrás",
    unread: 2,
  },
  {
    id: "chat2",
    partnerId: "4",
    partnerName: "Júlia",
    partnerAvatar:
      "https://xsgames.co/randomusers/assets/avatars/female/35.jpg",
    lastMessage: "O que você achou daquele livro que recomendei?",
    timestamp: "Ontem",
    unread: 0,
  },
  {
    id: "chat3",
    partnerId: "2",
    partnerName: "Lucas",
    partnerAvatar: "https://xsgames.co/randomusers/assets/avatars/male/43.jpg",
    lastMessage: "Vamos continuar aquela discussão sobre filosofia?",
    timestamp: "3 dias atrás",
    unread: 0,
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Bom dia";
      if (hour < 18) return "Boa tarde";
      return "Boa noite";
    };

    setGreeting(getGreeting());
  }, []);

  return (
    <div className="flex flex-col p-10 space-y-10">
      {/* Cabeçalho */}
      <div className="p-16 text-white shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
        <h1 className="mb-3 text-3xl font-bold">
          {greeting}, {user?.name?.split(" ")[0] || ""}!
        </h1>
        <p className="mb-6 text-lg text-purple-100">
          Bem-vindo(a) de volta ao seu espaço AI to Love.
        </p>

        <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-3">
          <div className="px-5 py-4 rounded-lg bg-white/20 backdrop-blur-sm">
            <p className="mb-1 text-sm text-white/80">Seu plano</p>
            <p className="text-lg font-bold capitalize">
              {user?.plan || "Básico"}
            </p>
          </div>

          <div className="px-5 py-4 rounded-lg bg-white/20 backdrop-blur-sm">
            <p className="mb-1 text-sm text-white/80">Conversas este mês</p>
            <p className="text-lg font-bold">28/30</p>
          </div>

          <div className="px-5 py-4 rounded-lg bg-white/20 backdrop-blur-sm">
            <p className="mb-1 text-sm text-white/80">Parceiros disponíveis</p>
            <p className="text-lg font-bold">5/8</p>
          </div>
        </div>
      </div>

      {/* Parceiros em Destaque */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="pl-3 text-2xl font-bold text-gray-800 border-l-4 border-purple-500">
            Parceiros em Destaque
          </h2>
          <Link
            href="/dashboard/partners"
            className="text-sm font-medium text-purple-600 hover:text-purple-800"
          >
            Ver todos
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredPartners.map((partner) => (
            <Link
              key={partner.id}
              href={`/dashboard/chat/${partner.id}`}
              className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg hover:border-purple-200 hover:translate-y-[-2px]"
            >
              <div className="p-5">
                <div className="flex items-start mb-4">
                  <div className="relative">
                    <Image
                      src={partner.avatar}
                      alt={partner.name}
                      width={60}
                      height={60}
                      className="object-cover rounded-full"
                    />
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        partner.isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></div>
                  </div>

                  <div className="flex-1 ml-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {partner.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {partner.isOnline ? "Online" : "Offline"}
                        </p>
                      </div>
                      <div className="px-2 py-1 text-xs font-medium text-purple-800 bg-purple-100 rounded-full">
                        {partner.compatibility}% compatível
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mb-3 text-sm text-gray-600">
                  {partner.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {partner.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Chats Recentes */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="pl-3 text-2xl font-bold text-gray-800 border-l-4 border-purple-500">
            Conversas Recentes
          </h2>
          <Link
            href="/dashboard/chats"
            className="text-sm font-medium text-purple-600 hover:text-purple-800"
          >
            Ver todas
          </Link>
        </div>

        <div className="overflow-hidden bg-white border border-gray-200 divide-y divide-gray-100 shadow-md rounded-xl">
          {recentChats.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">
                Você ainda não iniciou nenhuma conversa
              </p>
              <Link
                href="/dashboard/partners"
                className="inline-block mt-2 text-sm font-medium text-purple-600 hover:text-purple-800"
              >
                Encontrar parceiros para conversar
              </Link>
            </div>
          ) : (
            recentChats.map((chat) => (
              <Link
                key={chat.id}
                href={`/dashboard/chat/${chat.partnerId}`}
                className="flex items-center p-5 transition-colors duration-200 hover:bg-purple-50"
              >
                <div className="relative">
                  <Image
                    src={chat.partnerAvatar}
                    alt={chat.partnerName}
                    width={48}
                    height={48}
                    className="object-cover rounded-full"
                  />
                </div>

                <div className="flex-1 min-w-0 ml-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-medium text-gray-800 truncate">
                      {chat.partnerName}
                    </h3>
                    <span className="flex-shrink-0 ml-2 text-xs text-gray-500">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage}
                  </p>
                </div>

                {chat.unread > 0 && (
                  <div className="flex items-center justify-center w-5 h-5 ml-2 text-xs font-bold text-white bg-pink-500 rounded-full">
                    {chat.unread}
                  </div>
                )}
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Sugestões Rápidas */}
      <div>
        <h2 className="pl-3 mb-5 text-2xl font-bold text-gray-800 border-l-4 border-purple-500">
          Sugestões Rápidas
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/dashboard/partners"
            className="flex flex-col items-center p-5 text-center transition-all duration-300 border border-purple-200 shadow-sm bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl hover:shadow-md hover:translate-y-[-2px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mb-2 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="font-medium text-gray-800">Descobrir Parceiros</h3>
            <p className="mt-1 text-xs text-gray-600">
              Encontre novos parceiros de IA
            </p>
          </Link>

          <Link
            href="/dashboard/profile"
            className="flex flex-col items-center p-5 text-center transition-all duration-300 border border-purple-200 shadow-sm bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl hover:shadow-md hover:translate-y-[-2px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mb-2 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="font-medium text-gray-800">Atualizar Perfil</h3>
            <p className="mt-1 text-xs text-gray-600">
              Complete seu perfil para melhores matches
            </p>
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex flex-col items-center p-5 text-center transition-all duration-300 border border-purple-200 shadow-sm bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl hover:shadow-md hover:translate-y-[-2px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mb-2 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h3 className="font-medium text-gray-800">Preferências</h3>
            <p className="mt-1 text-xs text-gray-600">
              Ajuste suas configurações
            </p>
          </Link>

          <Link
            href={
              user?.plan === "basic"
                ? "/dashboard/upgrade"
                : "/dashboard/subscription"
            }
            className="flex flex-col items-center p-5 text-center text-white transition-all duration-300 shadow-sm bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl hover:shadow-md hover:translate-y-[-2px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <h3 className="font-medium">
              {user?.plan === "basic"
                ? "Upgrade de Plano"
                : "Gerenciar Assinatura"}
            </h3>
            <p className="mt-1 text-xs text-white/90">
              {user?.plan === "basic"
                ? "Desbloquear todos os recursos"
                : "Ver detalhes da sua assinatura"}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
