import { tokens, type AccessToken, setTokens } from 'globals/user';
import type { InternalAxiosRequestConfig } from 'axios';
import { refresh } from '../../routes/auth/refresh';
import { deserializeJwt } from '../../jwt/deserialize';

import {} from 'svelte';
import { authHandler } from './auth-handler';

export const authInterceptor: (
  config: InternalAxiosRequestConfig
) => Promise<InternalAxiosRequestConfig> = async (config) => {

  if (!tokens) {
		authHandler.redirectLogin()
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
			authHandler.redirectLogin()
    }
  }

  config.headers.set('Authorization', `Bearer ${tokens.token}`);

  return config;
};
