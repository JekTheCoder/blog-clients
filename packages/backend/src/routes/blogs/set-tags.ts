import { apiUrl } from 'app-globals/api';
import { authClient } from 'auth';

export async function setTags(blogId: string, tags: string[]) {
	const response = await authClient.put(`${apiUrl}/blogs/${blogId}/tags`, tags);
	return response.data;
}
