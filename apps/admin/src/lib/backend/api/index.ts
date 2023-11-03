export function buildWs() {
	const port = 7878;
	const ws = new WebSocket('ws://localhost:' + port);

	return ws;
}
