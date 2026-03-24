import type {
  ApiErrorResponse,
  ApiResponse,
  Cart,
  Category,
  PaginatedApiResponse,
  Product,
  ProductListParams,
  Promotion,
  StockInfo,
} from '@/lib/types';

// Configuration
const API_URL =
  process.env.API_URL ?? 'https://vercel-swag-store-api.vercel.app/api';

const API_BYPASS_TOKEN = process.env.API_BYPASS_TOKEN ?? '';

// Error Class
export class ApiError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

// Base Fetch
interface FetchOptions extends Omit<RequestInit, 'headers'> {
  cartToken?: string;
  headers?: Record<string, string>;
}

async function apiFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { cartToken, headers: extraHeaders, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    'x-vercel-protection-bypass': API_BYPASS_TOKEN,
    ...extraHeaders,
  };

  if (cartToken) {
    headers['x-cart-token'] = cartToken;
  }

  if (fetchOptions.body && typeof fetchOptions.body === 'string') {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    headers,
  });

  const json = (await response.json()) as T | ApiErrorResponse;

  if (!response.ok) {
    const err = json as ApiErrorResponse;
    throw new ApiError(
      err.error?.code ?? 'UNKNOWN',
      err.error?.message ?? `HTTP ${response.status}`,
      response.status,
    );
  }

  return json as T;
}

// Products
export function getProducts(
  params?: ProductListParams,
): Promise<PaginatedApiResponse<Product>> {
  const searchParams = new URLSearchParams();
  if (params?.page !== undefined) {
    searchParams.set('page', String(params.page));
  }
  if (params?.limit !== undefined) {
    searchParams.set('limit', String(params.limit));
  }
  if (params?.category) {
    searchParams.set('category', params.category);
  }
  if (params?.search) {
    searchParams.set('search', params.search);
  }
  if (params?.featured) {
    searchParams.set('featured', params.featured);
  }

  const query = searchParams.toString();
  return apiFetch<PaginatedApiResponse<Product>>(
    `/products${query ? `?${query}` : ''}`,
  );
}

export function getProduct(idOrSlug: string): Promise<ApiResponse<Product>> {
  return apiFetch<ApiResponse<Product>>(
    `/products/${encodeURIComponent(idOrSlug)}`,
  );
}

export function getProductStock(
  idOrSlug: string,
): Promise<ApiResponse<StockInfo>> {
  return apiFetch<ApiResponse<StockInfo>>(
    `/products/${encodeURIComponent(idOrSlug)}/stock`,
  );
}

// Categories
export function getCategories(): Promise<ApiResponse<Category[]>> {
  return apiFetch<ApiResponse<Category[]>>('/categories');
}

// Promotions
export function getPromotion(): Promise<ApiResponse<Promotion>> {
  return apiFetch<ApiResponse<Promotion>>('/promotions');
}

// Cart
export function getCart(token: string): Promise<ApiResponse<Cart>> {
  return apiFetch<ApiResponse<Cart>>('/cart', { cartToken: token });
}

export async function createCart(): Promise<{ cart: Cart; token: string }> {
  const response = await fetch(`${API_URL}/cart/create`, {
    method: 'POST',
    headers: {
      'x-vercel-protection-bypass': API_BYPASS_TOKEN,
    },
  });

  if (!response.ok) {
    const err = (await response.json()) as ApiErrorResponse;
    throw new ApiError(
      err.error?.code ?? 'CART_CREATE_FAILED',
      err.error?.message ?? `Failed to create cart: HTTP ${response.status}`,
      response.status,
    );
  }

  const token = response.headers.get('x-cart-token');
  if (!token) {
    throw new ApiError(
      'MISSING_CART_TOKEN',
      'x-cart-token header not found in create cart response',
      500,
    );
  }

  const json = (await response.json()) as ApiResponse<Cart>;
  return { cart: json.data, token };
}

export function addToCart(
  token: string,
  productId: string,
  quantity: number,
): Promise<ApiResponse<Cart>> {
  return apiFetch<ApiResponse<Cart>>('/cart', {
    method: 'POST',
    cartToken: token,
    body: JSON.stringify({ productId, quantity }),
  });
}

export function updateCartItem(
  token: string,
  productId: string,
  quantity: number,
): Promise<ApiResponse<Cart>> {
  return apiFetch<ApiResponse<Cart>>(`/cart/${encodeURIComponent(productId)}`, {
    method: 'PATCH',
    cartToken: token,
    body: JSON.stringify({ quantity }),
  });
}

export function removeCartItem(
  token: string,
  productId: string,
): Promise<ApiResponse<Cart>> {
  return apiFetch<ApiResponse<Cart>>(`/cart/${encodeURIComponent(productId)}`, {
    method: 'DELETE',
    cartToken: token,
  });
}

// Utilities
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}
