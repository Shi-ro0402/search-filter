
import { Suspense } from "react";
import ProductSearch from "@/components/ProductSearch";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <Suspense fallback={<p>検索画面を準備中...</p>}>
        <ProductSearch />
      </Suspense>
    </main>
  );
}
