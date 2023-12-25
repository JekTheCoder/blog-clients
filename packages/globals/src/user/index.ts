import { writable } from 'svelte/store';

export type User = {
  id: string;
  username: string;
  name: string;
  kind: number;
};

export type Tokens = {
  token: string;
  refreshToken: string;
};

export type AccessToken = {
  exp: number;
  id: string;
  role: number;
};

export const user = writable<User | null>(null);
export let tokens: Tokens | null = null;

export function setTokens(tokens: Tokens | null) {
  if (!tokens) {
    tokens = null;
    return;
  }

  const { token, refreshToken } = tokens;

  tokens = {
    token,
    refreshToken
  };
}
