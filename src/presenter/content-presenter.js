import { render, remove, RenderPosition } from '../framework/render.js';
import FilmsBoardView from '../view/films-board-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container';
import FooterStatisticsView from '../view/footer-statistics-view';
import SortView from '../view/sort-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import NoFilmsView from '../view/no-films-view';
import FilmPresenter from './film-presenter.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import { sortByDate, sortByRating } from '../utils/film.js';


const FILMS_COUNT_PER_STEP = 5;
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const siteFooterElement = document.querySelector('.footer');


export default class ContentPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #showMoreBtnComponent = null;
  #sortComponent = null;

  #filmsBoardComponent = new FilmsBoardView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #noFilmsComponent = new NoFilmsView();

  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #filmPresentersMap = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor({ filmContainer, filmsModel, commentsModel }) {
    this.#filmsContainer = filmContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    return this.#filmsModel.films;
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  init() {

    this.#renderFilmsBoard();
  }

  #handleShowMoreBtnClick = () => {
    this.#renderFilmCards(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);
    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.films.length) {
      remove(this.#showMoreBtnComponent);
    }
  };

  #handleFilmChange = (updatedFilm) => {
    //обновление модели
    this.#filmPresentersMap.get(updatedFilm.id).init(updatedFilm, this.#filmsModel);
  };

  #handleSortTypeChange = (sortType) => {

    if (this.#currentSortType === sortType) {
      return;
    }

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

  #renderNoFilms() {
    render(this.#noFilmsComponent, this.#filmsContainer);
  }

  #renderFooterStatistics() {
    render(new FooterStatisticsView({
      filmsCount: this.#filmsModel.films.length
    }), siteFooterElement);
  }

  #renderFilmCard(film) {
    const filmPresenter = new FilmPresenter({
      filmsListContainerComponent: this.#filmsListContainerComponent.element,
      commentsModel: this.#commentsModel,
      onDataChange: this.#handleViewAction,
    });
    filmPresenter.init(film, this.comments);
    this.#filmPresentersMap.set(film.id, filmPresenter);
  }

  #renderFilmCards(from, to) {
    this.films
      .slice(from, to)
      .forEach((film) => this.#renderFilmCard(film));
  }

  #clearFilmsList() {
    this.#filmPresentersMap.forEach((presenter) => presenter.destroy());
    this.#filmPresentersMap.clear();
    this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;

    remove(this.#showMoreBtnComponent);
  }

  #renderFilmsList() {
    render(this.#filmsListComponent, this.#filmsBoardComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#renderFilmCards(0, Math.min(this.films.length, FILMS_COUNT_PER_STEP));

    if (this.films.length > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreBtn();
    }
  }

  #renderFilmsBoard() {
    render(this.#filmsBoardComponent, this.#filmsContainer);

    if (this.films.length === 0) {
      this.#renderNoFilms();
      return;
    }
    this.#renderSort();
    this.#renderFilmsList();
  }

  // #renderLoading() {
  //   render(this.#loadingComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  // }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#filmsModel.updateFilm(updateType, update);
        this.#commentsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresentersMap.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.clearFilmList();
        this.renderFilms(FILMS_COUNT_PER_STEP);
        break;
      case UpdateType.MAJOR:
        this.clearFilmList({resetSortType: true});
        this.renderFilms(FILMS_COUNT_PER_STEP);
        break;
      case UpdateType.INIT:
        this.#renderFilmsBoard();
        this.#renderFooterStatistics();
        break;
    }
  };
}
