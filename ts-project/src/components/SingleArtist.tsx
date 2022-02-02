import { IMyAlbum } from "../types/artists";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

interface SingleArtistProps {
  album: IMyAlbum;
}

const SingleArtist = ({ album }: SingleArtistProps) => {
  return (
    <>
      <Col className="my-2 mx-2">
        <Card style={{ width: "18rem" }}>
          <Link to={"/" + album.album.id}>
            <Card.Img variant="top" src={album.album.cover_medium} />
          </Link>
        </Card>
      </Col>
    </>
  );
};

export default SingleArtist;
