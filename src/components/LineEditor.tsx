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
  const [newLine, setNewLine] = useState(false);

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

  const handleAddPoint = () => {
    if (editingLine) {
      const newPoint = { x: 0, y: 0 };
      setEditingLine({ ...editingLine, points: [...editingLine.points, newPoint] });
    }
  };

  const handleDeletePoint = (index: number) => {
    if (editingLine && editingLine.points.length > 1) {
      const updatedPoints = editingLine.points.filter((_, i) => i !== index);
      setEditingLine({ ...editingLine, points: updatedPoints });
    }
  };

  const handleSubmit = async () => {
    if (editingLine) {
      await setDocument("lines", editingLine.id, editingLine);
      if (newLine) {
        setLines((prev) => [...prev, editingLine]);
        setNewLine(false);
      } else {
        setLines((prev) => prev.map((l) => (l.id === editingLine.id ? editingLine : l)));
      }
      setEditingLine(null);
      setIsEditing(false);
    }
  };

  const handleAddLine = () => {
    const newLineData: Line = {
      id: `line_${Date.now()}`,
      name: "",
      color: "#000000",
      width: 2,
      points: [{ x: 0, y: 0 }],
    };
    setEditingLine(newLineData);
    setNewLine(true);
    setIsEditing(true);
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>線路</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleAddLine}>新增路線</Button>
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
                      <DialogTrigger render={<Button variant="outline" />}>查看節點</DialogTrigger>
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
                      <DialogTrigger render={<Button onClick={() => handleEdit(line)} />}>編輯</DialogTrigger>
                      <DialogContent>
                        <DialogTitle>{newLine ? "新增路線" : `編輯線路 ${editingLine?.name}`}</DialogTitle>
                        <div className="space-y-2">
                          <Input
                            value={editingLine?.id || ""}
                            onChange={(e) => handleChange("id", e.target.value)}
                            placeholder="ID"
                            disabled={!newLine}
                          />
                          <Input
                            value={editingLine?.name || ""}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="名稱"
                          />
                          <div className="flex space-x-2">
                            <Input
                              type="color"
                              value={editingLine?.color || "#000000"}
                              onChange={(e) => handleChange("color", e.target.value)}
                              className="w-16"
                            />
                            <Input
                              type="number"
                              value={editingLine?.width || 2}
                              onChange={(e) => handleChange("width", Number(e.target.value))}
                              placeholder="寬度"
                            />
                          </div>
                        </div>
                        <div className="mt-4 text-sm font-medium">節點</div>
                        {editingLine?.points.map((point, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span className="w-8 text-sm text-gray-500">{index + 1}.</span>
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
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeletePoint(index)}
                              disabled={editingLine?.points.length <= 1}
                            >
                              刪除
                            </Button>
                          </div>
                        ))}
                        <div className="mt-4 flex space-x-2">
                          <Button variant="outline" onClick={handleAddPoint}>
                            新增節點
                          </Button>
                          <Button onClick={handleSubmit}>保存</Button>
                        </div>
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
