import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMovieGenre from "../../hooks/Hooks";
import Button from "../../components/button";
import { FaRedo, FaHome, FaInfoCircle, FaPlay } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import "./Film.css";
import { useQuiz } from "../../context/QuizContext";

const Film = () => {
  const navigate = useNavigate();
  const { answers } = useQuiz();

  const [selectedMovie, fetchMovies] = useMovieGenre();
  const [showDescription, setShowDescription] = useState(false);
  const [loading, setLoading] = useState(true);

  const resetState = () => {
    setShowDescription(false);
    setLoading(true);
  };

  const resetStateAndNavigate = () => {
    resetState();
    navigate("/quiz", { replace: true });
  };

  const goToQuizStart = () => {
    resetState();
    navigate("/");
  };

  useEffect(() => {
    if (selectedMovie) {
      setLoading(false);
    }
  }, [selectedMovie]);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const loadAnotherMovie = () => {
    setLoading(true);
    fetchMovies().then(() => {
      setLoading(false);
    });
  };

  return (
    <div className="film">
      <div className="film_container">
        <div className="film_response">
          <div className="image_container">
            {loading ? (
              <ClipLoader size={50} color={"#123abc"} loading={loading} />
            ) : (
              <img
                src={selectedMovie?.imageUrl || ""}
                alt={selectedMovie?.title || "Película"}
                className="film_image"
              />
            )}
          </div>
          {selectedMovie && (
            <div className="description_container">
              <h2>{selectedMovie.title}</h2>
              {showDescription && selectedMovie.description && (
                <div className="description">
                  <p>{selectedMovie.description}</p>
                </div>
              )}
              <div className="button_container">
                {selectedMovie.description && (
                  <Button
                    text={<FaInfoCircle />}
                    onClick={toggleDescription}
                    className="button_film"
                  />
                )}
                {selectedMovie.trailerUrl && (
                  <a
                    href={selectedMovie.trailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      text={<FaPlay />}
                      className="button_film"
                      onClick={() => {}}
                    />
                  </a>
                )}
                <Button
                  text={<FaRedo />}
                  className="button_film"
                  onClick={loadAnotherMovie}
                />
                <Button
                  text={<FaHome />}
                  className="button_film"
                  onClick={goToQuizStart}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Film;
