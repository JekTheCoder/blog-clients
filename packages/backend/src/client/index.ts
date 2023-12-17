import { createClient } from './auth';
export { triggerTokensRefresh } from './auth';
export { setAuthHandler, type AuthHandler } from './auth/auth-handler';

export const authClient = createClient();
