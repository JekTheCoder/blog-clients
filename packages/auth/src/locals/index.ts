import { AccessToken } from '../domain/access-token';
import { writable, Writable } from 'svelte/store';
import {} from 'globals/user'
import { User } from '../domain/user';

export type AuthState = {
  user: Writable<User>;
  refreshToken: string;
  accessToken: AccessToken;
};

export const authState = writable<AuthState | null>(null);

export {setAuthHandler, authHandler, NoopAuthHandler, AuthHandler} from './auth-handler';
