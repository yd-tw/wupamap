"use client";

import { useEffect, useState } from "react";
import { River } from "@/types/river";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function RiverEditor() {
  const [rivers, setRivers] = useState<River[]>([]);
  const [selectedRiver, setSelectedRiver] = useState<River | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedPoints, setEditedPoints] = useState<{ x: number; y: number }[]>(
    [],
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchCollection<River>("rivers").then(setRivers);
  }, []);

  const handleEdit = (river: River) => {
    setSelectedRiver(river);
    setEditedName(river.name);
    setEditedPoints([...river.points]);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!selectedRiver) return;
    const updatedRiver = {
      ...selectedRiver,
      name: editedName,
      points: editedPoints,
    };
    await setDocument("rivers", updatedRiver.id, updatedRiver);
    setRivers((prev) =>
      prev.map((r) => (r.id === updatedRiver.id ? updatedRiver : r)),
    );
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
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => handleEdit(river)}>編輯</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>編輯河流</DialogTitle>
                        <div>
                          <label>名稱：</label>
                          <Input
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                          />
                        </div>
                        <div>
                          <label>座標：</label>
                          {editedPoints.map((p, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                type="number"
                                value={p.x}
                                onChange={(e) =>
                                  updatePoint(
                                    index,
                                    "x",
                                    Number(e.target.value),
                                  )
                                }
                              />
                              <Input
                                type="number"
                                value={p.y}
                                onChange={(e) =>
                                  updatePoint(
                                    index,
                                    "y",
                                    Number(e.target.value),
                                  )
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <Button onClick={handleSave}>保存</Button>
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
