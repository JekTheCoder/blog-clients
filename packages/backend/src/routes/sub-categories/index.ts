import axios from 'axios';
import { apiUrl } from 'app-globals/api';
import { authClient } from 'auth';

export type SubCategory = {
	id: string;
	name: string;
};

export function getAll(categoryId: string) {
	return axios.get<SubCategory[]>(`${apiUrl}/categories/${categoryId}/sub-categories/`);
}

export type SubCategoryRequest = {
	name: string;
};

export function createOne(categoryId: string, payload: SubCategoryRequest) {
	return authClient.post(`${apiUrl}/categories/${categoryId}/sub-categories/`, payload);
}

export function deleteOne(subCategoryId: string) {
	return authClient.delete(`${apiUrl}/sub-categories/${subCategoryId}/`);
}
