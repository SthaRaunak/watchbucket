import { useParams } from "react-router-dom";

function Movie() {
  const { id } = useParams();

  return (
    <div className="text-5xl">
      <h2>{id}Here movie detail will be shown</h2>
    </div>
  );
}

export default Movie;
