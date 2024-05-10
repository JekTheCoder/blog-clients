import {
	deleteOne,
	createOne,
	type SubCategory,
	type SubCategoryRequest,
} from 'backend/sub-categories';
import { useList } from '../list-stores';

let categoryId = '';
export const subCategories$ = useList<SubCategory, SubCategoryRequest>(
	{
		delete: id => deleteOne(id).then(() => {}),
		create: req => createOne(categoryId, req).then(response => response.data),
	},
	subCategory => subCategory.id,
	(subCategory, id) => ({
		...subCategory,
		id,
	}),
);

export function setCategoryId(id: string) {
	categoryId = id;
}
