import {
  getAvailablePlans,
  getUserPlan,
  selectPlan,
} from "@/services/api/planService";
import { fetchApi } from "@/services/api/index";

// Mock do fetchApi
jest.mock("@/services/api/index", () => ({
  fetchApi: jest.fn(),
}));

describe("Plan Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAvailablePlans", () => {
    it("deve chamar fetchApi para obter planos disponíveis", async () => {
      // Preparação
      const mockPlans = [
        {
          id: "free",
          name: "Plano Gratuito",
          price: 0,
          features: [
            "Conversa com parceiros básicos",
            "Limite de 10 mensagens/dia",
          ],
        },
        {
          id: "premium_monthly",
          name: "Premium Mensal",
          price: 2990,
          features: [
            "Acesso a todos os parceiros",
            "Mensagens ilimitadas",
            "Conteúdo exclusivo",
          ],
        },
      ];
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockPlans);

      // Execução
      const result = await getAvailablePlans();

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith("/api/v1/plans");
      expect(result).toEqual(mockPlans);
    });
  });

  describe("getUserPlan", () => {
    it("deve chamar fetchApi para obter o plano do usuário", async () => {
      // Preparação
      const mockUserPlan = {
        planId: "premium_monthly",
        startDate: "2025-01-01T00:00:00.000Z",
        endDate: "2025-02-01T00:00:00.000Z",
        status: "active",
        features: [
          "Acesso a todos os parceiros",
          "Mensagens ilimitadas",
          "Conteúdo exclusivo",
        ],
      };
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockUserPlan);

      // Execução
      const result = await getUserPlan();

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith("/api/v1/user/plan");
      expect(result).toEqual(mockUserPlan);
    });
  });

  describe("selectPlan", () => {
    it("deve chamar fetchApi com o plano selecionado", async () => {
      // Preparação
      const planId = "premium_monthly";
      const mockResponse = {
        success: true,
        message: "Plano atualizado com sucesso",
        requiresPayment: true,
        paymentUrl: "https://checkout.stripe.com/pay/cs_test_12345",
      };
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Execução
      const result = await selectPlan(planId);

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith("/api/v1/user/select-plan", {
        method: "POST",
        body: JSON.stringify({ planId }),
      });
      expect(result).toEqual(mockResponse);
    });

    it("deve lidar com mudança para plano gratuito", async () => {
      // Preparação
      const planId = "free";
      const mockResponse = {
        success: true,
        message: "Plano atualizado com sucesso",
        requiresPayment: false,
      };
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Execução
      const result = await selectPlan(planId);

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith("/api/v1/user/select-plan", {
        method: "POST",
        body: JSON.stringify({ planId }),
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
