import Observable from '../framework/observable';

export default class FilmsModel extends Observable {
  #films = null;

  constructor({films}) {
    super();
    this.#films = films;

  }

  get films() {
    return this.#films;
  }

  set films(films) {
    this.#films = films;
  }

  updateFilm(updateType, update) {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  #adaptFilmsToClient(film) {

    const release = {
      ...film.film_info.release,
      date: film.film_info.release.date !== null ? new Date(film.film_info.release.date) : film.film_info.release.date,
      releaseCountry: film.film_info.release.release_country
    };
    delete release.release_country;

    const filmInfo = {
      ...film.film_info,
      ageRating: film.film_info.age_rating,
      alternativeTitle: film.film_info.alternative_title,
      release,
      totalRating: film.film_info.total_rating,
    };
    delete filmInfo.age_rating;
    delete filmInfo.alternative_title;
    delete filmInfo.total_rating;

    const userDetails = {
      ...film.user_details,
      alreadyWatched: film.user_details.already_watched,
      watchingDate: film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date
    };

    delete userDetails.already_watched;
    delete userDetails.watching_date;

    const adaptedMovie = {...film,
      filmInfo,
      userDetails,
    };

    delete adaptedMovie.user_details;
    delete adaptedMovie.film_info;

    return adaptedMovie;
  }

  #adaptCommentsToClient(comment) {
    const adaptedComment = {
      ...comment,
      commentDate: comment.date !== null ? new Date(comment.date) : comment.date,
    };

    delete comment.date;

    return adaptedComment;
  }
}
