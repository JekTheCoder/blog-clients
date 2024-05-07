import { getAll } from 'backend/blogs';
import type { PageLoad } from './$types';
import { PAGE_SIZE } from './data';

export const load: PageLoad = async ({ url }) => {
	const pageRaw = url.searchParams.get('page') ?? 0;
	let page = Number(pageRaw);
	if (isNaN(page)) {
		page = 0;
	}

	const search = url.searchParams.get('search');

	const blogs = await getAll({
		offset: page * PAGE_SIZE,
		limit: PAGE_SIZE + 1,
		search: search ?? '',
	}).then(response => response.data);

	return {
		blogs: blogs.slice(0, PAGE_SIZE),
		hasNext: blogs.length > PAGE_SIZE,
	};
};
