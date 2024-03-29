import axios from 'axios';
import { apiUrl } from 'app-globals/api';
import { authClient } from 'auth';
import type { IdReturn } from '../../models/id-return';
import type { Account } from '../account';

export type Comment = {
	id: string;
	content: string;
	hasReplies: boolean;

	account: Account;
};

export const getAllComments = (blogId: string) => {
	return axios.get<Comment[]>(`${apiUrl}/blogs/${blogId}/comments`);
};

export type CommentCreate = {
	content: string;
};

export const createOneComment = (blogId: string, req: CommentCreate) => {
	return authClient.post<IdReturn>(`${apiUrl}/blogs/${blogId}/comments`, req);
};
