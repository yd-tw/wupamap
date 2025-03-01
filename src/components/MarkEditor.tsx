"use client";

import { useEffect, useState } from "react";
import { Mark } from "@/types/mark";
import { fetchCollection, setDocument } from "@/utils/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MarkEditor() {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [currentMark, setCurrentMark] = useState<Partial<Mark> | null>(null);

  useEffect(() => {
    fetchCollection<Mark>("marks").then(setMarks);
  }, []);

  const openDialog = (mark: Partial<Mark> = {}) => setCurrentMark(mark);
  const closeDialog = () => setCurrentMark(null);

  const handleSave = async () => {
    if (!currentMark?.id || !currentMark.name) return;
    await setDocument("marks", currentMark.id, currentMark);
    setMarks((prev) => {
      const exists = prev.some((m) => m.id === currentMark.id);
      return exists ? prev.map((m) => (m.id === currentMark.id ? currentMark as Mark : m)) : [...prev, currentMark as Mark];
    });
    closeDialog();
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>標記</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => openDialog({ id: "", name: "", x: 0, y: 0 })}>新增標記</Button>
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
                    <Button onClick={() => openDialog(mark)}>編輯</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {currentMark && (
        <Dialog open onOpenChange={closeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentMark.id ? "編輯標記" : "新增標記"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <Input value={currentMark.id} onChange={(e) => setCurrentMark({ ...currentMark, id: e.target.value })} placeholder="ID" disabled={!!currentMark.id} />
              <Input value={currentMark.name} onChange={(e) => setCurrentMark({ ...currentMark, name: e.target.value })} placeholder="名稱" />
              <Input value={currentMark.x} onChange={(e) => setCurrentMark({ ...currentMark, x: Number(e.target.value) })} placeholder="X 座標" type="number" />
              <Input value={currentMark.y} onChange={(e) => setCurrentMark({ ...currentMark, y: Number(e.target.value) })} placeholder="Y 座標" type="number" />
              <div className="flex space-x-2">
                <Button onClick={handleSave}>儲存</Button>
                <Button onClick={closeDialog} variant="outline">取消</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
