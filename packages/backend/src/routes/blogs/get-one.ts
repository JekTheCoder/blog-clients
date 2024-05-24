import { apiUrl } from 'app-globals/api';
import axios from 'axios';
import type { Comment } from '../comments';
import type { Category } from '../categories';
import type { Tag } from '../tags';
import type { SubCategory } from '../sub-categories';

export type BlogById = {
	id: string;
	title: string;
	content: string;
	preview: string;
	createdAt: Date;
	comments: Comment[];
	category: Category;
	tags: Tag[];
	subCategories: SubCategory[];
};

export function getOneBlog(id: string) {
	return axios.get<BlogById>(apiUrl + '/blogs/' + id);
}
