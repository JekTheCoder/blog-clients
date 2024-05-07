import { BLOG_WORKSPACE } from '$lib/app-globals';

export async function getContent(workspaceId: string) {
	const response = await fetch(`http://${BLOG_WORKSPACE}/${workspaceId}/content/`);
	return response.text();
}
