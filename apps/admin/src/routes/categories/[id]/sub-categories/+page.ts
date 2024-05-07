import type { PageLoad } from './$types';
import { getAll } from 'backend/sub-categories';

export const load: PageLoad = async ({ params }) => {
	const { id } = params;
	const subCategories = await getAll(id);

	return {
		subCategories: subCategories.data,
	};
};
