const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "aa727a14ec53ccfa36e5d33634f18406";

let searchMovies = `${BASE_URL}/search/movie`;
let trendMovies = `${BASE_URL}/trending/movie/week`;

const fetchMovies = async (page = 1, query?: string) => {
  let url = "";
  if (query) {
    url = `${searchMovies}?api_key=${API_KEY}&query=${query}&page=${page}`;
  } else {
    url = `${trendMovies}?api_key=${API_KEY}&page=${page}`;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

const fetchMovieById = async (id: any) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
    );
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.log(error);
  }
};

export { fetchMovies, fetchMovieById };
