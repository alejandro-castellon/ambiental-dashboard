import { Chart } from "@/components/chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Payment } from "@/lib/types";
import { payments } from "@/lib/data";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="m-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-cyan-900">Punto: {params.id}</h1>
        <Link href="/">
          <Button className="bg-red-700 hover:bg-red-500 hover:cursor-pointer">
            Salir
          </Button>
        </Link>
      </div>
      <Chart />
      <h1 className="text-2xl font-bold text-cyan-900 mt-4">Tabla de datos</h1>
      <DataTable columns={columns} data={payments} />
    </div>
  );
}
