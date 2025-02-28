import { Line } from "@/types/line";
import { fetchCollection } from "@/utils/fetchCollection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map((line) => (
                <TableRow key={line.id}>
                  <TableCell>{line.id}</TableCell>
                  <TableCell>{line.name}</TableCell>
                  <TableCell>{line.width}</TableCell>
                  <TableCell>{line.color}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}