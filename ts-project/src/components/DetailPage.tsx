import { useEffect, useState } from "react";
import { IMyAlbum } from "../types/artists";

interface SingleArtistProps {
  album: IMyAlbum;
}

const DetailPage = (album: SingleArtistProps) => {
  const [mySong, setMySong] = useState<IMyAlbum[]>([]);

  useEffect(() => {
    fetchSong(album.album.album.id);
  }, []);

  const fetchSong = async (id: number) => {
    try {
      let resp = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/track/${id}`
      );
      if (resp.ok) {
        let song = await resp.json();
        console.log(song);
        setMySong(song);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p>{album.album.album.title}</p>
    </div>
  );
};

export default DetailPage;
