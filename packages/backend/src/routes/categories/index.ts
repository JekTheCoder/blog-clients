import axios from 'axios';
import { apiUrl } from '../../config';
import { authClient } from '../../client';

export type Category = {

}

export function getAll() {
  return axios.get<Category[]>(apiUrl+'/categories');
}

export type CategoryRequest = {
	name: string;
}

export function create(category: CategoryRequest) {
	return authClient.post(apiUrl+'/categories', category);
}
