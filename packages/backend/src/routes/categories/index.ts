import axios from 'axios';
import { apiUrl } from 'app-globals/api';
import { IdReturn } from '../../models/id-return';
import { authClient } from 'auth';

export type Category = {
	id: string;
	name: string;
};

export function getAll() {
	return axios.get<Category[]>(apiUrl + '/categories');
}

export type CategoryRequest = {
	name: string;
};

export function create(category: CategoryRequest) {
	return authClient.post<IdReturn>(apiUrl + '/categories', category);
}

export function update(id: string, category: CategoryRequest) {
	return authClient.put<IdReturn>(apiUrl + '/categories/' + id, category);
}

export function deleteOne(id: string) {
	return authClient.delete<IdReturn>(apiUrl + '/categories/' + id);
}
