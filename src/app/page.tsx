import { Suspense } from "react";
import Page from "@/components/Page";

export default function Home() {
  return (
    <Suspense fallback={<div>載入中...</div>}>
      <Page />
    </Suspense>
  );
}
