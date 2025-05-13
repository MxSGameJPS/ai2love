# Ai2Love - Aplicativo Web de Relacionamentos com IA

Este projeto é uma aplicação web para criar conexões significativas com parceiros virtuais de IA, desenvolvida com Next.js.

## Integração com API

A aplicação está totalmente integrada com a API externa em `https://api.aitolove.app`, com os seguintes endpoints:

### Autenticação

- **Login**: `/api/v1/user/login` - Autenticação de usuários
- **Registro**: `/api/v1/user/register` - Registro de novos usuários
- **Verificação de Email**: `/api/v1/user/verify-email/:token` - Verifica o email do usuário
- **Esqueci a Senha**: `/api/v1/user/forgot-password` - Solicita redefinição de senha
- **Redefinir Senha**: `/api/v1/user/reset-password/:token` - Redefine a senha com token

### Planos e Pagamentos

- **Planos**: `/api/v1/plan` - Obtém todos os planos disponíveis
- **Pagamentos**: `/api/v1/payment` - Processa pagamentos para mudança de plano

### Preferências

- **Preferências do Usuário**: `/api/v1/preferences` - Salva e obtém preferências pessoais

### Parceiros e Chat

- **Parceiros**: `/api/v1/partner` - Lista todos os parceiros IA disponíveis
- **Detalhes do Parceiro**: `/api/v1/partner/:id` - Obtém detalhes de um parceiro específico
- **Compatibilidade**: `/api/v1/partner/:id/compatibility` - Calcula compatibilidade com parceiro
- **Histórico de Chat**: `/api/v1/chat/:partnerId/history` - Obtém conversas anteriores
- **Envio de Mensagem**: `/api/v1/chat/:partnerId/message` - Envia mensagem para um parceiro

## Sistema de Fallback

A aplicação possui um sistema de fallback robusto que permite que o sistema continue funcionando mesmo quando a API estiver indisponível:

1. **Dados Simulados**: A aplicação usa dados simulados quando os endpoints da API não estão disponíveis
2. **Armazenamento Local**: Mantém dados do usuário localmente para operações offline
3. **Tentativas Automáticas**: Tenta usar a API primeiro e recorre ao fallback apenas quando necessário

## Páginas Principais

- **Home**: Página inicial com informações sobre o aplicativo
- **Registro/Login**: Sistema completo de autenticação
- **Planos**: Exibe os planos disponíveis com preços obtidos da API
- **Dashboard**: Área do usuário logado
  - **Perfil**: Gerenciamento de perfil e assinatura
  - **Parceiros**: Lista de parceiros IA disponíveis
  - **Chat**: Interface de conversação com parceiros IA
  - **Configurações**: Preferências de conversa e personalização

## Tecnologias

- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática para código mais seguro
- **Tailwind CSS**: Framework CSS para estilização
- **Context API**: Gerenciamento de estado global

## Como Executar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o servidor de desenvolvimento: `npm run dev`
4. Acesse `http://localhost:3000`

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
