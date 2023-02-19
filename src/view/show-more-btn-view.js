import { createElement } from '../render';


const createShowMoreBtnTemplate = () => `
<button class="films-list__show-more">Show more</button>
`;

export default class ShowMoreBtnView {
  #element = null;

  get temlate() {
    return createShowMoreBtnTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.temlate);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
