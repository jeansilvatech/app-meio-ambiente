import { NextResponse } from "next/server";
import csv from "csv-parser";
import { Readable } from "stream";
export type FocoQueimada = {
  lat: string;
  lon: string;
  pais: string;
  estado: string;
  municipio: string;
  data_hora_gmt: string;
  satelite: string;
  instrumento: string;
  pais_codigo?: string;
  estado_sigla?: string;
};

export async function GET() {
  const url = "https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/diario/Brasil/focos_diario_br_20251015.csv";

  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const stream = Readable.from(Buffer.from(buffer));

  const results: FocoQueimada[] = [];

  return new Promise((resolve, reject) => {
    stream
      .pipe(csv({ separator: "," }))
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(NextResponse.json(results));
      })
      .on("error", reject);
  });
}