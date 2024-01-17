import { authClient } from "auth";
import { IdReturn } from "../../models/id-return";
import { apiUrl } from "app-globals/api";

export type BlogRequest = {
	content: string;
	categoryId: string;
	tags: string[];
	subCategories: string[];
};

export function createOne(payload: BlogRequest) {
	return authClient.post<IdReturn>(apiUrl + '/blogs', payload);
}
