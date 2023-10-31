import { tokens, type AccessToken, setTokens } from '$lib/global/user';
import { deserializeJwt } from '$lib/util/jwt/deserialize';
import type { InternalAxiosRequestConfig } from 'axios';
import { refresh } from '../api/auth/refresh';
import { ResultKind } from '$lib/util/result';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { get } from 'svelte/store';

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
		const result = await refresh(tokens.refreshToken);
		const inner = result.inner();

		switch (inner.kind) {
			case ResultKind.Ok:
				setTokens(inner.value.token, inner.value.refreshToken);
				break;

			case ResultKind.Err: {
				const pathname = get(page).url.pathname;
				redirectToLogin(pathname);
				return Promise.reject();
			}
		}
	}

	config.headers.set('Authorization', `Bearer ${tokens.token}`);

	return config;
};

function redirectToLogin(pathname = '/') {
	goto('/auth/sign-in?redirect='+pathname);
}
