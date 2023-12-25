import { register as registerHttp, type RegisterResponse, RegisterRequest } from '../backend';
import { signIn } from './sign-in';

export async function register(request: RegisterRequest) {
	try {
		const { data } = await registerHttp(request);
		signIn(data.user, data.token, data.refreshToken);
	} catch (_) {}
}
