import {
	deleteOne,
	create,
	type Category,
	type CategoryRequest,
} from 'backend/categories';
import { useList } from '../list-stores';

export const categories$ = useList<Category, CategoryRequest>(
	{
		delete: id => deleteOne(id).then(() => {}),
		create: req => create(req).then(response => response.data),
	},
	category => category.id,
	(category, id) => ({
		...category,
		id,
	}),
);
