"use client";

type SearchFormProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

export default function SearchForm({
  query,
  onQueryChange,
}: SearchFormProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="product-search" className="font-medium">
        商品名で検索
      </label>

      <div className="flex gap-2">
        <input
          id="product-search"
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="商品名を入力..."
          className="w-full rounded-lg border p-3"
        />

        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="rounded-lg border px-4 py-2"
          >
            クリア
          </button>
        )}
      </div>
    </div>
  );
}