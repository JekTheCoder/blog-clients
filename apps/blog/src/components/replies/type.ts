import type { ReplyCreate } from 'backend/replies';
import type { IdReturn } from 'backend';
import type { Result } from 'common/result';

export type ReplyCreation = {
	key: number;
	reply: ReplyCreate;
	status: Promise<Result<IdReturn, unknown>>;
};
