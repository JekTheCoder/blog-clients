import { AUTH_KEY } from './AUTH_KEY';

export function removeAuth(storage: Storage) {
	storage.removeItem(AUTH_KEY);
}
