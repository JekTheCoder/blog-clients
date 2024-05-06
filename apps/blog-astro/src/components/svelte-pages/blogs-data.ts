	import { getAll, type BlogPreview } from 'backend/blogs';

export const PAGE_SIZE = 10;

export type PageLoad = {
	blogs: BlogPreview[];
	hasNext: boolean;
}

export const load = async (url: URL): Promise<PageLoad> => {
	const pageRaw = url.searchParams.get('page') ?? 0;
	let page = Number(pageRaw);
	if (isNaN(page)) {
		page = 0;
	}

	const search = url.searchParams.get('search');

	const blogs = await getAll({
		offset: page * PAGE_SIZE,
		limit: PAGE_SIZE + 1,
		search: search ?? ''
	}).then((response) => response.data);

	return {
		blogs: blogs.slice(0, PAGE_SIZE),
		hasNext: blogs.length > PAGE_SIZE
	};
};
