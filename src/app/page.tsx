import Map from "@/components/Map";

export default function Page() {
  return (
    <main className="relative w-screen h-screen">
      <h1 className="absolute top-4 left-4 text-2xl font-bold z-10 bg-white bg-opacity-75 p-2 rounded-lg shadow">
        嗚帕捷運公司線上路網圖
      </h1>
      <div className="w-full h-full">
        <Map />
      </div>
    </main>
  );
}
