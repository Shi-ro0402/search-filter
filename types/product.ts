export type ProductCategory =
  | "pc"
  | "accessories"
  | "smartphone"
  | "audio"
  | "appliances";

export type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
};
