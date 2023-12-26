import { User } from '../../domain/user';

export type AuthStored = {
	accessToken: string;
	refreshToken: string;
	user: User;
};
