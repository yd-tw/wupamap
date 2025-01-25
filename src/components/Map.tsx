"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function MRTMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);
    const width = 400;
    const height = 300;

    svg.selectAll("*").remove();
    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("border", "1px solid #ccc")
      .call(
        d3
          .zoom<SVGSVGElement, unknown>()
          .scaleExtent([0.5, 100])
          .on("zoom", (event) => {
            svg.select("g").attr("transform", event.transform.toString());
          }),
      );

    // 載入捷運數據
    d3.json("/mrt-map.json").then((data: any) => {
      if (!data) return;
      const { stations, lines } = data;

      // 建立站點索引
      const stationMap: Record<string, any> = {};
      stations.forEach((station: any) => {
        stationMap[station.id] = station;
      });

      const g = svg.append("g");

      // 繪製線路
      lines.forEach((line: any) => {
        const lineStations = line.stations.map((id: string) => stationMap[id]);
        g.append("path")
          .datum(lineStations)
          .attr("fill", "none")
          .attr("stroke", line.color)
          .attr("stroke-width", 4)
          .attr(
            "d",
            d3
              .line<any>()
              .x((d: { x: any }) => d.x)
              .y((d: { y: any }) => d.y),
          );
      });

      // 繪製站點
      g.selectAll("circle")
        .data(stations)
        .enter()
        .append("circle")
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y)
        .attr("r", 6)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .on("mouseover", function (event: any, d: any) {
          d3.select(this).attr("fill", "orange");
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", "white");
        });

      // 標記站名（非互動式）
      g.selectAll("text.label")
        .data(stations)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (d: any) => d.x + 8)
        .attr("y", (d: any) => d.y + 4)
        .text((d: any) => d.name)
        .attr("fill", "black")
        .style("font-size", "10px");
    });
  }, []);

  return <svg ref={svgRef} className="w-full h-full"></svg>;
}
