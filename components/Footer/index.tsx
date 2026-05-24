import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Captura o ano atual dinamicamente

  return (
    <footer className="w-full bg-[#090a0f] text-slate-400 border-t border-slate-900/80 py-10 mt-20 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Sutil brilho de fundo para o rodapé não ficar totalmente plano */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full px-4 flex flex-col items-center text-center gap-4 z-10">
        
        {/* Título Principal */}
        <p className="font-semibold text-slate-200 tracking-wide uppercase text-sm sm:text-base">
          Monitoramento de Queimadas no Brasil
        </p>
        
        {/* Créditos de Desenvolvimento */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-xs text-slate-500">
          <span>
            Desenvolvido por{" "}
            <span className="text-slate-400 font-medium hover:text-orange-400 transition-colors cursor-pointer">
              Jean Silva
            </span>
          </span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span>{currentYear}</span>
        </div>

        {/* Separador Customizado Interno (Substitua pelo seu <Separator/> se preferir) */}
        <div className="w-16 h-px bg-slate-800 my-2" />

        {/* Nota de Agradecimento / Fonte dos Dados */}
        <small className="max-w-md text-xs text-slate-500/90 leading-relaxed">
          Este site utiliza dados fornecidos pelo{" "}
          <a 
            href="https://queimadas.dgi.inpe.br/queimadas/portal" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-orange-500/70 hover:text-orange-400 hover:underline transition-colors font-medium"
          >
            BDQueimadas (INPE)
          </a>
          , a quem expressamos nossa gratidão pelo essencial apoio à transparência e à informação ambiental.
        </small>

      </div>
    </footer>
  );
};
export default Footer;