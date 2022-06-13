export interface UserResponse {
  total: number;
  users: User[];
}

export interface User {
  user_id: string;
  nickname: string;
  channel_id: string;
}
