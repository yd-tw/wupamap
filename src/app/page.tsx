import Map from "@/components/Map";

export default function Page() {
  return (
    <main className="relative h-screen w-screen">
      <h1 className="absolute left-4 top-4 z-10 rounded-lg bg-white bg-opacity-75 p-2 text-2xl font-bold shadow">
        嗚帕捷運公司線上路網圖
      </h1>
      <div className="h-full w-full">
        <Map />
      </div>
    </main>
  );
}
