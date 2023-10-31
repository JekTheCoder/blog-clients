import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';

export type User = {
	id: string;
	username: string;
	name: string;
	kind: number;
};

export type Tokens = {
	token: string;
	refreshToken: string;
};

export type AccessToken = {
	exp: number;
	id: string;
	role: number;
};

export const user = writable<User | null>(getStored('user'));

export let tokens: Tokens | null = getStored('tokens');

export const setTokens = (token: string, refreshToken: string) => {
	tokens = {
		token,
		refreshToken
	};
};

export function saveChanges() {
	if (!browser) return;
	localStorage.setItem('user', JSON.stringify(get(user)));
	localStorage.setItem('tokens', JSON.stringify(tokens));
}

function getStored(key: string) {
	if (!browser) return null;

	const item = localStorage.getItem(key);
	if (!item) {
		return null;
	}

	return JSON.parse(item);
}
