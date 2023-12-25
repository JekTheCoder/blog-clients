import { login as httpLogin } from '../backend';
import { AccessToken } from '../domain/access-token';
import { authHandler, authState } from '../locals';
import { writable } from 'svelte/store';

export async function login(username: string, password: string) {
	try {
		const { user, refreshToken, token } = await httpLogin(username, password);

		const accessToken = AccessToken.fromToken(token);
		if (!accessToken) {
			authHandler.redirectLogin();
			return;
		}

		authState.set({
			user: writable(user),
			accessToken,
			refreshToken
		})
	}
	catch (_) {
		
	}
}
