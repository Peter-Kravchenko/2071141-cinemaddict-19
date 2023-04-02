import AbstractView from '../framework/view/abstract-view.js';

const getUserProfile = (watchedFilmsQuantity) => {
  if (watchedFilmsQuantity > 0 && watchedFilmsQuantity <= 10) {
    return 'novice';
  }
  if (watchedFilmsQuantity > 10 && watchedFilmsQuantity <= 20) {
    return 'fan';
  }
  if (watchedFilmsQuantity > 20) {
    return 'movie buff';
  }
};

const createProfileTemplate = (watchedFilmsQuantity) => (
  `<section class="header__profile profile">
      <p class="profile__rating">${getUserProfile(watchedFilmsQuantity)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
);

export default class UserProfileView extends AbstractView {
  #watchedFilmsQuantity = null;

  constructor({watchedFilmsQuantity}) {
    super();
    this.#watchedFilmsQuantity = watchedFilmsQuantity;
  }

  get template() {
    return createProfileTemplate(this.#watchedFilmsQuantity);
  }

}
