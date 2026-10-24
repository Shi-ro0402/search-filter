
import type { Product, ProductCategory } from "@/types/product";

type ProductTableProps = {
  products: Product[];
};

const categoryLabels: Record<ProductCategory, string> = {
  pc: "パソコン",
  accessories: "PC周辺機器",
  smartphone: "スマートフォン",
  audio: "オーディオ",
  appliances: "家電",
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[600px] text-left">
        <thead className="bg-gray-100 text-gray-900">
          <tr>
            <th className="p-3">商品名</th>
            <th className="p-3">カテゴリ</th>
            <th className="p-3 text-right">価格</th>
            <th className="p-3 text-right">在庫数</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-3">{product.name}</td>
              <td className="p-3">
                {categoryLabels[product.category]}
              </td>
              <td className="p-3 text-right">
                ¥{product.price.toLocaleString("ja-JP")}
              </td>
              <td className="p-3 text-right">{product.stock}個</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
