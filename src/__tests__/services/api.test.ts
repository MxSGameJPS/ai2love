import { fetchApi } from "@/services/api/index";

// Mock para global fetch
global.fetch = jest.fn();

// Mock para localStorage
const localStorageMock = {
  getItem: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("API Utility", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
    localStorageMock.getItem.mockClear();
  });

  describe("fetchApi", () => {
    it("deve chamar fetch com a URL base e endpoint corretos", async () => {
      // Preparação
      const mockEndpoint = "/api/test";
      const mockResponse = { data: "teste" };
      const mockJsonPromise = Promise.resolve(mockResponse);
      const mockFetchPromise = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise,
      });
      (global.fetch as jest.Mock).mockImplementation(() => mockFetchPromise);

      // Execução
      const result = await fetchApi(mockEndpoint);

      // Verificação
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.aitolove.app/api/test",
        expect.objectContaining({
          headers: expect.any(Object),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it("deve incluir o token de autenticação nos cabeçalhos se disponível", async () => {
      // Preparação
      const mockToken = "token-mock";
      const mockEndpoint = "/api/test";
      const mockResponse = { data: "teste" };
      const mockJsonPromise = Promise.resolve(mockResponse);
      const mockFetchPromise = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise,
      });
      (global.fetch as jest.Mock).mockImplementation(() => mockFetchPromise);
      localStorageMock.getItem.mockImplementation(() => mockToken);

      // Execução
      await fetchApi(mockEndpoint);

      // Verificação
      expect(localStorageMock.getItem).toHaveBeenCalledWith("authToken");
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.aitolove.app/api/test",
        expect.objectContaining({
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            Authorization: `Bearer ${mockToken}`,
          }),
        })
      );
    });

    it("deve mesclar opções de requisição personalizadas com as padrões", async () => {
      // Preparação
      const mockEndpoint = "/api/test";
      const customOptions = {
        method: "POST",
        body: JSON.stringify({ teste: "dados" }),
        headers: {
          "X-Custom-Header": "valor personalizado",
        },
      };
      const mockResponse = { data: "teste" };
      const mockJsonPromise = Promise.resolve(mockResponse);
      const mockFetchPromise = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise,
      });
      (global.fetch as jest.Mock).mockImplementation(() => mockFetchPromise);

      // Execução
      await fetchApi(mockEndpoint, customOptions);

      // Verificação
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.aitolove.app/api/test",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ teste: "dados" }),
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            "X-Custom-Header": "valor personalizado",
          }),
        })
      );
    });

    it("deve lançar erro quando a resposta não for ok", async () => {
      // Preparação
      const mockEndpoint = "/api/test";
      const mockErrorMessage = "Erro no servidor";
      const mockErrorResponse = { message: mockErrorMessage };
      const mockJsonPromise = Promise.resolve(mockErrorResponse);
      const mockFetchPromise = Promise.resolve({
        ok: false,
        status: 500,
        json: () => mockJsonPromise,
      });
      (global.fetch as jest.Mock).mockImplementation(() => mockFetchPromise);

      // Execução e Verificação
      await expect(fetchApi(mockEndpoint)).rejects.toThrow(mockErrorMessage);
    });

    it("deve lançar erro com mensagem genérica quando a resposta de erro não tem formato JSON", async () => {
      // Preparação
      const mockEndpoint = "/api/test";
      const mockFetchPromise = Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error("Invalid JSON")),
      });
      (global.fetch as jest.Mock).mockImplementation(() => mockFetchPromise);

      // Execução e Verificação
      await expect(fetchApi(mockEndpoint)).rejects.toThrow(
        "Erro na requisição: 500"
      );
    });
  });
});
