import {
  login,
  register,
  verifyEmail,
  requestPasswordReset,
} from "@/services/api/authService";
import { fetchApi } from "@/services/api/index";

// Mock do módulo index.ts que contém fetchApi
jest.mock("@/services/api/index", () => ({
  fetchApi: jest.fn(),
}));

describe("Serviço de Autenticação", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("deve chamar fetchApi com os parâmetros corretos", async () => {
      // Preparação
      const mockEmail = "teste@email.com";
      const mockPassword = "Senha123";
      const mockResponse = {
        token: "token-mock",
        user: {
          id: "user-id",
          name: "Usuário Teste",
          email: mockEmail,
          emailVerified: true,
        },
      };

      // Mock do fetchApi retornando a resposta esperada
      (fetchApi as jest.Mock).mockResolvedValue(mockResponse);

      // Execução
      const result = await login(mockEmail, mockPassword);

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith("/api/v1/user/login", {
        method: "POST",
        body: JSON.stringify({ email: mockEmail, password: mockPassword }),
      });
      expect(result).toEqual(mockResponse);
    });

    it("deve propagar erro se fetchApi falhar", async () => {
      // Preparação
      const mockEmail = "teste@email.com";
      const mockPassword = "Senha123";
      const mockError = new Error("Erro de autenticação");

      // Mock do fetchApi lançando um erro
      (fetchApi as jest.Mock).mockRejectedValue(mockError);

      // Execução e Verificação
      await expect(login(mockEmail, mockPassword)).rejects.toThrow(
        "Erro de autenticação"
      );
      expect(fetchApi).toHaveBeenCalledWith("/api/v1/user/login", {
        method: "POST",
        body: JSON.stringify({ email: mockEmail, password: mockPassword }),
      });
    });
  });

  describe("register", () => {
    it("deve chamar fetchApi com os parâmetros corretos", async () => {
      // Preparação
      const mockName = "Usuário Teste";
      const mockEmail = "teste@email.com";
      const mockPassword = "Senha123";
      const mockCPF = "123.456.789-00";
      const mockAcceptedTerms = true;
      const mockBirthdate = "1990-01-01";
      const mockResponse = {
        success: true,
        userId: "user-id",
      };

      // Mock do fetchApi retornando a resposta esperada
      (fetchApi as jest.Mock).mockResolvedValue(mockResponse);

      // Execução
      const result = await register(
        mockName,
        mockEmail,
        mockPassword,
        mockCPF,
        mockAcceptedTerms,
        mockBirthdate
      );

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith("/api/v1/user/register", {
        method: "POST",
        body: JSON.stringify({
          name: mockName,
          email: mockEmail,
          password: mockPassword,
          cpf: mockCPF,
          acceptedTermsAndConditions: mockAcceptedTerms,
          birthdate: mockBirthdate,
        }),
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("verifyEmail", () => {
    it("deve chamar fetchApi com os parâmetros corretos", async () => {
      // Preparação
      const mockToken = "token-verificacao-email";
      const mockResponse = {
        success: true,
        message: "Email verificado com sucesso",
      };

      // Mock do fetchApi retornando a resposta esperada
      (fetchApi as jest.Mock).mockResolvedValue(mockResponse);

      // Execução
      const result = await verifyEmail(mockToken);

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith(
        `/api/v1/user/verify-email/${mockToken}`,
        {
          method: "POST",
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("requestPasswordReset", () => {
    it("deve chamar fetchApi com os parâmetros corretos", async () => {
      // Preparação
      const mockEmail = "teste@email.com";
      const mockResponse = {
        success: true,
        message: "Email de recuperação enviado",
      };

      // Mock do fetchApi retornando a resposta esperada
      (fetchApi as jest.Mock).mockResolvedValue(mockResponse);

      // Execução
      const result = await requestPasswordReset(mockEmail);

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith("/api/v1/user/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: mockEmail }),
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
