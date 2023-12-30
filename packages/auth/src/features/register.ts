import { register as registerHttp, RegisterRequest } from '../backend';
import { signIn } from './sign-in';

export async function register(request: RegisterRequest) {
	const { data } = await registerHttp(request);
	signIn(data.user, data.token, data.refreshToken);
}
