import ApiService from '../framework/api-service.js';
import {Method} from '../const.js';

export default class CommentsApiService extends ApiService {

  async getComments(filmId) {
    return this._load({ url: `comments/${filmId}` })
      .then(ApiService.parseResponse);
  }

  async addComment(filmId, comment) {
    const response = await this._load({
      url: `comments/${filmId}`,
      method: Method.PUT,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parseResponse = await
    ApiService.parseResponse(response);

    return parseResponse;
  }
}
