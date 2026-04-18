"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Line } from "@/types/line";
import { fetchCollection } from "@/utils/firestore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SortKey = "name" | "points" | "length";
type SortDir = "asc" | "desc";

function calcLength(points: Line["points"]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    total += Math.sqrt(dx * dx + dy * dy);
  }
  return total;
}

export default function AnalysisPage() {
  const [lines, setLines] = useState<Line[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>("length");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useEffect(() => {
    fetchCollection<Line>("lines").then((data) => {
      setLines(data);
      setLoading(false);
    });
  }, []);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const sorted = [...lines].sort((a, b) => {
    let av: number | string, bv: number | string;
    if (sortKey === "name") {
      av = a.name;
      bv = b.name;
    } else if (sortKey === "points") {
      av = a.points.length;
      bv = b.points.length;
    } else {
      av = calcLength(a.points);
      bv = calcLength(b.points);
    }
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const totalLength = lines.reduce((sum, l) => sum + calcLength(l.points), 0);

  function sortIndicator(key: SortKey) {
    if (sortKey !== key) return null;
    return sortDir === "asc" ? " ▲" : " ▼";
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">路線分析</h1>
          <Link href="/" className="text-blue-500 hover:underline text-sm">
            返回首頁
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>各路線總長度</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-500 text-sm">載入中...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>顏色</TableHead>
                    <TableHead
                      className="cursor-pointer select-none"
                      onClick={() => handleSort("name")}
                    >
                      路線名稱{sortIndicator("name")}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer select-none text-right"
                      onClick={() => handleSort("points")}
                    >
                      節點數{sortIndicator("points")}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer select-none text-right"
                      onClick={() => handleSort("length")}
                    >
                      總長度{sortIndicator("length")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sorted.map((line) => (
                    <TableRow key={line.id}>
                      <TableCell>
                        <span
                          className="inline-block h-4 w-8 rounded"
                          style={{ backgroundColor: line.color }}
                        />
                      </TableCell>
                      <TableCell>{line.name}</TableCell>
                      <TableCell className="text-right">
                        {line.points.length}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {calcLength(line.points).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {!loading && (
          <p className="text-right text-sm text-gray-600">
            共 {lines.length} 條路線，合計長度：
            <span className="font-mono font-medium">
              {totalLength.toFixed(2)}
            </span>
          </p>
        )}
      </div>
    </main>
  );
}
