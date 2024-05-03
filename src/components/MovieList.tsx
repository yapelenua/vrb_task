import { IMovie } from '../types/app.types';
import MovieCard from './MovieCard';

interface MovieListProps {
  data: IMovie[];
  searchText: string;
}

export default function MovieList({ data, searchText }: MovieListProps) {
  const filteredData = data.filter((movie) =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="flex w-[1400px] justify-center flex-wrap gap-10 mt-8 mb-8">
      {filteredData.length === 0 ? (
        <div className="text-center text-gray-500">No movie found</div>
      ) : (
        filteredData.map((movie) => (
          <MovieCard movie={movie} />
        ))
      )}
    </div>
  );
}
