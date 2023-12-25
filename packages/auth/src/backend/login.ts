import axios from 'axios';
import { apiUrl } from 'globals/api';
import { User } from '../domain/user';

export type LoginResponse = {
	user: User;
	token: string;
	refreshToken: string;
};

export const login = async (username: string, password: string): Promise<LoginResponse> => {
	return axios
		.post<LoginResponse>(`${apiUrl}/auth/login`, {
			username,
			password
		})
		.then((response) => response.data);
};
