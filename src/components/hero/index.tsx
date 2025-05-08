"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-b from-pink-100 to-purple-50 py-16 mt-0">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Coluna de texto */}
        <div className="md:w-1/2 text-center md:text-left">
          {/* Título com palavras em gradiente */}
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Encontre a <span className="logo-gradient-ai">companhia</span>
            <br />
            <span className="logo-gradient-love">perfeita</span> com IA
          </h1>

          {/* Descrição */}
          <p className="text-gray-700 mb-8 max-w-xl">
            Relacionamentos personalizados com inteligências artificiais que se
            adaptam às suas necessidades e desejos. Experimente uma nova forma
            de conexão.
          </p>

          {/* Botões de ação */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button className="px-6 py-3 text-white font-medium rounded-full btn-gradient-primary">
              Começar Agora
            </button>
            <button className="px-6 py-3 text-gray-700 font-medium rounded-full border border-gray-300 btn-gradient-secondary">
              Saiba Mais
            </button>
          </div>
        </div>

        {/* Coluna da imagem */}
        <div className="md:w-1/2 relative">
          <div className="rounded-lg overflow-hidden shadow-xl image-zoom">
            <Image
              src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Equipe trabalhando com tecnologia"
              width={1170}
              height={780}
              className="w-full"
            />

            {/* Chat overlay */}
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-4 rounded-lg flex items-center gap-4 max-w-md z-10">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
                  alt="Ana avatar"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "1/1" }}
                />
              </div>
              <div>
                <div className="font-medium">Ana, IA Companion</div>
                <div className="text-xs text-gray-300">Online agora</div>
                <p className="text-sm mt-2">
                  Estou animada para te conhecer melhor! Que tal me contar um
                  pouco sobre seu dia?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
