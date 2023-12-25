import { getAllBlogs } from '$lib/backend/api/blogs/get-all-blogs';
import type { PageLoad } from './$types';
import { LATEST_PAGES, LATEST_PAGE_SIZE } from './constants';
import { getAll } from 'backend/categories';

export const prerender = false;

export const load: PageLoad = async () => {
	const latests = await getAllBlogs(0, LATEST_PAGE_SIZE * LATEST_PAGES + 1);

	return {
		latests: latests.unwrap(),
	};
};
