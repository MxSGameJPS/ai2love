import {
  render,
  act,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import * as authService from "@/services/api/authService";

// Mock dos serviços de API
jest.mock("@/services/api/authService", () => ({
  login: jest.fn(),
  register: jest.fn(),
  verifyEmail: jest.fn(),
  requestPasswordReset: jest.fn(),
  selectPlan: jest.fn(),
}));

// Componente de wrapper para testes
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

// Componente de teste para testar o hook useAuth
const TestComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? "Autenticado" : "Não autenticado"}
      </div>
      {user && <div data-testid="user-name">{user.name}</div>}
      <button
        data-testid="login-button"
        onClick={() => login("teste@email.com", "Senha123")}
      >
        Login
      </button>
      <button data-testid="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    // Limpar mocks
    jest.clearAllMocks();
    // Limpar localStorage antes de cada teste
    localStorage.clear();
  });

  it("deve inicializar com o usuário não autenticado", () => {
    render(<TestComponent />, { wrapper: Wrapper });
    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "Não autenticado"
    );
  });

  it("deve carregar o estado de autenticação do localStorage", () => {
    // Configurar um usuário no localStorage
    const mockUser = {
      id: "user-id",
      name: "Usuário Teste",
      email: "teste@email.com",
      emailVerified: true,
    };
    localStorage.setItem("authToken", "token-teste");
    localStorage.setItem("user", JSON.stringify(mockUser));

    render(<TestComponent />, { wrapper: Wrapper });

    // Verificar se o usuário foi carregado corretamente
    expect(screen.getByTestId("auth-status")).toHaveTextContent("Autenticado");
    expect(screen.getByTestId("user-name")).toHaveTextContent("Usuário Teste");
  });

  it("deve autenticar o usuário quando login é bem-sucedido", async () => {
    // Mock da resposta de login
    const mockUser = {
      id: "user-id",
      name: "Usuário Teste",
      email: "teste@email.com",
      emailVerified: true,
    };
    const mockResponse = {
      token: "token-teste",
      user: mockUser,
    };
    (authService.login as jest.Mock).mockResolvedValue(mockResponse);

    // Renderizar componente
    render(<TestComponent />, { wrapper: Wrapper });

    // Clicar no botão de login
    await userEvent.click(screen.getByTestId("login-button"));

    // Verificar se o método login foi chamado
    expect(authService.login).toHaveBeenCalledWith(
      "teste@email.com",
      "Senha123"
    );

    // Verificar se o estado foi atualizado após login
    await waitFor(() => {
      expect(screen.getByTestId("auth-status")).toHaveTextContent(
        "Autenticado"
      );
      expect(screen.getByTestId("user-name")).toHaveTextContent(
        "Usuário Teste"
      );
    });

    // Verificar se os dados foram salvos no localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "authToken",
      "token-teste"
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "user",
      JSON.stringify(mockUser)
    );
  });

  it("deve deslogar o usuário quando logout é chamado", async () => {
    // Configurar um usuário no localStorage
    const mockUser = {
      id: "user-id",
      name: "Usuário Teste",
      email: "teste@email.com",
      emailVerified: true,
    };
    localStorage.setItem("authToken", "token-teste");
    localStorage.setItem("user", JSON.stringify(mockUser));

    // Renderizar componente
    render(<TestComponent />, { wrapper: Wrapper });

    // Verificar estado inicial
    expect(screen.getByTestId("auth-status")).toHaveTextContent("Autenticado");

    // Clicar no botão de logout
    await userEvent.click(screen.getByTestId("logout-button"));

    // Verificar se o estado foi atualizado após logout
    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "Não autenticado"
    );

    // Verificar se os dados foram removidos do localStorage
    expect(localStorage.removeItem).toHaveBeenCalledWith("authToken");
    expect(localStorage.removeItem).toHaveBeenCalledWith("user");
  });

  it("deve fornecer a função de registro que chama o serviço de API correto", async () => {
    // Mock da resposta de registro
    const mockResponse = {
      success: true,
      userId: "user-id",
    };
    (authService.register as jest.Mock).mockResolvedValue(mockResponse);

    // Renderizar hook usando o wrapper
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });

    // Chamar a função de registro
    let registerResult;
    await act(async () => {
      registerResult = await result.current.register(
        "Usuário Teste",
        "teste@email.com",
        "Senha123",
        "123.456.789-00",
        true,
        "1990-01-01"
      );
    });

    // Verificar se o método register foi chamado com os parâmetros corretos
    expect(authService.register).toHaveBeenCalledWith(
      "Usuário Teste",
      "teste@email.com",
      "Senha123",
      "123.456.789-00",
      true,
      "1990-01-01"
    );

    // Verificar se o resultado é o esperado
    expect(registerResult).toEqual({ success: true, userId: "user-id" });
  });

  it("deve fornecer a função de verificação de email que chama o serviço de API correto", async () => {
    // Mock da resposta de verificação de email
    const mockResponse = {
      success: true,
      message: "Email verificado com sucesso",
    };
    (authService.verifyEmail as jest.Mock).mockResolvedValue(mockResponse);

    // Renderizar hook usando o wrapper
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });

    // Chamar a função de verificação de email
    let verifyResult;
    await act(async () => {
      verifyResult = await result.current.verifyEmail("token-verificacao");
    });

    // Verificar se o método verifyEmail foi chamado com os parâmetros corretos
    expect(authService.verifyEmail).toHaveBeenCalledWith("token-verificacao");

    // Verificar se o resultado é o esperado
    expect(verifyResult).toBe(true);
  });
});
