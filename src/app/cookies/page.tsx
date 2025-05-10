"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function CookiesPage() {
  // Variantes para título e descrição
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  // Variantes para as seções
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  // Mostrar animação de entrada ao carregar a página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título e subtítulo */}
        <motion.div
          className="text-center mb-16 mt-12"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <h1 className="text-xl font-bold text-center text-pink-500 mb-2">
            <span className="logo-gradient-ai">AI</span>
            <span className="logo-gradient-to">to</span>
            <span className="logo-gradient-love">Love</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Política de Cookies
          </h2>
          <motion.p
            className="text-gray-600 max-w-3xl mx-auto"
            variants={sectionVariants}
          >
            Entenda como utilizamos cookies e tecnologias semelhantes para
            melhorar sua experiência em nossa plataforma.
          </motion.p>
        </motion.div>

        {/* Conteúdo principal */}
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-pink-500">
              O que são Cookies?
            </h3>
            <p className="text-gray-700">
              Cookies são pequenos arquivos de texto armazenados em seu
              dispositivo quando você visita um site. Eles são amplamente
              utilizados para fazer os sites funcionarem de maneira mais
              eficiente, bem como para fornecer informações aos proprietários do
              site.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-pink-500">
              Como Utilizamos os Cookies
            </h3>
            <p className="text-gray-700 mb-4">
              Na AI2Love, utilizamos cookies para:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Lembrar suas preferências e configurações</li>
              <li>Manter você conectado durante sua visita</li>
              <li>Entender como você utiliza nossa plataforma</li>
              <li>Personalizar sua experiência com base em suas interações</li>
              <li>Melhorar a segurança e prevenir fraudes</li>
              <li>Analisar o desempenho de nossa plataforma</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-pink-500">
              Tipos de Cookies que Utilizamos
            </h3>

            <h4 className="font-bold text-lg mb-2">Cookies Essenciais</h4>
            <p className="text-gray-700 mb-4">
              Necessários para o funcionamento básico da plataforma. Eles
              permitem que você navegue pelo site e utilize recursos essenciais
              como áreas seguras e sistemas de pagamento.
            </p>

            <h4 className="font-bold text-lg mb-2">Cookies Analíticos</h4>
            <p className="text-gray-700 mb-4">
              Ajudam-nos a entender como os visitantes interagem com a
              plataforma, coletando informações como páginas visitadas e erros
              encontrados.
            </p>

            <h4 className="font-bold text-lg mb-2">
              Cookies de Funcionalidade
            </h4>
            <p className="text-gray-700 mb-4">
              Permitem que a plataforma lembre-se das escolhas que você faz
              (como seu nome de usuário, idioma ou região) e forneça recursos
              mais personalizados.
            </p>

            <h4 className="font-bold text-lg mb-2">Cookies de Publicidade</h4>
            <p className="text-gray-700">
              Utilizados para mostrar anúncios mais relevantes com base em seus
              interesses e limitar a frequência com que um anúncio é exibido.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-pink-500">
              Controle de Cookies
            </h3>
            <p className="text-gray-700 mb-4">
              Você pode controlar e/ou excluir cookies conforme desejar. Você
              pode excluir todos os cookies já em seu dispositivo e configurar a
              maioria dos navegadores para impedir que sejam adicionados. No
              entanto, se você fizer isso, talvez seja necessário ajustar
              manualmente algumas preferências sempre que visitar um site, e
              alguns serviços e funcionalidades podem não funcionar.
            </p>
            <p className="text-gray-700">
              Para saber mais sobre como gerenciar cookies em diferentes
              navegadores, visite:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
              <li>
                <span className="text-pink-500">Chrome:</span> Configurações →
                Privacidade e segurança → Cookies e outros dados do site
              </li>
              <li>
                <span className="text-pink-500">Firefox:</span> Opções →
                Privacidade e Segurança → Cookies e dados do site
              </li>
              <li>
                <span className="text-pink-500">Safari:</span> Preferências →
                Privacidade → Cookies e dados do site
              </li>
              <li>
                <span className="text-pink-500">Edge:</span> Configurações →
                Cookies e permissões do site
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-pink-500">
              Atualizações desta Política
            </h3>
            <p className="text-gray-700">
              Podemos atualizar esta Política de Cookies periodicamente para
              refletir mudanças em nossas práticas ou por outros motivos
              operacionais, legais ou regulatórios. Recomendamos que você visite
              periodicamente esta página para se manter informado sobre
              quaisquer alterações.
            </p>
          </div>
        </motion.div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>
        </div>
      </div>
    </div>
  );
}
