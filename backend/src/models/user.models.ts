export interface User {
  username: string;
  password: string;
}

export interface UserAuth {
  username: string;
  id: string;
}

export interface UserPayload {
  username: string;
  sub: string;
}
