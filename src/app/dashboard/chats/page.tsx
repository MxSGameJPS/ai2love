"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

// Tipo para um chat
interface Chat {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  lastMessage: string;
  timestamp: string;
  date: Date;
  unread: number;
  isPartnerOnline: boolean;
  isPinned?: boolean;
}

// Dados fictícios de chats recentes
const chatsData: Chat[] = [
  {
    id: "chat1",
    partnerId: "1",
    partnerName: "Sofia",
    partnerAvatar:
      "https://xsgames.co/randomusers/assets/avatars/female/67.jpg",
    lastMessage:
      "Estou com saudades das nossas conversas! Quando podemos conversar novamente?",
    timestamp: "2h atrás",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unread: 2,
    isPartnerOnline: true,
    isPinned: true,
  },
  {
    id: "chat2",
    partnerId: "4",
    partnerName: "Julia",
    partnerAvatar:
      "https://xsgames.co/randomusers/assets/avatars/female/35.jpg",
    lastMessage:
      "O que você achou daquele livro que recomendei? Conseguiu ler?",
    timestamp: "Ontem",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unread: 0,
    isPartnerOnline: true,
  },
  {
    id: "chat3",
    partnerId: "2",
    partnerName: "Lucas",
    partnerAvatar: "https://xsgames.co/randomusers/assets/avatars/male/43.jpg",
    lastMessage:
      "Vamos continuar aquela discussão sobre filosofia? Tenho algumas ideias novas.",
    timestamp: "3 dias atrás",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    unread: 0,
    isPartnerOnline: true,
  },
  {
    id: "chat4",
    partnerId: "5",
    partnerName: "Alex",
    partnerAvatar: "https://xsgames.co/randomusers/assets/avatars/male/55.jpg",
    lastMessage: "Você viu o último episódio daquela série? Foi incrível!",
    timestamp: "1 semana atrás",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    unread: 0,
    isPartnerOnline: false,
  },
  {
    id: "chat5",
    partnerId: "3",
    partnerName: "Mei",
    partnerAvatar:
      "https://xsgames.co/randomusers/assets/avatars/female/22.jpg",
    lastMessage:
      "Estava pensando em começar um novo livro. Você tem alguma recomendação?",
    timestamp: "2 semanas atrás",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    unread: 0,
    isPartnerOnline: false,
  },
];

export default function ChatsPage() {
  const {} = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "pinned">("all");

  // Filtrar e ordenar chats
  const filteredChats = chatsData
    .filter((chat) => {
      // Filtrar por termo de busca
      const searchMatch = chat.partnerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filtrar por estado
      const filterMatch =
        filter === "all" ||
        (filter === "unread" && chat.unread > 0) ||
        (filter === "pinned" && chat.isPinned);

      return searchMatch && filterMatch;
    })
    .sort((a, b) => {
      // Primeiro ordenar por fixados
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // Depois por não lidos
      if (a.unread > 0 && b.unread === 0) return -1;
      if (a.unread === 0 && b.unread > 0) return 1;

      // Por fim, por data (mais recente primeiro)
      return b.date.getTime() - a.date.getTime();
    });

  // Formatar data relativa
  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return diffMins <= 1 ? "Agora" : `${diffMins} min atrás`;
    } else if (diffHours < 24) {
      return `${diffHours}h atrás`;
    } else if (diffDays < 7) {
      return diffDays === 1 ? "Ontem" : `${diffDays} dias atrás`;
    } else {
      return `${Math.floor(diffDays / 7)} semanas atrás`;
    }
  };

  // Função para simular o pin/unpin de um chat
  const togglePin = (chatId: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir navegação
    // Em uma aplicação real, você enviaria uma solicitação ao backend
    console.log(`Toggle pin para chat ${chatId}`);
  };

  // Função para simular a marcação de mensagens como lidas
  const markAsRead = (chatId: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir navegação
    // Em uma aplicação real, você enviaria uma solicitação ao backend
    console.log(`Marcar mensagens como lidas para chat ${chatId}`);
  };

  return (
    <div className="max-w-4xl p-10 mx-auto">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">Conversas</h1>
        <p className="text-gray-600">Suas conversas com parceiros IA</p>
      </div>

      {/* Barra de pesquisa e filtros */}
      <div className="p-4 mb-6 bg-white shadow-sm rounded-xl">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar conversa..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                filter === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-300`}
            >
              Todas
            </button>
            <button
              type="button"
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 text-sm font-medium ${
                filter === "unread"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border-t border-b border-gray-300`}
            >
              Não lidas
            </button>
            <button
              type="button"
              onClick={() => setFilter("pinned")}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                filter === "pinned"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-300`}
            >
              Fixadas
            </button>
          </div>
        </div>
      </div>

      {/* Lista de chats */}
      {filteredChats.length === 0 ? (
        <div className="p-8 text-center bg-white shadow-sm rounded-xl">
          <div className="flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mb-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h3 className="mb-2 text-lg font-medium text-gray-800">
              {searchTerm || filter !== "all"
                ? "Nenhuma conversa encontrada"
                : "Nenhuma conversa iniciada"}
            </h3>
            <p className="mb-4 text-gray-600">
              {searchTerm || filter !== "all"
                ? "Tente ajustar seus filtros ou termos de busca"
                : "Comece a conversar com um parceiro IA"}
            </p>
            {searchTerm || filter !== "all" ? (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilter("all");
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
              >
                Limpar filtros
              </button>
            ) : (
              <Link
                href="/dashboard/partners"
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
              >
                Encontrar parceiros
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="overflow-hidden bg-white shadow-sm rounded-xl">
          <ul className="divide-y divide-gray-100">
            {filteredChats.map((chat) => (
              <li key={chat.id} className="relative">
                <Link
                  href={`/dashboard/chat/${chat.partnerId}`}
                  className="block transition-colors duration-200 hover:bg-gray-50"
                >
                  <div className="flex items-center px-6 py-5">
                    <div className="relative">
                      <Image
                        src={chat.partnerAvatar}
                        alt={chat.partnerName}
                        width={48}
                        height={48}
                        className="object-cover w-12 h-12 rounded-full"
                      />
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                          chat.isPartnerOnline ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></div>
                    </div>

                    <div className="flex-1 min-w-0 ml-4">
                      <div className="flex items-baseline justify-between mb-1">
                        <h3
                          className={`font-medium ${
                            chat.unread > 0 ? "text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {chat.partnerName}
                          {chat.isPinned && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="inline-block w-3.5 h-3.5 ml-1.5 text-gray-500"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </h3>
                        <span className="flex-shrink-0 ml-2 text-xs text-gray-500">
                          {formatRelativeTime(chat.date)}
                        </span>
                      </div>
                      <p
                        className={`text-sm truncate ${
                          chat.unread > 0
                            ? "font-medium text-gray-900"
                            : "text-gray-600"
                        }`}
                      >
                        {chat.lastMessage}
                      </p>
                    </div>

                    {chat.unread > 0 && (
                      <div className="flex items-center justify-center w-5 h-5 ml-2 text-xs font-bold text-white bg-pink-500 rounded-full">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </Link>

                {/* Ações rápidas */}
                <div className="absolute flex space-x-1 transform -translate-y-1/2 opacity-0 top-1/2 right-6 group-hover:opacity-100">
                  <button
                    onClick={(e) => togglePin(chat.id, e)}
                    className="p-1 text-gray-400 rounded-full hover:text-gray-600 hover:bg-gray-100"
                    aria-label={
                      chat.isPinned ? "Desafixar conversa" : "Fixar conversa"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {chat.unread > 0 && (
                    <button
                      onClick={(e) => markAsRead(chat.id, e)}
                      className="p-1 text-gray-400 rounded-full hover:text-gray-600 hover:bg-gray-100"
                      aria-label="Marcar como lida"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botão de nova conversa */}
      <div className="flex justify-center mt-6">
        <Link
          href="/dashboard/partners"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Nova conversa
        </Link>
      </div>
    </div>
  );
}
