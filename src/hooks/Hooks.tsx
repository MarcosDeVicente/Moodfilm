import { useState, useEffect } from "react";
import axios from "axios";

type Answers = {
  question1: string;
  question2: string;
  question3: string;
};

type Movie = {
  title: string;
  imageUrl: string;
  trailerUrl?: string;
} | null;

const useMovieGenre = (answers: Answers): Movie => {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(null);
  const mapAnswersToGenre = (
    mood: string,
    activity: string,
    preference: string
  ): number => {
    // Mapeo de combinaciones de ánimo, actividad y preferencia a géneros de películas
    if (mood === "Happy") {
      if (activity === "Watch something relaxing") {
        return preference === "Reflect it" ? 10751 : 35; // Familiar o Comedia
      } else if (activity === "Look for inspiration") {
        return preference === "Reflect it" ? 18 : 14; // Drama o Fantasía
      } else {
        return preference === "Reflect it" ? 28 : 12; // Acción o Aventura
      }
    } else if (mood === "Sad") {
      if (activity === "Watch something relaxing") {
        return preference === "Reflect it" ? 9648 : 35; // Misterio o Comedia
      } else if (activity === "Look for inspiration") {
        return preference === "Reflect it" ? 18 : 10749; // Drama o Romance
      } else {
        return preference === "Reflect it" ? 27 : 878; // Terror o Ciencia ficción
      }
    } else {
      // Anxious
      if (activity === "Watch something relaxing") {
        return preference === "Reflect it" ? 36 : 16; // Histórica o Animación
      } else if (activity === "Look for inspiration") {
        return preference === "Reflect it" ? 99 : 10402; // Documental o Música
      } else {
        return preference === "Reflect it" ? 53 : 80; // Thriller o Crimen
      }
    }
  };

  const fetchTrailer = async (movieId: number) => {
    try {
      const trailerResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        {
          params: {
            api_key: "ce5424884e45717855c7a6c155122707",
            language: "es-ES",
          },
        }
      );
      const trailerData = trailerResponse.data.results;
      const trailer = trailerData.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
    } catch (error) {
      console.error("Error fetching trailer:", error);
      return null;
    }
  };

  // Función para buscar películas basadas en el género
  const fetchMovies = async (): Promise<void> => {
    const genreId = mapAnswersToGenre(
      answers.question1,
      answers.question2,
      answers.question3
    );
    const randomPage = Math.floor(Math.random() * 10) + 1;

    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: "ce5424884e45717855c7a6c155122707",
            with_genres: genreId,
            language: "es-ES",
            page: randomPage,
          },
        }
      );

      const movies = response.data.results;
      if (movies.length > 0) {
        const randomMovieIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomMovieIndex];
        const trailerUrl = await fetchTrailer(randomMovie.id); // Obtener tráiler
        setSelectedMovie({
          title: randomMovie.title,
          imageUrl: `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`,
          trailerUrl,
        });
      } else {
        setSelectedMovie(null);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setSelectedMovie(null);
    }
  };

  useEffect(() => {
    if (answers.question1 && answers.question2 && answers.question3) {
      fetchMovies();
    }
  }, [answers]);

  return selectedMovie;
};

export default useMovieGenre;
