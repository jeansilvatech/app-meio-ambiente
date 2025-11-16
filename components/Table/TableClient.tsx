"use client";

import { FocoQueimada } from "@/app/api/queimadas/route";

export default function TableClient({ queimadas }: { queimadas: FocoQueimada[] }) {
  return (
    <>
    <table className="lg:w-4/5 w-full lg:text-md text-xs bg-[#71E4C0] text-black border border-black/30 shadow-2xl">
      <thead>
        <tr className="p-4">
            <th className="p-4">Municipio</th>
            <th className="p-4">Estado</th>
            <th className="p-4">Bioma</th>
        </tr>
    </thead>
    <tbody>
        {queimadas.map((foco, i) => (
          <tr key={i} className="p-4 border-b border-black">
              <td className="p-4">{foco.municipio}</td>
              <td className="p-4">{foco.estado}</td>
              <td className="p-4">{foco.bioma}</td>
          </tr>
        ))}
    </tbody>
    </table>
    </>
  );
}