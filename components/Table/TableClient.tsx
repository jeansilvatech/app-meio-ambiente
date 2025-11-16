// "use client";

// import { FocoQueimada } from "@/app/api/queimadas/route";

// export default function TableClient({ queimadas }: { queimadas: FocoQueimada[] }) {
//   return (
//     <>
//     <table className="w-full lg:text-md text-xs bg-[#71E4C0] text-black border border-black/30 shadow-2xl">
//       <thead>
//         <tr className="p-4">
//             <th className="p-4">Municipio</th>
//             <th className="p-4">Estado</th>
//             <th className="p-4">Bioma</th>
//         </tr>
//     </thead>
//     <tbody>
//         {queimadas.map((foco, i) => (
//           <tr key={i} className="p-4 border-b border-black">
//               <td className="p-4">{foco.municipio}</td>
//               <td className="p-4">{foco.estado}</td>
//               <td className="p-4">{foco.bioma}</td>
//           </tr>
//         ))}
//     </tbody>
//     </table>
//     </>
//   );
// }
"use client";

import { useState, useMemo } from 'react';
import { FocoQueimada } from "@/app/api/queimadas/route";
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
type SortDirection = 'asc' | 'desc';

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

    const handleSort = (key: keyof FocoQueimada) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    const sortedQueimadas = useMemo(() => {
        if (!sortKey) return queimadas;

        const sortedArray = [...queimadas];

        sortedArray.sort((a, b) => {
            const aValue = (a[sortKey] ?? "") as string; 
            const bValue = (b[sortKey] ?? "") as string;

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                 // Compara strings ignorando case
                const comparison = aValue.localeCompare(bValue);
                return sortDirection === 'asc' ? comparison : -comparison;
            }
            // Fallback para outros tipos (como números, se houver)
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return sortedArray;
    }, [queimadas, sortKey, sortDirection]);

    return (
        <>
            <table className="w-full lg:text-md text-xs bg-[#71E4C0] text-black border border-black/30 shadow-2xl">
                <thead>
                    <tr className="p-4 w-full">
                        <th
                            className="p-4 cursor-pointer hover:bg-[#60c29f] border-r"
                            onClick={() => handleSort('municipio')}
                        >
                            Município {getSortIcon('municipio', sortKey, sortDirection)}
                        </th>
                        <th
                            className="p-4 cursor-pointer hover:bg-[#60c29f] border-r"
                            onClick={() => handleSort('estado')}
                        >
                            Estado {getSortIcon('estado', sortKey, sortDirection)}
                        </th>
                        <th
                            className="p-4 cursor-pointer hover:bg-[#60c29f] border-r"
                            onClick={() => handleSort('bioma')}
                        >
                            Bioma {getSortIcon('bioma', sortKey, sortDirection)}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedQueimadas.map((foco, i) => (
                        <tr key={i} className="p-4  border-black">
                            <td className="p-4 border">{foco.municipio}</td>
                            <td className="p-4 border">{foco.estado}</td>
                            <td className="p-4 border">{foco.bioma}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}