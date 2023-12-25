import { getAll } from 'backend/blogs';
import type { PageLoad } from './$types';
import { LATEST_PAGES, LATEST_PAGE_SIZE } from './constants';

export const prerender = false;

export const load: PageLoad = async () => {
	const latests = await getAll({
		offset: 0,
		limit: LATEST_PAGE_SIZE * LATEST_PAGES + 1
	});

	return {
		latests: latests.data
	};
};
