import { render } from '../render';
import { getRandomArrayElement } from '../utils/ulils';
import FilmPopupView from '../view/film-popup-view';


export default class FilmPopupPresenter {

  #popupContainer = null;
  #filmsModel = null;
  #film = null;
  #comments = null;

  constructor ({popupContainer, filmsModel}){
    this.#popupContainer = popupContainer;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#film = getRandomArrayElement(this.#filmsModel.films);
    this.#comments = this.#filmsModel.comments.filter((comment) => this.#film.comments.includes(comment.id));
  }

  popup() {
    render ( new FilmPopupView({film: this.#film,
      comments: this.#comments
    }), this.#popupContainer);
  }
}
