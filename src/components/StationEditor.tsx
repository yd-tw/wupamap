import { Station } from "@/types/station";
import { fetchCollection } from "@/utils/fetchCollection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function StationEditor() {
  const stations = await fetchCollection<Station>("stations");
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {stations.map((station) => (
                <TableRow key={station.id}>
                  <TableCell>{station.id}</TableCell>
                  <TableCell>{station.name}</TableCell>
                  <TableCell>{station.x}</TableCell>
                  <TableCell>{station.y}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}