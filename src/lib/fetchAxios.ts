import axios, { AxiosRequestConfig, isAxiosError } from 'axios';
import { getToken, refreshAuthToken } from './auth';

// Tambahkan state untuk menyimpan token
let cachedToken: string | null = null;

/**
 * Interface defining the properties for making API requests
 * 
 * @interface UseFetchProps
 * @property {string} url - The API endpoint URL
 * @property {'GET' | 'POST' | 'PUT' | 'DELETE'} method - HTTP method for the request
 * @property {string} [token] - Optional authentication token
 * @property {Object} [params] - Optional URL query parameters
 * @property {FormData | string | Object} [formData] - Request body data
 * @property {boolean} [initialFetch] - Whether to fetch on initial load
 * @property {'arraybuffer' | 'blob' | 'document' | 'json' | 'text'} [responseType] - Expected response data type
 * @property {boolean} [isServer] - Whether the request is made from the server-side
 *  - 'true': Uses 'process.env.API_SERVER_URL' as the base URL for server-side requests.
 *  - 'false' (default): Uses '/api' as the base URL for client-side requests.
 */
export interface UseFetchProps {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  token?: string;
  params?: { [key: string]: any };
  formData?: FormData | string | { [key: string]: any };
  initialFetch?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
  isServer?: boolean;
}

/**
 * Makes an HTTP request using axios with authentication and token refresh handling
 * 
 * @template T - The expected response data type
 * @param {UseFetchProps} props - The request configuration properties
 * @param {string} props.url - API endpoint URL
 * @param {string} props.method - HTTP method
 * @param {Object} [props.params] - URL query parameters
 * @param {FormData | string | Object} [props.formData] - Request body data
 * @param {string} [props.token] - Authentication token
 * @param {string} [props.responseType] - Expected response type
 * @param {boolean} [props.isServer] - Whether the request is made from the server-side or client-side
 * @returns {Promise<T>} The response data
 * @throws {Error} When the request fails and cannot be recovered with token refresh
 */

export const fetchAxios = async <T = any>({
  url,
  method,
  params,
  formData,
  token,
  responseType,
  isServer = false,
}: UseFetchProps): Promise<T> => {
  // Gunakan token dari parameter atau cached token, jika tidak ada baru ambil dari storage
  if (!token && !cachedToken && !isServer) {
    const storedToken = await getToken();
    cachedToken = storedToken?.token || null;
  } else {
    // Token Server
    const storedToken = { token: 'tokenServer' };
    cachedToken = storedToken?.token || null;
  }

  const finalToken = token || cachedToken;

  const config: AxiosRequestConfig = {
    method,
    url: isServer ? `${process.env.API_SERVER_URL}${url}` : `/api${url}`,
    headers: {
      Authorization: `Bearer ${finalToken}`,
    },
    params,
    data: formData,
    responseType,
  };

  try {
    const response = await axios<T>(config);
    return response.data;
  } catch (error: any) {
    if (isAxiosError(error) && error.response?.status === 401) {
      const newToken = await refreshAuthToken();
      // Update cached token
      cachedToken = newToken;

      if (config.headers) {
        config.headers.Authorization = `Bearer ${newToken}`;
      } else {
        config.headers = {
          Authorization: `Bearer ${newToken}`,
        };
      }
      const retryResponse = await axios<T>(config);
      return retryResponse.data;
    }
    throw error;
  }
};

// Tambahkan fungsi untuk clear cache token saat logout
export const clearCachedToken = () => {
  cachedToken = null;
};
