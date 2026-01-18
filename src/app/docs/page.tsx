import { Database, MapPin, Mountain, Waves, Milestone } from "lucide-react";

interface Endpoint {
  path: string;
  method: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const endpoints: Endpoint[] = [
  {
    path: "/api/lines",
    method: "GET",
    description: "取得所有路線資料，包含座標點與顏色資訊",
    icon: <Mountain className="h-6 w-6" />,
    color: "from-emerald-500 to-teal-600",
  },
  {
    path: "/api/marks",
    method: "GET",
    description: "取得所有標記點資料",
    icon: <MapPin className="h-6 w-6" />,
    color: "from-rose-500 to-pink-600",
  },
  {
    path: "/api/rivers",
    method: "GET",
    description: "取得所有河流資料，包含寬度與路徑",
    icon: <Waves className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-600",
  },
  {
    path: "/api/stations",
    method: "GET",
    description: "取得所有站點資料",
    icon: <Milestone className="h-6 w-6" />,
    color: "from-amber-500 to-orange-600",
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200/50 bg-gray-50/50 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-linear-to-br from-violet-500 to-purple-600 p-3 shadow-lg shadow-violet-500/25">
              <Database className="h-8 w-8 text-gray-800" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Wupamap API</h1>
              <p className="text-gray-600">開放資料 API 文件</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Introduction */}
        <section className="mb-12 rounded-2xl border border-gray-200/50 bg-gray-50/30 p-8 backdrop-blur-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">快速開始</h2>
          <p className="mb-4 text-gray-600">
            使用以下 API 端點取得地圖相關資料。所有請求使用{" "}
            <code className="rounded bg-gray-200 px-2 py-1 text-sm text-emerald-400">GET</code> 方法，回傳 JSON
            格式資料。
          </p>
        </section>

        {/* Endpoints */}
        <section>
          <h2 className="mb-6 text-xl font-semibold text-gray-800">API 端點</h2>
          <div className="grid gap-6">
            {endpoints.map((endpoint) => (
              <div
                key={endpoint.path}
                className="group overflow-hidden rounded-2xl border border-gray-200/50 bg-gray-50/30 backdrop-blur-sm transition-all hover:border-gray-600/50 hover:bg-gray-50/50"
              >
                {/* Endpoint Header */}
                <div className="flex items-center gap-4 p-6">
                  <div className={`rounded-xl bg-linear-to-br ${endpoint.color} p-3 shadow-lg`}>{endpoint.icon}</div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                        {endpoint.method}
                      </span>
                      <code className="text-lg font-medium text-gray-800">{endpoint.path}</code>
                    </div>
                    <p className="text-gray-600">{endpoint.description}</p>
                  </div>
                  <a
                    href={endpoint.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-gray-200/50 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200 hover:text-gray-800"
                  >
                    前往 →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
