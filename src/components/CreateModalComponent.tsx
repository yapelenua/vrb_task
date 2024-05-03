import { useStore } from '../store/moviesStore';

export default function CreateModalComponent() {
  const { newMovie, saveNewMovie } = useStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    useStore.setState({ newMovie: { ...newMovie, [field]: value } });
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <button onClick={() => useStore.setState({ createModalIsOpen: false })} className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="text-lg font-semibold mb-2">Add New Movie</h2>
      <input
        className="input-field mb-2"
        placeholder="Title"
        value={newMovie.title}
        onChange={(e) => handleInputChange(e, 'title')}
      />
      <input
        className="input-field mb-2"
        placeholder="Description"
        value={newMovie.description}
        onChange={(e) => handleInputChange(e, 'description')}
      />
      <input
        className="input-field mb-2"
        placeholder="Director"
        value={newMovie.director}
        onChange={(e) => handleInputChange(e, 'director')}
      />
      <input
        className="input-field mb-2"
        placeholder="Genre"
        value={newMovie.genre}
        onChange={(e) => handleInputChange(e, 'genre')}
      />
      <input
        className="input-field mb-2"
        placeholder="Actor(s)"
        value={newMovie.actors}
        onChange={(e) => handleInputChange(e, 'actors')}
      />
      <input
        className="input-field mb-2"
        placeholder="Rating"
        type="number"
        value={newMovie.rating}
        onChange={(e) => handleInputChange(e, 'rating')}
      />
      <input
        className="input-field mb-2"
        placeholder="Release Date"
        value={newMovie.release_date}
        onChange={(e) => handleInputChange(e, 'release_date')}
      />
      <input
        className="input-field mb-2"
        placeholder="Image URL"
        value={newMovie.image}
        onChange={(e) => handleInputChange(e, 'image')}
      />
      <button onClick={saveNewMovie} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Save</button>
    </div>
  );
}
