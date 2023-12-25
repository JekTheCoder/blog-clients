import axios from 'axios';
import { apiUrl } from '../../config';
import { authClient } from '../../client';

export type ReplyCreate = {
  content: string;
};

export function createOneReply(commentId: string, req: ReplyCreate, parentId?: string | null) {
  return authClient.post(`${apiUrl}/comments/${commentId}/replies`, req, {
    params: {
      parentId
    }
  });
}

export type Reply = {
  id: string;
  content: string;

  parentId: string | null;
  hasReplies: boolean;

  account: {
    id: string;
    name: string;
    username: string;
  };
};

export function getAllReplies(commentId: string, parentId?: string) {
  return axios.get<Reply[]>(`${apiUrl}/comments/${commentId}/replies`, {
    params: {
      parentId
    }
  });
}
