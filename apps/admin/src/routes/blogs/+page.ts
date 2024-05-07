import type { PageLoad } from './$types';
import { getAll } from 'backend/blogs';

const PAGE_SIZE = 20;

export const load: PageLoad = async req => {
	const page = Number(req.url.searchParams.get('page')) ?? 0;

	const blogs = await getAll({
		offset: page * PAGE_SIZE,
		limit: PAGE_SIZE,
	}).then(response => response.data);

	return {
		blogs,
	};
};
