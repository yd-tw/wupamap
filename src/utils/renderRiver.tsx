import * as d3 from "d3";

interface River {
  id: string;
  name: string;
  width: number;
  points: Point[];
}

interface Point {
  x: number;
  y: number;
}

export function renderRiver(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
) {
  d3.json<River[]>("/river.json").then((data) => {
    if (!data) return;

    data.forEach((river) => {
      g.append("path")
        .datum(river.points)
        .attr("fill", "none")
        .attr("stroke", "#1E90FF")
        .attr("stroke-width", river.width)
        .attr(
          "d",
          d3
            .line<Point>()
            .x((d) => d.x)
            .y((d) => d.y),
        );
    });
  });
}
