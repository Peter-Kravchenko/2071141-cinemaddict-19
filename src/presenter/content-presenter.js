import { render, remove, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils/common';
import FilmsBoardView from '../view/films-board-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container';
import SortView from '../view/sort-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import FilmsListTopRatedExtraView from '../view/films-list-top-rated-view';
import FilmsListMostCommentView from '../view/films-list-most-coments-view';
import NoFilmsView from '../view/no-films-view';
import FilmPresenter from './film-presenter.js';
import { SortType } from '../const.js';
import { sortByDate, sortByRating } from '../utils/film.js';

const FILMS_COUNT_PER_STEP = 5;

export default class ContentPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #showMoreBtnComponent = null;
  #sortComponent = null;

  #filmsBoardComponent = new FilmsBoardView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #noFilmsComponent = new NoFilmsView();

  #films = [];
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #filmPresentersMap = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedFilms = [];

  constructor({ filmContainer, filmsModel }) {
    this.#filmsContainer = filmContainer;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    this.#sourcedFilms = [...this.#filmsModel.films];
    this.#renderFilmsBoard();
  }

  #handleShowMoreBtnClick = () => {
    this.#renderFilmCards(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);
    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      remove(this.#showMoreBtnComponent);
    }
  };

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#sourcedFilms = updateItem(this.#sourcedFilms, updatedFilm);
    this.#filmPresentersMap.get(updatedFilm.id).init(updatedFilm, this.#filmsModel);
  };

  #sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this.#films.sort(sortByDate);
        break;
      case SortType.RATING:
        this.#films.sort(sortByRating);
        break;
      default:
        this.#films = [...this.#sourcedFilms];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmsList();
    this.#renderFilmsList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange});

    render(this.#sortComponent, this.#filmsContainer, RenderPosition.AFTERBEGIN);

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
    const filmPresenter = new FilmPresenter({
      filmsListContainerComponent: this.#filmsListContainerComponent.element,
      onDataChange: this.#handleFilmChange,
    });
    filmPresenter.init(film, this.#filmsModel);
    this.#filmPresentersMap.set(film.id, filmPresenter);
  }

  #renderFilmCards(from, to) {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilmCard(film));
  }

  #clearFilmsList() {
    this.#filmPresentersMap.forEach((presenter) => presenter.destroy());
    this.#filmPresentersMap.clear();
    this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;

    remove(this.#showMoreBtnComponent);
  }//не правильно работает удаление

  #renderFilmsList() {
    render(this.#filmsListComponent, this.#filmsBoardComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#renderFilmCards(0, Math.min(this.#films.length, FILMS_COUNT_PER_STEP));

    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreBtn();
    }
  }

  #renderFilmsBoard() {
    render(this.#filmsBoardComponent, this.#filmsContainer);

    if (this.#films.length === 0) {
      this.#renderNoFilms();
      return;
    }
    this.#renderSort();
    this.#renderFilmsList();
    //this.#renderFilmsListTopRated();
    //this.#renderFilmsListMostComment();
  }
}
