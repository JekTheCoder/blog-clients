import axios from 'axios';
import { enviroment } from '../../../../../enviroment';
import { fromAxios } from '$lib/util/result';

export type Comment = {
	id: string;
	content: string;
	hasReplies: boolean;

	account: {
		id: string;
		username: string;
		name: string;
	}
};

export const getAllComments = async (blogId: string) => {
	const response = axios.get<Comment[]>(`${enviroment.apiUrl}/blogs/${blogId}/comments`);
	return fromAxios(response);
};
