import { render } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmsBoardView from '../view/films-board-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
//import { getRandomArrayElement } from '../utils/ulils';
import FilmPopupPresenter from './film-popup-presenter';
//import FilmsListTopRatedExtraView from '../view/films-list-top-rated-view';
//import FilmsListMostCommentView from '../view/film-list-most-coments-view';


export default class ContentPresenter {
  #filmContainer = null;
  #filmsModel = null;

  #filmsBoardComponent = new FilmsBoardView();
  #filmListComponent = new FilmsListView();

  #films = [];

  constructor({filmContainer, filmsModel}) {
    this.#filmContainer = filmContainer;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    // this.#commentsByFilm = [...this.#filmsModel.comments.filter((comment) => this.#film.comments.includes(comment.id))];


    render(this.#filmsBoardComponent, this.#filmContainer);
    render(this.#filmListComponent, this.#filmsBoardComponent.element);

    for (let i = 0; i < this.#films.length; i ++) {
      this.#renderFilmCard(this.#films[i]);
    }

    render(new ShowMoreBtnView(), this.#filmListComponent.element);
    //render(new FilmsListTopRatedExtraView(), this.#filmsBoardComponent.element);
    //render(new FilmsListMostCommentView(), this.#filmsBoardComponent.element);
  }

  #renderFilmCard(film) {
    const commentsByFilm = this.#filmsModel.comments.filter((comment) => film.comments.includes(comment.id));
    const filmCardComponent = new FilmCardView({film});
    const filmPopupPresenter = new FilmPopupPresenter({popupContainer: document.body, film, commentsByFilm});

    filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      filmPopupPresenter.renderPopup();
    });


    render (filmCardComponent, this.#filmListComponent.element);
  }

}
