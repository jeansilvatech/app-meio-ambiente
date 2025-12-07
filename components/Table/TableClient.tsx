"use client";
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FocoQueimada } from "@/app/api/queimadas/route";
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react';
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
type SortDirection = 'asc' | 'desc';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: '#60c29f',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

// Função auxiliar para renderizar o indicador de ordenação
const getSortIcon = (key: keyof FocoQueimada, currentKey: keyof FocoQueimada | null, direction: SortDirection) => {
    if (key !== currentKey) {
        return <ChevronsUpDown/>; // Não ordenado
    }
    return direction === 'asc' ? <ChevronUp/> : <ChevronDown/>; // Ascendente ou descendente
};

export default function TableClient({ queimadas }: { queimadas: FocoQueimada[] }) {
    const [sortKey, setSortKey] = useState<keyof FocoQueimada | null>('municipio');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [open, setOpen] = React.useState(false);
    const [selectedFoco, setSelectedFoco] = useState<FocoQueimada | null>(null);
   
    const handleOpen = (focoData:FocoQueimada) => {
        setSelectedFoco(focoData);
        setOpen(true);
    }
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
        // 2. Primeiro, aplique a FILTRAGEM
        const lowercasedSearchTerm = searchTerm.toLowerCase();

        const filteredArray = queimadas.filter(foco =>
            // Filtra se o municipio, estado OU bioma contiverem o termo de pesquisa
            foco.municipio.toLowerCase().includes(lowercasedSearchTerm) ||
            foco.estado.toLowerCase().includes(lowercasedSearchTerm) ||
            foco.bioma.toLowerCase().includes(lowercasedSearchTerm)
        );

        // 3. Em seguida, aplique a ORDENAÇÃO
        if (!sortKey) return filteredArray;

        const sortedArray = [...filteredArray];

        sortedArray.sort((a, b) => {
            const aValue = (a[sortKey] ?? "") as string;
            const bValue = (b[sortKey] ?? "") as string;

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                // Compara strings ignorando case
                const comparison = aValue.localeCompare(bValue);
                return sortDirection === 'asc' ? comparison : -comparison;
            }
            // Fallback para outros tipos (manter a sua lógica de fallback)
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return sortedArray;
    }, [queimadas, sortKey, sortDirection, searchTerm]);

  return (
        <>
        <div className="mb-4 w-full flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Pesquisar por Município, Estado ou Bioma..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-1/2 p-2 border border-black/30 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#71E4C0]"
                />
            </div>
            <table className="lg:w-11/12 w-full lg:text-md text-xs  text-black shadow-2xl">
                <thead className='bg-[#71E4C0]'>
                    <tr className="p-4 w-full">
                        <th
                            className="p-4 cursor-pointer hover:bg-[#60c29f] border"
                            onClick={() => handleSort('municipio')}
                        >
                            Município {getSortIcon('municipio', sortKey, sortDirection)}
                        </th>
                        <th
                            className="p-4 cursor-pointer hover:bg-[#60c29f] border"
                            onClick={() => handleSort('estado')}
                        >
                            Estado {getSortIcon('estado', sortKey, sortDirection)}
                        </th>
                        <th
                            className="p-4 cursor-pointer hover:bg-[#60c29f] border"
                            onClick={() => handleSort('bioma')}
                        >
                            Bioma {getSortIcon('bioma', sortKey, sortDirection)}
                        </th>
                    </tr>
                </thead>
                <tbody>
                   {/* 5. Mapear o array FILTRADO E ORDENADO */}
                    {sortedAndFilteredQueimadas.map((foco, i) => (
                        <tr key={i} onClick={()=>{handleOpen(foco)}} className="table-line p-4 border-black relative cursor-pointer
                         ">
                            <td className="p-4 border capitalize">{foco.municipio}</td>
                            <td className="p-4 border capitalize">{foco.estado}</td>
                            <td className="p-4 border capitalize">{foco.bioma}</td>
                            <span>Clique para visualizar no mapa <Image unoptimized src={iconFireUrl} width={20} height={20} alt="Icone de Fogo"/></span>
                        </tr>
                    ))}
                    {/* Mensagem de Sem Resultados */}
                    {sortedAndFilteredQueimadas.length === 0 && (
                        <tr>
                            <td colSpan={3} className="p-4 text-center">
                                Nenhum foco de queimada encontrado para {searchTerm}.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" className='text-white text-center my-2' variant="h6" component="h2">
                    Visualização no Mapa
                </Typography>
                <div className='w-full h-full'>
                    {
                        selectedFoco &&(
                            <DynamicMapContent selectedFoco={selectedFoco} open={open}/>
                            )
                    }
                </div>
                </Box>
            </Modal>
        </>
    );
}
