import { ChangeEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { IMyArtists } from "../types/artists";
//import { IQuery } from "../types/query";

const MainPage = () => {
  const [myArtists, setMyArtists] = useState<IMyArtists[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchArtist("query");
  }, []);

  const fetchArtist = async (query: string) => {
    try {
      let resp = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
      );
      if (resp.ok) {
        let artists = await resp.json();
        console.log(artists.data);
        setMyArtists(artists);
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
  );
};

export default MainPage;
