"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

// Tipos para as mensagens e parceiros
interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Partner {
  id: string;
  name: string;
  avatar: string;
  description: string;
  tags: string[];
  personality: string;
  isOnline: boolean;
  compatibility: number;
  interests: string[];
}

// Componente principal do chat
export default function ChatPage() {
  const { partnerId } = useParams<{ partnerId: string }>();
  const { user } = useAuth();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showPartnerInfo, setShowPartnerInfo] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Simulação de carregamento de mensagens paginadas
  const fetchMessages = async (page: number) => {
    if (page === 1) setIsLoading(true);
    else setIsLoadingMore(true);

    try {
      // Simulando uma chamada de API para obter mensagens
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mensagens simuladas
      const mockMessages: Message[] = [];
      const startDate = new Date();
      startDate.setHours(startDate.getHours() - 24 * page);

      // Gerar 10 mensagens simuladas para esta página
      for (let i = 0; i < 10; i++) {
        const messageTime = new Date(startDate);
        messageTime.setMinutes(messageTime.getMinutes() + i * 15);

        const isUserMessage = i % 2 === 0;
        const messageContent = isUserMessage
          ? [
              `Olá, como você está?`,
              `Me conte mais sobre seus interesses.`,
              `Gosto muito de conversar com você.`,
              `O que você acha sobre filosofia?`,
              `Como tem sido seu dia?`,
            ][Math.floor(Math.random() * 5)]
          : [
              `Estou muito bem, obrigado por perguntar!`,
              `Adoro filosofia, especialmente existencialismo. E você?`,
              `Meu dia está sendo produtivo e agradável.`,
              `Tenho interesse em literatura, arte e música.`,
              `Que bom conversar com você também!`,
            ][Math.floor(Math.random() * 5)];

        mockMessages.push({
          id: `msg_${page}_${i}`,
          senderId: isUserMessage ? user?.id || "user" : (partnerId as string),
          receiverId: isUserMessage
            ? (partnerId as string)
            : user?.id || "user",
          content: messageContent,
          timestamp: messageTime,
          isRead: true,
        });
      }

      // Se for a primeira página, substituir mensagens; caso contrário, adicionar ao início
      if (page === 1) {
        setMessages(mockMessages);
      } else {
        setMessages((prev) => [...mockMessages, ...prev]);
      }

      // Simular se há mais mensagens para carregar
      setHasMore(page < 5); // Limite de 5 páginas para exemplo
      setPage(page);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    } finally {
      if (page === 1) setIsLoading(false);
      else setIsLoadingMore(false);
    }
  };

  // Obter dados do parceiro e histórico de mensagens iniciais
  useEffect(() => {
    const fetchPartnerData = async () => {
      setIsLoading(true);
      try {
        // Em uma implementação real, você buscaria dados do parceiro de uma API
        // Simulando obtenção de dados do parceiro
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Dados simulados do parceiro
        const mockPartner: Partner = {
          id: partnerId as string,
          name:
            partnerId === "1"
              ? "Sofia"
              : partnerId === "2"
              ? "Lucas"
              : partnerId === "3"
              ? "Mei"
              : partnerId === "4"
              ? "Julia"
              : partnerId === "5"
              ? "Alex"
              : partnerId === "6"
              ? "Olivia"
              : partnerId === "7"
              ? "Thomas"
              : "Layla",
          avatar: `https://xsgames.co/randomusers/assets/avatars/${
            partnerId === "1" ||
            partnerId === "3" ||
            partnerId === "4" ||
            partnerId === "6" ||
            partnerId === "8"
              ? "female"
              : "male"
          }/${Math.floor(Math.random() * 50) + 10}.jpg`,
          description:
            "Parceiro de IA interativo para conversas significativas",
          tags: ["Empático", "Conversador", "Atencioso"],
          personality: "Amigável e compreensivo",
          isOnline: true,
          compatibility: 85,
          interests: ["Literatura", "Filosofia", "Artes", "Tecnologia"],
        };

        setPartner(mockPartner);

        // Simulando obtenção de mensagens anteriores
        await fetchMessages(1);
      } catch (error) {
        console.error("Erro ao carregar dados do parceiro:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartnerData();
  }, [partnerId]); // fetchMessages está sendo chamado dentro de fetchPartnerData

  // Simular o parceiro IA digitando
  const simulatePartnerTyping = () => {
    if (!partner) return;

    setIsPartnerTyping(true);

    // Tempo aleatório para "digitar" (entre 1 e 4 segundos)
    const typingTime = Math.floor(Math.random() * 3000) + 1000;

    // Após o tempo de "digitação", enviar resposta
    setTimeout(() => {
      if (!partner) return;

      setIsPartnerTyping(false);

      // Simular resposta do parceiro IA
      const responseOptions = [
        "Entendo seu ponto de vista. É uma perspectiva interessante.",
        "Que fascinante! Isso me faz pensar sobre vários aspectos.",
        "Obrigado por compartilhar isso comigo. Gosto muito das nossas conversas.",
        "Concordo com você em muitos aspectos, mas também tenho algumas ideias complementares.",
        "Isso é muito profundo. Você tem uma forma única de ver as coisas.",
        "Adoro como você expressa seus pensamentos de forma tão clara.",
        "Vamos explorar mais esse assunto? Tenho várias ideias para compartilhar.",
        "Suas reflexões são sempre inspiradoras.",
        "Nunca tinha pensado por esse ângulo antes. Você ampliou minha perspectiva.",
      ];

      const partnerResponse: Message = {
        id: `msg_${Date.now()}`,
        senderId: partner.id,
        receiverId: user?.id || "user",
        content:
          responseOptions[Math.floor(Math.random() * responseOptions.length)],
        timestamp: new Date(),
        isRead: false,
      };

      setMessages((prev) => [...prev, partnerResponse]);
    }, typingTime);
  };

  // Inicializar simulação de chat
  useEffect(() => {
    if (!partner) return;

    // Simulamos recebimento de eventos
    const typingInterval = setInterval(() => {
      // Simular IA começando a digitar aleatoriamente
      if (Math.random() > 0.85) {
        simulatePartnerTyping();
      }
    }, 8000);

    return () => clearInterval(typingInterval);
  }, [partner, simulatePartnerTyping]); // Adicionando simulatePartnerTyping como dependência

  // Rolar para o final quando novas mensagens são adicionadas
  useEffect(() => {
    if (messages.length > 0 && !isLoadingMore) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoadingMore]);

  // Manipular o envio de mensagens
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !partner || isSending) return;

    setIsSending(true);

    try {
      const messageId = `msg_${Date.now()}`;
      const userMessage: Message = {
        id: messageId,
        senderId: user?.id || "user",
        receiverId: partner.id,
        content: newMessage,
        timestamp: new Date(),
        isRead: false,
      };

      // Adicionar mensagem do usuário imediatamente
      setMessages((prev) => [...prev, userMessage]);
      setNewMessage("");

      // Simular envio para o servidor
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Simular resposta do parceiro IA após um tempo
      simulatePartnerTyping();
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    } finally {
      setIsSending(false);
    }
  };

  // Detectar scroll para carregar mais mensagens
  const handleScroll = () => {
    if (!messagesContainerRef.current || isLoadingMore || !hasMore) return;

    const { scrollTop } = messagesContainerRef.current;

    if (scrollTop === 0) {
      // Usuário rolou até o topo, carregar mais mensagens
      fetchMessages(page + 1);
    }
  };

  // Função para formatar data
  const formatMessageTime = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin h-10 w-10 border-4 border-purple-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="p-8 bg-white rounded-xl shadow text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Parceiro não encontrado
          </h2>
          <p className="text-gray-600 mb-4">
            Não foi possível encontrar o parceiro solicitado.
          </p>
          <a
            href="/dashboard/partners"
            className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Voltar para Parceiros
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Área principal de chat */}
      <div
        className={`flex flex-col flex-grow transition-all duration-300 ${
          showPartnerInfo ? "lg:mr-80" : ""
        }`}
      >
        {/* Cabeçalho do chat */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center">
            <div className="relative">
              <Image
                src={partner.avatar}
                alt={partner.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div
                className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full ${
                  partner.isOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
            </div>
            <div className="ml-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {partner.name}
              </h2>
              <p className="text-xs text-gray-500">
                {partner.isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowPartnerInfo(!showPartnerInfo)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 lg:flex items-center hidden"
          >
            <span className="text-sm mr-1">
              {showPartnerInfo ? "Ocultar" : "Mostrar"} perfil
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform ${
                showPartnerInfo ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            onClick={() => setShowPartnerInfo(!showPartnerInfo)}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Mostrar informações do parceiro"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        {/* Área de mensagens */}
        <div
          ref={messagesContainerRef}
          className="flex-grow overflow-y-auto p-4 pb-0"
          onScroll={handleScroll}
        >
          {/* Indicador de carregamento de mais mensagens */}
          {isLoadingMore && (
            <div className="flex justify-center py-4">
              <div className="animate-spin h-6 w-6 border-2 border-purple-500 rounded-full border-t-transparent"></div>
            </div>
          )}

          {/* Mensagens */}
          <div className="flex flex-col space-y-3">
            {messages.map((message) => {
              const isUser =
                message.senderId === user?.id || message.senderId === "user";

              return (
                <div
                  key={message.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl ${
                      isUser
                        ? "bg-purple-600 text-white rounded-tr-none"
                        : "bg-white text-gray-800 rounded-tl-none shadow-sm"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span
                      className={`text-xs mt-1 block ${
                        isUser ? "text-purple-200" : "text-gray-500"
                      }`}
                    >
                      {formatMessageTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Indicador de digitação */}
            {isPartnerTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] md:max-w-[70%]">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-0"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Referência para rolar até o final */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Área de entrada de mensagem */}
        <div className="bg-white border-t border-gray-200 p-4">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center space-x-2"
          >
            <div className="flex-grow relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
                disabled={isSending}
              />
            </div>
            <button
              type="submit"
              disabled={isSending || !newMessage.trim()}
              className="bg-purple-600 text-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
            >
              {isSending ? (
                <div className="h-5 w-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Painel lateral com informações do parceiro IA */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg transition-transform duration-300 z-10 overflow-y-auto lg:translate-x-0 ${
          showPartnerInfo ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Perfil do Parceiro
            </h3>
            <button
              onClick={() => setShowPartnerInfo(false)}
              className="p-1 rounded-full text-gray-500 hover:bg-gray-100 lg:hidden"
              aria-label="Fechar painel de informações"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-3">
              <Image
                src={partner.avatar}
                alt={partner.name}
                width={120}
                height={120}
                className="rounded-full object-cover border-4 border-purple-100"
              />
              <div
                className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-white ${
                  partner.isOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{partner.name}</h2>
            <p className="text-gray-600 text-sm">{partner.personality}</p>

            <div className="mt-3 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              {partner.compatibility}% compatível
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Sobre</h4>
            <p className="text-gray-600 text-sm">{partner.description}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Interesses
            </h4>
            <div className="flex flex-wrap gap-2">
              {partner.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Personalidade
            </h4>
            <div className="flex flex-wrap gap-2">
              {partner.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <p className="text-xs text-gray-500 text-center">
              Este parceiro IA foi projetado para oferecer conversas
              significativas e apoio emocional. Todas as informações
              compartilhadas são confidenciais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
