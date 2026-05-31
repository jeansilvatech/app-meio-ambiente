"use client";
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FocoQueimada } from "@/app/api/queimadas/route";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react';
import { MapPin } from 'lucide-react';

import 'leaflet/dist/leaflet.css';

import iconFireUrl from '../../public/fire-icon.png';

interface MapContentProps {
    selectedFoco: FocoQueimada; 
    open: boolean;
}
const DynamicMapContent = dynamic<MapContentProps>(() => import('../Map/MapContent'), {
    ssr: false, 
    loading: () => <div className='text-white text-center animate-pulse flex flex-col justify-center items-center w-full h-full'><Image src={iconFireUrl} alt="Loading icon" width={32} height={32} /><span>Carregando mapa...</span></div>,
});

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '800px',
  height: '70vh',
  bgcolor: '#0c0e14',
  border: '1px solid rgba(249, 115, 22, 0.2)', 
  boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.6)',
  borderRadius: '16px',
  p: 4,
  outline: 'none',
};

export default function TableClient({ queimadas }: { queimadas: FocoQueimada[] }) {
  const [sortKey, setSortKey] = useState<keyof FocoQueimada | null>('municipio');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [selectedFoco, setSelectedFoco] = useState<FocoQueimada | null>(null);

  // 🔥 ESTADOS DA PAGINAÇÃO
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 15; // Altera a quantidade de linhas por página aqui

  const handleOpen = (focoData: FocoQueimada) => {
    setSelectedFoco(focoData);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSort = (key: keyof FocoQueimada) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reseta para a primeira página ao ordenar
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reseta para a primeira página ao pesquisar
  };

  // 1. Processa a filtragem e ordenação completa
  const sortedAndFilteredQueimadas = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    const filteredArray = queimadas.filter(foco =>
      foco.municipio.toLowerCase().includes(lowercasedSearchTerm) ||
      foco.estado.toLowerCase().includes(lowercasedSearchTerm) ||
      foco.bioma.toLowerCase().includes(lowercasedSearchTerm)
    );

    if (!sortKey) return filteredArray;

    const sortedArray = [...filteredArray];
    sortedArray.sort((a, b) => {
      const aValue = (a[sortKey] ?? "") as string;
      const bValue = (b[sortKey] ?? "") as string;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sortedArray;
  }, [queimadas, sortKey, sortDirection, searchTerm]);

  // 🔥 2. CORTA OS DADOS PARA CONTER APENAS OS DA PÁGINA ATUAL
  const totalPages = Math.ceil(sortedAndFilteredQueimadas.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAndFilteredQueimadas.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Rola de volta para o topo da listagem suavemente
    document.getElementById("Municipios")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Input de Pesquisa Estilizado */}
      <div className="mb-6 w-full flex justify-center px-2">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Pesquisar por Município, Estado ou Bioma..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 pl-5 bg-slate-900/60 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-xl focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all text-sm md:text-base backdrop-blur-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none uppercase tracking-widest hidden sm:inline">
            Filtrar
          </div>
        </div>
      </div>

      {/* Container da Tabela com Rolagem Responsiva Otimizada */}
      <div className="w-full lg:w-11/12 overflow-hidden rounded-xl border border-slate-900 bg-slate-950/20 backdrop-blur-sm shadow-xl">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs md:text-sm text-slate-300">
            
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4 cursor-pointer hover:text-orange-400 hover:bg-slate-800/40 transition-colors" onClick={() => handleSort('municipio')}>
                  <div className="flex items-center gap-2">
                    Município <span className="text-[10px] text-slate-500">{sortKey === 'municipio' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
                <th className="p-4 cursor-pointer hover:text-orange-400 hover:bg-slate-800/40 transition-colors" onClick={() => handleSort('estado')}>
                  <div className="flex items-center gap-2">
                    Estado <span className="text-[10px] text-slate-500">{sortKey === 'estado' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
                <th className="p-4 cursor-pointer hover:text-orange-400 hover:bg-slate-800/40 transition-colors" onClick={() => handleSort('bioma')}>
                  <div className="flex items-center gap-2">
                    Bioma <span className="text-[10px] text-slate-500">{sortKey === 'bioma' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-900/60">
              {/* Mudado de sortedAndFilteredQueimadas para currentItems */}
              {currentItems.map((foco, i) => (
                <tr
                  key={i}
                  onClick={() => handleOpen(foco)}
                  className="group hover:bg-orange-500/20 cursor-pointer transition-colors relative transform-gpu"
                >
                  <td className="p-4 capitalize font-medium text-slate-200 group-hover:text-orange-400 transition-colors">
                    {foco.municipio}
                  </td>
                  <td className="p-4 capitalize text-slate-400 group-hover:text-slate-300">
                    {foco.estado}
                  </td>
                  <td className="p-4 capitalize text-slate-400 group-hover:text-slate-300 flex items-center justify-between gap-4">
                    <span>{foco.bioma}</span>
                    
                    <span className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-orange-400 bg-orange-500/10 border border-orange-500/20 py-1 px-2.5 rounded-md transition-all transform translate-x-2 group-hover:translate-x-0">
                      Ver no mapa
                      <Image unoptimized src={iconFireUrl} width={14} height={14} alt="Ícone de Fogo" className="animate-pulse" />
                    </span>
                  </td>
                </tr>
              ))}

              {/* Sem Resultados */}
              {sortedAndFilteredQueimadas.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-slate-500 tracking-wide bg-slate-900/10">
                    Nenhum foco de queimada encontrado para <span className="text-orange-400/80">{searchTerm}</span>.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* 🔥 CONTROLES VISUAIS DA PAGINAÇÃO */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6 py-4 w-full max-w-xs">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-orange-400 hover:border-orange-500/30 disabled:opacity-20 disabled:hover:text-slate-400 disabled:hover:border-slate-800 transition-all cursor-pointer active:scale-95"
          >
            Anterior
          </button>
          
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
            Página <strong className="text-slate-300 font-bold">{currentPage}</strong> de {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-orange-400 hover:border-orange-500/30 disabled:opacity-20 disabled:hover:text-slate-400 disabled:hover:border-slate-800 transition-all cursor-pointer active:scale-95"
          >
            Próxima
          </button>
        </div>
      )}

      {/* Modal MUI Estilizado */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" className="text-slate-200 p-2 text-center font-bold tracking-wide uppercase mb-4 flex justify-center items-center gap-2" variant="h6" component="h2">
            <MapPin /> Localização em Tempo Real
          </Typography>
          <div className="w-full h-[calc(100%-40px)] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            {selectedFoco && open && (
              <DynamicMapContent selectedFoco={selectedFoco} open={open} />
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}