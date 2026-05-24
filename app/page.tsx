"use client"
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TableComponent from "@/components/Table";
import DrawerAppBar from "@/components/NavBar";
import type { FocoQueimada } from "./api/queimadas/route";

export default function Home() {
  const [queimadas, setQueimadas] = useState<FocoQueimada[]>([]);
  const [loading, setLoading] = useState(true);

    // 1. Busca os dados uma única vez para o site todo
    useEffect(() => {
      const load = async () => {
        try {
          const res = await fetch("/api/queimadas");
          const data = await res.json();
          setQueimadas(data);
        } catch (err) {
          console.error("Erro ao buscar dados:", err);
        } finally {
          setLoading(false);
        }
      };
      load();
    }, []);
    // Função para gerar e baixar o relatório em CSV com os dados atuais
const handleDownloadReport = () => {
  if (!queimadas || queimadas.length === 0) {
    alert("Nenhum dado disponível para exportação no momento.");
    return;
  }

  // 1. Define o cabeçalho do arquivo CSV
  const headers = ["Municipio", "Estado", "Bioma"];
  
  // 2. Converte as linhas de dados do estado para o formato CSV
  const rows = queimadas.map(foco => [
    `"${foco.municipio}"`,
    `"${foco.estado}"`,
    `"${foco.bioma}"`
  ]);

  // 3. Junta tudo quebrando linhas, usando o caractere BOM (\uFEFF) para garantir acentuação correta no Excel
  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  
  // 4. Cria o arquivo virtual e dispara o download no navegador
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  link.setAttribute("href", url);
  link.setAttribute("download", `relatorio_queimadas_brasil_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
  return (
    <div className="w-full min-h-screen bg-[#090a0f] text-white overflow-x-hidden">
    <DrawerAppBar />
    <Header onDownload={handleDownloadReport}/>
    <TableComponent queimadas={queimadas} loading={loading}/>
    <Footer/>
  </div>
  );
}
