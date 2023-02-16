import { createElement } from '../render';


const createFilmBoardTemplate = () => `
<div class="films"></div>
`;

export default class FilmsBoardView {
  getTemlate() {
    return createFilmBoardTemplate();
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
