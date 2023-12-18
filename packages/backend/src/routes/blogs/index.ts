import { apiUrl } from '../../config';
import { authClient } from '../../client';
import type { IdReturn } from '../../models/id-return';

export type BlogRequest = {
  content: string;
  categoryId: string;
  tags: string[];
  subCategories: string[];
};

export type BlogPreview = {
  id: string;
  adminId: string;
  title: string;
  html?: string | null;
};

export function getAll({ limit, offset }: { offset?: number; limit?: number }) {
  return authClient.get<BlogPreview[]>(apiUrl + '/blogs', {
    params: { limit, offset }
  });
}

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
