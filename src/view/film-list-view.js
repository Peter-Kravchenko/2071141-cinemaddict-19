import { createElement } from '../render';


const createFilmListTemplate = () => `
<div class="films-list__container"></div>
`;

export default class FilmListView {
  getTemlate() {
    return createFilmListTemplate();
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
