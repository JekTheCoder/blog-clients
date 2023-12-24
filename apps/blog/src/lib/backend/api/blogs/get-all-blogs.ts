import { fromAxios } from '$lib/util/result';
import axios from 'axios';
import { enviroment } from '../../../../enviroment';

export type BlogPreview = {
	id: string;
	title: string;
	preview: string;
	mainImage?: string | null;
};

export const getAllBlogs = (offset: number, limit: number) => {
	const request = axios.get<BlogPreview[]>(enviroment.apiUrl + '/blogs', {
		params: {
			offset,
			limit
		}
	});

	return fromAxios(request);
};
