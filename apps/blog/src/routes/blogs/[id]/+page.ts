import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getOneBlog } from 'backend/blogs';

export const load: PageLoad = async ({ params }) => {
	const id = params.id;

	const blogResult = await getOneBlog(id)
		.then((response) => response.data)
		.catch(() => {
			throw error(404);
		});

	return {
		blog: blogResult
	};
};
