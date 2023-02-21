import FilmPopupView from '../view/film-popup-view';


export default class FilmPopupPresenter {

  #popupContainer = null;
  #filmPopupComponent = null;
  #closeBtn = null;


  constructor ({popupContainer, film, commentsByFilm}){
    this.#popupContainer = popupContainer;
    this.#filmPopupComponent = new FilmPopupView({film, commentsByFilm});
    this.#closeBtn = this.#filmPopupComponent.element.querySelector('.film-details__close-btn');
  }


  renderPopup() {
    document.body.classList.add('hide-overflow');
    this.#popupContainer.appendChild(this.#filmPopupComponent.element);
    this.#popupContainer.addEventListener('keydown', this.#deletePopupKeydownHandler);
    this.#closeBtn.addEventListener('click', this.#deletePopupClickHandler);
  }

  deletePopup() {
    document.body.classList.remove('hide-overflow');
    this.#popupContainer.removeChild(this.#filmPopupComponent.element);
    this.#popupContainer.removeEventListener('keydown', this.#deletePopupKeydownHandler);
    this.#closeBtn.removeEventListener('click', this.#deletePopupClickHandler);
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
