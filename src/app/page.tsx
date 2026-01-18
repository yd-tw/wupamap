"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import MapWithParams from "@/components/MapParams";
import pkg from "@/../package.json";
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  const [inputX, setInputX] = useState(0);
  const [inputY, setInputY] = useState(0);

  const updateMapPosition = () => {
    router.push(`?x=${inputX}&y=${inputY}&z=2`);
  };

  return (
    <main className="relative h-screen w-screen bg-gray-100">
      {/* 控制面板 */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-3 rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-md">
        <h1 className="text-2xl font-semibold text-gray-800">嗚帕線上路線圖</h1>
        <div className="flex items-center space-x-2">
          <label className="text-gray-700">X:</label>
          <input
            type="number"
            value={inputX}
            onChange={(e) => setInputX(parseFloat(e.target.value) || 0)}
            className="w-18 rounded-md border border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:outline-none"
          />
          <label className="text-gray-700">Y:</label>
          <input
            type="number"
            value={inputY}
            onChange={(e) => setInputY(parseFloat(e.target.value) || 0)}
            className="w-18 rounded-md border border-gray-300 p-2 text-gray-900 focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={updateMapPosition}
            className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-md transition hover:bg-blue-700"
          >
            定位
          </button>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/edit">
            <span className="text-blue-500 hover:underline">編輯地圖</span>
          </Link>
          <Link href="/docs">
            <span className="text-blue-500 hover:underline">API 文件</span>
          </Link>
        </div>
      </div>

      {/* 地圖區塊 */}
      <div className="animate-fadeIn h-full w-full bg-[#d3f8e2]">
        <Suspense fallback={<div className="text-center text-gray-500">載入地圖中...</div>}>
          <MapWithParams />
        </Suspense>
      </div>

      {/* 底部資訊 */}
      <div className="absolute right-2 bottom-2 z-10 flex space-x-3 rounded-lg bg-white/80 px-3 py-2 shadow-md">
        <p className="text-sm text-gray-700">網站版本: {pkg.version}</p>
        <p className="text-sm text-gray-700">網站作者: YD</p>
      </div>
    </main>
  );
}
