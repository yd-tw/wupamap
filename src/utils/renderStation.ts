import * as d3 from "d3";
import { Station } from "@/types/station";
import { fetchCollection } from "./firestore";

export async function renderStation(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
) {
  const stations = await fetchCollection<Station>("stations");
  if (stations.length === 0) return;

  const infoBox = d3
    .select("body")
    .append("div")
    .attr("id", "station-info")
    .style("position", "absolute")
    .style("background", "white")
    .style("border", "1px solid black")
    .style("padding", "8px")
    .style("display", "none")
    .style("font-size", "12px");

  g.selectAll("circle.station")
    .data(stations)
    .join("circle")
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
    })
    .on("click", (event, d) => {
      infoBox
        .html(
          `<strong>車站：</strong> ${d.name} <br>
               <strong>座標：</strong> (${d.x}, ${d.y})`,
        )
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY + 10}px`)
        .style("display", "block");
    });

  g.selectAll("text.label.station")
    .data(stations)
    .join("text")
    .attr("class", "label")
    .attr("x", (d) => d.x + 8)
    .attr("y", (d) => d.y + 4)
    .text((d) => d.name)
    .attr("fill", "black")
    .style("font-size", "10px");

  d3.select("body").on("click", (event) => {
    if (!event.target.closest("circle")) {
      infoBox.style("display", "none");
    }
  });
}
