import axios, { AxiosInstance } from 'axios';
import { authInterceptor } from './interceptor';

export function createClient(): AxiosInstance {
  const client = axios.create();
  client.interceptors.request.use(authInterceptor);

  return client;
}
