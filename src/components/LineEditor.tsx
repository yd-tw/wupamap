import { Line } from "@/types/line";
import { fetchCollection } from "@/utils/fetchCollection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default async function LineEditor() {
  const lines = await fetchCollection<Line>("lines");

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
                <TableHead>點數據</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map((line) => (
                <TableRow key={line.id}>
                  <TableCell>{line.id}</TableCell>
                  <TableCell>{line.name}</TableCell>
                  <TableCell>{line.width}</TableCell>
                  <TableCell>
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: line.color }}
                    />
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">查看點數據</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>線路 {line.name} 的點數據</DialogTitle>
                        <ul className="space-y-1">
                          {line.points.map((p, index) => (
                            <li key={index}>{`(${p.x}, ${p.y})`}</li>
                          ))}
                        </ul>
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
