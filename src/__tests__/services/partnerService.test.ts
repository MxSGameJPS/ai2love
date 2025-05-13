import {
  getAvailablePartners,
  getPartnerById,
  getMessageHistory,
  sendMessage,
} from "@/services/api/partnerService";
import { fetchApi } from "@/services/api/index";

// Mock do fetchApi
jest.mock("@/services/api/index", () => ({
  fetchApi: jest.fn(),
}));

describe("Partner Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAvailablePartners", () => {
    it("deve chamar fetchApi com o endpoint correto", async () => {
      // Preparação
      const mockResponse = {
        success: true,
        partners: [
          { id: "1", name: "Parceiro 1" },
          { id: "2", name: "Parceiro 2" },
        ],
      };
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Execução
      const result = await getAvailablePartners();

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith("/api/v1/partner", {
        method: "GET",
      });
      expect(result).toEqual(mockResponse.partners);
    });

    it("deve retornar array vazio quando a resposta não é bem-sucedida", async () => {
      // Preparação
      const mockResponse = {
        success: false,
        partners: [],
        message: "Erro ao buscar parceiros",
      };
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Execução
      const result = await getAvailablePartners();

      // Verificação
      expect(result).toEqual([]);
    });
  });

  describe("getPartnerById", () => {
    it("deve chamar fetchApi com o ID do parceiro correto", async () => {
      // Preparação
      const partnerId = "123";
      const mockResponse = {
        success: true,
        partner: { id: partnerId, name: "Parceiro Teste" },
      };
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Execução
      const result = await getPartnerById(partnerId);

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith(`/api/v1/partner/${partnerId}`, {
        method: "GET",
      });
      expect(result).toEqual(mockResponse.partner);
    });

    it("deve retornar null quando a resposta não é bem-sucedida", async () => {
      // Preparação
      const partnerId = "123";
      const mockResponse = {
        success: false,
        message: "Parceiro não encontrado",
      };
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Execução
      const result = await getPartnerById(partnerId);

      // Verificação
      expect(result).toBeNull();
    });
  });

  describe("getMessageHistory", () => {
    it("deve chamar fetchApi com o ID do parceiro correto para buscar histórico de mensagens", async () => {
      // Preparação
      const partnerId = "123";
      const page = 1;
      const limit = 20;
      const mockMessages = [
        { id: "1", content: "Olá", sender: "user" },
        { id: "2", content: "Como vai?", sender: "partner" },
      ];
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockMessages);

      // Execução
      const result = await getMessageHistory(partnerId);

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith(
        `/api/v1/chat/${partnerId}/history`,
        {
          method: "GET",
          headers: {
            "X-Page": "1",
            "X-Limit": "20",
          },
        }
      );
      expect(result).toEqual(mockMessages);
    });

    it("deve chamar fetchApi com parâmetros de paginação personalizados", async () => {
      // Preparação
      const partnerId = "123";
      const page = 2;
      const limit = 10;
      const mockMessages = [
        { id: "3", content: "Terceira mensagem", sender: "user" },
      ];
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockMessages);

      // Execução
      const result = await getMessageHistory(partnerId, page, limit);

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith(
        `/api/v1/chat/${partnerId}/history`,
        {
          method: "GET",
          headers: {
            "X-Page": "2",
            "X-Limit": "10",
          },
        }
      );
      expect(result).toEqual(mockMessages);
    });
  });

  describe("sendMessage", () => {
    it("deve chamar fetchApi com o endpoint e payload corretos", async () => {
      // Preparação
      const partnerId = "123";
      const message = "Olá, como vai?";
      const mockResponse = {
        id: "1",
        content: message,
        sender: "user",
        timestamp: new Date().toISOString(),
      };
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Execução
      const result = await sendMessage(partnerId, message);

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith(
        `/api/v1/chat/${partnerId}/message`,
        {
          method: "POST",
          body: JSON.stringify({ message }),
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
