import axios  from 'axios';
import { authInterceptor } from '../interceptor/auth.interceptor';

export const authClient = axios.create();

authClient.interceptors.request.use(authInterceptor);
