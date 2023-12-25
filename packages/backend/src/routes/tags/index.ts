import axios from 'axios';
import { apiUrl } from 'globals/api';
import { authClient } from 'auth';

export type Tag = {
  id: string;
  name: string;
	color: string
};

export function getAll(categoryId: string) {
  return axios.get<Tag[]>(`${apiUrl}/categories/${categoryId}/tags/`);
}

export type TagRequest = {
  name: string;
	color: string
};

export function createOne(categoryId: string, payload: TagRequest) {
  return authClient.post(`${apiUrl}/categories/${categoryId}/tags/`, payload);
}

export function deleteOne(id: string) {
	return authClient.delete(`${apiUrl}/tags/${id}`);
}
