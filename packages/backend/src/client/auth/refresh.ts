import { setTokens, Tokens } from 'globals/user';
import { refresh } from '../../routes/auth/refresh';

import { authHandler } from './auth-handler';

import { tokens } from 'globals/user';

export async function refreshTokens(tokens: Tokens) {
  try {
    const result = await refresh(tokens.refreshToken);

    const { refreshToken, token } = result.data;
    setTokens(token, refreshToken);
  } catch (_) {
    authHandler.redirectLogin();
  }
}

export async function triggerRefresh() {
  if (!tokens) {
    authHandler.redirectLogin();
    return Promise.reject();
  }

  refreshTokens(tokens);
}
