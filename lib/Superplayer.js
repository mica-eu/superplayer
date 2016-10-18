'use strict';

const unirest = require('unirest');

class Superplayer {
  constructor() {
    this.token = null;
  }

  getToken() {
    return new Promise((resolve, reject) => {
      if (this.token) {
        resolve(this.token);
        return;
      }

      unirest('GET', 'https://www.superplayer.fm/player').end(res => {
        if (res.error) reject(res.error);

        let token = res.headers['set-cookie'][1].split(';')[0].split('=')[1];

        this.token = token;

        resolve(token);
      });
    });
  }

  play(playlistskey) {
    return new Promise((resolve, reject) => {
      this.getToken().then((token) => {
        unirest('POST', 'https://api.superplayer.fm/v1/play')
        .headers({
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': `SUPER ${token}`
        })
        .form({'playlistskey[]': playlistskey})
        .end(res => {
          if (res.error) reject(res.error);

          if (res.body.tracks) {
            // removendo propagandas da playlist
            res.body.tracks = res.body.tracks.filter((track) => {
              return track.type != 'spot';
            }).map((track) => {
              // url da media em alta qualidade - 192kbps
              track.media = track.media.replace('_64kbps', '');
              return track;
            });
          }

          resolve(res.body);
        });
      });
    });
  }
}

module.exports = Superplayer;
