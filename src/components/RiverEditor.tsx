"use client";

import { useEffect, useState } from "react";
import { River } from "@/types/river";
import { fetchCollection, setDocument } from "@/utils/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export default function RiverEditor() {
  const [rivers, setRivers] = useState<River[]>([]);
  const [selectedRiver, setSelectedRiver] = useState<River | null>(null);
  const [editedId, setEditedId] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedPoints, setEditedPoints] = useState<{ x: number; y: number }[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchCollection<River>("rivers").then(setRivers);
  }, []);

  // const handleEdit = (river: River) => {
  //   setSelectedRiver(river);
  //   setEditedId(river.id);
  //   setEditedName(river.name);
  //   setEditedPoints([...river.points]);
  //   setIsDialogOpen(true);
  // };

  const handleSave = async () => {
    if (!editedId) return;
    const updatedRiver: River = {
      id: editedId,
      name: editedName,
      points: editedPoints,
      width: selectedRiver?.width || 0,
    };
    await setDocument("rivers", updatedRiver.id, updatedRiver);
    setRivers((prev) => {
      const exists = prev.some((r) => r.id === updatedRiver.id);
      return exists ? prev.map((r) => (r.id === updatedRiver.id ? updatedRiver : r)) : [...prev, updatedRiver];
    });
    setSelectedRiver(null);
    setIsDialogOpen(false);
  };

  const updatePoint = (index: number, field: "x" | "y", value: number) => {
    const newPoints = [...editedPoints];
    newPoints[index] = { ...newPoints[index], [field]: value };
    setEditedPoints(newPoints);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>河流</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => {
              toast.error("功能開發中");

              // setSelectedRiver(null);
              // setEditedId("");
              // setEditedName("");
              // setEditedPoints([]);
              // setIsDialogOpen(true);
            }}
          >
            新增河流
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>名稱</TableHead>
                <TableHead>寬度</TableHead>
                <TableHead>節點</TableHead>
                <TableHead>編輯</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rivers.map((river) => (
                <TableRow key={river.id}>
                  <TableCell>{river.id}</TableCell>
                  <TableCell>{river.name}</TableCell>
                  <TableCell>{river.width}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">查看節點</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>河流節點</DialogTitle>
                        <ul>
                          {river.points.map((p, index) => (
                            <li key={index}>{`(${p.x}, ${p.y})`}</li>
                          ))}
                        </ul>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        toast.error("功能開發中");
                        // handleEdit(river)
                      }}
                    >
                      編輯
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>{selectedRiver ? "編輯河流" : "新增河流"}</DialogTitle>
          <div>
            <label>ID：</label>
            <Input value={editedId} onChange={(e) => setEditedId(e.target.value)} />
          </div>
          <div>
            <label>名稱：</label>
            <Input value={editedName} onChange={(e) => setEditedName(e.target.value)} />
          </div>
          <div>
            <label>座標：</label>
            {editedPoints.map((p, index) => (
              <div key={index} className="flex gap-2">
                <Input type="number" value={p.x} onChange={(e) => updatePoint(index, "x", Number(e.target.value))} />
                <Input type="number" value={p.y} onChange={(e) => updatePoint(index, "y", Number(e.target.value))} />
              </div>
            ))}
            <Button onClick={() => setEditedPoints([...editedPoints, { x: 0, y: 0 }])}>新增節點</Button>
          </div>
          <Button onClick={handleSave}>保存</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
