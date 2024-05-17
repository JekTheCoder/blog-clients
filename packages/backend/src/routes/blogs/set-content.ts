import { apiUrl } from 'app-globals/api';
import { authClient } from 'auth';

export type SetContentRequest = {
	content: string;
	preview?: string | null;
};

export function setContent(id: string, payload: SetContentRequest) {
	return authClient.put<void>(`${apiUrl}/blogs/${id}/content`, payload);
}
