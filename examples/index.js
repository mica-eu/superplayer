const Superplayer = require('../');

const superplayer = new Superplayer();

superplayer.play('de-balada')
  .then(playlist => console.log(playlist))
  .catch(err => console.log(err));
