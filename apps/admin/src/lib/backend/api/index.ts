import { BLOG_WORKSPACE } from '$lib/app-globals';

export function buildWs(workspaceId: string) {
	const ws = new WebSocket(`ws://${BLOG_WORKSPACE}/${workspaceId}/`);

	return ws;
}
