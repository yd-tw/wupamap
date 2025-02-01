import * as d3 from "d3";

export function renderRiver(g: d3.Selection<SVGGElement, unknown, null, undefined>) {
  d3.json("/river.json").then((data: any) => {
    if (!data) return;

    data.rivers.forEach((river: any) => {
      g.append("path")
        .datum(river.points)
        .attr("fill", "none")
        .attr("stroke", river.color)
        .attr("stroke-width", river.width)
        .attr(
          "d",
          d3
            .line<any>()
            .x((d: { x: any }) => d.x)
            .y((d: { y: any }) => d.y),
        );
    });
  });
}
