import LineEditor from "@/components/LineEditor";
import RiverEditor from "@/components/RiverEditor";
import StationEditor from "@/components/StationEditor";
import MarkEditor from "@/components/MarkEditor";

export default async function Page() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <h1 className="text-2xl font-bold">地圖資料列表</h1>
      <LineEditor />
      <RiverEditor />
      <StationEditor />
      <MarkEditor />
    </div>
  );
}
