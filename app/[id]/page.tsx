import { Chart } from "@/components/chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="m-4">
      <h1 className="flex justify-between text-3xl font-bold text-cyan-900 mb-4">
        Punto: {params.id}
        <Link href="/">
          <Button className="bg-red-700 hover:bg-red-500 hover:cursor-pointer">
            Salir
          </Button>
        </Link>
      </h1>
      <Chart />
    </div>
  );
}
