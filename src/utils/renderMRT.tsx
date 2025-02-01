import * as d3 from "d3";

export function renderMRT(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
) {
  d3.json("/mrt.json").then((data: any) => {
    if (!data) return;
    const { stations, lines } = data;

    // 建立站點索引
    const stationMap: Record<string, any> = {};
    stations.forEach((station: any) => {
      stationMap[station.id] = station;
    });

    // 繪製捷運路線
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
      .on("mouseover", function () {
        d3.select(this).attr("fill", "orange");
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "white");
      });

    // 標記站名
    g.selectAll("text.label")
      .data(stations)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d: any) => d.x + 8)
      .attr("y", (d: any) => d.y + 4)
      .text((d: any) => d.id + d.name)
      .attr("fill", "black")
      .style("font-size", "10px");
  });
}
