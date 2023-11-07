import axios from 'axios';
import { apiUrl } from '../../config';
import { authClient } from '../../client';
import { IdReturn } from '../../models/id-return';

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
