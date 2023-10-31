import axios, { AxiosError } from 'axios';
import { Result, fromPromise } from '$lib/util/result';
import { enviroment } from '../../../../enviroment';

export type LoginResponse = {
	user: {
		id: string;
		username: string;
		name: string;
		kind: number;
	};
	token: string;
	refreshToken: string;
};

export const login = async (
	username: string,
	password: string
): Promise<Result<LoginResponse, AxiosError>> => {
	const response = await fromPromise<LoginResponse, AxiosError>(
		axios
			.post<LoginResponse>(`${enviroment.apiUrl}/auth/login`, {
				username,
				password
			})
			.then((response) => response.data)
	);

	return response;
};
