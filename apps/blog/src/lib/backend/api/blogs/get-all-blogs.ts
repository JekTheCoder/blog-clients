import { fromAxios } from '$lib/util/result';
import axios from 'axios';
import { enviroment } from '../../../../enviroment';

export type BlogPreview = {
	id: string;
	title: string;
	content: string;
	html: string;
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
