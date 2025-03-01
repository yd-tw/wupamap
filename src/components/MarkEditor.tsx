"use client";

import { useEffect, useState } from "react";
import { Mark } from "@/types/mark";
import { fetchCollection } from "@/utils/fetchCollection";
import { setDocument } from "@/utils/setDocument";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MarkEditor() {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [editingMark, setEditingMark] = useState<Mark | null>(null);
  const [newMark, setNewMark] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  useEffect(() => {
    fetchCollection<Mark>("marks").then(setMarks);
  }, []);

  const handleEdit = (mark: Mark) => {
    setEditingMark(mark);
    setNewMark(false);
    setId(mark.id);
    setName(mark.name);
    setX(String(mark.x));
    setY(String(mark.y));
  };

  const handleSave = async () => {
    if (newMark) {
      const newMarkData = {
        id,
        name,
        x: Number(x),
        y: Number(y),
      };
      await setDocument("marks", newMarkData.id, newMarkData);
      setMarks([...marks, newMarkData]);
    } else if (editingMark) {
      const updatedMark = { ...editingMark, id, name, x: Number(x), y: Number(y) };
      await setDocument("marks", updatedMark.id, updatedMark);
      setMarks(marks.map((m) => (m.id === updatedMark.id ? updatedMark : m)));
    }
    setEditingMark(null);
    setNewMark(false);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>標記</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => { setNewMark(true); setEditingMark(null); setId(""); setName(""); setX(""); setY(""); }}>
            新增標記
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>名稱</TableHead>
                <TableHead>X 座標</TableHead>
                <TableHead>Y 座標</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marks.map((mark) => (
                <TableRow key={mark.id}>
                  <TableCell>{mark.id}</TableCell>
                  <TableCell>{mark.name}</TableCell>
                  <TableCell>{mark.x}</TableCell>
                  <TableCell>{mark.y}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(mark)}>編輯</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={!!editingMark || newMark} onOpenChange={() => { setEditingMark(null); setNewMark(false); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{newMark ? "新增標記" : "編輯標記"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" disabled={!newMark} />
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="名稱" />
            <Input value={x} onChange={(e) => setX(e.target.value)} placeholder="X 座標" type="number" />
            <Input value={y} onChange={(e) => setY(e.target.value)} placeholder="Y 座標" type="number" />
            <div className="flex space-x-2">
              <Button onClick={handleSave}>儲存</Button>
              <Button onClick={() => { setEditingMark(null); setNewMark(false); }} variant="outline">
                取消
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
