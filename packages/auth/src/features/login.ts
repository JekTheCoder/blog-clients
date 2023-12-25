import { login as httpLogin } from '../backend';
import { signIn } from './sign-in';

export async function login(username: string, password: string) {
	try {
		const { user, refreshToken, token } = await httpLogin(username, password);
		signIn(user, token, refreshToken);
	}
	catch (_) {
		
	}
}
