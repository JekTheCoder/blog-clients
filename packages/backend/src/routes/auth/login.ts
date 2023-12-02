import axios from 'axios';
import { apiUrl } from '../../config';

export type LoginResponse = {
  user: {
    id: string;
    username: string;
    name: string;
    kind: number;
  };
  token: string;
  refreshToken: string;
};

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  return axios
    .post<LoginResponse>(`${apiUrl}/auth/login`, {
      username,
      password
    })
    .then((response) => response.data);
};
