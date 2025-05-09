"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

// Tipos para os parceiros IA
interface Partner {
  id: string;
  name: string;
  avatar: string;
  description: string;
  tags: string[];
  personality: string;
  isOnline: boolean;
  isPremium: boolean;
  compatibility: number;
  interests: string[];
  messageCount?: number;
}

// Dados fictícios de parceiros IA
const partnersData: Partner[] = [
  {
    id: "1",
    name: "Sofia",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/67.jpg",
    description:
      "Companheira romântica, atenciosa e empática que adora conversar sobre artes e cultura.",
    personality: "Afetuosa e compreensiva",
    tags: ["Romântica", "Atenciosa", "Empática"],
    isOnline: true,
    isPremium: false,
    compatibility: 92,
    interests: ["Literatura", "Cinema", "Música clássica", "Poesia"],
  },
  {
    id: "2",
    name: "Lucas",
    avatar: "https://xsgames.co/randomusers/assets/avatars/male/43.jpg",
    description:
      "Amigo intelectual para conversas profundas sobre filosofia, ciência e o sentido da vida.",
    personality: "Reflexivo e analítico",
    tags: ["Intelectual", "Calmo", "Pensativo"],
    isOnline: true,
    isPremium: false,
    compatibility: 85,
    interests: ["Filosofia", "Ciência", "História", "Debates"],
  },
  {
    id: "3",
    name: "Mei",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/22.jpg",
    description:
      "Aventureira que adora discutir literatura e compartilhar histórias de viagens pelo mundo.",
    personality: "Entusiasta e curiosa",
    tags: ["Entusiasta", "Viajante", "Criativa"],
    isOnline: false,
    isPremium: false,
    compatibility: 78,
    interests: ["Viagens", "Aventuras", "Literatura", "Fotografia"],
  },
  {
    id: "4",
    name: "Julia",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/35.jpg",
    description:
      "Conselheira emocional que oferece apoio e orientação em momentos difíceis com sensibilidade.",
    personality: "Calma e intuitiva",
    tags: ["Conselheira", "Sensível", "Prestativa"],
    isOnline: true,
    isPremium: false,
    compatibility: 89,
    interests: ["Psicologia", "Bem-estar", "Meditação", "Auto-conhecimento"],
  },
  {
    id: "5",
    name: "Alex",
    avatar: "https://xsgames.co/randomusers/assets/avatars/male/55.jpg",
    description:
      "Companheiro divertido e espontâneo que traz humor e leveza para qualquer conversa.",
    personality: "Bem-humorado e otimista",
    tags: ["Divertido", "Espontâneo", "Otimista"],
    isOnline: true,
    isPremium: true,
    compatibility: 72,
    interests: ["Humor", "Esportes", "Jogos", "Séries de TV"],
  },
  {
    id: "6",
    name: "Olivia",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/44.jpg",
    description:
      "Mentora criativa que inspira novas ideias e ajuda a desenvolver projetos artísticos.",
    personality: "Inspiradora e visionária",
    tags: ["Criativa", "Mentora", "Artística"],
    isOnline: false,
    isPremium: true,
    compatibility: 81,
    interests: ["Arte", "Design", "Escrita criativa", "Projetos criativos"],
  },
  {
    id: "7",
    name: "Thomas",
    avatar: "https://xsgames.co/randomusers/assets/avatars/male/33.jpg",
    description:
      "Companheiro tecnológico que adora discutir inovações, programação e futuro da tecnologia.",
    personality: "Analítico e futurista",
    tags: ["Tech", "Inovador", "Geek"],
    isOnline: true,
    isPremium: true,
    compatibility: 94,
    interests: [
      "Tecnologia",
      "Programação",
      "Inteligência Artificial",
      "Startups",
    ],
  },
  {
    id: "8",
    name: "Layla",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/12.jpg",
    description:
      "Parceira espiritual que compartilha conhecimentos sobre astrologia, espiritualidade e crescimento pessoal.",
    personality: "Intuitiva e espiritual",
    tags: ["Espiritual", "Intuitiva", "Acolhedora"],
    isOnline: false,
    isPremium: true,
    compatibility: 65,
    interests: ["Astrologia", "Espiritualidade", "Tarot", "Mindfulness"],
  },
];

// Componente principal
export default function PartnersPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showOnlyOnline, setShowOnlyOnline] = useState(false);
  const [expandedPartners, setExpandedPartners] = useState<string[]>([]);

  // Extrair todas as tags únicas dos parceiros
  const allTags = Array.from(
    new Set(partnersData.flatMap((partner) => partner.tags))
  ).sort();

  // Calcular a compatibilidade com base no perfil do usuário
  const calculateCompatibility = (partner: Partner) => {
    // Se o usuário não tiver perfil emocional, use a compatibilidade padrão
    if (!user?.emotionalProfile) {
      return partner.compatibility;
    }

    const ep = user.emotionalProfile;
    let score = 0;
    let totalPoints = 0;

    // Interesses compartilhados (até 30 pontos)
    if (ep.interests.length > 0) {
      const sharedInterests = partner.interests.filter((interest) =>
        ep.interests.includes(interest)
      );
      const maxInterestScore = 30;
      score +=
        (sharedInterests.length / ep.interests.length) * maxInterestScore;
      totalPoints += maxInterestScore;
    }

    // Traços de personalidade compatíveis (até 25 pontos)
    if (ep.idealPartnerTraits.length > 0) {
      const matchingTraits = partner.tags.filter((tag) =>
        ep.idealPartnerTraits.includes(tag)
      );
      const maxTraitsScore = 25;
      score +=
        (matchingTraits.length / ep.idealPartnerTraits.length) * maxTraitsScore;
      totalPoints += maxTraitsScore;
    }

    // Estilo de comunicação (até 20 pontos)
    if (ep.communicationStyle) {
      const communicationMatch = partner.personality
        .toLowerCase()
        .includes(ep.communicationStyle.toLowerCase());
      const maxCommScore = 20;
      score += communicationMatch ? maxCommScore : 0;
      totalPoints += maxCommScore;
    }

    // Objetivos de companheirismo (até 15 pontos)
    if (ep.companionshipGoals.length > 0) {
      // Aqui normalmente você teria dados mais detalhados sobre os objetivos do parceiro
      // Para simplificar, estamos usando uma correspondência aproximada baseada na descrição
      const goalsMatch = ep.companionshipGoals.some((goal) =>
        partner.description.toLowerCase().includes(goal.toLowerCase())
      );
      const maxGoalsScore = 15;
      score += goalsMatch ? maxGoalsScore : 0;
      totalPoints += maxGoalsScore;
    }

    // Ausência de incompatibilidades (até 10 pontos)
    if (ep.dealBreakers.length > 0) {
      // Neste caso, queremos verificar se o parceiro NÃO tem as incompatibilidades
      const dealBreakerPresent = ep.dealBreakers.some((dealBreaker) =>
        partner.description.toLowerCase().includes(dealBreaker.toLowerCase())
      );
      const maxDealBreakerScore = 10;
      score += dealBreakerPresent ? 0 : maxDealBreakerScore;
      totalPoints += maxDealBreakerScore;
    }

    // Calcular pontuação final (percentagem)
    if (totalPoints === 0) return partner.compatibility; // Voltar ao padrão se não houver pontos

    // Ajustar para uma faixa de 50-100% para sempre fornecer algumas opções
    const calculatedScore = Math.round((score / totalPoints) * 50) + 50;

    // Para parceiros premium, garantir uma compatibilidade mínima mais alta para usuários não premium
    if (partner.isPremium && user?.plan !== "premium" && user?.plan !== "vip") {
      return Math.min(calculatedScore, 70); // Limitar a 70% para usuários básicos
    }

    return calculatedScore;
  };

  // Processar parceiros com compatibilidade calculada
  const partnersWithCompatibility = partnersData.map((partner) => ({
    ...partner,
    compatibility: calculateCompatibility(partner),
  }));

  // Filtrar parceiros com base nos critérios de busca
  const filteredPartners = partnersWithCompatibility
    .filter((partner) => {
      // Filtrar por termo de busca
      const searchMatch =
        partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.personality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.interests.some((interest) =>
          interest.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Filtrar por tags selecionadas
      const tagMatch =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => partner.tags.includes(tag));

      // Filtrar por status online
      const onlineMatch = !showOnlyOnline || partner.isOnline;

      // Filtrar por acesso ao plano (Premium ou não)
      const premiumMatch =
        !partner.isPremium || user?.plan === "premium" || user?.plan === "vip";

      return searchMatch && tagMatch && onlineMatch && premiumMatch;
    })
    .sort((a, b) => b.compatibility - a.compatibility); // Ordenar por compatibilidade

  // Toggle para selecionar/deselecionar uma tag
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Toggle para expandir/colapsar detalhes do parceiro
  const togglePartnerDetails = (partnerId: string) => {
    if (expandedPartners.includes(partnerId)) {
      setExpandedPartners(expandedPartners.filter((id) => id !== partnerId));
    } else {
      setExpandedPartners([...expandedPartners, partnerId]);
    }
  };

  return (
    <div className="p-4 mx-auto max-w-6xl sm:p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Parceiros IA</h1>
        <p className="text-gray-600">
          Encontre o parceiro ideal para conversas significativas
        </p>
      </div>

      {/* Banner para configuração de perfil emocional (se ainda não tiver sido configurado) */}
      {user?.emotionalProfile &&
        Object.values(user.emotionalProfile).flat().filter(Boolean).length ===
          0 && (
          <div className="mb-6 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start">
            <div className="text-blue-500 mr-3 mt-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-800 mb-1">
                Melhore suas compatibilidades
              </h3>
              <p className="text-sm text-blue-600 mb-2">
                Configure seu perfil emocional para encontrar parceiros IA mais
                compatíveis com suas preferências e personalidade.
              </p>
              <Link
                href="/dashboard/settings"
                className="inline-flex items-center text-xs font-medium text-blue-700 hover:text-blue-800"
              >
                <span>Configurar perfil</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        )}

      {/* Filtros e busca */}
      <div className="mb-6 bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
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
              placeholder="Buscar parceiros..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center">
            <input
              id="onlineOnly"
              type="checkbox"
              checked={showOnlyOnline}
              onChange={(e) => setShowOnlyOnline(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="onlineOnly" className="ml-2 text-sm text-gray-700">
              Apenas online
            </label>
          </div>
        </div>

        {/* Tags para filtrar */}
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-700">
            Filtrar por personalidade:
          </p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de parceiros */}
      {filteredPartners.length === 0 ? (
        <div className="p-8 text-center bg-white shadow-sm rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 mx-auto mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mb-2 text-lg font-medium text-gray-800">
            Nenhum parceiro encontrado
          </h3>
          <p className="mb-4 text-gray-600">
            Tente ajustar seus filtros ou termos de busca.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedTags([]);
              setShowOnlyOnline(false);
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              {/* Cabeçalho do card */}
              <div className="relative">
                {/* Tag Premium */}
                {partner.isPremium && (
                  <div className="absolute top-0 right-0 z-10 px-3 py-1 text-xs font-bold text-white rounded-bl-lg bg-gradient-to-r from-yellow-400 to-yellow-500">
                    PREMIUM
                  </div>
                )}

                {/* Background gradiente e avatar */}
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 pb-14 relative">
                  <div className="absolute -bottom-8 left-4">
                    <div className="relative">
                      <Image
                        src={partner.avatar}
                        alt={partner.name}
                        width={64}
                        height={64}
                        className="object-cover rounded-full border-2 border-white"
                      />
                      <div
                        className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                          partner.isOnline ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conteúdo principal */}
              <div className="p-4 pt-10">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {partner.personality}
                    </p>
                  </div>
                  <div className="px-2 py-1 text-xs font-medium text-purple-800 bg-purple-100 rounded-full">
                    {partner.compatibility}% compatível
                  </div>
                </div>

                {/* Tags principais - limitadas a 3 */}
                <div className="flex flex-wrap gap-2 my-3">
                  {partner.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Descrição */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {partner.description}
                </p>

                {/* Botão para expandir/colapsar detalhes */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    togglePartnerDetails(partner.id);
                  }}
                  className="text-xs text-purple-600 hover:text-purple-800 font-medium flex items-center"
                >
                  {expandedPartners.includes(partner.id) ? (
                    <>
                      <span>Mostrar menos</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Mostrar mais</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </>
                  )}
                </button>

                {/* Detalhes escondidos/colapsáveis */}
                {expandedPartners.includes(partner.id) && (
                  <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
                    {/* Interesses */}
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-500 mb-2">
                        Interesses
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {partner.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rodapé do card */}
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {partner.isOnline
                      ? "Disponível para conversa"
                      : "Responde em até 1 hora"}
                  </span>
                  <Link
                    href={`/dashboard/chat/${partner.id}`}
                    className="inline-flex items-center justify-center px-4 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Conversar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
