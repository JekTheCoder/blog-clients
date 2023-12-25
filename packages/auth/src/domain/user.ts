import { Role } from "./role";

export type User = {
  id: string;
  username: string;
  name: string;
  kind: Role;
};

