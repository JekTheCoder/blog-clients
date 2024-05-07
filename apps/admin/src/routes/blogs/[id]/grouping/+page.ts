import { getOneBlog } from 'backend/blogs';
import { getAll } from 'backend/tags';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { id } = params;
	const { data: blog } = await getOneBlog(id);

	const tags = await getAll(blog.category.id);

	return {
		blog,
		tags: tags.data,
	};
};
