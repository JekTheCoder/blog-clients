import type { PageLoad } from './$types';
import { getAll } from 'backend/categories';

export const load: PageLoad = async () => {
	const categories = await getAll().then(response => response.data);

	return {
		categories,
	};
};
