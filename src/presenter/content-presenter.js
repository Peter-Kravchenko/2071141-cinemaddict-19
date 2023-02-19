import { render } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmsBoardView from '../view/films-board-view';
import FilmsListTopRatedExtraView from '../view/films-list-top-rated-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import FilmsListMostCommentView from '../view/film-list-most-coments-view';


export default class ContentPresenter {
  #filmContainer = null;
  #filmsModel = null;

  #filmsBoardComponent = new FilmsBoardView();
  #filmListComponent = new FilmsListView();

  #films = [];
  #comments = [];

  constructor({filmContainer, filmsModel}) {
    this.#filmContainer = filmContainer;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#filmsModel.comments];


    render(this.#filmsBoardComponent, this.#filmContainer);
    render(this.#filmListComponent, this.#filmsBoardComponent.element);
    for (let i = 0; i < this.#films.length; i ++) {
      render(new FilmCardView({film: this.#films[i]}),
        this.#filmListComponent.element);}

    render(new ShowMoreBtnView(), this.#filmListComponent.element);
    render(new FilmsListTopRatedExtraView(), this.#filmsBoardComponent.element);
    render(new FilmsListMostCommentView(), this.#filmsBoardComponent.element);

  }
}
