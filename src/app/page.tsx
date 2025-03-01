"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import MapWithParams from "@/components/MapParams";
import pkg from "../../package.json";

export default function Page() {
  const router = useRouter();

  const [inputX, setInputX] = useState(0);
  const [inputY, setInputY] = useState(0);

  const updateMapPosition = () => {
    router.push(`?x=${inputX}&y=${inputY}&z=2`);
  };

  return (
    <main className="relative h-screen w-screen">
      <div className="bg-opacity-75 absolute top-4 left-4 z-10 flex flex-col space-y-2 rounded-lg bg-white p-2 shadow-sm">
        <h1 className="p-2 text-2xl">嗚帕線上路線圖</h1>
        <div className="flex items-center">
          <span>x:</span>
          <input
            type="number"
            value={inputX}
            onChange={(e) => setInputX(parseFloat(e.target.value) || 0)}
            placeholder="X 座標"
            className="w-20 rounded-sm border p-1"
          />
          <span>y:</span>
          <input
            type="number"
            value={inputY}
            onChange={(e) => setInputY(parseFloat(e.target.value) || 0)}
            placeholder="Y 座標"
            className="w-20 rounded-sm border p-1"
          />
          <button onClick={updateMapPosition} className="rounded-sm bg-blue-500 p-2 text-white">
            快速定位
          </button>
        </div>
      </div>
      <div className="h-full w-full bg-[#d3f8e2]">
        <Suspense fallback={<div>載入地圖中...</div>}>
          <MapWithParams />
        </Suspense>
      </div>
      <div className="absolute right-1 bottom-1 z-10 flex space-x-2">
        <p className="text-sm">網站版本: {pkg.version}</p>
        <p className="text-sm">網站作者: YD</p>
      </div>
    </main>
  );
}
