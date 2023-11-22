import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { LiaImdb } from "react-icons/lia";
import { SiRottentomatoes } from "react-icons/si";
const apiKey = import.meta.env.VITE_OMDB_API_KEY;

function Movie({ addWatched, addPlanToWatch }) {
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

  const { Title: title, Poster: poster, Released, Year } = movieDetail;

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="mx-auto max-w-[1200px] px-5 mt-9">
      <div className="flex gap-7 bg-gradient-to-b from-gray-800 border-[1px] border-gray-600 rounded-xl">
        <img src={poster} alt="" className="w-[320px] h-[500px] rounded-s-xl" />
        <div>
          <h2 className="text-3xl mt-5 pe-3">{title}</h2>
          <div className="flex gap-4 mb-3">
            <p className="pt-5 text-slate-400 ">{Year}</p>

            <p className="pt-5 text-slate-400">Released: {Released}</p>
          </div>
          <h4 className="text-lg mb-3">{movieDetail.Genre}</h4>
          <p>Plot</p>
          <p className="pe-5 text-sm h-[65px] overflow-hidden">
            {movieDetail.Plot}
          </p>
          <div className="pt-4 pb-5 flex gap-2 text-sm">
            <p>
              {" "}
              <span className="text-purple-400">Directed :</span>{" "}
              {movieDetail.Director} &#8226;
            </p>
            <p>
              {" "}
              <span className="text-purple-400">Producers :</span>{" "}
              {movieDetail.Production} &#8226;
            </p>
            <p>
              {" "}
              <span className="text-purple-400">Actors :</span>{" "}
              {movieDetail.Actors}
            </p>
          </div>

          <div className="flex gap-7">
            {movieDetail.Ratings?.map((rating) => {
              let Source;
              if (rating.Source == "Internet Movie Database") {
                Source = <LiaImdb />;
              } else if (rating.Source == "Rotten Tomatoes") {
                Source = <SiRottentomatoes />;
              }

              if (!Source) {
                return null;
              }

              return (
                <div key={rating.Source} className="flex items-center gap-3">
                  <span className="text-3xl"> {Source}</span>{" "}
                  <span className="text-xl font-sans">{rating.Value}</span>
                </div>
              );
            })}
          </div>
          <div className="flex gap-5 mt-8">
            <button
              className="border-[0.5px] rounded-lg px-4 py-2 pe-5"
              onClick={() => addWatched(movieDetail)}
            >
              Add to watch list
            </button>
            <button
              className="border-[0.5px] rounded-lg px-4 py-2 pe-5"
              onClick={() => addPlanToWatch(movieDetail)}
            >
              Add to plan to watch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
