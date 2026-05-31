import React from "react";

interface CardProps{
    local: string;
    quantidade: number;
}
const Card = ({ local, quantidade }: CardProps) => {
  if (quantidade === 0) return null; // Simplificado o short-circuit render

  return (
    <div
  data-aos="fade-up"
  className="w-[155px] h-[155px] sm:w-[180px] sm:h-[180px] lg:w-[220px] lg:h-[220px] 
             bg-slate-900/60 backdrop-blur-sm 
             border border-slate-800/80 hover:border-orange-500/40
             text-white flex flex-col justify-between items-center 
             p-4 m-2 rounded-2xl shadow-xl 
             transition-all duration-300 ease-out group 
             hover:transform hover:transition-transform transform-gpu will-change-transform"
>
      {/* Nome do Local */}
      <h3 className="uppercase text-center text-xs sm:text-sm font-semibold tracking-wider text-slate-400 group-hover:text-white transition-colors h-10 flex items-center justify-center text-wrap px-1">
        {local}
      </h3>
      
      {/* Quantidade em Destaque Alerta */}
      <div className="flex flex-col items-center justify-center my-auto">
        <p className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight bg-linear-to-b from-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(239,68,68,0.15)]">
          {quantidade}
        </p>
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium mt-1">
          focos
        </span>
      </div>
      
      {/* Sutil detalhe inferior decorativo que acende no hover */}
      <div className="w-8 h-0.5 bg-slate-800 group-hover:w-16 group-hover:bg-orange-500 transition-all duration-300 rounded-full" />
    </div>
  );
};
export default Card;