import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { Track } from "../types/artists";
//import { IQuery } from "../types/query";

const MainPage = () => {
  const [results, setResults] = useState<Track[]>([]);
  const [query, setQuery] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let resp = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
      );
      if (resp.ok) {
        let { data } = await resp.json();
        setResults(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-center">
          <Form onSubmit={handleSubmit}>
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
      <Row xs={10} md={6} className="g-2">
        {results
          .filter((track) => track.artist.name.toLowerCase().includes(query))
          .slice(0, 10)
          .map((track) => (
            <Col className="my-2 mx-2">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={track.album.cover_medium} />
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default MainPage;
