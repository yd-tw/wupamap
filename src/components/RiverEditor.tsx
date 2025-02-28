import { River } from "@/types/river";
import { fetchCollection } from "@/utils/fetchCollection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function RiverEditor() {
  const rivers = await fetchCollection<River>("rivers");
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {rivers.map((river) => (
                <TableRow key={river.id}>
                  <TableCell>{river.id}</TableCell>
                  <TableCell>{river.name}</TableCell>
                  <TableCell>{river.width}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}