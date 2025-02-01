import * as d3 from "d3";

interface Mrt {
  stations: Station[];
  lines: Line[];
}

interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface Line {
  id: string;
  color: string;
  stations: string[];
}

export function renderMRT(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
) {
  d3.json<Mrt>("/mrt.json").then((data) => {
    if (!data) return;
    const { stations, lines } = data;

    // 建立站點索引
    const stationMap: Record<string, Station> = {};
    stations.forEach((station: Station) => {
      stationMap[station.id] = station;
    });

    // 繪製捷運路線
    lines.forEach((line: Line) => {
      const lineStations = line.stations.map((id: string) => stationMap[id]);
      g.append("path")
        .datum(lineStations)
        .attr("fill", "none")
        .attr("stroke", line.color)
        .attr("stroke-width", 4)
        .attr(
          "d",
          d3
            .line<Station>()
            .x((d) => d.x)
            .y((d) => d.y),
        );
    });

    // 繪製站點
    g.selectAll("circle")
      .data(stations)
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
      .data(stations)
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
