"use client";

import { useEffect, useState } from "react";
import { Line } from "@/types/line";
import { fetchCollection, setDocument } from "@/utils/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LineEditor() {
  const [lines, setLines] = useState<Line[]>([]);
  const [editingLine, setEditingLine] = useState<Line | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCollection<Line>("lines").then(setLines);
  }, []);

  const handleEdit = (line: Line) => {
    setEditingLine({ ...line });
    setIsEditing(true);
  };

  const handleChange = (field: keyof Line, value: string | number) => {
    if (editingLine) {
      setEditingLine({ ...editingLine, [field]: value });
    }
  };

  const handlePointChange = (index: number, field: "x" | "y", value: number) => {
    if (editingLine) {
      const updatedPoints = [...editingLine.points];
      updatedPoints[index] = { ...updatedPoints[index], [field]: value };
      setEditingLine({ ...editingLine, points: updatedPoints });
    }
  };

  const handleSubmit = async () => {
    if (editingLine) {
      await setDocument("lines", editingLine.id, editingLine);
      setLines((prev) => prev.map((l) => (l.id === editingLine.id ? editingLine : l)));
      setEditingLine(null);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>線路</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>名稱</TableHead>
                <TableHead>寬度</TableHead>
                <TableHead>顏色</TableHead>
                <TableHead>節點</TableHead>
                <TableHead>編輯</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map((line) => (
                <TableRow key={line.id}>
                  <TableCell>{line.id}</TableCell>
                  <TableCell>{line.name}</TableCell>
                  <TableCell>{line.width}</TableCell>
                  <TableCell>
                    <div className="h-6 w-6 rounded-full" style={{ backgroundColor: line.color }} />
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">查看節點</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>線路 {line.name} 的節點</DialogTitle>
                        <ul className="space-y-1">
                          {line.points.map((p, index) => (
                            <li key={index}>{`(${p.x}, ${p.y})`}</li>
                          ))}
                        </ul>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Dialog open={isEditing} onOpenChange={setIsEditing}>
                      <DialogTrigger asChild>
                        <Button onClick={() => handleEdit(line)}>編輯</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>編輯線路 {editingLine?.name}</DialogTitle>
                        <Input
                          value={editingLine?.name || ""}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="名稱"
                        />
                        {editingLine?.points.map((point, index) => (
                          <div key={index} className="flex space-x-2">
                            <Input
                              type="number"
                              value={point.x}
                              onChange={(e) => handlePointChange(index, "x", Number(e.target.value))}
                              placeholder="X 座標"
                            />
                            <Input
                              type="number"
                              value={point.y}
                              onChange={(e) => handlePointChange(index, "y", Number(e.target.value))}
                              placeholder="Y 座標"
                            />
                          </div>
                        ))}
                        <Button onClick={handleSubmit}>保存</Button>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
