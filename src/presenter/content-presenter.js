import { render } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmsBoardView from '../view/films-board-view';
import FilmsListTopRatedExtraView from '../view/films-list-top-rated-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreBtnView from '../view/show-more-btn-view';
import FilmsListMostCommentView from '../view/film-list-most-coments-view';


export default class ContentPresenter {
  filmsBoardComponent = new FilmsBoardView();
  filmListComponent = new FilmsListView();

  constructor({filmContainer, filmsModel}) {
    this.filmContainer = filmContainer;
    this.filmsModel = filmsModel;
  }

  init() {
    this.films = [...this.filmsModel.getFilms()];
    this.comments = [...this.filmsModel.getComments()];


    render(this.filmsBoardComponent, this.filmContainer);
    render(this.filmListComponent, this.filmsBoardComponent.getElement());
    for (let i = 0; i < this.films.length; i ++) {
      render(new FilmCardView({film: this.films[i]}),
        this.filmListComponent.getElement());}

    render(new ShowMoreBtnView(), this.filmListComponent.getElement());
    render(new FilmsListTopRatedExtraView(), this.filmsBoardComponent.getElement());
    render(new FilmsListMostCommentView(), this.filmsBoardComponent.getElement());

  }
}
