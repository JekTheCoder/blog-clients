import { tokens, type AccessToken, setTokens } from 'globals/user';
import type { InternalAxiosRequestConfig } from 'axios';
import { deserializeJwt } from '../jwt/deserialize';
import { refresh } from '../routes/auth/refresh';

export const authInterceptor: (
  config: InternalAxiosRequestConfig
) => Promise<InternalAxiosRequestConfig> = async (config) => {
  if (!tokens) {
    redirectToLogin();
    return Promise.reject();
  }

  const { exp } = deserializeJwt<AccessToken>(tokens.token);

  const now = Date.now() / 1000;

  if (now > exp) {
    try {
      const result = await refresh(tokens.refreshToken);
      const { refreshToken, token } = result.data;

      setTokens(token, refreshToken);
    } catch (e) {
      const pathname = '';
      redirectToLogin(pathname);
    }
  }

  config.headers.set('Authorization', `Bearer ${tokens.token}`);

  return config;
};

function redirectToLogin(pathname = '/') {
	''
}
