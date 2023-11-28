import axios from 'axios';
import { apiUrl } from '../../config';

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
  return axios.post(`${apiUrl}/categories/${categoryId}/tags/`, payload);
}

export function deleteOne(id: string) {
	return axios.delete(`${apiUrl}/tags/${id}`);
}
