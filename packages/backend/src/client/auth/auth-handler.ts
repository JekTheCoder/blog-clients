export interface AuthHandler {
	redirectLogin(): Promise<void>;
}

export class NoopAuthHandler implements AuthHandler {
	redirectLogin(): Promise<void> {
		return Promise.resolve();
	}
}

export let authHandler: AuthHandler = new NoopAuthHandler();

export function setAuthHandler(handler: AuthHandler) {
	authHandler = handler;
}
