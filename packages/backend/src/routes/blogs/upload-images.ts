import { apiUrl } from "app-globals/api";
import { authClient } from "auth";

export function uploadImages(blogId: string, files: File[]) {
	const formData = new FormData();

	for (const file of files) {
		formData.append('image', file);
	}

	return authClient.post<void>(`${apiUrl}/blogs/${blogId}/public/`, formData);
}
