import { render, remove } from '../framework/render.js';
import FilmsBoardView from '../view/films-board-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container';
import SortView from '../view/sort-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import FilmsListTopRatedExtraView from '../view/films-list-top-rated-view';
import FilmsListMostCommentView from '../view/films-list-most-coments-view';
import NoFilmsView from '../view/no-films-view';
import FilmPresenter from './film-presenter.js';


const FILMS_COUNT_PER_STEP = 5;

export default class ContentPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #showMoreBtnComponent = null;
  #filmPresenter = null;

  #filmsBoardComponent = new FilmsBoardView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #noFilmsComponent = new NoFilmsView();

  #films = [];
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

  constructor({ filmContainer, filmsModel }) {
    this.#filmsContainer = filmContainer;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    this.#renderFilmsBoard();
  }

  #handleShowMoreBtnClick = () => {
    this.#renderFilmCards(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);
    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      remove(this.#showMoreBtnComponent);
    }
  };

  #renderSort() {
    render(new SortView(), this.#filmsContainer);
  }

  #renderShowMoreBtn() {
    this.#showMoreBtnComponent = new ShowMoreBtnView({
      onClick: this.#handleShowMoreBtnClick
    });
    render(this.#showMoreBtnComponent, this.#filmsListComponent.element);
  }

  #renderFilmsListTopRated() {
    render(new FilmsListTopRatedExtraView(), this.#filmsBoardComponent.element);
  }

  #renderFilmsListMostComment() {
    render(new FilmsListMostCommentView(), this.#filmsBoardComponent.element);
  }

  #renderNoFilms() {
    render(this.#noFilmsComponent, this.#filmsContainer);
  }

  #renderFilmCard(film) {
    this.#filmPresenter = new FilmPresenter({
      filmsListContainerComponent: this.#filmsListContainerComponent.element
    });
    this.#filmPresenter.init(film, this.#filmsModel);
  }

  #renderFilmCards(from, to) {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilmCard(film));
  }

  #renderFilmsList() {
    render(this.#filmsListComponent, this.#filmsBoardComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#renderFilmCards(0, Math.min(this.#films.length, FILMS_COUNT_PER_STEP));

    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreBtn();
    }
  }

  #renderFilmsBoard() {
    this.#renderSort();
    render(this.#filmsBoardComponent, this.#filmsContainer);

    if (this.#films.length === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderFilmsList();
    this.#renderFilmsListTopRated();
    this.#renderFilmsListMostComment();
  }
}
