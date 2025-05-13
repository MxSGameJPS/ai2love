import {
  createPaymentSession,
  getPaymentStatus,
  getPaymentHistory,
} from "@/services/api/paymentService";
import { fetchApi } from "@/services/api/index";

// Mock do fetchApi
jest.mock("@/services/api/index", () => ({
  fetchApi: jest.fn(),
}));

describe("Payment Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createPaymentSession", () => {
    it("deve chamar fetchApi com os dados de pagamento corretos", async () => {
      // Preparação
      const planId = "premium_monthly";
      const mockResponse = {
        success: true,
        sessionId: "sess_12345",
        url: "https://checkout.stripe.com/pay/cs_test_12345",
      };
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Execução
      const result = await createPaymentSession(planId);

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith("/api/v1/payment/create-session", {
        method: "POST",
        body: JSON.stringify({ planId }),
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPaymentStatus", () => {
    it("deve chamar fetchApi com o ID da sessão de pagamento correto", async () => {
      // Preparação
      const sessionId = "sess_12345";
      const mockResponse = {
        success: true,
        status: "complete",
        planId: "premium_monthly",
        customerId: "cus_12345",
      };
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Execução
      const result = await getPaymentStatus(sessionId);

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith(
        `/api/v1/payment/status/${sessionId}`
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getPaymentHistory", () => {
    it("deve chamar fetchApi para obter o histórico de pagamentos", async () => {
      // Preparação
      const mockResponse = {
        success: true,
        payments: [
          {
            id: "pay_12345",
            amount: 2990,
            currency: "brl",
            status: "succeeded",
            created: new Date().toISOString(),
            planId: "premium_monthly",
          },
          {
            id: "pay_67890",
            amount: 2990,
            currency: "brl",
            status: "succeeded",
            created: new Date().toISOString(),
            planId: "premium_monthly",
          },
        ],
      };
      (fetchApi as jest.Mock).mockResolvedValueOnce(mockResponse);

      // Execução
      const result = await getPaymentHistory();

      // Verificação
      expect(fetchApi).toHaveBeenCalledWith("/api/v1/payment/history");
      expect(result).toEqual(mockResponse);
    });
  });
});
