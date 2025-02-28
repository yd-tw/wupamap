import { Line } from "@/types/line";
import { River } from "@/types/river";
import { Station } from "@/types/station";
import { fetchCollection } from "@/utils/fetchCollection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function Page() {
  const lines = await fetchCollection<Line>("lines");
  const rivers = await fetchCollection<River>("rivers");
  const stations = await fetchCollection<Station>("stations");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">資料管理頁面</h1>
      
      {/* 顯示線路資料 */}
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map((line) => (
                <TableRow key={line.id}>
                  <TableCell>{line.id}</TableCell>
                  <TableCell>{line.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 顯示河流資料 */}
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {rivers.map((river) => (
                <TableRow key={river.id}>
                  <TableCell>{river.id}</TableCell>
                  <TableCell>{river.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 顯示車站資料 */}
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {stations.map((station) => (
                <TableRow key={station.id}>
                  <TableCell>{station.id}</TableCell>
                  <TableCell>{station.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
