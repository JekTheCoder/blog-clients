import axios from 'axios';
import { Category } from '../categories';
import { SubCategory } from '../sub-categories';
import { Tag } from '../tags';
import { apiUrl } from 'app-globals/api';

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
