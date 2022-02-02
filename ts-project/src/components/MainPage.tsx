import { ChangeEvent, useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { IMyAlbum } from "../types/artists";
import SingleArtist from "./SingleArtist";
//import { IQuery } from "../types/query";

const MainPage = () => {
  const [myAlbum, setMyAlbum] = useState<IMyAlbum[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchArtist("drake");
  }, []);

  const fetchArtist = async (query: string) => {
    try {
      let resp = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
      );
      if (resp.ok) {
        let Album = await resp.json();
        console.log(Album.data);
        setMyAlbum(Album.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    fetchArtist(e.target.value);
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-center">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Search for your Artist</Form.Label>
              <Form.Control
                type="text"
                placeholder="Artist"
                value={query}
                onChange={handleSearch}
              />
            </Form.Group>
          </Form>
        </div>
      </div>
      <Row xs={2} md={6} className="g-2">
        {myAlbum
          .filter((album) => album.artist.name.toLowerCase().includes(query))
          .slice(0, 10)
          .map((album) => (
            <SingleArtist album={album} key={album.album.id} />
          ))}
      </Row>
    </div>
  );
};

export default MainPage;
