import { createClient } from "./features/client";

import  { writable, readonly } from 'svelte/store';
import { authState } from "./locals";
import { User } from "./domain/user";

export { setAuthHandler } from './locals';
export { login } from './features/login';
export { logout } from './features/logout';
export { register } from './features/register';
export type { User } from './domain/user';
export type { RegisterRequest } from './backend/register';

const userStore =  writable<User | null>(null);

let sub: (() => void) | null= null;
authState.subscribe(state => {
	if (!state) {
		sub?.();
		sub = null;
		userStore.set(null);
		return;
	}

	sub?.();
	sub = state.user.subscribe(user => 
		userStore.set(user)
	);
})

export const authClient = createClient();
export const user = readonly(userStore);
