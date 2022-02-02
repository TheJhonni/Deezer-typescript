export interface IMyArtists {
  album: {
    cover_medium: string;
    id: number;
    title: string;
    artist: {
      name: string;
      id: number;
      picture_small: string;
    };
  };
}
