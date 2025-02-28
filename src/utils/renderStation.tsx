import * as d3 from "d3";
import db from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
}

async function fetchStations(): Promise<Station[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "stations"));
    const stations: Station[] = [];

    querySnapshot.forEach((doc: { data: () => any; id: any; }) => {
      const data = doc.data();
      stations.push({
        id: doc.id,
        name: data.name,
        x: data.x,
        y: data.y
      });
    });

    return stations;
  } catch (error) {
    console.error("讀取 Firestore 數據時出錯:", error);
    return [];
  }
}

export async function renderStation(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
) {
  const stations = await fetchStations();
  if (stations.length === 0) return;
  // 建立一個資訊顯示的 DOM 容器
  const infoBox = d3
    .select("body")
    .append("div")
    .attr("id", "station-info")
    .style("position", "absolute")
    .style("background", "white")
    .style("border", "1px solid black")
    .style("padding", "8px")
    .style("display", "none") // 初始隱藏
    .style("font-size", "12px");

  // 繪製站點
  g.selectAll("circle")
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
      // 更新資訊框內容
      infoBox
        .html(
          `<strong>車站：</strong> ${d.name} <br>
               <strong>座標：</strong> (${d.x}, ${d.y})`,
        )
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY + 10}px`)
        .style("display", "block");
    });

  // 標記站名
  g.selectAll("text.label")
    .data(stations)
    .join("text")
    .attr("class", "label")
    .attr("x", (d) => d.x + 8)
    .attr("y", (d) => d.y + 4)
    .text((d) => d.name)
    .attr("fill", "black")
    .style("font-size", "10px");

  // 點擊空白處關閉資訊框
  d3.select("body").on("click", (event) => {
    if (!event.target.closest("circle")) {
      infoBox.style("display", "none");
    }
  });
}
