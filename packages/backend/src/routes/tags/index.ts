import axios from 'axios';
import { apiUrl } from 'app-globals/api';
import { authClient } from 'auth';
import { IdReturn } from '../../models/id-return';

export type Tag = {
	id: string;
	name: string;
	color: string;
};

export function getAll(categoryId: string) {
	return axios.get<Tag[]>(`${apiUrl}/categories/${categoryId}/tags/`);
}

export type TagRequest = {
	name: string;
	color: string;
};

export async function createOne(categoryId: string, payload: TagRequest) {
	const response = await authClient.post<IdReturn>(
		`${apiUrl}/categories/${categoryId}/tags/`,
		payload
	);

	return response.data;
}

export function deleteOne(id: string) {
	return authClient.delete(`${apiUrl}/tags/${id}`);
}
