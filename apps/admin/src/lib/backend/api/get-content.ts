export async function getContent(workspaceId: string) {
	const port = 7878;
	const response = await fetch(`http://localhost:${port}/${workspaceId}/content/`);
	return response.text();
}
