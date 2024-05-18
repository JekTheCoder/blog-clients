import { BLOG_WORKSPACE_API } from '../workspace-server';

type WorkspaceItem = {
	id: string;
	preview: string | null;
};

export async function getWorkspaces() {
	const response = await fetch(`${BLOG_WORKSPACE_API}`);
	return await (response.json() as Promise<WorkspaceItem[]>);
}
