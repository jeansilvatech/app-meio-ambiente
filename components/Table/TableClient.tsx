"use client";
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FocoQueimada } from "@/app/api/queimadas/route";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react';

// @ts-expect-error - O TypeScript não encontra as declarações de tipo para a importação direta do CSS, mas o bundler processa corretamente.
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
// type SortDirection = 'asc' | 'desc';

// Função auxiliar para renderizar o indicador de ordenação
// const getSortIcon = (key: keyof FocoQueimada, currentKey: keyof FocoQueimada | null, direction: SortDirection) => {
//     if (key !== currentKey) {
//         return <ChevronsUpDown/>; // Não ordenado
//     }
//     return direction === 'asc' ? <ChevronUp/> : <ChevronDown/>; // Ascendente ou descendente
// };

// Estilo customizado para o Modal alinhar com o tema Dark do site
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '800px',
  height: '70vh',
  bgcolor: '#0c0e14',
  border: '1px solid rgba(249, 115, 22, 0.2)', // Borda sutil laranja
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
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
          {/* Ícone ou detalhe visual no input se quiser (opcional) */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none uppercase tracking-widest hidden sm:inline">
            Filtrar
          </div>
        </div>
      </div>

      {/* Container da Tabela com Rolagem Responsiva Otimizada */}
      <div className="w-full lg:w-11/12 overflow-hidden rounded-xl border border-slate-900 bg-slate-950/20 backdrop-blur-sm shadow-xl">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs md:text-sm text-slate-300">
            
            {/* Cabeçalho da Tabela */}
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

            {/* Corpo da Tabela */}
            <tbody className="divide-y divide-slate-900/60">
              {sortedAndFilteredQueimadas.map((foco, i) => (
                <tr
                  key={i}
                  onClick={() => handleOpen(foco)}
                  className="group hover:bg-orange-500/20 cursor-pointer transition-colors relative"
                >
                  <td className="p-4 capitalize font-medium text-slate-200 group-hover:text-orange-400 transition-colors">
                    {foco.municipio}
                  </td>
                  <td className="p-4 capitalize text-slate-400 group-hover:text-slate-300">
                    {foco.estado}
                  </td>
                  <td className="p-4 capitalize text-slate-400 group-hover:text-slate-300 flex items-center justify-between gap-4">
                    <span>{foco.bioma}</span>
                    
                    {/* Botão flutuante/Dica visual integrado dentro da célula para validação do HTML */}
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

      {/* Modal MUI Estilizado */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" className="text-slate-200 text-center font-bold tracking-wide uppercase mb-4" variant="h6" component="h2">
            📍 Localização em Tempo Real
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