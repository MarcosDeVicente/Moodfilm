import { useLocation } from "react-router-dom";
import useMovieGenre from "../../hooks/Hooks"; // Verifica que la ruta de importación sea correcta
import "./Film.css";

const Film = () => {
  const location = useLocation();
  const { answers } = location.state || {
    answers: { question1: "", question2: "", question3: "" },
  };

  // Usar el custom hook para obtener la película seleccionada
  const selectedMovie = useMovieGenre(answers);

  return (
    <div className="film">
      {selectedMovie ? (
        <div className="film_container">
          <div className="film_response">
            <img
              src={selectedMovie.imageUrl}
              alt={selectedMovie.title}
              className="film_image"
            />
            <h2>{selectedMovie.title}</h2>
          </div>
          {selectedMovie.trailerUrl && (
            <a
              href={selectedMovie.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="trailer_link"
            >
              Ver Tráiler
            </a>
          )}
        </div>
      ) : (
        <div>Cargando películas...</div>
      )}
    </div>
  );
};

export default Film;
