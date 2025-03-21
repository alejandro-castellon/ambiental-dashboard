"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/map").then((mod) => mod.Map), {
  ssr: false,
});
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-cyan-900">Río Rocha</h1>
      <Map />
    </div>
  );
}
