
import { readFileSync } from "node:fs";
import { filterProducts } from "../lib/products";
import type { Product } from "../types/product";

const products: Product[] = JSON.parse(
  readFileSync("public/products.json", "utf8")
);

const tests = [
  { query: "マウス", category: "all" as const, expected: 3 },
  { query: "マウス", category: "accessories" as const, expected: 3 },
  { query: "マウス", category: "appliances" as const, expected: 0 },
];

for (const test of tests) {
  const results = filterProducts(products, test.query, test.category);
  const passed = results.length === test.expected;

  console.log(
    `${passed ? "PASS" : "FAIL"} | 検索: ${test.query} | カテゴリ: ${test.category} | ${results.length}件`
  );

  if (!passed) {
    process.exitCode = 1;
  }
}
