import { render } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmsBoardView from '../view/films-board-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import FilmPopupPresenter from './film-popup-presenter';
import FilmsListTopRatedExtraView from '../view/films-list-top-rated-view';
import FilmsListMostCommentView from '../view/film-list-most-coments-view';
import NoFilmsView from '../view/no-films-view';
import SortView from '../view/sort-view';

const FILMS_COUNT_PER_STEP = 5;

export default class ContentPresenter {
  #filmContainer = null;
  #filmsModel = null;

  #filmsBoardComponent = new FilmsBoardView();
  #filmListComponent = new FilmsListView();
  #showMoreBtnComponent = null;

  #films = [];
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

  constructor({filmContainer, filmsModel}) {
    this.#filmContainer = filmContainer;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];

    render(this.#filmsBoardComponent, this.#filmContainer);
    render(this.#filmListComponent, this.#filmsBoardComponent.element);

    if (this.#films.length === 0) {
      render(new NoFilmsView(), this.#filmContainer);
    } else {

      render(new SortView(), this.#filmContainer);

      for (let i = 0; i < Math.min(this.#films.length, FILMS_COUNT_PER_STEP); i ++) {
        this.#renderFilmCard(this.#films[i]);
      }

      if (this.#films.length > FILMS_COUNT_PER_STEP) {
        this.#showMoreBtnComponent = new ShowMoreBtnView();
        render(this.#showMoreBtnComponent, this.#filmListComponent.element);

        this.#showMoreBtnComponent.element.addEventListener('click',
          this.#showMoreBtnClickHandler);
      }
    }
    //render(new FilmsListTopRatedExtraView(), this.#filmsBoardComponent.element);
    //render(new FilmsListMostCommentView(), this.#filmsBoardComponent.element);
  }

  #showMoreBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#films
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilmCard(film));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      this.#showMoreBtnComponent.element.remove();
      this.#showMoreBtnComponent.removeElement();
    }
  };

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
