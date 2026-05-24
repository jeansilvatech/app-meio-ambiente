"use client";
import { useEffect } from "react";
import TableClient from "./TableClient";
import iconBrasil from '../../public/mapa-do-brasil.png';
import iconBioma from '../../public/bioma.svg';
import Image from "next/image";

import AOS from 'aos';

import 'aos/dist/aos.css'; // You can also use <link> for styles
import Card from "../Card";
// ..
import type { FocoQueimada } from "../../app/api/queimadas/route";
interface TableProps {
  queimadas: FocoQueimada[];
  loading: boolean;
}
const estadosBR = [
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia", 
  "Ceará",
  "Distrito Federal",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondônia",
  "Roraima",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins",
]
const biomasBR = [
  "Amazônia",
  "Cerrado",
  "Mata Atlântica",
  "Caatinga",
  "Pampa",
]

export default function TableComponent({ queimadas, loading }: TableProps) {
 
  useEffect(() => {
    AOS.init({ duration: 600, once: true }); // Ajustado para carregar de forma mais suave e direta
  }, []);

  // Skeleton/Loading elegante combinando com o tema escuro
  if (loading) {
    return (
      <div className="w-full min-h-[400px] flex flex-col justify-center items-center bg-[#090a0f] text-slate-400 gap-3">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium tracking-widest uppercase animate-pulse">Sincronizando dados ambientais...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#090a0f] text-white py-16 flex flex-col items-center px-4 md:px-8 relative overflow-hidden">
      
      {/* Luz de fundo para quebrar o fundo totalmente preto */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl w-full z-10 space-y-24">
        
        {/* SEÇÃO: ESTADOS */}
        <section className="flex flex-col items-center">
          <h2 id="Estados" className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center mb-12 flex flex-col sm:flex-row items-center gap-3">
            <span>Focos Ativos por Estado</span>
            <span className="text-xs font-semibold uppercase tracking-widest bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1 rounded-full shadow-lg">
              Hoje
            </span>
          </h2>
          
          <div className="w-full flex justify-center items-center lg:gap-8 gap-4 flex-col lg:flex-row bg-slate-950/30 border border-slate-900 rounded-3xl p-6 lg:p-10 backdrop-blur-sm">
            <div className="shrink-0 bg-slate-900/20 p-4 rounded-2xl ">
              <Image unoptimized data-aos="fade-right" className="opacity-80 brightness-90 grayscale hover:grayscale-0 transition-all duration-500" src={iconBrasil} alt="Mapa do Brasil" width={260} height={260} />
            </div>
            
            <div className="flex flex-wrap justify-center items-center w-full">
              {estadosBR.map((estado) => {
                const count = queimadas.filter(q => q.estado === estado.toUpperCase()).length;
                return <Card key={estado} local={estado} quantidade={count} />;
              })}
            </div>
          </div>
        </section>

        {/* SEÇÃO: BIOMAS */}
        <section className="flex flex-col items-center">
          <h2 id="Biomas" className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center mb-12 flex flex-col sm:flex-row items-center gap-3">
            <span>Distribuição por Bioma</span>
            <span className="text-xs font-semibold uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full shadow-lg">
              Hoje
            </span>
          </h2>
          
          <div className="w-full flex justify-center items-center lg:gap-8 gap-4 flex-col lg:flex-row-reverse bg-slate-950/30 border border-slate-900 rounded-3xl p-6 lg:p-10 backdrop-blur-sm">
            <div className="shrink-0 bg-slate-900/20 p-4 rounded-2xl ">
              <Image unoptimized data-aos="fade-left" className="brightness-90 grayscale hover:grayscale-0" src={iconBioma} alt="Ícone Biomas" width={240} height={240} />
            </div>
            
            <div className="flex flex-wrap justify-center items-center w-full">
              {biomasBR.map((bioma) => {
                const count = queimadas.filter(q => q.bioma === bioma).length;
                return <Card key={bioma} local={bioma} quantidade={count} />;
              })}
            </div>
          </div>
        </section>

        {/* MENSAGEM CASO VAZIO */}
        {queimadas.length === 0 && (
          <div className="w-full p-8 rounded-xl bg-slate-900/20 border border-slate-800 text-center text-slate-400 text-sm tracking-wide">
            Nenhum foco de incêndio registrado nas últimas horas.
          </div>
        )}

        {/* SEÇÃO: MUNICÍPIOS / TABELA */}
        <section className="flex flex-col items-center pt-6">
          <h2 id="Municipios" className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center mb-8 flex flex-col sm:flex-row items-center gap-3">
            <span>Registros por Município</span>
            <span className="text-xs font-semibold uppercase tracking-widest bg-orange-500/10 border border-orange-500/30 text-orange-400 px-3 py-1 rounded-full shadow-lg">
              Painel Geral
            </span>
          </h2>
          
          <div className="w-full bg-slate-950/40 border border-slate-900 rounded-2xl p-4 md:p-6 shadow-2xl overflow-x-auto">
            <TableClient queimadas={queimadas} />
          </div>
        </section>

      </div>
    </div>
  );
}