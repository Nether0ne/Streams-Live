export interface GoodgameProfile {
  id: string;
  streamer: {
    nickname: string;
    avatar: string;
  };
}

export interface GoodgameStream {
  streamkey: string;
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
  online: number;
  viewers: number;
}
