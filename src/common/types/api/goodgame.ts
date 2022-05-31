export interface GoodgameProfile {
  user: {
    user_id: string;
    username: string;
  };
}

export interface GoodgameStream {
  channelkey: string;
  broadcast:
    | null
    | boolean
    | {
        game: string;
        start: number;
        title: string;
      };
  title: string;
  game: string;
  preview: string;
  status: boolean;
  viewers: number;
}
