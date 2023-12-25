import axios from 'axios';
import { apiUrl } from 'globals/api';
import { User } from 'globals/user';

export type RegisterRequest = {
	username: string
	email: string
	name?: string | null
	password: string
}

export type RegisterResponse = {
	user: User
	token: string
	refreshToken: string
}

export function register({email, name, password, username}: RegisterRequest) {
return axios.post<RegisterResponse>(`${apiUrl}/auth/register`, {
	email,
	name,
	password,
	username
})
}
