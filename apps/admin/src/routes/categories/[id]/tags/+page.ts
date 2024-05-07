import type { PageLoad } from './$types';
import { getAll } from 'backend/tags';

export const load: PageLoad = async ({ params }) => {
	const { id } = params;
	const tags = await getAll(id);

	return {
		tags: tags.data,
	};
};
