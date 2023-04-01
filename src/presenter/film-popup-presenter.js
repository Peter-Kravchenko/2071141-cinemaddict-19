import FilmPopupView from '../view/film-popup-view';


let popupIsRendered = null;

export default class FilmPopupPresenter {
  #popupContainer = null;
  #filmPopupComponent = null;
  #film = null;
  #commentsModel = null;
  #onWatchlistClick = null;
  #onAlreadyWatchedClick = null;
  #onFavoriteClick = null;


  constructor ({ popupContainer, film, commentsModel, onWatchlistClick, onAlreadyWatchedClick, onFavoriteClick }){
    this.#film = film;
    this.#commentsModel = commentsModel;
    this.#popupContainer = popupContainer;
    this.#onWatchlistClick = onWatchlistClick;
    this.#onAlreadyWatchedClick = onAlreadyWatchedClick;
    this.#onFavoriteClick = onFavoriteClick;

  }

  renderPopup() {
    this.#commentsModel.getFilmComments(this.#film.id).then((comments) => {
      if (popupIsRendered) {
        popupIsRendered.deletePopup();
      }
      this.#filmPopupComponent = new FilmPopupView({
        film: {...this.#film, comments},
        onCloseBtnClick: this.#deletePopupClickHandler,
        onWatchlistClick: this.#onWatchlistClick,
        onAlreadyWatchedClick: this.#onAlreadyWatchedClick,
        onFavoriteClick: this.#onFavoriteClick,
      });
      document.body.classList.add('hide-overflow');
      this.#popupContainer.appendChild(this.#filmPopupComponent.element);
      this.#popupContainer.addEventListener('keydown', this.#deletePopupKeydownHandler);
      popupIsRendered = this;
    });
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
