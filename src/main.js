import { render } from './framework/render.js';
import FilmsModel from './model/films-model';
import ContentPresenter from './presenter/content-presenter';
import UserProfileView from './view/user-profile-view';
import CommentsModel from './model/comments-model.js';
import FilmsApiService from './api/films-api-service.js';
import CommentsApiService from './api/comments-api-service.js';

const AUTHORIZATION = 'Basic mhkjhkj';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');


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


render(new UserProfileView(), siteHeaderElement);

contentPresenter.init();
filmsModel.init();
