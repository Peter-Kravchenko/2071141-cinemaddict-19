import { render } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmListView from '../view/film-list-view';
import ShowMoreBtnView from '../view/show-more-btn-view';


export default class ContentPresenter {
  filmListComponent = new FilmListView();

  constructor({filmContainer}) {
    this.filmContainer = filmContainer;
  }

  init() {
    render(this.filmListComponent, this.filmContainer);
    for (let i = 0; i < 5; i ++) {
      render(new FilmCardView(), this.filmListComponent.getElement());}

    render(new ShowMoreBtnView(), this.filmListComponent.getElement());
  }
}
