import { apiUrl } from '../../config';
import { authClient } from '../../client';
import { IdReturn } from '../../models/id-return';

export type BlogRequest = {
  content: string;
  tags: string[];
  subCategories: string[];
};

export function createOne(payload: BlogRequest) {
  return authClient.post<IdReturn>(apiUrl + '/blogs', payload);
}
