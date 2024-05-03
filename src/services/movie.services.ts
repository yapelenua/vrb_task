import axios from 'axios'

class MovieService {
  fetchMovies() {
    return axios.get('http://localhost:8000/movies')
  }

  fetchModalData(id:number){
    return axios.get(`http://localhost:8000/movies/${id}`)
  }

  deleteMovie(id:number){
    return axios.delete(`http://localhost:8000/movies/${id}`)
  }

  saveDescription(id: number, description: string, title: string, director:string, genre: string[], actors: string[]) {
    return axios.patch(`http://localhost:8000/movies/${id}`, {
      description,
      title,
      director,
      genre,
      actors
    });
  }

  saveNewMovie(newMovie: any) {
    return axios.post('http://localhost:8000/movies', newMovie);
  }
}

export const movieService = new MovieService()