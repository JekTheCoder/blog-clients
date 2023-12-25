import type { InternalAxiosRequestConfig } from 'axios';
import { authHandler, authState } from '../locals';
import { get } from 'svelte/store';
import { refreshTokens } from './refresh-tokens';

export const authInterceptor: (
	config: InternalAxiosRequestConfig
) => Promise<InternalAxiosRequestConfig> = async (config) => {
	const authStateValue = get(authState);

	if (!authStateValue) {
		authHandler.redirectLogin();
		return Promise.reject();
	}

	if (authStateValue.accessToken.isExpired()) {
		refreshTokens(authStateValue.refreshToken);
	}

	config.headers.set('Authorization', `Bearer ${authStateValue.accessToken.token}`);

	return config;
};
