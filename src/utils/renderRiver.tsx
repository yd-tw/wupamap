import * as d3 from "d3";
import db from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

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

async function fetchRivers(): Promise<River[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "rivers"));
    const rivers: River[] = [];

    querySnapshot.forEach((doc: { data: () => any; id: any; }) => {
      const data = doc.data();
      rivers.push({
        id: doc.id,
        name: data.name,
        width: data.width,
        points: data.points,
      });
    });

    return rivers;
  } catch (error) {
    console.error("讀取 Firestore 數據時出錯:", error);
    return [];
  }
}

export async function renderRiver(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
) {
  const rivers = await fetchRivers();
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
