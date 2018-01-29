'use strict';

const unirest = require('unirest');

/**
 * Superplayer api for NodeJS
 * @author Micael Souza <micael.souza@outlook.com>
 */
module.exports = class Superplayer {

  /** Creates a Superplayer instance */
  constructor() {
    this.rawToken = null;
    this.baseURL = 'https://api.superplayer.fm/';
  }

  /**
   * Get an access token
   * @async
   * @example (async () => const token = await this.token)();
   * @example (async () => const token = await superplayer.token)();
   * @return {Promise<string>} The access token
   */
  get token() {
    return new Promise((resolve) => {
      if (this.rawToken) return resolve(`SUPER ${this.rawToken}`);

      unirest('GET', 'https://www.superplayer.fm/player')
        .end(({ error, headers: { 'set-cookie': cookies } }) => {
          if (error) {
            throw error;
          }

          this.rawToken = cookies[1].split(';')[0].split('=')[1];
          resolve(`SUPER ${this.rawToken}`);
        });
    });
  }

  /**
   * Get a filter list
   * @async
   * @return {Promise<array>} Filter list
   */
  async filters () {
    const authorization = await this.token;

    return new Promise((resolve) => {
      unirest('GET', `${this.baseURL}/v1/filters`)
        .headers({ authorization })
        .end(({ error, body }) => {
          if (error) {
            throw error;
          }

          resolve(body);
        });
    });
  }

  /**
   * Get a category list
   * @async
   * @return {Promise<array>} Category list
   */
  async categories () {
    const authorization = await this.token;

    return new Promise((resolve) => {
      unirest('GET', `${this.baseURL}/v1/categories`)
        .headers({ authorization })
        .end(({ error, body: { categories } }) => {
          if (error) {
            throw error;
          }

          resolve(categories);
        });
    });
  }

  /**
   * Get a playlist
   * @async
   * @param {string} key Playlist key. ex: 'filtr-selecao-mpb'
   * @return {Promise<array>} Track list
   */
  async play(key) {
    const authorization = await this.token;

    return new Promise((resolve) => {
      unirest('POST', `${this.baseURL}/v2/play`)
      .headers({
        authorization,
        'content-type': 'application/x-www-form-urlencoded',
      })
      .form({
        'mix[0][item][type]': 'playlist',
        'mix[0][item][key]': key,
      })
      .end(({ error, body: { tracks } }) => {
        if (error) {
          throw new Error('Play request error');
        }

        resolve(tracks.filter(({ type }) => type === 'song'));
      });
    });
  }
}
