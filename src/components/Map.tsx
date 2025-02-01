"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { renderMRT } from "@/utils/renderMRT";
import { renderRiver } from "@/utils/renderRiver";

export default function MRTMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);
    svg.selectAll("*").remove();
    svg
      .attr("viewBox", `-200 -200 400 400`)
      .call(
        d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 2])
        .translateExtent([
          [-2000, -2000],
          [2000, 2000],
        ])
        .on("zoom", (event) => {
          svg.select("g").attr("transform", event.transform.toString());
        }),
      );

    const g = svg.append("g");

    renderRiver(g);
    renderMRT(g);
  }, []);

  return <svg ref={svgRef} className="w-full h-full"></svg>;
}
