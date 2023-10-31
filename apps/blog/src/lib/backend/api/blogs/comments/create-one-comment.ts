import { authClient } from '$lib/backend/http-client/auth-client';
import type { IdResponse } from '$lib/backend/types/id-response';
import { fromAxios } from '$lib/util/result';
import { enviroment } from '../../../../../enviroment';

export type CommentCreate = {
	content: string;
};

export const createOneComment = async (blogId: string, req: CommentCreate) => {
	const post = authClient.post<IdResponse>(`${enviroment.apiUrl}/blogs/${blogId}/comments`, req);
	return fromAxios(post);
};
