import { Chart } from "@/components/chart";
export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="m-4">
      <h1 className="text-3xl font-bold text-cyan-900 mb-4">
        Punto: {params.id}
      </h1>
      <Chart />
    </div>
  );
}
