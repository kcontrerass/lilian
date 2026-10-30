export interface StorePrices {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range?: {
    min_amount: string;
    max_amount: string;
  } | null;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface StoreImage {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

export interface StoreCategoryRef {
  id: number;
  name: string;
  slug: string;
  link?: string;
}

export interface StoreAttributeTerm {
  id: number;
  name: string;
  slug: string;
}

export interface StoreAttribute {
  id: number;
  name: string;
  taxonomy: string;
  has_variations: boolean;
  terms: StoreAttributeTerm[];
}

export interface StoreVariationAttribute {
  name: string;
  value: string;
}

export interface StoreVariationRef {
  id: number;
  attributes: StoreVariationAttribute[];
}

export interface StoreProduct {
  id: number;
  name: string;
  slug: string;
  type: "simple" | "variable" | "variation" | string;
  parent?: number;
  short_description: string;
  description: string;
  sku: string;
  on_sale: boolean;
  prices: StorePrices;
  images: StoreImage[];
  categories: StoreCategoryRef[];
  attributes: StoreAttribute[];
  variations: StoreVariationRef[];
  has_options: boolean;
  is_purchasable: boolean;
  is_in_stock: boolean;
  add_to_cart: {
    text: string;
    minimum: number;
    maximum: number;
    multiple_of: number;
  };
}

export interface StoreCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  count: number;
  image: StoreImage | null;
}

export interface CartItemTotals {
  line_subtotal: string;
  line_total: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_prefix: string;
  currency_suffix: string;
}

export interface CartItemVariation {
  attribute: string;
  value: string;
  raw_attribute?: string;
}

export interface CartItem {
  key: string;
  id: number;
  quantity: number;
  name: string;
  short_description: string;
  images: StoreImage[];
  prices: StorePrices;
  totals: CartItemTotals;
  variation?: CartItemVariation[];
  quantity_limits: {
    minimum: number;
    maximum: number;
    multiple_of: number;
    editable: boolean;
  };
}

export interface CartTotals {
  total_items: string;
  total_items_tax: string;
  total_shipping: string;
  total_shipping_tax: string;
  total_discount: string;
  total_price: string;
  total_tax: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_prefix: string;
  currency_suffix: string;
}

export interface CartAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
  email?: string;
}

export interface ShippingRate {
  rate_id: string;
  name: string;
  description: string;
  price: string;
  selected: boolean;
  currency_minor_unit: number;
  currency_prefix: string;
  currency_suffix: string;
  currency_symbol: string;
}

export interface ShippingPackage {
  package_id: number;
  name: string;
  shipping_rates: ShippingRate[];
}

export interface StoreCart {
  items: CartItem[];
  totals: CartTotals;
  shipping_address: CartAddress;
  billing_address: CartAddress & { email: string };
  needs_payment: boolean;
  needs_shipping: boolean;
  shipping_rates: ShippingPackage[];
}

export interface CheckoutResult {
  order_id: number;
  order_number?: string;
  status: string;
  payment_result: {
    payment_status: string;
    redirect_url?: string;
  };
}

export interface CheckoutFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

/** Selected attribute name → term slug */
export type SelectedAttributes = Record<string, string>;
