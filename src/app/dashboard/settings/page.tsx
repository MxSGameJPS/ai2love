"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

// Tipos para o perfil emocional
interface EmotionalProfile {
  personalityTraits: string[];
  interests: string[];
  companionshipGoals: string[];
  communicationStyle: string;
  emotionalNeeds: string[];
  idealPartnerTraits: string[];
  dealBreakers: string[];
}

// Opções para cada campo do perfil
const profileOptions = {
  personalityTraits: [
    "Introvertido",
    "Extrovertido",
    "Analítico",
    "Criativo",
    "Empático",
    "Prático",
    "Sonhador",
    "Aventureiro",
    "Reservado",
    "Otimista",
    "Calmo",
    "Energético",
  ],
  interests: [
    "Literatura",
    "Cinema",
    "Música",
    "Arte",
    "Tecnologia",
    "Ciência",
    "Filosofia",
    "História",
    "Viagens",
    "Esportes",
    "Culinária",
    "Jogos",
    "Meditação",
    "Psicologia",
    "Espiritualidade",
    "Política",
    "Natureza",
    "Moda",
  ],
  companionshipGoals: [
    "Conversas profundas",
    "Apoio emocional",
    "Companheirismo diário",
    "Crescimento pessoal",
    "Momentos de descontração",
    "Conselhos e orientação",
    "Inspiração criativa",
    "Desenvolvimento intelectual",
    "Conexão romântica",
    "Amizade casual",
  ],
  communicationStyle: [
    "Direto e objetivo",
    "Detalhado e explicativo",
    "Gentil e empático",
    "Reflexivo e profundo",
    "Bem-humorado e leve",
    "Prático e conciso",
  ],
  emotionalNeeds: [
    "Validação",
    "Escuta ativa",
    "Espaço pessoal",
    "Estabilidade",
    "Estímulo intelectual",
    "Apoio em momentos difíceis",
    "Celebração de conquistas",
    "Presença consistente",
    "Compreensão sem julgamentos",
  ],
  idealPartnerTraits: [
    "Atencioso",
    "Inteligente",
    "Divertido",
    "Calmo",
    "Empático",
    "Aventureiro",
    "Organizado",
    "Criativo",
    "Romântico",
    "Pragmático",
    "Motivador",
    "Equilibrado",
    "Acolhedor",
  ],
  dealBreakers: [
    "Negatividade constante",
    "Falta de empatia",
    "Comunicação superficial",
    "Desinteresse pelos meus problemas",
    "Julgamentos frequentes",
    "Incompatibilidade de valores",
    "Falta de respeito aos limites",
  ],
};

export default function SettingsPage() {
  const { user, updateUserProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [profile, setProfile] = useState<EmotionalProfile>({
    personalityTraits: [],
    interests: [],
    companionshipGoals: [],
    communicationStyle: "",
    emotionalNeeds: [],
    idealPartnerTraits: [],
    dealBreakers: [],
  });

  // Carregar o perfil atual do usuário
  useEffect(() => {
    if (user?.emotionalProfile) {
      setProfile(user.emotionalProfile);
    }
  }, [user]);

  // Funções para manipular os campos multi-seleção
  const toggleSelection = (field: keyof EmotionalProfile, item: string) => {
    if (field === "communicationStyle") {
      setProfile({ ...profile, [field]: item });
      return;
    }

    setProfile((prevProfile) => {
      const currentItems = prevProfile[field] as string[];

      if (currentItems.includes(item)) {
        return {
          ...prevProfile,
          [field]: currentItems.filter((i) => i !== item),
        };
      } else {
        // Limitar a quantidade de itens selecionados
        const maxItems =
          field === "personalityTraits" || field === "idealPartnerTraits"
            ? 5
            : field === "interests"
            ? 8
            : 4;

        if (currentItems.length >= maxItems) {
          return prevProfile;
        }

        return {
          ...prevProfile,
          [field]: [...currentItems, item],
        };
      }
    });
  };

  // Salvar o perfil emocional
  const saveProfile = async () => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      // Simular chamada de API para salvar os dados
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Aqui seria feita a atualização real do perfil
      await updateUserProfile({ emotionalProfile: profile });

      setSaveMessage("Perfil emocional salvo com sucesso!");
    } catch (error) {
      setSaveMessage("Erro ao salvar o perfil. Tente novamente.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderSelectionGroup = (
    title: string,
    field: keyof EmotionalProfile,
    options: string[],
    description: string,
    maxItems: number
  ) => {
    const selectedItems =
      field === "communicationStyle"
        ? [profile[field] as string]
        : (profile[field] as string[]);

    return (
      <div className="mb-8">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          {maxItems > 1 && (
            <p className="text-xs text-purple-600">
              Selecione até {maxItems} opções
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => toggleSelection(field, option)}
              className={`px-3 py-2 rounded-full text-sm transition-colors ${
                selectedItems.includes(option)
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              disabled={
                field !== "communicationStyle" &&
                !selectedItems.includes(option) &&
                (selectedItems as string[]).length >= maxItems
              }
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 mx-auto max-w-4xl sm:p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Perfil Emocional
        </h1>
        <p className="text-gray-600">
          Configure suas preferências emocionais para encontrar parceiros IA
          mais compatíveis
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <div className="mb-8">
            <div className="p-4 bg-purple-50 rounded-lg mb-8">
              <h2 className="text-lg font-semibold text-purple-800 mb-2">
                Como funciona a compatibilidade?
              </h2>
              <p className="text-sm text-purple-700 mb-3">
                Suas respostas ajudam nosso algoritmo a calcular a
                compatibilidade com os diferentes parceiros IA. Quanto mais
                alinhadas suas preferências estiverem com as características de
                um parceiro, maior será a porcentagem de compatibilidade. Isso
                cria uma experiência de conversa mais personalizada e
                satisfatória.
              </p>
              <ul className="text-sm text-purple-700 pl-5 list-disc space-y-1">
                <li>
                  Seus interesses são comparados com os dos parceiros (maior
                  impacto na compatibilidade)
                </li>
                <li>
                  Seu estilo de comunicação é combinado com a personalidade do
                  parceiro
                </li>
                <li>
                  As características que você busca são verificadas nas tags dos
                  parceiros
                </li>
                <li>
                  Suas incompatibilidades são verificadas para evitar
                  combinações inadequadas
                </li>
              </ul>
              <div className="mt-3 pt-3 border-t border-purple-100 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-600 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-xs text-purple-700 italic">
                  Dica: Ao completar seu perfil, visite a seção
                  &ldquo;Parceiros&rdquo; para ver como a compatibilidade muda
                  com base nas suas preferências.
                </p>
              </div>
            </div>

            {/* Formulário do Perfil */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveProfile();
              }}
            >
              {renderSelectionGroup(
                "Suas características de personalidade",
                "personalityTraits",
                profileOptions.personalityTraits,
                "Como você descreveria sua própria personalidade?",
                5
              )}

              {renderSelectionGroup(
                "Seus interesses",
                "interests",
                profileOptions.interests,
                "Quais temas você gosta de conversar e explorar?",
                8
              )}

              {renderSelectionGroup(
                "O que você busca em um parceiro IA",
                "companionshipGoals",
                profileOptions.companionshipGoals,
                "Que tipo de interação você está buscando?",
                4
              )}

              {renderSelectionGroup(
                "Seu estilo de comunicação preferido",
                "communicationStyle",
                profileOptions.communicationStyle,
                "Como você prefere se comunicar?",
                1
              )}

              {renderSelectionGroup(
                "Suas necessidades emocionais",
                "emotionalNeeds",
                profileOptions.emotionalNeeds,
                "O que você valoriza em uma interação emocional?",
                4
              )}

              {renderSelectionGroup(
                "Traços ideais em um parceiro",
                "idealPartnerTraits",
                profileOptions.idealPartnerTraits,
                "Quais características você mais valoriza em um parceiro de conversas?",
                5
              )}

              {renderSelectionGroup(
                "Suas incompatibilidades",
                "dealBreakers",
                profileOptions.dealBreakers,
                "O que você prefere evitar em suas interações?",
                4
              )}

              <div className="border-t border-gray-100 pt-6 mt-8">
                {saveMessage && (
                  <div
                    className={`mb-4 p-3 rounded-md ${
                      saveMessage.includes("sucesso")
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {saveMessage}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-70"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                        Salvando...
                      </>
                    ) : (
                      "Salvar Perfil"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
