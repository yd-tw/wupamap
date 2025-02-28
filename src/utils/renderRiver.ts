import * as d3 from "d3";
import { River, Point } from "@/types/river";
import { fetchCollection } from "./fetchCollection";

export async function renderRiver(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
) {
  const rivers = await fetchCollection<River>("rivers");
  if (rivers.length === 0) return;

  rivers.forEach((river) => {
    g.append("path")
      .datum(river.points)
      .attr("fill", "none")
      .attr("stroke", "LightBlue")
      .attr("stroke-width", river.width)
      .attr(
        "d",
        d3
          .line<Point>()
          .curve(d3.curveBasis)
          .x((d) => d.x)
          .y((d) => d.y),
      );
  });
}
