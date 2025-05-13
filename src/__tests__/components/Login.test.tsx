import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '@/app/login/page';
import { AuthProvider } from '@/contexts/AuthContext';

// Mock do useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock para o hook useAuth
jest.mock('@/contexts/AuthContext', () => {
  const originalModule = jest.requireActual('@/contexts/AuthContext');
  return {
    ...originalModule,
    useAuth: () => ({
      login: jest.fn().mockImplementation(async () => true),
      user: null,
      isAuthenticated: false,
    }),
  };
});

// Mock para o componente Particles
jest.mock('react-tsparticles', () => ({
  __esModule: true,
  default: () => <div data-testid="particles-mock" />,
}));

// Mock para as funções de partículas
jest.mock('tsparticles-slim', () => ({
  loadSlim: jest.fn(),
}));

jest.mock('tsparticles-shape-heart', () => ({
  loadHeartShape: jest.fn(),
}));

describe('Componente Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o formulário de login corretamente', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    // Verificar elementos da página
    expect(screen.getByText('Bem-vindo de volta')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
    expect(screen.getByText('Lembrar de mim')).toBeInTheDocument();
    expect(screen.getByText('Esqueceu a senha?')).toBeInTheDocument();
  });

  it('deve mostrar erro quando email for inválido', async () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    // Preencher com email inválido
    await userEvent.type(screen.getByLabelText(/Email/i), 'email-invalido');
    await userEvent.type(screen.getByLabelText(/Senha/i), 'senha123');
    
    // Clicar no botão de entrar
    await userEvent.click(screen.getByText('Entrar'));
    
    // Verificar se a mensagem de erro aparece
    expect(screen.getByText('Email inválido')).toBeInTheDocument();
  });

  it('deve chamar a função de login quando o formulário é enviado com dados válidos', async () => {
    const { useAuth } = require('@/contexts/AuthContext');
    
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    // Preencher com dados válidos
    await userEvent.type(screen.getByLabelText(/Email/i), 'teste@email.com');
    await userEvent.type(screen.getByLabelText(/Senha/i), 'Senha123');
    
    // Clicar no botão de entrar
    await userEvent.click(screen.getByText('Entrar'));
    
    // Verificar se a função de login foi chamada
    await waitFor(() => {
      expect(useAuth().login).toHaveBeenCalledWith('teste@email.com', 'Senha123');
    });
  });

  it('deve exibir o estado de carregamento durante o processo de login', async () => {
    // Mock da função login que demora um pouco para resolver
    const { useAuth } = require('@/contexts/AuthContext');
    useAuth().login.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve(true), 100))
    );
    
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    // Preencher com dados válidos
    await userEvent.type(screen.getByLabelText(/Email/i), 'teste@email.com');
    await userEvent.type(screen.getByLabelText(/Senha/i), 'Senha123');
    
    // Clicar no botão de entrar
    await userEvent.click(screen.getByText('Entrar'));
    
    // Verificar se o texto de carregamento aparece
    expect(screen.getByText('Processando...')).toBeInTheDocument();
    
    // Verificar se após o carregamento o texto volta ao normal
    await waitFor(() => {
      expect(screen.queryByText('Processando...')).not.toBeInTheDocument();
      expect(screen.getByText('Entrar')).toBeInTheDocument();
    });
  });

  it('deve exibir erro quando o login falha', async () => {
    // Mock da função login que retorna false (falha)
    const { useAuth } = require('@/contexts/AuthContext');
    useAuth().login.mockImplementationOnce(async () => false);
    
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    // Preencher com dados válidos
    await userEvent.type(screen.getByLabelText(/Email/i), 'teste@email.com');
    await userEvent.type(screen.getByLabelText(/Senha/i), 'Senha123');
    
    // Clicar no botão de entrar
    await userEvent.click(screen.getByText('Entrar'));
    
    // Verificar se a mensagem de erro aparece
    await waitFor(() => {
      expect(screen.getByText('Email ou senha incorretos. Tente novamente.')).toBeInTheDocument();
    });
  });
}); 