import { render } from './framework/render.js';
import FilmsModel from './model/films-model';
import ContentPresenter from './presenter/content-presenter';
import FiltersView from './view/filters-view';
import UserProfileView from './view/user-profile-view';
import FooterStatisticsView from './view/footer-statistics-view';


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel();

const contentPresenter = new ContentPresenter({
  filmContainer: siteMainElement,
  filmsModel
});

render(new UserProfileView(), siteHeaderElement);
render(new FiltersView(), siteMainElement);
render(new FooterStatisticsView(), siteFooterElement);

contentPresenter.init();
