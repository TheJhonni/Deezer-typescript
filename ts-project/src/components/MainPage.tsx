import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
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
        <div className="d-flex justify-content-center align-items-start">
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
      <Row xs={10} md={5} className="g-2 my-2">
        {results
          .filter((track) => track.artist.name.toLowerCase().includes(query))
          .slice(0, 30)
          .map((track) => (
            <Link to={"details/" + track.id}>
              <Col className="my-2 mx-4">
                <Card className="m-2" style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={track.album.cover_medium} />
                </Card>
              </Col>
            </Link>
          ))}
      </Row>
    </div>
  );
};

export default MainPage;
