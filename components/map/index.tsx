import { FocoQueimada } from "@/app/api/queimadas/route";
import React, {useEffect, useState} from "react";

const Map = ()=>{
     const [queimadas, setQueimadas] = useState<FocoQueimada[]>([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const loadData = async () => {
          try {
            const res = await fetch("/api/queimadas");
            const data: FocoQueimada[] = await res.json();
            setQueimadas(data);
          } catch (error) {
            console.error("Erro ao carregar queimadas:", error);
          } finally {
            setLoading(false);
          }
        };
    
        loadData();
      }, []);
    
      if (loading) return <p>Carregando dados...</p>;
    
      return (
        <div>
          <h1>Dados de Queimadas</h1>
    
          {queimadas.length === 0 && <p>Nenhum dado encontrado.</p>}
    
          <ul>
            {queimadas.slice(0, 20).map((item, index) => (
              <li key={index}>
                <strong>Lat:</strong> {item.lat} – <strong>Lon:</strong> {item.lon} –{" "}
                <strong>Data:</strong> {item.data_hora_gmt}
              </li>
            ))}
          </ul>
        </div>
      );
}
export default Map;