import AbstractView from '../framework/view/abstract-view';
import { humanizePopupReleaseDate, humanizePopupCommentDate } from '../utils/film';

const getButtonStatus = (isActive) => (isActive ? 'film-details__control-button--active' : '');

const createCommentsTemplate = (comments) => (`
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
    <ul class="film-details__comments-list">
      ${comments.map((comment) => `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
  </span>
  <div>
    <p class="film-details__comment-text">${comment.comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comment.author}</span>
      <span class="film-details__comment-day">${humanizePopupCommentDate(comment.date)}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`)}
</ul>
`);

const createFilmPopupTemplate = (film, comments) => {
  const { filmInfo, userDetails } = film;

  const commentsTemplate = createCommentsTemplate(comments);

  return (`
  <section class="film-details">
  <div class="film-details__inner">
  <div class="film-details__top-container">
    <div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
  </div>
  <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="./${filmInfo.poster}" alt="${filmInfo.alternativeTitle}">
        <p class="film-details__age">${filmInfo.ageRating}</p>
      </div>
      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${filmInfo.title}</h3>
            <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
          </div>
          <div class="film-details__rating">
            <p class="film-details__total-rating">${filmInfo.totalRating}</p>
          </div>
        </div>
        <table class="film-details__table">
          <tbody><tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${filmInfo.director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${filmInfo.writers.join(', ')}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${filmInfo.actors.join(', ')}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${humanizePopupReleaseDate(filmInfo.release.date)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Duration</td>
            <td class="film-details__cell">${filmInfo.duration} m</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">
              <span class="film-details__genre">${filmInfo.genre.join(', ')}</span>
            </td>
          </tr>
        </tbody></table>
        <p class="film-details__film-description">
        ${filmInfo.description}
        </p>
      </div>
    </div>
    <section class="film-details__controls">
      <button type="button" class=" ${getButtonStatus(userDetails.watchlist)} film-details__control-button film-details__control-button--active film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class=" ${getButtonStatus(userDetails.alreadyWatched)} film-details__control-button film-details__control-button--watched" id="watched" name="watched">Already watched</button>
      <button type="button" class=" ${getButtonStatus(userDetails.favorite)} film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>
  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
  
    ${commentsTemplate}
      <form class="film-details__new-comment" action="" method="get">
        <div class="film-details__add-emoji-label">
          <img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
        </div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
        </label>
        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked="">
          <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </form>
  </section>
  </div>
  `);
};

export default class FilmPopupView extends AbstractView {
  #film = null;
  #commentsByFilm = [];
  #handleCloseBtnClick = null;

  constructor({ film, commentsByFilm, onCloseBtnClick }) {
    super();
    this.#film = film;
    this.#commentsByFilm = commentsByFilm;
    this.#handleCloseBtnClick = onCloseBtnClick;

    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closeBtnClickHandler);
  }

  get template() {
    return createFilmPopupTemplate(this.#film, this.#commentsByFilm);
  }

  #closeBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseBtnClick();
  };
}
