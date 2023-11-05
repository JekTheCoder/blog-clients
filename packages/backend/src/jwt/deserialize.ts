export function deserializeJwt<T>(token: string): T {
	return JSON.parse(atob(token.split('.')[1]));
}
