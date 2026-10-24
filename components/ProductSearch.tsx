"use client";

import type { Product } from "@/types/product";
import SearchForm from "@/components/SearchForm";
import CategoryFilter from "@/components/CategoryFilter";
import type { ProductCategory } from "@/types/product";
import { filterProducts } from "@/lib/products";
import ProductTable from "@/components/ProductTable";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// データ取得だけを担当する（状態管理はコンポーネント側で行う）
async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("/products.json", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("商品データの取得に失敗しました");
  }

  return response.json();
}

export default function ProductSearch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(
  () => searchParams.get("q") ?? ""
);
  const [category, setCategory] = useState<ProductCategory | "all">(
  () => {
  const value = searchParams.get("category");

    if (
      value === "pc" ||
      value === "accessories" ||
      value === "smartphone" ||
      value === "audio" ||
      value === "appliances"
    ) {
      return value;
    }

    return "all";
  }
);

function updateUrl(nextQuery: string, nextCategory: ProductCategory | "all") {
  const params = new URLSearchParams(window.location.search);

  if (nextQuery) {
    params.set("q", nextQuery);
  } else {
    params.delete("q");
  }

  if (nextCategory !== "all") {
    params.set("category", nextCategory);
  } else {
    params.delete("category");
  }

  const queryString = params.toString();
  const newUrl = window.location.pathname
    + (queryString ? `?${queryString}` : "")
    + window.location.hash;

  window.history.replaceState(null, "", newUrl);
}
function handleQueryChange(value: string) {
  setQuery(value);
  updateUrl(value, category);
}

function handleCategoryChange(value: ProductCategory | "all") {
  setCategory(value);
  updateUrl(query, value);
}

function handleReset() {
  setQuery("");
  setCategory("all");
  updateUrl("", "all");
}

     
useEffect(() => {
  // cleanup後に届いた古い取得結果は画面に反映しない
  let ignore = false;

  fetchProducts()
    .then((data) => {
      if (!ignore) {
        setProducts(data);
      }
    })
    .catch((err) => {
      console.error(err);
      if (!ignore) {
        setError(true);
      }
    })
    .finally(() => {
      if (!ignore) {
        setLoading(false);
      }
    });

  return () => {
    ignore = true;
  };
}, [reloadCount]);

function handleRetry() {
  setLoading(true);
  setError(false);
  setReloadCount((count) => count + 1);
}


  const filteredProducts = filterProducts(products, query, category);

  if (loading) {
    return <p>商品データを読み込み中...</p>;
  }

  
  if (error) {
  return (
    <div className="rounded-lg border p-6 text-center">
      <p className="mb-4">
        商品データを取得できませんでした
      </p>

      <button
        type="button"
        onClick={handleRetry}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        再読み込み
      </button>
    </div>
  );
 }

  return (
  <div className="flex flex-col gap-6">
    <h1 className="text-2xl font-bold">商品検索・管理</h1>

    <SearchForm
      query={query}
      onQueryChange={handleQueryChange}
    />

    <CategoryFilter
       category={category}
       onCategoryChange={handleCategoryChange}
    />

    <p className="font-medium">
      検索結果：{filteredProducts.length}件
    </p>

    {filteredProducts.length === 0 ? (
      <div className="rounded-lg border p-6 text-center">
        <p className="mb-4">該当する商品がありません</p>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          検索条件をリセット
        </button>
      </div>
    ) : (
      <ProductTable products={filteredProducts} />
    )}
  </div>
);
}