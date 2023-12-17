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

export function uploadImages(blogId: string, files: File[]) {
  const formData = new FormData();

  for (const file of files) {
    formData.append('image', file);
  }

  return authClient.post<void>(`${apiUrl}/blogs/${blogId}/public/`, files);
}
