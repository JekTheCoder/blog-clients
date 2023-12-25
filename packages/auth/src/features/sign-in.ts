import { AccessToken } from '../domain/access-token';
import { User } from '../domain/user';
import { authHandler, authState } from '../locals';
import { writable } from 'svelte/store';

export function signIn(user: User, token: string, refreshToken: string) {
	const accessToken = AccessToken.fromToken(token);
	if (!accessToken) {
		authHandler.redirectLogin();
		return;
	}

	authState.set({
		user: writable(user),
		accessToken,
		refreshToken,
	});
}
