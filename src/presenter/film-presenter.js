import { UpdateType, UserAction } from '../const';
import { render, remove, replace } from '../framework/render';
import FilmCardView from '../view/film-card-view';
import FilmPopupPresenter from './film-popup-presenter';


export default class FilmPresenter {
  #film = null;
  #filmsListContainerComponent = null;
  #filmPopupPresenter = null;
  #filmCardComponent = null;
  #handleDataChange = null;


  constructor({ filmsListContainerComponent, onDataChange }) {
    this.#filmsListContainerComponent = filmsListContainerComponent;
    this.#handleDataChange = onDataChange;
  }

  init(filmData, comments) {
    const film = {
      ...filmData,
      comments: comments.filter((comment) => filmData.comments.includes(comment.id))
    };

    this.#filmPopupPresenter = new FilmPopupPresenter({
      popupContainer: document.body,
      film,
      onWatchlistClick: this.#handleWatchlistClick,
      onAlreadyWatchedClick: this.#handleAlreadyWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    const prevFilmCardComponent = this.#filmCardComponent;
    this.#filmCardComponent = new FilmCardView({
      film,
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
    this.#handleDataChange(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      this.#film);
  };

  #handleFavoriteClick = () => {
    this.#film.userDetails.favorite = !this.#film.userDetails.favorite;
    this.#handleDataChange(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      this.#film);
  };

  #handleFilmCardClick = () => this.#filmPopupPresenter.renderPopup();
}
