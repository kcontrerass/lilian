export type ProductColor =
  | "bg-lilian-teal"
  | "bg-lilian-pink"
  | "bg-lilian-purple"
  | "bg-lilian-orange"
  | "bg-lilian-beige"
  | "bg-[#2c1d54]"
  | "bg-[#e2b18a]"
  | "bg-[#c6687a]"
  | (string & {});

export interface Product {
  id: number;
  name: string;
  image: string;
  color: ProductColor;
  /** Optional deep link (e.g. Woo product page). */
  href?: string;
}
