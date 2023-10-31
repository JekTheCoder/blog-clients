import { authClient } from '$lib/backend/http-client/auth-client';
import { fromAxios } from '$lib/util/result';
import { enviroment } from '../../../../../../enviroment';

export type ReplyCreate = {
	content: string;
};

export function createOneReply(commentId: string, req: ReplyCreate, parentId?: string | null) {
	return fromAxios(
		authClient.post(`${enviroment.apiUrl}/comments/${commentId}/replies`, req, {
			params: {
				parentId
			}
		})
	);
}
