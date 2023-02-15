import { createElement } from '../render';


const createShowMoreBtnTemplate = () => `
<button class="films-list__show-more">Show more</button>
`;

export default class ShowMoreBtnView {
  getTemlate() {
    return createShowMoreBtnTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemlate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
