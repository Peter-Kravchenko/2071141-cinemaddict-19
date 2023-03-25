import { render } from './framework/render.js';
import FilmsModel from './model/films-model';
import ContentPresenter from './presenter/content-presenter';
import FiltersView from './view/filters-view';
import UserProfileView from './view/user-profile-view';
import FooterStatisticsView from './view/footer-statistics-view';
import { generateFilter, mockComments, mockFilms } from './mocks/film-mocks.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel({
  films: mockFilms,
  comments: mockComments
});

const contentPresenter = new ContentPresenter({
  filmContainer: siteMainElement,
  filmsModel
});

const filters = generateFilter(filmsModel.films);
const filmsCount = filmsModel.films.length;

render(new UserProfileView(), siteHeaderElement);
render(new FiltersView({filters}), siteMainElement);
render(new FooterStatisticsView({filmsCount}), siteFooterElement);

contentPresenter.init();
