import AbstractView from '../framework/view/abstract-view';
import { humanizeReleazeDate } from '../utils/ulils';

const getButtonStatus = (isActive) => (isActive ? 'film-card__controls-item--active' : '');

const createFilmCardTemplate = (film) => {
  const { comments, filmInfo, userDetails } = film;

  return (`
  <article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${filmInfo.title}</h3>
      <p class="film-card__rating">${filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${humanizeReleazeDate(filmInfo.release.date)}</span>
        <span class="film-card__duration">${filmInfo.duration}m</span>
        <span class="film-card__genre">${filmInfo.genre.join(', ')}</span>
      </p>
      <img src="./${filmInfo.poster}" alt="${filmInfo.alternativeTitle}" class="film-card__poster">
      <p class="film-card__description">${filmInfo.description}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="${getButtonStatus(userDetails.watchlist)} film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="${getButtonStatus(userDetails.alreadyWatched)} film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="${getButtonStatus(userDetails.favorite)} film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>
  `);
};

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor({ film }) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }
}
