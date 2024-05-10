import { makeObservable, observable, action } from "mobx";
import { IShow } from "../../data/models/Show.tsx";
import { IMovie } from "../../data/models/Movie.tsx";

class CatalogStore {
  tab = 0;
  search = "";
  doReset = false;
  cancelFetching = false;
  shows: IShow[] = [];
  tempShows: IShow[] = [];
  movies: IMovie[] = [];
  tempMovies: IMovie[] = [];
  pageForShows = 1;
  pageForMovies = 1;
  fetchMoreShows = false;
  fetchMoreMovies = false;
  yScrollPosition = 0;
  message = "";

  constructor() {
    makeObservable(this, {
      tab: observable,
      updateTabs: action,
      search: observable,
      updateSearch: action,
      doReset: observable,
      updateDoReset: action,
      cancelFetching: observable,
      updateCancelFetching: action,
      shows: observable,
      movies: observable,
      setShows: action,
      setMovies: action,
      pageForShows: observable,
      updatePageForShows: action,
      pageForMovies: observable,
      updatePageForMovies: action,
      fetchMoreShows: observable,
      fetchMoreMovies: observable,
      updateFetchMoreShows: action,
      updateFetchMoreMovies: action,
      yScrollPosition: observable,
      updateYScrollPosition: action,
      resetAll: action,
      message: observable,
      updateMessage: action,
    });
  }
  updateTabs(tab: number) {
    this.tab = tab;
  }
  updateMessage(message: string) {
    this.message = message;
  }
  updateSearch(search: string) {
    this.search = search;
    if (search.length >= 3) {
      if (this.tab == 0) {
        this.pageForShows = 1;
        this.fetchMoreShows = false;
        this.shows = [];
      } else if (this.tab == 1) {
        this.pageForMovies = 1;
        this.fetchMoreMovies = false;
        this.movies = [];
      }
    } else if (search === "") {
      this.resetAll();
    }
  }
  updateDoReset(reset: boolean) {
    this.doReset = reset;
  }
  updateCancelFetching(cancel: boolean) {
    this.cancelFetching = cancel;
  }
  updatePageForShows() {
    this.pageForShows += 1;
  }
  updatePageForMovies() {
    this.pageForMovies += 1;
  }
  updateFetchMoreShows() {
    this.fetchMoreShows = !this.fetchMoreShows;
  }
  updateFetchMoreMovies() {
    this.fetchMoreMovies = !this.fetchMoreMovies;
  }
  updateYScrollPosition(y: number) {
    this.yScrollPosition = y;
  }
  setShows(data: IShow[]) {
    if (data.length == 0) {
      this.shows = [];
      return;
    }
    if (this.shows.length == 0) this.shows = data.slice(0, 10);
    else this.shows = [...this.shows, ...data.slice(0, 10)];
    this.tempShows = data.slice(10, 20);
  }
  setMovies(data: IMovie[]) {
    if (data.length == 0) {
      this.movies = [];
      return;
    }
    if (this.movies.length == 0) this.movies = data.slice(0, 10);
    else this.movies = [...this.movies, ...data.slice(0, 10)];
    this.tempMovies = data.slice(10, 20);
  }
  resetAll() {
    this.pageForShows = 1;
    this.fetchMoreShows = false;
    this.shows = [];
    this.pageForMovies = 1;
    this.fetchMoreMovies = false;
    this.movies = [];
  }
}

const catalogStore = new CatalogStore();
export default catalogStore;
