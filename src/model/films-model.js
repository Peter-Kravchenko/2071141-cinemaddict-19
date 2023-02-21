import { getRandomFilm, mockComments } from '../mocks/film-mocks';

const FILMS_COUNT = 33;

export default class FilmsModel {
  #films = Array.from({length: FILMS_COUNT}, getRandomFilm);
  #comments = mockComments;

  get films() {
    return this.#films;
  }

  get comments() {
    return this.#comments;
  }

}
