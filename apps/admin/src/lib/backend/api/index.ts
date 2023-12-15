export function buildWs(workspaceId: string) {
	const port = 7878;
	const ws = new WebSocket(`ws://localhost:${port}/${workspaceId}/`);

	return ws;
}
