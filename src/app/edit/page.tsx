import Link from "next/link";
import MarkEditor from "@/components/MarkEditor";
import StationEditor from "@/components/StationEditor";
import LineEditor from "@/components/LineEditor";
import RiverEditor from "@/components/RiverEditor";

export default function Page() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">地圖資料編輯器</h1>
        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
        >
          返回首頁
        </Link>
      </div>
      <MarkEditor />
      <StationEditor />
      <LineEditor />
      <RiverEditor />
    </div>
  );
}
