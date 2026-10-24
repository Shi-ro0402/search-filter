import type { Product, ProductCategory } from "@/types/product";

export function filterProducts(
  products: Product[],
  query: string,
  category: ProductCategory | "all"
): Product[] {
  const keyword = query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(keyword);

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesName && matchesCategory;
  });
}