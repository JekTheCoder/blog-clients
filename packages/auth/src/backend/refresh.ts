import axios from 'axios';
import { apiUrl } from 'app-globals/api';

export type RefreshResponse = {
	token: string;
	refreshToken: string;
};

export const refresh = (refreshToken: string) =>
	axios.post<RefreshResponse>(`${apiUrl}/auth/refresh`, {
		refreshToken,
	});
