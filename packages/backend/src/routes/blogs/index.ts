import { apiUrl } from 'app-globals/api';
import { authClient } from 'auth';
import type { IdReturn } from '../../models/id-return';
import axios from 'axios';
import type { Comment } from '../comments';
import type { Category } from '../categories';
import type { Tag } from '../tags';
import type { SubCategory } from '../sub-categories';

export type BlogRequest = {
	content: string;
	categoryId: string;
	tags: string[];
	subCategories: string[];
};

export type BlogPreview = {
	id: string;
	title: string;
	preview: string;
	mainImage?: string;
	createdAt: string;
	category: Category;
	tags: Tag[];
	subCategories: SubCategory[];
};

export function getAll({
	limit,
	offset,
	search,
}: {
	offset?: number;
	limit?: number;
	search?: string;
}) {
	return axios.get<BlogPreview[]>(apiUrl + '/blogs', {
		params: { limit, offset, search },
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

	return authClient.post<void>(`${apiUrl}/blogs/${blogId}/public/`, formData);
}

export type BlogById = {
	id: string;
	title: string;
	content: string;
	createdAt: Date;
	comments: Comment[];
	category: Category;
	tags: Tag[];
	subCategories: SubCategory[];
}

export function getOneBlog(id: string) {
	return axios.get<BlogById>(apiUrl + '/blogs/' + id);
}
