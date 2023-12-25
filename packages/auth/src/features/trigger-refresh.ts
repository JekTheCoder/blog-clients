import { get } from 'svelte/store';
import { authState, authHandler } from '../locals';
import { refreshTokens } from './refresh-tokens';

export async function triggerTokensRefresh() {
  const state = get(authState);
	if (!state) {
		authHandler.redirectLogin();
		return;
	}

	await refreshTokens(state.refreshToken);
}
