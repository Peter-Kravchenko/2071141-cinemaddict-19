import { render, remove, replace } from '../framework/render';
import FilmCardView from '../view/film-card-view';
import FilmPopupPresenter from './film-popup-presenter';


export default class FilmPresenter {
  #film = null;
  #filmsListContainerComponent = null;
  #commentsByFilm = null;
  #filmPopupPresenter = null;
  #filmCardComponent = null;
  #handleDataChange = null;


  constructor({ filmsListContainerComponent, onDataChange }) {
    this.#filmsListContainerComponent = filmsListContainerComponent;
    this.#handleDataChange = onDataChange;
  }

  init(film, filmsModel) {
    this.#film = film;
    this.#commentsByFilm = filmsModel.comments.filter((comment) => film.comments.includes(comment.id));
    this.#filmPopupPresenter = new FilmPopupPresenter({
      popupContainer: document.body,
      film: this.#film,
      commentsByFilm: this.#commentsByFilm,
      onWatchlistClick: this.#handleWatchlistClick,
      onAlreadyWatchedClick: this.#handleAlreadyWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    const prevFilmCardComponent = this.#filmCardComponent;
    this.#filmCardComponent = new FilmCardView({
      film: this.#film,
      onFilmCardClick: this.#handleFilmCardClick,
      onWatchlistClick: this.#handleWatchlistClick,
      onAlreadyWatchedClick: this.#handleAlreadyWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmsListContainerComponent);
      return;
    }

    if (this.#filmsListContainerComponent.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#filmPopupPresenter !== null){
      this.#filmPopupPresenter.renderPopup();
    }

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this.#filmCardComponent);
  }

  #handleWatchlistClick = () => {
    this.#film.userDetails.watchlist = !this.#film.userDetails.watchlist;
    this.#handleDataChange(this.#film);
  };

  #handleAlreadyWatchedClick = () => {
    this.#film.userDetails.alreadyWatched = !this.#film.userDetails.alreadyWatched;
    this.#handleDataChange(this.#film);
  };

  #handleFavoriteClick = () => {
    this.#film.userDetails.favorite = !this.#film.userDetails.favorite;
    this.#handleDataChange(this.#film);
  };

  #handleFilmCardClick = () => this.#filmPopupPresenter.renderPopup();
}
