import * as d3 from "d3";
import { Line, Point } from "@/types/line";
import { fetchCollection } from "./firestore";

export async function renderLine(g: d3.Selection<SVGGElement, unknown, null, undefined>) {
  const lines = await fetchCollection<Line>("lines");
  if (lines.length === 0) return;

  lines.forEach((line) => {
    g.append("path")
      .datum(line.points)
      .attr("fill", "none")
      .attr("stroke", line.color)
      .attr("stroke-width", line.width)
      .attr(
        "d",
        d3
          .line<Point>()
          .x((d) => d.x)
          .y((d) => d.y),
      );
  });
}
