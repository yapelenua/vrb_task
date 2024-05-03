export interface IMovie {
  id: any;
  title: string;
  description: string;
  rating: number;
  release_date: string;
  image: string;
  actors:string[],
  genre: string[],
  director: string
}

export interface IState {
  data: IMovie[];
  favorites: IMovie[];
  modalIsOpen: boolean;
  createModalIsOpen: boolean;
  modalData: IMovie | null;
  editedDescription: string;
  editedTitle: string;
  editedDirector:string;
  editedActors: string[];
  editedGenre:string[];
  newMovie: IMovie;
  fetchData: () => Promise<void>;
  fetchModalData: (id: number) => Promise<void>;
  addToFavorite: (movie: IMovie) => void;
  removeFromFavorite: (id: any) => void;
  shortenDescription: (description: string) => string;
  deleteMovie: (id: number) => Promise<void>;
  saveDescription: () => Promise<void>;
  saveNewMovie: () => Promise<void>;
  handleFavoriteButtonClick: (movie: IMovie) => void;
}
