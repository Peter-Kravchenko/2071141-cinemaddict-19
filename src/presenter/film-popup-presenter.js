import FilmPopupView from '../view/film-popup-view';


let popupIsRendered = null;

export default class FilmPopupPresenter {
  #popupContainer = null;
  #filmPopupComponent = null;
  #film = null;

  constructor ({ popupContainer, film, onWatchlistClick, onAlreadyWatchedClick, onFavoriteClick }){
    this.#film = film;
    this.#popupContainer = popupContainer;
    this.#filmPopupComponent = new FilmPopupView({
      film: this.#film,
      onCloseBtnClick: this.#deletePopupClickHandler,
      onWatchlistClick,
      onAlreadyWatchedClick,
      onFavoriteClick,
    });
  }

  renderPopup() {
    if (popupIsRendered) {
      popupIsRendered.deletePopup();
    }
    document.body.classList.add('hide-overflow');
    this.#popupContainer.appendChild(this.#filmPopupComponent.element);
    this.#popupContainer.addEventListener('keydown', this.#deletePopupKeydownHandler);
    popupIsRendered = this;
  }

  deletePopup() {
    document.body.classList.remove('hide-overflow');
    this.#popupContainer.removeChild(this.#filmPopupComponent.element);
    this.#popupContainer.removeEventListener('keydown', this.#deletePopupKeydownHandler);
    popupIsRendered = null;
  }

  #deletePopupClickHandler = () => {
    this.deletePopup();
  };

  #deletePopupKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.deletePopup();
    }
  };
}
