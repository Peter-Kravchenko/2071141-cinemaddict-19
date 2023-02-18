import { render } from '../render';
import { getRandomArrayElement } from '../utils/ulils';
import FilmPopupView from '../view/film-popup-view';


export default class FilmPopupPresenter {

  constructor ({popupContainer, filmsModel}){
    this.filmContainer = popupContainer;
    this.filmsModel = filmsModel;
  }

  init() {
    this.film = getRandomArrayElement(this.filmsModel.getFilms());
    this.comments = this.filmsModel.getComments((comment) => this.film.comments.includes(comment.id));
  }

  popup() {
    render ( new FilmPopupView({film: this.film,
      comments: this.comments
    }), this.filmContainer);
  }
}
