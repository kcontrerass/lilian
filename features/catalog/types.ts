export type ProductColor =
  | "bg-lilian-teal"
  | "bg-lilian-pink"
  | "bg-[#2c1d54]"
  | "bg-[#e2b18a]"
  | "bg-[#c6687a]";

export interface Product {
  id: number;
  name: string;
  image: string;
  color: ProductColor;
}
