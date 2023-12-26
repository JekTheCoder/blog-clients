import { authState } from '../../locals';
import { get } from 'svelte/store';
import { removeAuth } from './remove';
import { AuthStored } from './type';
import { AUTH_KEY } from './AUTH_KEY';

export function saveAuth(storage: Storage) {
	const state = get(authState);
	if (!state) {
		removeAuth(storage);
		return;
	}

	const { refreshToken, accessToken, user } = state;
	const stored: AuthStored = {
		refreshToken,
		accessToken: accessToken.token,
		user: get(user),
	};

	storage.setItem(AUTH_KEY, JSON.stringify(stored));
}
