import { useStore } from '../store/moviesStore';
import { IMovie } from '../types/app.types';

interface IProps {
  movie: IMovie
}

export default function MovieCard({movie} : IProps) {
  const { fetchModalData, shortenDescription, deleteMovie, handleFavoriteButtonClick } = useStore();

  
  return (
    <div>
      <div key={movie.id} className="flex flex-col items-center p-4 border rounded-lg h-[600px] w-[300px] pb-[30px]" onClick={() => { fetchModalData(movie.id); useStore.setState({ modalIsOpen: true }) }}>
            <div className="bg-zinc-400 h-[300px] w-[200px]">
              <img src={movie.image} alt={movie.title} className="mb-2 h-[300px] max-w-[200px] object-cover" />
            </div>
            <h2 className="text-lg font-bold">{movie.title}</h2>
            <p className="text-gray-60 h-[90px]">{shortenDescription(movie.description)}</p>
            <p className="">Rating: {movie.rating}</p>
            <p>Release Date: {movie.release_date}</p>
            <button
              onClick={() => {handleFavoriteButtonClick(movie)}}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {localStorage.getItem('favorites') && JSON.parse(localStorage.getItem('favorites') || '[]').some((favMovie: IMovie) => favMovie.id === movie.id)
                ? "Remove from Favorites"
                : "Add to Favorites"
              }
            </button>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
          </div>
    </div>
  );
}
