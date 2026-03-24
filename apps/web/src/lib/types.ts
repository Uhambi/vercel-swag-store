// Category
export type CategorySlug =
  | 'bottles'
  | 'cups'
  | 'mugs'
  | 'desk'
  | 'stationery'
  | 'accessories'
  | 'bags'
  | 'hats'
  | 't-shirts'
  | 'hoodies'
  | 'socks'
  | 'tech'
  | 'books';

export interface Category {
  name: string;
  productCount: number;
  slug: CategorySlug;
}

// Product
export interface Product {
  category: CategorySlug;
  createdAt: string;
  currency: string;
  description: string;
  featured: boolean;
  id: string;
  images: string[];
  name: string;
  price: number;
  slug: string;
  tags: string[];
}

export interface ProductListParams {
  category?: CategorySlug;
  featured?: 'true' | 'false';
  limit?: number;
  page?: number;
  search?: string;
}

// Stock
export interface StockInfo {
  inStock: boolean;
  lowStock: boolean;
  productId: string;
  stock: number;
}

// Promotion
export interface Promotion {
  active: boolean;
  code: string;
  description: string;
  discountPercent: number;
  id: string;
  title: string;
  validFrom: string;
  validUntil: string;
}

// Cart
export interface CartItem {
  addedAt: string;
  lineTotal: number;
  product: Product;
  productId: string;
  quantity: number;
}

export interface Cart {
  createdAt: string;
  currency: string;
  items: CartItem[];
  subtotal: number;
  token: string;
  totalItems: number;
  updatedAt: string;
}

// API Response Envelopes
export interface ApiResponse<T> {
  data: T;
  success: true;
}

export interface PaginatedApiResponse<T> {
  data: T[];
  meta: {
    pagination: PaginationMeta;
  };
  success: true;
}

export interface PaginationMeta {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  success: false;
}
