import { tokens, type AccessToken } from 'globals/user';
import type { InternalAxiosRequestConfig } from 'axios';
import { deserializeJwt } from '../../jwt/deserialize';

import { authHandler } from './auth-handler';
import { refreshTokens } from './refresh';

export const authInterceptor: (
  config: InternalAxiosRequestConfig
) => Promise<InternalAxiosRequestConfig> = async (config) => {
  if (!tokens) {
    authHandler.redirectLogin();
    return Promise.reject();
  }

  const { exp } = deserializeJwt<AccessToken>(tokens.token);

  const now = Date.now() / 1000;

  if (now > exp) {
    refreshTokens(tokens);
  }

  config.headers.set('Authorization', `Bearer ${tokens.token}`);

  return config;
};
