"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Map from "@/components/MapRender";

export default function MapParams() {
  const searchParams = useSearchParams();

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

  return <Map center={{ x, y }} zoomLevel={z} />;
}
