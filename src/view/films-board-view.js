import { createElement } from '../render';


const createFilmBoardTemplate = () => `
<section class="films"></section>
`;

export default class FilmsBoardView {
  #element = null;

  get template() {
    return createFilmBoardTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
