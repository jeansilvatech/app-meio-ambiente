import { NextResponse } from "next/server";
import csv from "csv-parser";
import { Readable } from "stream";
export type FocoQueimada = {
  lat: string;
  lon: string;
  pais: string;
  estado: string;
  municipio: string;
  bioma: string;
  data_hora_gmt: string;
  satelite: string;
  instrumento: string;
  pais_codigo?: string;
  estado_sigla?: string;
};
const date = new Date();
const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0');
const year = date.getFullYear();
const formattedDate = `${year}${month}${day}`;

function parseCsvStream(stream: Readable): Promise<FocoQueimada[]> {
  const results: FocoQueimada[] = [];

  return new Promise((resolve, reject) => {
    stream
      .pipe(csv({ separator: "," }))
      .on("data", (data: FocoQueimada) => results.push(data))
      .on("end", () => resolve(results)) // Resolve com os dados
      .on("error", (error) => reject(error)); // Rejeita em caso de erro
  });
}

export async function GET() {
  const url = `https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/diario/Brasil/focos_diario_br_${formattedDate}.csv`;

  try {
    const response = await fetch(url);

    if (!response.ok || response.status === 404) {
      // Retorna uma resposta de erro, caso o arquivo não seja encontrado
      return NextResponse.json(
        { error: "Arquivo CSV não encontrado ou erro na fonte de dados." },
        { status: response.status || 500 }
      );
    }
    
    // Convertendo a resposta em um ReadableStream do Node
    // Nota: O método .body.pipe() só funciona se o runtime permitir o streaming.
    // Para maior compatibilidade (Vercel/Next.js Edge Runtime), você pode usar arrayBuffer:
    const buffer = await response.arrayBuffer();
    const stream = Readable.from(Buffer.from(buffer));

    // Await aqui espera o parseCsvStream terminar
    const results = await parseCsvStream(stream); 

    // RETORNA DIRETAMENTE o NextResponse, resolvendo o tipo corretamente
    return NextResponse.json(results, { status: 200 });
    
  } catch (error) {
    console.error("Erro ao processar a requisição de queimadas:", error);
    // Retorna um Response em caso de exceção
    return NextResponse.json(
      { error: "Erro interno do servidor ao processar o CSV." },
      { status: 500 }
    );
  }
}