import { render, remove, replace } from '../framework/render';
import FilmCardView from '../view/film-card-view';
import FilmPopupPresenter from './film-popup-presenter';


export default class FilmPresenter {
  #film = null;
  #filmsListContainerComponent = null;
  #commentsByFilm = null;
  #filmPopupPresenter = null;
  #filmCardComponent = null;


  constructor({ filmsListContainerComponent }) {
    this.#filmsListContainerComponent = filmsListContainerComponent;
  }

  init(film, filmsModel) {
    this.#film = film;

    this.#commentsByFilm = filmsModel.comments.filter((comment) => film.comments.includes(comment.id));
    this.#filmPopupPresenter = new FilmPopupPresenter({
      popupContainer: document.body,
      film,
      commentsByFilm: this.#commentsByFilm,
    });

    const prevFilmCardComponent = this.#filmCardComponent;
    this.#filmCardComponent = new FilmCardView({film,
      onFilmCardClick: this.#handleFilmCardClick
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

  #handleFilmCardClick = () => this.#filmPopupPresenter.renderPopup();
}
