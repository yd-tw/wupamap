import * as d3 from "d3";

interface Line {
  id: string;
  name: string;
  color: string;
  points: Point[];
}

interface Point {
  x: number;
  y: number;
}

export function renderLine(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
) {
  d3.json<Line[]>("/line.json").then((data) => {
    if (!data) return;

    data.forEach((line) => {
      g.append("path")
        .datum(line.points)
        .attr("fill", "none")
        .attr("stroke", line.color)
        .attr("stroke-width", 4)
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
