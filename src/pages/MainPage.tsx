/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useStore } from '../store/moviesStore';
import MovieList from '../components/MovieList';
import Modals from '../components/Modals'
import InputComponent from '../components/InputComponent'

export default function MainPage() {
  const { fetchData, data } = useStore();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value)
  }

  return (
    <div className="App">
      <div className="flex gap-5 justify-center">
        <InputComponent searchText={searchText} onHandleSearch={handleSearch}/>
        <button onClick={() => useStore.setState({ createModalIsOpen: true })} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
      </div>
      <div className="flex justify-center">
        <MovieList searchText = {searchText} data = {data}/>
      </div>
      <Modals />
    </div>
  );
}
