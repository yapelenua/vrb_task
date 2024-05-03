import { useStore } from '../store/moviesStore';

export default function InfoModalComponent() {
  const {
    editedDescription,
    editedTitle,
    saveDescription,
    modalData,
    editedActors,
    editedGenre,
    editedDirector
  } = useStore();
  
  return (
    <div>
      <button className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900" onClick={() => useStore.setState({ modalIsOpen: false })}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex">
        <div className="w-1/2 flex justify-center items-center">
          <img src={modalData?.image} alt={modalData?.title} className="object-cover" />
        </div>
        <div className="w-1/2 p-4">
          <h2 className="text-lg font-bold">Title</h2>
          <input
            className="input-field w-full p-2 my-2 border rounded"
            value={editedTitle}
            onChange={(e) => useStore.setState({ editedTitle: e.target.value })}
            placeholder="Title"
          />
          
          <h2 className="text-lg font-bold">Description</h2>
          <textarea
            className="input-field w-full p-2 my-2 border rounded"
            value={editedDescription}
            onChange={(e) => useStore.setState({ editedDescription: e.target.value })}
            placeholder="Description"
          />
    
          <h2 className="text-lg font-bold">Actors</h2>
          <input
            className="input-field w-full p-2 my-2 border rounded"
            value={editedActors}
            onChange={(e) => useStore.setState({ editedActors: e.target.value.split(', ') })} 
            placeholder="Actors"
          />
    
          <h2 className="text-lg font-bold">Genres</h2>
          <input
            className="input-field w-full p-2 my-2 border rounded"
            value={editedGenre}
            onChange={(e) => useStore.setState({ editedGenre: e.target.value.split(', ') })}
            placeholder="Genres"
          />
    
          <h2 className="text-lg font-bold">Director</h2>
          <input
            className="input-field w-full p-2 my-2 border rounded"
            value={editedDirector}
            onChange={(e) => useStore.setState({ editedDirector: e.target.value })}
            placeholder="Director"
          />
    
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={saveDescription}>Save</button>
        </div>
      </div>
    </div>
  );
}
