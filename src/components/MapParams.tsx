"use client";

import { useSearchParams } from "next/navigation";
import Map from "@/components/MapRender";

export default function MapParams() {
  const searchParams = useSearchParams();

  const x = parseFloat(searchParams.get("x") || "0");
  const y = parseFloat(searchParams.get("y") || "0");
  const z = parseFloat(searchParams.get("z") || "1");

  return <Map center={{ x, y }} zoomLevel={z} />;
}
