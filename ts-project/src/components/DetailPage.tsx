import { useEffect, useState } from "react";
import { Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { TrackDetail } from "../types/artists";

function DetailPage() {
  const { id } = useParams();

  const [trackDetails, setTrackDetails] = useState<TrackDetail | null>(null);

  useEffect(() => {
    (async () => {
      const resp = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/track/" + id
      );

      if (!resp.ok) return;

      const data = await resp.json();
      setTrackDetails(data);
    })();
  }, []);

  return trackDetails ? (
    <Container>
      <Row>
        <Image fluid src={trackDetails.album.cover_big} />
        <div className="d-flex flex-column ml-5">
          <h1>{trackDetails.title}</h1>
          <h3>{trackDetails.artist.name}</h3>
        </div>
      </Row>
    </Container>
  ) : null;
}

export default DetailPage;
