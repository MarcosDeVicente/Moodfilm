import { useState, useEffect } from "react";
import axios from "axios";
import { useQuiz } from "../context/QuizContext";

type Mood = "Happy" | "Sad" | "Anxious";
type Activity = "Watch something relaxing" | "Look for inspiration" | "Other";
type Preference = "Reflect it" | "Change it";

type Movie = {
  title: string;
  imageUrl: string;
  description: string;
  trailerUrl?: string | null;
} | null;

type Video = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
};

const useMovieGenre = (): [Movie, () => Promise<void>] => {
  const { answers } = useQuiz();
  const [selectedMovie, setSelectedMovie] = useState<Movie>(null);

  const genreMappings: Record<
    Mood,
    Record<Activity, Record<Preference, number>>
  > = {
    Happy: {
      "Watch something relaxing": { "Reflect it": 10751, "Change it": 35 },
      "Look for inspiration": { "Reflect it": 18, "Change it": 14 },
      Other: { "Reflect it": 28, "Change it": 12 },
    },
    Sad: {
      "Watch something relaxing": { "Reflect it": 9648, "Change it": 35 },
      "Look for inspiration": { "Reflect it": 18, "Change it": 10749 },
      Other: { "Reflect it": 27, "Change it": 878 },
    },
    Anxious: {
      "Watch something relaxing": { "Reflect it": 36, "Change it": 16 },
      "Look for inspiration": { "Reflect it": 99, "Change it": 10402 },
      Other: { "Reflect it": 53, "Change it": 80 },
    },
  };

  const mapAnswersToGenre = (
    mood: Mood,
    activity: Activity,
    preference: Preference
  ): number => {
    return genreMappings[mood][activity][preference];
  };

  const fetchTrailer = async (movieId: number) => {
    try {
      const {
        data: { results: trailerData },
      } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        {
          params: {
            api_key: "ce5424884e45717855c7a6c155122707",
            language: "es-ES",
          },
        }
      );
      const trailer = trailerData.find(
        (video: Video) => video.type === "Trailer" && video.site === "YouTube"
      );
      return trailer
        ? `https://www.youtube.com/watch?v=${trailer.key}`
        : undefined;
    } catch (error) {
      console.error("Error fetching trailer:", error);
      return undefined;
    }
  };

  const fetchMovies = async (): Promise<void> => {
    const genreId = mapAnswersToGenre(
      answers.question1,
      answers.question2,
      answers.question3
    );
    const randomPage = Math.floor(Math.random() * 10) + 1;
    console.log(genreId);
    try {
      const {
        data: { results: movies },
      } = await axios.get("https://api.themoviedb.org/3/discover/movie", {
        params: {
          api_key: "ce5424884e45717855c7a6c155122707",
          with_genres: genreId,
          language: "es-ES",
          page: randomPage,
        },
      });

      if (movies.length > 0) {
        const randomMovieIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomMovieIndex];
        const trailerUrl = await fetchTrailer(randomMovie.id);
        setSelectedMovie({
          title: randomMovie.title,
          imageUrl: `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`,
          description: randomMovie.overview,
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

  return [selectedMovie, fetchMovies];
};

export default useMovieGenre;
