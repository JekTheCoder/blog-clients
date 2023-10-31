import axios from 'axios';
import { enviroment } from '../../../../enviroment';
import { fromAxios } from '$lib/util/result';

type RefreshResponse = {
	token: string;
	refreshToken: string;
};

export const refresh = (refreshToken: string) =>
	fromAxios<RefreshResponse>(
		axios.post(`${enviroment.apiUrl}/auth/refresh`, {
			refreshToken
		})
	);
