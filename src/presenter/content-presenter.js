import { render } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmsBoardView from '../view/films-board-view';
import FilmsListExtraView from '../view/films-list-extra-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreBtnView from '../view/show-more-btn-view';


export default class ContentPresenter {
  filmsBoardComponent = new FilmsBoardView();
  filmListComponent = new FilmsListView();

  constructor({filmContainer}) {
    this.filmContainer = filmContainer;
  }

  init() {
    render(this.filmsBoardComponent, this.filmContainer);
    render(this.filmListComponent, this.filmsBoardComponent.getElement());
    for (let i = 0; i < 5; i ++) {
      render(new FilmCardView(), this.filmListComponent.getElement());}

    render(new ShowMoreBtnView(), this.filmListComponent.getElement());

    render(new FilmsListExtraView(), this.filmsBoardComponent.getElement());

    render(new FilmsListExtraView(), this.filmsBoardComponent.getElement());
  }
}
