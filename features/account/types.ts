export interface AuthAddress {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state?: string;
  postcode?: string;
  country: string;
  phone?: string;
  email?: string;
}

export interface AuthUser {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  billing: AuthAddress;
  shipping: AuthAddress;
  orders_count?: number;
  total_spent?: string;
}

export interface LoginResult {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface RegisterResult {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
  message?: string;
}

export interface ProfileUpdatePayload {
  first_name?: string;
  last_name?: string;
  billing?: Partial<AuthAddress>;
  shipping?: Partial<AuthAddress>;
}

export interface CustomerOrder {
  id: number;
  number?: string;
  status: string;
  date_created?: string;
  total?: string;
  currency?: string;
  payment_method_title?: string;
  line_items?: {
    id: number;
    name: string;
    quantity: number;
    total: string;
  }[];
}

export interface AuthApiErrorBody {
  code?: string;
  message?: string;
  data?: { status?: number };
}
