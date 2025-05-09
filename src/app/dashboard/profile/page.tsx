"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Formulário
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    bio: "Olá! Estou buscando conexões significativas através da AI to Love.",
    interests: ["Música", "Livros", "Filmes", "Viagens"],
    preferences: {
      notifications: true,
      emailUpdates: true,
      darkMode: false,
    },
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  // Mapeamento de planos para valores mensais (simulados)
  const planPrices = {
    basic: "R$ 19,90",
    premium: "R$ 49,90",
    vip: "R$ 99,90",
  };

  // Função para lidar com upgrade do plano
  const handlePlanUpgrade = async (newPlan: "basic" | "premium" | "vip") => {
    // Simular que o atual não pode fazer upgrade para o mesmo plano
    if (user?.plan === newPlan) {
      setSubscriptionMessage({
        type: "error",
        text: "Você já está inscrito neste plano.",
      });
      return;
    }

    try {
      setIsSubscriptionLoading(true);
      setSubscriptionMessage(null);

      // Simular uma chamada para API de checkout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // URL de checkout simulada
      const checkoutUrl = `https://checkout.ai2love.com/upgrade?plan=${newPlan}&user=${user?.id}`;

      // Abrir a URL de checkout em uma nova janela/aba
      window.open(checkoutUrl, "_blank");

      setSubscriptionMessage({
        type: "success",
        text: "Redirecionando para o checkout. Complete o pagamento para ativar seu novo plano.",
      });
    } catch (error) {
      console.error("Erro ao processar upgrade:", error);
      setSubscriptionMessage({
        type: "error",
        text: "Ocorreu um erro ao processar seu pedido. Tente novamente.",
      });
    } finally {
      setIsSubscriptionLoading(false);
    }
  };

  // Função para cancelar assinatura
  const handleCancelSubscription = async () => {
    try {
      setIsSubscriptionLoading(true);
      setSubscriptionMessage(null);

      // Simular uma chamada para API de cancelamento
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setShowCancelConfirm(false);
      setSubscriptionMessage({
        type: "success",
        text: "Sua assinatura foi cancelada com sucesso. Você continuará tendo acesso até o final do período faturado.",
      });
    } catch (error) {
      console.error("Erro ao cancelar assinatura:", error);
      setSubscriptionMessage({
        type: "error",
        text: "Ocorreu um erro ao cancelar sua assinatura. Tente novamente.",
      });
    } finally {
      setIsSubscriptionLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      // Verificar se parent existe em formData e é um objeto
      const parentValue = formData[parent as keyof typeof formData];
      if (
        parentValue &&
        typeof parentValue === "object" &&
        !Array.isArray(parentValue)
      ) {
        setFormData({
          ...formData,
          [parent]: {
            ...parentValue,
            [child]: checked,
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: checked,
      });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      // Validar antes de salvar
      const newErrors: typeof errors = {};

      if (!formData.name.trim()) {
        newErrors.name = "Nome é obrigatório";
      }

      if (!formData.email) {
        newErrors.email = "Email é obrigatório";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email inválido";
      }

      if (formData.newPassword) {
        if (!formData.currentPassword) {
          newErrors.currentPassword =
            "Senha atual é obrigatória para alterar a senha";
        }

        if (formData.newPassword.length < 6) {
          newErrors.newPassword = "Nova senha deve ter pelo menos 6 caracteres";
        }

        if (formData.newPassword !== formData.confirmPassword) {
          newErrors.confirmPassword = "As senhas não coincidem";
        }
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        // Aqui você enviaria os dados para o servidor
        // Por enquanto, apenas simularemos o sucesso
        console.log("Dados atualizados com sucesso:", formData);
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleAddInterest = () => {
    const newInterest = prompt("Digite um novo interesse:");
    if (newInterest && !formData.interests.includes(newInterest)) {
      setFormData({
        ...formData,
        interests: [...formData.interests, newInterest],
      });
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((item) => item !== interest),
    });
  };

  const handleCancel = () => {
    // Resetar o formulário para os valores originais
    setFormData({
      ...formData,
      name: user?.name || "",
      email: user?.email || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPreviewImage(null);
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl p-10 mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>
        <p className="text-gray-600">
          Gerencie suas informações pessoais e preferências
        </p>
      </div>

      {/* Seção de gerenciamento de assinatura */}
      <div className="overflow-hidden bg-white shadow-sm rounded-xl mb-8">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Minha Assinatura
          </h2>

          {subscriptionMessage && (
            <div
              className={`p-4 mb-6 rounded-md ${
                subscriptionMessage.type === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              <p>{subscriptionMessage.text}</p>
            </div>
          )}

          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold mb-2 capitalize">
                  {user?.plan || "Básico"}
                </h3>
                <p className="text-purple-100 mb-1">Plano atual</p>
                <p className="text-xl font-bold">
                  {
                    planPrices[
                      (user?.plan as keyof typeof planPrices) || "basic"
                    ]
                  }
                  /mês
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <p className="text-sm">Próxima cobrança</p>
                <p className="font-medium">15 de Outubro, 2023</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Atualizar plano
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Plano Básico */}
              <div
                className={`border rounded-lg p-4 ${
                  user?.plan === "basic"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
                } transition-all`}
              >
                <h4 className="font-bold text-gray-800 mb-1">Básico</h4>
                <p className="text-xl font-bold text-purple-600 mb-3">
                  {planPrices.basic}/mês
                </p>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  <li>• 30 conversas por mês</li>
                  <li>• 3 parceiros virtuais</li>
                  <li>• Suporte por email</li>
                </ul>

                <button
                  onClick={() => handlePlanUpgrade("basic")}
                  disabled={user?.plan === "basic" || isSubscriptionLoading}
                  className={`w-full py-2 px-3 rounded-md text-sm font-medium ${
                    user?.plan === "basic"
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  {user?.plan === "basic" ? "Plano Atual" : "Selecionar"}
                </button>
              </div>

              {/* Plano Premium */}
              <div
                className={`border rounded-lg p-4 ${
                  user?.plan === "premium"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
                } transition-all`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-800">Premium</h4>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    Popular
                  </span>
                </div>
                <p className="text-xl font-bold text-purple-600 mb-3">
                  {planPrices.premium}/mês
                </p>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  <li>• Conversas ilimitadas</li>
                  <li>• 8 parceiros virtuais</li>
                  <li>• Personalização avançada</li>
                  <li>• Suporte prioritário</li>
                </ul>

                <button
                  onClick={() => handlePlanUpgrade("premium")}
                  disabled={user?.plan === "premium" || isSubscriptionLoading}
                  className={`w-full py-2 px-3 rounded-md text-sm font-medium ${
                    user?.plan === "premium"
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  {user?.plan === "premium" ? "Plano Atual" : "Selecionar"}
                </button>
              </div>

              {/* Plano VIP */}
              <div
                className={`border rounded-lg p-4 ${
                  user?.plan === "vip"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
                } transition-all`}
              >
                <h4 className="font-bold text-gray-800 mb-1">VIP</h4>
                <p className="text-xl font-bold text-purple-600 mb-3">
                  {planPrices.vip}/mês
                </p>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  <li>• Conversas ilimitadas</li>
                  <li>• Acesso a todos os parceiros</li>
                  <li>• Personalização completa</li>
                  <li>• Suporte VIP 24/7</li>
                  <li>• Recursos exclusivos</li>
                </ul>

                <button
                  onClick={() => handlePlanUpgrade("vip")}
                  disabled={user?.plan === "vip" || isSubscriptionLoading}
                  className={`w-full py-2 px-3 rounded-md text-sm font-medium ${
                    user?.plan === "vip"
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  {user?.plan === "vip" ? "Plano Atual" : "Selecionar"}
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Cancelar assinatura
            </h3>
            {!showCancelConfirm ? (
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50"
              >
                Cancelar minha assinatura
              </button>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-gray-700 mb-3">
                  Tem certeza que deseja cancelar sua assinatura? Você perderá
                  acesso aos recursos premium ao final do período faturado.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancelSubscription}
                    disabled={isSubscriptionLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-70"
                  >
                    {isSubscriptionLoading ? (
                      <span className="flex items-center">
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
                        Processando...
                      </span>
                    ) : (
                      "Sim, cancelar assinatura"
                    )}
                  </button>
                  <button
                    onClick={() => setShowCancelConfirm(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
                    disabled={isSubscriptionLoading}
                  >
                    Não, manter assinatura
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow-sm rounded-xl">
        {/* Cabeçalho do perfil */}
        <div className="relative h-32 bg-gradient-to-r from-purple-500 to-pink-500">
          <div className="absolute -bottom-16 left-8">
            <div
              className="relative"
              onClick={isEditing ? handleImageClick : undefined}
            >
              <div className="w-32 h-32 overflow-hidden bg-white border-4 border-white rounded-full">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Prévia da foto de perfil"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-r from-purple-300 to-pink-300">
                    <span className="text-4xl font-bold text-white">
                      {user?.name?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
              </div>
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full cursor-pointer bg-black/30">
                  <span className="text-sm font-medium text-white">
                    Alterar foto
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                    aria-label="Selecionar foto de perfil"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-4 right-4">
            <button
              type="button"
              onClick={handleToggleEdit}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isEditing
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-white text-purple-600 hover:bg-purple-50"
              }`}
            >
              {isEditing ? "Salvar alterações" : "Editar perfil"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 ml-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>

        <div className="p-6 pt-20">
          <form>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 text-gray-700 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      !isEditing ? "bg-gray-50" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 text-gray-700 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      !isEditing ? "bg-gray-50" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Biografia
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      !isEditing ? "bg-gray-50" : ""
                    }`}
                  />
                </div>

                <div>
                  <span className="block mb-2 text-sm font-medium text-gray-700">
                    Interesses
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {formData.interests.map((interest, index) => (
                      <div
                        key={index}
                        className={`px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center ${
                          isEditing ? "pr-1" : ""
                        }`}
                      >
                        {interest}
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => handleRemoveInterest(interest)}
                            className="p-1 ml-1 text-purple-500 hover:text-purple-700"
                            aria-label={`Remover interesse ${interest}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-3 h-3"
                              aria-hidden="true"
                            >
                              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <button
                        type="button"
                        onClick={handleAddInterest}
                        className="px-3 py-1 text-sm text-purple-600 border border-purple-300 border-dashed rounded-full hover:bg-purple-50"
                      >
                        + Adicionar
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 mb-4 rounded-md bg-purple-50">
                  <h3 className="mb-1 font-medium text-purple-800">
                    Informações da conta
                  </h3>
                  <p className="mb-2 text-sm text-purple-600">
                    Status: <span className="font-medium">Ativo</span>
                  </p>
                  <p className="mb-2 text-sm text-purple-600">
                    Plano:{" "}
                    <span className="font-medium capitalize">
                      {user?.plan || "Básico"}
                    </span>
                  </p>
                  <p className="text-sm text-purple-600">
                    Membro desde:{" "}
                    <span className="font-medium">Julho 2023</span>
                  </p>
                </div>

                {isEditing && (
                  <>
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Senha atual
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 text-gray-700 border ${
                          errors.currentPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        placeholder="Digite para alterar a senha"
                      />
                      {errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.currentPassword}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Nova senha
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 text-gray-700 border ${
                          errors.newPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      />
                      {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.newPassword}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block mb-1 text-sm font-medium text-gray-700"
                      >
                        Confirmar senha
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 text-gray-700 border ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      />
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div>
                  <h3 className="mb-3 font-medium text-gray-700">
                    Preferências
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notificationsCheckbox"
                        name="preferences.notifications"
                        checked={formData.preferences.notifications}
                        onChange={handleCheckboxChange}
                        disabled={!isEditing}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <label
                        htmlFor="notificationsCheckbox"
                        className="block ml-2 text-sm text-gray-700"
                      >
                        Receber notificações no app
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emailUpdatesCheckbox"
                        name="preferences.emailUpdates"
                        checked={formData.preferences.emailUpdates}
                        onChange={handleCheckboxChange}
                        disabled={!isEditing}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <label
                        htmlFor="emailUpdatesCheckbox"
                        className="block ml-2 text-sm text-gray-700"
                      >
                        Receber atualizações por email
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="darkModeCheckbox"
                        name="preferences.darkMode"
                        checked={formData.preferences.darkMode}
                        onChange={handleCheckboxChange}
                        disabled={!isEditing}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <label
                        htmlFor="darkModeCheckbox"
                        className="block ml-2 text-sm text-gray-700"
                      >
                        Modo escuro (em breve)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
