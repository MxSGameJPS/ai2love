import {
  getUserPreferences,
  updateUserPreferences,
  resetUserPreferences,
} from "@/services/api/preferencesService";
import { fetchApi } from "@/services/api/index";

// Mock do fetchApi
jest.mock("@/services/api/index", () => ({
  fetchApi: jest.fn(),
}));

describe("Preferences Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserPreferences", () => {
    it("deve chamar fetchApi para obter as preferências do usuário", async () => {
      // Preparação
      const mockPreferences = {
        theme: "light",
        notifications: {
          email: true,
          push: false,
          newMessages: true,
          marketing: false,
        },
        matchPreferences: {
          ageRange: [25, 35],
          interests: ["música", "viagens", "tecnologia"],
          personalityTraits: ["extrovertido", "criativo"],
        },
      };
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockPreferences);

      // Execução
      const result = await getUserPreferences();

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith("/api/v1/user/preferences");
      expect(result).toEqual(mockPreferences);
    });
  });

  describe("updateUserPreferences", () => {
    it("deve chamar fetchApi com as preferências atualizadas", async () => {
      // Preparação
      const updatedPreferences = {
        theme: "dark",
        notifications: {
          push: true,
        },
        matchPreferences: {
          interests: ["música", "tecnologia", "filmes"],
        },
      };
      const mockResponse = {
        success: true,
        message: "Preferências atualizadas com sucesso",
        preferences: {
          theme: "dark",
          notifications: {
            email: true,
            push: true,
            newMessages: true,
            marketing: false,
          },
          matchPreferences: {
            ageRange: [25, 35],
            interests: ["música", "tecnologia", "filmes"],
            personalityTraits: ["extrovertido", "criativo"],
          },
        },
      };
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Execução
      const result = await updateUserPreferences(updatedPreferences);

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith("/api/v1/user/preferences", {
        method: "PATCH",
        body: JSON.stringify(updatedPreferences),
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("resetUserPreferences", () => {
    it("deve chamar fetchApi para resetar as preferências do usuário", async () => {
      // Preparação
      const mockResponse = {
        success: true,
        message: "Preferências resetadas para valores padrão",
        preferences: {
          theme: "light",
          notifications: {
            email: true,
            push: true,
            newMessages: true,
            marketing: true,
          },
          matchPreferences: {
            ageRange: [18, 65],
            interests: [],
            personalityTraits: [],
          },
        },
      };
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Execução
      const result = await resetUserPreferences();

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith("/api/v1/user/preferences/reset", {
        method: "POST",
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
