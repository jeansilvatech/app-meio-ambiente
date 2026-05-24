import React from "react";
interface HeaderProps {
  onDownload: () => void;
}
const Header = ({ onDownload }: HeaderProps) => {
    // Função para rolar suavemente até a seção do mapa/tabela
const handleScrollToMap = () => {
  const element = document.getElementById("Municipios");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

  return (
    <header className="relative w-full min-h-screen flex items-center justify-center bg-[#090a0f] text-white overflow-hidden px-4 md:px-8 lg:px-16 py-20 lg:py-0">
      
      {/* Detalhe de luz de fundo (Glow/Ambience) para dar profundidade tema "fogo/alerta" */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Principal Adaptável */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
        
        {/* Bloco de Texto (Esquerda no Desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider w-fit mx-auto lg:mx-0 mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Dados em Tempo Real
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight">
            Monitoramento de Focos de{" "}
            <span className="bg-linear-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text text-transparent">
                Queimadas
            </span>{" "}
            e Incêndios Florestais no Brasil
        </h1>
          
          <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Plataforma interativa para análise, mapeamento e alertas de focos ativos de calor em todo o território nacional. Contribua para a preservação dos nossos biomas.
          </p>

          {/* Botões de Ação (Opcional, mas melhora muito o visual) */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button onClick={handleScrollToMap} className="px-6 py-3 cursor-pointer bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-orange-600/20 active:scale-95">
              Ver Mapa Interativo
            </button>
            <button onClick={onDownload} className="px-6 py-3 cursor-pointer bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium rounded-xl transition-all active:scale-95">
              Baixar Relatórios
            </button>
          </div>
        </div>

        {/* Bloco de Imagem/Gráfico/Mapa (Direita no Desktop) */}
        {/* Aqui entra sua classe `.header` que provavelmente carrega uma imagem ou mapa */}
        <div className="lg:col-span-5 w-full order-1 lg:order-2 flex justify-center">
          <div className="header w-full aspect-square max-w-[450px] lg:max-w-none rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm shadow-2xl relative overflow-hidden group">
            {/* Overlay sutil para integrar a imagem ao tema escuro */}
            <div className="absolute inset-0 bg-linear-to-t from-[#090a0f] via-transparent to-transparent opacity-60 pointer-events-none" />
            
            {/* Caso queira testar com uma imagem mock direto no Tailwind, descomente a linha abaixo */}
            {/* <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1602143407151-7111542de6e8')] bg-cover bg-center grayscale contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-700" /> */}
          </div>
        </div>

      </div>
    </header>
  );
};
export default Header;