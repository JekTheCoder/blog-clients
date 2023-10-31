import { error } from '@sveltejs/kit';
import { getOneBlog } from '$lib/backend/api/blogs/get-one-blog';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const id = params.id;
	const blogResult = await getOneBlog(id);

	if (blogResult.isErr()) throw error(404);

	return {
		blog: blogResult.unwrap()
	};
};
