"use client";

import type { ProductCategory } from "@/types/product";

type CategoryValue = ProductCategory | "all";

type CategoryFilterProps = {
  category: CategoryValue;
  onCategoryChange: (value: CategoryValue) => void;
};

const categories: { value: CategoryValue; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "pc", label: "パソコン" },
  { value: "accessories", label: "PC周辺機器" },
  { value: "smartphone", label: "スマートフォン" },
  { value: "audio", label: "オーディオ" },
  { value: "appliances", label: "家電" },
];

export default function CategoryFilter({
  category,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium">カテゴリ</p>

      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onCategoryChange(item.value)}
            aria-pressed={category === item.value}
            className={`rounded-lg border px-4 py-2 ${
              category === item.value
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}