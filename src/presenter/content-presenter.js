import { render } from '../render';
import FilmsBoardView from '../view/films-board-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container';
import SortView from '../view/sort-view';
import FilmPopupPresenter from './film-popup-presenter';
import FilmCardView from '../view/film-card-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import FilmsListTopRatedExtraView from '../view/films-list-top-rated-view';
import FilmsListMostCommentView from '../view/films-list-most-coments-view';
import NoFilmsView from '../view/no-films-view';

const FILMS_COUNT_PER_STEP = 5;

export default class ContentPresenter {
  #filmsContainer = null;
  #filmsModel = null;

  #filmsBoardComponent = new FilmsBoardView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();

  #showMoreBtnComponent = null;

  #films = [];
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

  constructor({filmContainer, filmsModel}) {
    this.#filmsContainer = filmContainer;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    this.#renderFilmsBoard();
  }

  #handleShowMoreBtnClick = () => {
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

    render (filmCardComponent, this.#filmsListContainerComponent.element);
  }

  #renderFilmsBoard() {
    render(new SortView(), this.#filmsContainer);
    render(this.#filmsBoardComponent, this.#filmsContainer);
    render(this.#filmsListComponent, this.#filmsBoardComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    if (this.#films.length === 0) {
      render(new NoFilmsView(), this.#filmsContainer);
    } else {

      for (let i = 0; i < Math.min(this.#films.length, FILMS_COUNT_PER_STEP); i ++) {
        this.#renderFilmCard(this.#films[i]);
      }
      if (this.#films.length > FILMS_COUNT_PER_STEP) {

        this.#showMoreBtnComponent = new ShowMoreBtnView({
          onClick: this.#handleShowMoreBtnClick
        });
        render(this.#showMoreBtnComponent, this.#filmsListComponent.element);
      }

      render(new FilmsListTopRatedExtraView(), this.#filmsBoardComponent.element);
      render(new FilmsListMostCommentView(), this.#filmsBoardComponent.element);
    }

  }

}
