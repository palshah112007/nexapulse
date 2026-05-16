import { APP_CONFIG } from '@/src/constants/config';
import { getAuthToken } from '@/src/utils/storage';
import { ApiResponse } from '@/src/types';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  private async buildHeaders(requiresAuth: boolean): Promise<HeadersInit> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (requiresAuth) {
      const token = await getAuthToken();
      if (token) headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { method = 'GET', body, headers: customHeaders = {}, requiresAuth = true } = options;

    const headers = {
      ...(await this.buildHeaders(requiresAuth)),
      ...customHeaders,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();
    const data = text
      ? (JSON.parse(text) as ApiResponse<T>)
      : ({ data: undefined as T, success: response.ok } satisfies ApiResponse<T>);

    if (!response.ok) {
      throw new Error(data.message ?? `Request failed with status ${response.status}`);
    }

    return data;
  }

  get<T>(endpoint: string, requiresAuth = true) {
    return this.request<T>(endpoint, { method: 'GET', requiresAuth });
  }

  post<T>(endpoint: string, body: unknown, requiresAuth = true) {
    return this.request<T>(endpoint, { method: 'POST', body, requiresAuth });
  }

  put<T>(endpoint: string, body: unknown, requiresAuth = true) {
    return this.request<T>(endpoint, { method: 'PUT', body, requiresAuth });
  }

  delete<T>(endpoint: string, requiresAuth = true) {
    return this.request<T>(endpoint, { method: 'DELETE', requiresAuth });
  }
}

export const apiClient = new ApiClient(APP_CONFIG.apiBaseUrl);
