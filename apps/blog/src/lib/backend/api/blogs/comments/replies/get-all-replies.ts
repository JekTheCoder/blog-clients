import axios from 'axios';
import { enviroment } from '../../../../../../enviroment';

export type Reply = {
	id: string;
	content: string;

	parentId: string | null;
	hasReplies: boolean;

	account: {
		id: string;
		name: string;
		username: string;
	}
};

export function getAllReplies(commentId: string, parentId?: string) {
	return axios.get<Reply[]>(`${enviroment.apiUrl}/comments/${commentId}/replies`, {
		params: {
			parentId
		}
	});
}
