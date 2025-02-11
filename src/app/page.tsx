"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Map from "@/components/Map";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(1);

  useEffect(() => {
    const px = parseFloat(searchParams.get("x") || "0");
    const py = parseFloat(searchParams.get("y") || "0");
    const pz = parseFloat(searchParams.get("z") || "1");

    setX(isNaN(px) ? 0 : px);
    setY(isNaN(py) ? 0 : py);
    setZ(isNaN(pz) ? 1 : pz);
  }, [searchParams]);

  const [inputX, setInputX] = useState(x);
  const [inputY, setInputY] = useState(y);

  const updateMapPosition = () => {
    router.push(`?x=${inputX}&y=${inputY}&z=2`);
  };

  return (
    <main className="relative h-screen w-screen">
      <div className="absolute left-4 top-4 z-10 bg-white bg-opacity-75 p-2 rounded-lg shadow flex flex-col space-y-2">
        <h1 className="p-2 text-2xl">嗚帕線上路線圖</h1>
        <div className="flex items-center">
          <span>x:</span>
          <input
            type="number"
            value={inputX}
            onChange={(e) => setInputX(parseFloat(e.target.value) || 0)}
            placeholder="X 座標"
            className="border p-1 w-20 rounded"
          />
          <span>y:</span>
          <input
            type="number"
            value={inputY}
            onChange={(e) => setInputY(parseFloat(e.target.value) || 0)}
            placeholder="Y 座標"
            className="border p-1 w-20 rounded"
          />
          <button
            onClick={updateMapPosition}
            className="bg-blue-500 text-white p-2 rounded"
          >
            快速定位
          </button>
        </div>
      </div>
      <div className="h-full w-full bg-gray-100">
        <Map center={{ x, y }} zoomLevel={z} />
      </div>
    </main>
  );
}
