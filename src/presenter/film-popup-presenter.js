import FilmPopupView from '../view/film-popup-view';


export default class FilmPopupPresenter {
  #popupContainer = null;
  #filmPopupComponent = null;

  constructor ({ popupContainer, film, commentsByFilm }){
    this.#popupContainer = popupContainer;
    this.#filmPopupComponent = new FilmPopupView({
      film,
      commentsByFilm,
      onCloseBtnClick: () => this.deletePopup()
    });
  }

  renderPopup() {
    document.body.classList.add('hide-overflow');
    this.#popupContainer.appendChild(this.#filmPopupComponent.element);
    this.#popupContainer.addEventListener('keydown', this.#deletePopupKeydownHandler);
  }

  deletePopup() {
    document.body.classList.remove('hide-overflow');
    this.#popupContainer.removeChild(this.#filmPopupComponent.element);
    this.#popupContainer.removeEventListener('keydown', this.#deletePopupKeydownHandler);
  }

  #deletePopupKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.deletePopup();
    }
  };
}
