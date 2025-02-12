"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { renderStation } from "@/utils/renderStation";
import { renderLine } from "@/utils/renderLine";
import { renderRiver } from "@/utils/renderRiver";

interface MapProps {
  center?: { x: number; y: number }; // 預設中心點
  zoomLevel?: number; // 預設縮放倍率
}

export default function MapRender({
  center = { x: 0, y: 0 },
  zoomLevel = 1,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);
    svg.selectAll("*").remove();

    // 設定縮放行為
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 2])
      .translateExtent([
        [-2000, -2000],
        [2000, 2000],
      ])
      .on("zoom", (event) => {
        svg.select("g").attr("transform", event.transform.toString());
      });

    svg.attr("viewBox", `-200 -200 400 400`).call(zoom);

    const g = svg.append("g");

    renderRiver(g);
    renderLine(g);
    renderStation(g);

    // **設定預設位置與縮放**
    const initialTransform = d3.zoomIdentity
      .translate(-center.x * zoomLevel, -center.y * zoomLevel)
      .scale(zoomLevel);
    svg.transition().duration(750).call(zoom.transform, initialTransform);
  }, [center, zoomLevel]);

  return <svg ref={svgRef} className="h-full w-full"></svg>;
}
