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
  slug: CategorySlug;
  name: string;
  productCount: number;
}

// Product
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  category: CategorySlug;
  images: string[];
  featured: boolean;
  tags: string[];
  createdAt: string;
}

export interface ProductListParams {
  page?: number;
  limit?: number;
  category?: CategorySlug;
  search?: string;
  featured?: 'true' | 'false';
}

// Stock
export interface StockInfo {
  productId: string;
  stock: number;
  inStock: boolean;
  lowStock: boolean;
}

// Promotion
export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  code: string;
  validFrom: string;
  validUntil: string;
  active: boolean;
}

// Cart
export interface CartItem {
  productId: string;
  quantity: number;
  addedAt: string;
  product: Product;
  lineTotal: number;
}

export interface Cart {
  token: string;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Envelopes
export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface PaginatedApiResponse<T> {
  success: true;
  data: T[];
  meta: {
    pagination: PaginationMeta;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

