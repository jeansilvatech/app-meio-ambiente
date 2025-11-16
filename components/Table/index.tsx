"use client";
import { useEffect, useState } from "react";
import { FocoQueimada } from "@/app/api/queimadas/route";
import TableClient from "./TableClient";
import iconBrasil from '../../public/mapa-do-brasil.png';
import iconBioma from '../../public/bioma.svg';
import Image from "next/image";
import Separator from "../Separator";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
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
export default function TableComponent() {
  const [queimadas, setQueimadas] = useState<FocoQueimada[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/queimadas");
        const data = await res.json();
        setQueimadas(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);
useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror:true });
  }, []);
  if (loading) return <div>Carregando...</div>;

  return (
    <div className="w-full h-full py-4 text-[#71E4C0] flex justify-center items-center flex-col my-10">
      <h2 className="w-full text-center lg:text-4xl text-2xl mb-10">Numéro por estado <span className="bg-[#71E4C0] text-black px-4 py-2 rounded-2xl">Hoje</span> </h2>
      <div className="w-full flex justify-center items-center flex-wrap lg:px-10 px-4">
        <Image className="m-1" data-aos="fade-up" src={iconBrasil} alt="Mapa do Brasil" width={300} height={300} />
        {
        estadosBR.map((estado) => {
          const count = queimadas.filter(q => q.estado === estado.toUpperCase()).length;
          return <div key={estado} data-aos="fade-left" className="lg:w-[300px] lg:h-[300px] w-[150px] h-[150px] bg-[#71E4C0] text-black flex justify-center items-center flex-col border-2 m-1 rounded-2xl">
                      <h2 className="uppercase text-center text-wrap">{estado}</h2>
                      <p className="font-bold text-3xl lg:text-6xl">{count}</p>
                      <span>focos</span>      
                    </div>
        })
      }
      </div>
      <Separator/>
      <h2 className="w-full text-center lg:text-4xl text-2xl mb-10">Numéro por bioma <span className="bg-[#71E4C0] text-black px-4 py-2 rounded-2xl">Hoje</span> </h2>
       <div className="w-full flex justify-center items-center flex-wrap lg:px-10 px-4">
        <Image className="m-1" data-aos="fade-up" src={iconBioma} alt="Icone Biomas" width={300} height={300} />
        {
        biomasBR.map((bioma) => {
          const count = queimadas.filter(q => q.bioma === bioma).length;
          return <div key={bioma} data-aos="fade-right" className="lg:w-[300px] lg:h-[300px] w-[150px] h-[150px] bg-[#71E4C0] text-black flex justify-center items-center flex-col border-2 m-1 rounded-2xl">
                      <h2 className="uppercase text-center text-wrap">{bioma}</h2>
                      <p className="font-bold text-3xl lg:text-6xl">{count}</p>
                      <span>focos</span>      
                    </div>;
        })
      }
      </div>
      <Separator/>
      {queimadas.length === 0 && <p>Nenhum dado encontrado.</p>}
      <TableClient queimadas={queimadas} />
    </div>
  );
}