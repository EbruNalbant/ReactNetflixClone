import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseImgUrl, options } from "./../constants/constants";
import Loading from "../components/Loading";

const MovieDetail = () => {
  const { movie_id } = useParams();
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    axios
      .get(`movie/${movie_id}`, options)
      .then((res) => setDetail(res.data))
      .catch((err) => console.log(err));
  }, []);

  const sum = detail?.revenue - detail?.budget;
  console.log(detail);

  if (!detail) return <Loading />;
  return (
    <div className="movie-detail row p-4 ">
      <div className="col-md-4 d-flex align-items-center justify-content-center mb-4">
        <div className="position-relative " style={{ maxWidth: "400px" }}>
          <img
            className="img-fluid shadow-lg rounded"
            src={baseImgUrl.concat(detail.poster_path)}
          />
          <span className="position-absolute bg-warning rounded p-1 shadow top-0 end-0 ">
            {detail.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="col-md-8 d-flex flex-column justify-content-center">
        <h1>{detail.title}</h1>
        <p>{detail.overview}</p>
        <div className="row">
          <div className="col-6 col-md-12">
            <p>Budget: {detail.budget} $</p>
            <p>Revenue: {detail.revenue} $</p>
            <p>
              {sum >= 0 ? "Profit" : "Loss"}: {sum} $
            </p>
          </div>
          <div className="col-6 col-md-12">
            <div className="d-flex gap-3 ">
              Categories:
              {detail.genres.map((genre) => (
                <p className="badge bg-primary" key={genre.id}>
                  {genre.name}
                </p>
              ))}
            </div>
            <div className="d-flex gap-3 ">
              Languages:
              {detail.spoken_languages.map((lang) => (
                <p className="badge bg-danger" key={lang.id}>
                  {lang.name}
                </p>
              ))}
            </div>
            <div className="d-flex gap-3 ">
              Production Companies:
              {detail.production_companies.map((comp) => (
                <p className="badge bg-success" key={comp.id}>
                  {comp.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
