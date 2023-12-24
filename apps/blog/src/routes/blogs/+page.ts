import { getAllBlogs } from '$lib/backend/api/blogs/get-all-blogs';
import type { PageLoad } from './$types';
import { PAGE_SIZE } from './data';

export const prerender = false;

export const load: PageLoad = async ({ url }) => {
	const pageRaw = url.searchParams.get('page') ?? 0;
	let page = Number(pageRaw);
	if (isNaN(page)) {
		page = 0;
	}

	const blogs = (await getAllBlogs(page * PAGE_SIZE, PAGE_SIZE + 1)).unwrap();

	return {
		blogs: blogs.slice(0, PAGE_SIZE),
		hasNext: blogs.length > PAGE_SIZE
	};
};
