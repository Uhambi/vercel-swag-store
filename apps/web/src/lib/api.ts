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
  onResponse?: (response: Response) => void;
}

async function apiFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const {
    cartToken,
    headers: extraHeaders,
    onResponse,
    ...fetchOptions
  } = options;

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

  onResponse?.(response);

  if (!response.ok) {
    let errorData: ApiErrorResponse | null = null;
    try {
      errorData = (await response.json()) as ApiErrorResponse;
    } catch {
      // non-JSON error body
    }
    const error = new ApiError(
      errorData?.error?.code ?? 'UNKNOWN',
      errorData?.error?.message ?? `HTTP ${response.status}`,
      response.status,
    );
    console.error(
      `[api] ${options.method ?? 'GET'} ${path} -`,
      error.status,
      error.code,
      error.message,
    );
    throw error;
  }

  return (await response.json()) as T;
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
  let token: string | null = null;

  const json = await apiFetch<ApiResponse<Cart>>('/cart/create', {
    method: 'POST',
    onResponse: (response) => {
      token = response.headers.get('x-cart-token');
    },
  });

  if (!token) {
    throw new ApiError(
      'MISSING_CART_TOKEN',
      'x-cart-token header not found in create cart response',
      500,
    );
  }

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
export function formatPrice(cents: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100);
}
