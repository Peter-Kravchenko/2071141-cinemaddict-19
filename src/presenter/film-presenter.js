import { render } from '../framework/render';
import FilmCardView from '../view/film-card-view';
import FilmPopupPresenter from './film-popup-presenter';


export default class FilmPresenter {
  #film = null;
  #filmsListContainerComponent = null;

  constructor({ filmsListContainerComponent }) {
    this.#filmsListContainerComponent = filmsListContainerComponent;
  }

  init(film, filmsModel) {
    this.#film = film;
    const commentsByFilm = filmsModel.comments.filter((comment) => film.comments.includes(comment.id));
    const filmPopupPresenter = new FilmPopupPresenter({ popupContainer: document.body, film, commentsByFilm });
    const filmCardComponent = new FilmCardView({ film, onFilmCardClick: () => filmPopupPresenter.renderPopup() });
    render(filmCardComponent, this.#filmsListContainerComponent);
  }
}
