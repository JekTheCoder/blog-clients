import { authState } from 'auth';
import { get } from 'svelte/store';

export const BLOG_WORKSPACE = import.meta.env.VITE_BLOG_WORKSPACE || 'localhost:7878';

export async function getContent(workspaceId: string) {
	const response = await fetch(`http://${BLOG_WORKSPACE}/${workspaceId}/content/`);
	return response.text();
}

export function buildWs(workspaceId: string, blogId?: string) {
	const url = new URL(`ws://${BLOG_WORKSPACE}/${workspaceId}/`);
	if (blogId) {
		url.searchParams.set('blogId', blogId);
		return new WebSocket(url, ['Authorization', get(authState)?.accessToken?.token ?? '']);
	}

	return new WebSocket(url);
}
