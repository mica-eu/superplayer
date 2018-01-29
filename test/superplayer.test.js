const Superplayer = require('../index');
const superplayer = new Superplayer();

describe('Superplayer.js', () => {
  test('create a class instance', () => {
    expect(superplayer).toBeInstanceOf(Superplayer);
  });

  test('request an access token', async () => {
    const token = await superplayer.token;
    expect(token).toEqual(expect.any(String));
    expect(token).toEqual(expect.stringContaining('SUPER'));
    expect(token).toEqual(expect.stringContaining(superplayer.rawToken));
  });

  test('request a filter list', async () => {
    const filters = await superplayer.filters();
    expect(filters).toEqual(expect.any(Array));
    expect(filters[0]).toEqual(expect.objectContaining({
      key: expect.any(String),
      name: expect.any(String),
      playlists: expect.any(Array)
    }));
  });

  test('request a categories list', async () => {
    const categories = await superplayer.categories();
    expect(categories).toEqual(expect.any(Array));
    expect(categories[0]).toEqual(expect.objectContaining({
      key: expect.any(String),
      name: expect.any(String),
      playlists: expect.any(Array)
    }));
  });

  test('request a playlist', async () => {
    const tracks = await superplayer.play('filtr-selecao-mpb');
    expect(tracks).toEqual(expect.any(Array));
    expect(tracks[0]).toEqual(expect.objectContaining({
      name: expect.any(String),
      artist: expect.any(String),
      media: expect.any(String)
    }));
  });

});
