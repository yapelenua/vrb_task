import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import { IMovie } from '../types/app.types';
import InputComponent from '../components/InputComponent'

export default function FavoritePage() {
  const [favorites, setFavorites] = useState<IMovie[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const favoritesFromLocalStorage = localStorage.getItem('favorites');
    if (favoritesFromLocalStorage) {
      const parsedFavorites = JSON.parse(favoritesFromLocalStorage);
      setFavorites(parsedFavorites);
    }
  }, []);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value)
  }

  return (
    <div className='flex flex-col justify-center items-center'>        
      <InputComponent searchText={searchText} onHandleSearch={handleSearch}/>
      <MovieList searchText={searchText} data={favorites}/>
    </div>
  );
}
