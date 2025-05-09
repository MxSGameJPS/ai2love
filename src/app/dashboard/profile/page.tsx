"use client";

import { useState, useRef, ChangeEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: checked,
        },
      });
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
