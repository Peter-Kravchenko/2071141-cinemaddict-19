import { render } from './framework/render.js';
import FilmsModel from './model/films-model';
import ContentPresenter from './presenter/content-presenter';
import UserProfileView from './view/user-profile-view';
import FooterStatisticsView from './view/footer-statistics-view';
import CommentsModel from './model/comments-model.js';
import FilmsApiService from './api/films-api-service.js';
import CommentsApiService from './api/comments-api-service.js';

const AUTHORIZATION = 'Basic mhkjhkj';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel({
  filmsApiService: new FilmsApiService(END_POINT, AUTHORIZATION)
});

const commentsModel = new CommentsModel({
  commentsApiService: new CommentsApiService(END_POINT, AUTHORIZATION),
  filmsModel
});

const contentPresenter = new ContentPresenter({
  filmContainer: siteMainElement,
  filmsModel,
  commentsModel,
});

const filmsCount = filmsModel.films.length;

render(new UserProfileView(), siteHeaderElement);
render(new FooterStatisticsView({filmsCount}), siteFooterElement);

contentPresenter.init();
filmsModel.init();
