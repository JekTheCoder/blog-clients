export const BLOG_WORKSPACE = import.meta.env.VITE_BLOG_WORKSPACE || 'localhost:7878';

export async function getContent(workspaceId: string) {
	const response = await fetch(`http://${BLOG_WORKSPACE}/${workspaceId}/content/`);
	return response.text();
}

export function buildWs(workspaceId: string) {
	const ws = new WebSocket(`ws://${BLOG_WORKSPACE}/${workspaceId}/`);

	return ws;
}
