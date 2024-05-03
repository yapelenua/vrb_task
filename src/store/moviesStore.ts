import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { IMovie, IState } from '../types/app.types';
import { movieService } from '../services/movie.services'


export const useStore = create<IState>((set) => ({
  data: [],
  modalIsOpen: false,
  favorites: [],
  createModalIsOpen: false,
  modalData: null,
  editedDescription: '',
  editedTitle: '',
  editedDirector: '',
  editedActors: [],
  editedGenre: [],
  newMovie: {
    id: uuidv4(),
    title: '',
    description: '',
    rating: 0,
    release_date: '',
    image: '',
    director: '',
    actors:[],
    genre: [],
  },
  fetchData: async () => {
    try {
      const response = await movieService.fetchMovies();
      set({ data: response.data });
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  },
  fetchModalData: async (id: number) => {
    try {
      const response = await movieService.fetchModalData(id);
      set({ modalData: response.data, 
        editedDescription: response.data.description, 
        editedTitle: response.data.title,
        editedDirector: response.data.director,
        editedGenre: response.data.genre,
        editedActors: response.data.actors
      });
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  },
  addToFavorite: (movie: IMovie) => {
    set((state) => {
      const updatedData = state.data.map((m) => (m.id === movie.id ? { ...m, isFavorite: true } : m));
      return { ...state, data: updatedData };
    });
    try {
      const favorites = localStorage.getItem('favorites');
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites) as IMovie[];
        const isAlreadyFavorite = parsedFavorites.some((favMovie) => favMovie.id === movie.id);
        if (isAlreadyFavorite) {
          localStorage.setItem('favorites', JSON.stringify(parsedFavorites.filter((favMovie) => favMovie.id !== movie.id)));
        } else {
          localStorage.setItem('favorites', JSON.stringify([...parsedFavorites, movie]));
        }
      } else {
        localStorage.setItem('favorites', JSON.stringify([movie]));
      }
    } catch (error) {
      console.log('Error adding to favorites:', error);
    };
  },
  
  
  removeFromFavorite: (id: any) => {
    set((state) => {
      const updatedData = state.data.map((m) => (m.id === id ? { ...m, isFavorite: false } : m));
      return { ...state, data: updatedData };
    });
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as IMovie[];
    const updatedFavorites = favorites.filter((movie) => movie.id !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  },

  handleFavoriteButtonClick: (movie: IMovie) => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const parsedFavorites = JSON.parse(favorites) as IMovie[];
      const isAlreadyFavorite = parsedFavorites.some((favMovie) => favMovie.id === movie.id);
      if (isAlreadyFavorite) {
        useStore.getState().removeFromFavorite(movie.id);
      } else {
        useStore.getState().addToFavorite(movie);
      }
    } else {
      useStore.getState().addToFavorite(movie);
    }
  },

  shortenDescription: (description: string) => {
    const words = description.split(' ');
    if (words.length > 15) {
      return words.slice(0, 15).join(' ') + '...';
    }
    return description;
  },
  deleteMovie: async (id: number) => {
    try {
      await movieService.deleteMovie(id);
      set((state) => ({ ...state, data: state.data.filter((movie) => movie.id !== id), modalIsOpen: false }));
    } catch (error) {
      console.log('Error deleting movie:', error);
    }
  },
  saveDescription: async () => {
    const { modalData, editedDescription, editedTitle, editedDirector, editedActors, editedGenre} = useStore.getState();
    try {
      await movieService.saveDescription(modalData?.id, editedDescription, editedTitle,editedDirector, editedGenre, editedActors)
      set((state) => ({
        ...state,
        data: state.data.map((movie) => {
          if (movie.id === modalData?.id) {
            return { ...movie,
              description: editedDescription, 
              title: editedTitle, 
              director: editedDirector,
              genre: editedGenre,
              actors: editedActors
            };
          }
          return movie;
        }),
        modalIsOpen: false
      }));
    } catch (error) {
      console.log('Error saving description:', error);
    }
  },
  saveNewMovie: async () => {
    const { newMovie } = useStore.getState();
    try {
      await movieService.saveNewMovie(newMovie);
      set((state) => ({
        ...state,
        data: [newMovie, ...state.data],
        newMovie: {
          id: uuidv4(),
          title: '',
          description: '',
          rating: 0,
          release_date: '',
          image: '',
          director: '',
          actors:[],
          genre: [],
        },
        createModalIsOpen: false
      }));
    } catch (error) {
      console.log('Error saving new movie:', error);
    }
  },
}));
