import { Modal, useModal } from "../../../components/Modal/Modal";
import useHome from "./hooks/useHome";

const Home = () => {
  const {
    movies,
    IMG_BASEURL,
    onMoviePress,
    currentMovie,
    handleChangeQuery,
    handleSubmitSearch,
  } = useHome();

  const movieDetails = ({ closeModal }: { closeModal: () => void }) => {
    return (
      <div className="mt-4">
        <div className="flex flex-col sm:flex-row justifu-center items-center sm:items-start">
          <img
            className="w-[300px] mb-5 sm:mr-5"
            src={`${IMG_BASEURL}${currentMovie?.poster_path}`}
            alt={`${currentMovie?.title}`}
          />
          <div className="w-full h-full flex justify-start flex-col">
            <h3 className="text-white text-left font-bold mt-4">User Score:</h3>
            <p className="text-white text-left">
              {(currentMovie?.vote_average * 10)?.toFixed(2)}%
            </p>
            <h3 className="text-white text-left font-bold mt-4">Genres:</h3>
            <p className="text-white text-left">
              {currentMovie?.genres
                ?.map((item: { id: number; name: string }) => item.name)
                ?.join(", ")}
            </p>
            <h3 className="text-white text-left font-bold mt-4">Overview:</h3>
            <p className="text-white text-left">{currentMovie?.overview}</p>
          </div>
        </div>

        <button
          onClick={closeModal}
          className="relative inline-flex items-center justify-center p-0.5 mt-4 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Close
          </span>
        </button>
      </div>
    );
  };

  const { modalControl: modalControl, openModal: openModal } = useModal({
    title: `${currentMovie?.title} (${currentMovie?.release_date?.slice(
      0,
      4
    )})`,
    content: movieDetails,
    size: "full",
  });
  return (
    <>
      <Modal {...modalControl} />
      <form
        className="max-w-md mx-auto mt-10 px-4"
        onSubmit={handleSubmitSearch}
      >
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            onChange={handleChangeQuery}
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-200 dark:placeholder-gray-400 dark:text-grey dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Movies..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="flex justify-center items-center flex-row flex-wrap p-20 gap-4">
        {movies?.length &&
          movies.map((item: any) => (
            <button
              key={item.id}
              onClick={() => {
                onMoviePress(item.id);
                openModal();
              }}
            >
              <img
                className="w-[200px] transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg dark:hover:shadow-black/30 overflow-hidden bg-white bg-fixed hover:opacity-40"
                src={`${IMG_BASEURL}${item.poster_path}`}
                alt={`${item.title}`}
              />
            </button>
          ))}
      </div>
    </>
  );
};

export default Home;
