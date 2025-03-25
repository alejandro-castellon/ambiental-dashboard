import { Chart } from "@/components/chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { SensorData, ChartData } from "@/lib/types";
import { sensorData } from "@/lib/data";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Punto",
};

async function fetchSensorData(punto: string): Promise<SensorData[]> {
  try {
    const res = await fetch(
      `http://localhost:1880/get-data?Punto_de_Muestreo=${encodeURIComponent(
        punto
      )}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Error al obtener datos desde Node-RED");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al hacer fetch de los datos:", error);
    return [];
  }
}

async function SensorDataComponent({ point }: { point: string }) {
  //const sensorData = await fetchSensorData(point);

  const chartData: ChartData[] = sensorData.map((data) => ({
    date: data.date,
    time: data.time,
    temperature: data.temperature,
    ph: data.ph,
    conductivity: data.conductivity,
  }));

  return (
    <div className="m-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-cyan-900">Punto: {point}</h1>
        <Link href="/">
          <Button className="bg-red-700 hover:bg-red-500 hover:cursor-pointer">
            Salir
          </Button>
        </Link>
      </div>
      <Chart chartData={chartData} />
      <h1 className="text-2xl font-bold text-cyan-900 mt-4">Tabla de datos</h1>
      <DataTable columns={columns} data={sensorData} />
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ point: string }>;
}) {
  const { point } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"></div>
        </div>
      }
    >
      <SensorDataComponent point={point} />
    </Suspense>
  );
}
