import type { ReplyCreate } from '$lib/backend/api/blogs/comments/replies/create-one-reply';
import type { IdResponse } from '$lib/backend/types/id-response';
import type { Result } from '$lib/util/result';

export type ReplyCreation = {
	key: number;
	reply: ReplyCreate;
	status: Promise<Result<IdResponse, unknown>>;
};
