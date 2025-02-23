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
      <div className="absolute left-4 top-4 z-10 bg-white bg-opacity-75 p-2 rounded-lg shadow-sm flex flex-col space-y-2">
        <h1 className="p-2 text-2xl">嗚帕線上路線圖</h1>
        <div className="flex items-center">
          <span>x:</span>
          <input
            type="number"
            value={inputX}
            onChange={(e) => setInputX(parseFloat(e.target.value) || 0)}
            placeholder="X 座標"
            className="border p-1 w-20 rounded-sm"
          />
          <span>y:</span>
          <input
            type="number"
            value={inputY}
            onChange={(e) => setInputY(parseFloat(e.target.value) || 0)}
            placeholder="Y 座標"
            className="border p-1 w-20 rounded-sm"
          />
          <button
            onClick={updateMapPosition}
            className="bg-blue-500 text-white p-2 rounded-sm"
          >
            快速定位
          </button>
        </div>
      </div>
      <div className="h-full w-full bg-gray-100">
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
