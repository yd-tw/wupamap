"use client";

import { useEffect, useState } from "react";
import { Station } from "@/types/station";
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

export default function StationEditor() {
  const [stations, setStations] = useState<Station[]>([]);
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [name, setName] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  useEffect(() => {
    fetchCollection<Station>("stations").then(setStations);
  }, []);

  const handleEdit = (station: Station) => {
    setEditingStation(station);
    setName(station.name);
    setX(String(station.x));
    setY(String(station.y));
  };

  const handleSave = async () => {
    if (!editingStation) return;
    const updatedStation = {
      ...editingStation,
      name,
      x: Number(x),
      y: Number(y),
    };
    await setDocument("stations", updatedStation.id, updatedStation);
    setStations(
      stations.map((s) => (s.id === updatedStation.id ? updatedStation : s)),
    );
    setEditingStation(null);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>車站</CardTitle>
        </CardHeader>
        <CardContent>
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
              {stations.map((station) => (
                <TableRow key={station.id}>
                  <TableCell>{station.id}</TableCell>
                  <TableCell>{station.name}</TableCell>
                  <TableCell>{station.x}</TableCell>
                  <TableCell>{station.y}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(station)}>編輯</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {editingStation && (
        <Dialog
          open={!!editingStation}
          onOpenChange={() => setEditingStation(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>編輯車站</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="名稱"
              />
              <Input
                value={x}
                onChange={(e) => setX(e.target.value)}
                placeholder="X 座標"
                type="number"
              />
              <Input
                value={y}
                onChange={(e) => setY(e.target.value)}
                placeholder="Y 座標"
                type="number"
              />
              <div className="flex space-x-2">
                <Button onClick={handleSave}>儲存</Button>
                <Button
                  onClick={() => setEditingStation(null)}
                  variant="outline"
                >
                  取消
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
