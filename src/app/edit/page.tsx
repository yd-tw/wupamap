import StationEditor from "@/components/LineEditor";
import LineEditor from "@/components/LineEditor";
import RiverEditor from "@/components/RiverEditor";

export default async function Page() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">地圖資料列表</h1>
      <LineEditor />
      <RiverEditor />
      <StationEditor />
    </div>
  );
}
