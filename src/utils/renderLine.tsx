import * as d3 from "d3";
import db from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Line {
  id: string;
  name: string;
  color: string;
  width: number;
  points: Point[];
}

interface Point {
  x: number;
  y: number;
}

async function fetchLines(): Promise<Line[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "lines"));
    const rivers: Line[] = [];

    querySnapshot.forEach((doc: { data: () => any; id: any; }) => {
      const data = doc.data();
      rivers.push({
        id: doc.id,
        name: data.name,
        color: data.color,
        width: data.width,
        points: data.points
      });
    });

    return rivers;
  } catch (error) {
    console.error("讀取 Firestore 數據時出錯:", error);
    return [];
  }
}

export async function renderLine(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
) {
  const lines = await fetchLines();
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
};
