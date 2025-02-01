"use client"

import { useSearchParams } from "next/navigation";
import Map from "@/components/Map";

export default function Page() {
  const searchParams = useSearchParams();
  const px = parseFloat(searchParams.get("x") || "0");
  const py = parseFloat(searchParams.get("y") || "0");
  const pz = parseFloat(searchParams.get("z") || "1");

  const x = isNaN(px) ? 0 : px;
  const y = isNaN(py) ? 0 : py;
  const z = isNaN(pz) ? 1 : pz;

  return (
    <main className="relative h-screen w-screen">
      <h1 className="absolute left-4 top-4 z-10 rounded-lg bg-white bg-opacity-75 p-2 text-2xl font-bold shadow">
        嗚帕捷運公司線上路網圖
      </h1>
      <div className="h-full w-full bg-gray-100">
        <Map center={{ x, y }} zoomLevel={z} />
      </div>
    </main>
  );
}
