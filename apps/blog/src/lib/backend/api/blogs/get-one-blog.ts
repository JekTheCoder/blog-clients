import { fromAxios } from '$lib/util/result';
import axios from 'axios';
import { enviroment } from '../../../../enviroment';
import type { Comment } from './comments/get-all-comments';

export type BlogById = {
	id: string;
	title: string;
	content: string;
	html: string;

	comments: Comment[];
};

export function getOneBlog(id: string) {
	const axiosResponse = axios.get<BlogById>(enviroment.apiUrl + '/blogs/' + id);
	return fromAxios(axiosResponse);
}
