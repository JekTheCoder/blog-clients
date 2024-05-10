import { deleteOne, createOne, type Tag, type TagRequest } from 'backend/tags';
import { useList } from '../list-stores';

let categoryId = '';
export const tags$ = useList<Tag, TagRequest>(
	{
		delete: id => deleteOne(id).then(() => {}),
		create: req => createOne(categoryId, req),
	},
	tag => tag.id,
	(tag, id) => ({
		...tag,
		id,
	}),
);

export function setCategoryId(id: string) {
	categoryId = id;
}
