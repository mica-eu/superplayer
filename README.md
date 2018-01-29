# Superplayer

API do [superplayer](https://www.superplayer.fm/player) para NodeJS.

## Instalação
```bash
npm i superplayer --save
```

## Exemplo de uso
```javascript
const Superplayer = require('superplayer');
const superplayer = new Superplayer();

// Listando as faixas de uma playlist
superplayer.play('50th-summer-of-love')
  .then(tracks => console.log(tracks))
  .catch(error => console.error(error));
```

A resposta deste método será um `array` com as faixas da playlist.
```javascript
[{
  "type": "song",
  "key": "2d3e24f7f8db4c491b2e178357a113f6",
  "name": "Paper Sun",
  "artist": "Traffic",
  "album": "Total 60s",
  "art": "https://content01.superplayer.fm/umg/7/0/total-60s_medium.jpeg",
  "thumb": "https://content01.superplayer.fm/umg/7/0/total-60s_thumb.jpeg",
  "media": "https://content01.superplayer.fm/umg/5/b/8bc068794d53744438aab833758736ffab791b1b.mp3?st=SJswnneI4-TzARM_VXENWA&e=1517191686",
  "length": "03:27",
  "duration": 207,
  "source": {
      "type": "playlist",
      "key": "50th-summer-of-love"
  }
}, ...]
```

# Métodos

| Método                  | Descrição                                    |
| -                       | -                                            |
| `play('playlist-key')`  | Lista as faixas de uma playlist.             |
| `filters()`             | Lista de filtros e suas playlists.           |
| `categories()`          | Lista de categorias e suas playlists.        |

# Licença
MIT
