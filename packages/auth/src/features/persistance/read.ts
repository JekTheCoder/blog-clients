import { AUTH_KEY } from './AUTH_KEY';
import { AccessToken } from '../../domain/access-token';
import { authState } from '../../locals';
import { AuthStored } from './type';
import { writable } from 'svelte/store';

export function authReadFrom(storage: Storage) {
	const stored = storage.getItem(AUTH_KEY);
	if (!stored) {
		authState.set(null);
		return;
	}

	try {
		const { accessToken, refreshToken, user } = JSON.parse(stored) as AuthStored;
		const access = AccessToken.fromToken(accessToken);
		if (!access) {
			authState.set(null);
			return;
		}

		authState.set({
			accessToken: access,
			refreshToken,
			user: writable(user),
		});
	} catch {
		authState.set(null);
		return;
	}
}
