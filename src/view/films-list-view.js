import { createElement } from '../render';


const createFilmListTemplate = () => `
<section class="films-list"></section>
`;

export default class FilmsListView {
  #element = null;

  get template() {
    return createFilmListTemplate();
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
