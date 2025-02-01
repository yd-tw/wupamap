import * as d3 from "d3";

interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
}


export function renderStation(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
) {
  d3.json<Station[]>("/station.json").then((data) => {
    if (!data) return;

    // 建立站點索引
    const stationMap: Record<string, Station> = {};
    data.forEach((station: Station) => {
      stationMap[station.id] = station;
    });

    // 繪製站點
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
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
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => d.x + 8)
      .attr("y", (d) => d.y + 4)
      .text((d) => d.id + d.name)
      .attr("fill", "black")
      .style("font-size", "10px");
  });
}
