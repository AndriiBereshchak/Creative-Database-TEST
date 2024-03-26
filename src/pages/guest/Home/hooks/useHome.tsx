import { useEffect, useState } from "react";
import { fetchMovieById, fetchMovies } from "../../../../services/api/api";

const IMG_BASEURL = "https://image.tmdb.org/t/p/w500";

const useHome = () => {
  const [movies, setMovies] = useState<any>([]);
  const [currentMovie, setCurrentMovie] = useState<any>([]);
  const [query, setQuery] = useState<string>("");

  const onMoviePress = (id: number) => {
    fetchMovieById(id).then((data) => {
      if (data) {
        setCurrentMovie(data);
      }
    });
  };

  useEffect(() => {
    fetchMovies().then((data) => {
      if (data?.length > 0) {
        setMovies(data);
      }
    });
  }, []);

  const handleChangeQuery = (e: any) => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmitSearch = (e: any) => {
    e.preventDefault();

    query && fetchMovies(1, query).then(setMovies);
    setQuery("");
  };

  return {
    movies,
    IMG_BASEURL,
    onMoviePress,
    currentMovie,
    handleChangeQuery,
    handleSubmitSearch,
  };
};

export default useHome;
