import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;

function Movie({addWatched,addPlanToWatch}) {
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchMovieDetail() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`
        );
        const data = await res.json();
        setMovieDetail(data);
        console.log(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetail();
  }, [id]);

  const { Title: title } = movieDetail;

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <h2>{title}</h2>
      <h2>{id}Here movie detail will be shown</h2>
      <button className="border px-4 py-1 pe-5" onClick={()=>addWatched(movieDetail)}>Add to watch list</button>
      <button className="border px-4 py-1" onClick={()=>addPlanToWatch(movieDetail)}>Add to plan to watch</button>
    </div>
  );
}

export default Movie;
