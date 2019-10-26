let button = document.getElementById('controlZone');
let game = new Game('start');
game.switchState('start');


/** start - button listeners */
button.addEventListener('click', (e) => {
  switch (game.state) {
    case 'intro':
      game.switchState('start');
      button.innerHTML = '.. SELECT YOUR TEAMS ..';
      break;
    case 'start':
      game.switchState('fight');
      button.innerHTML = '.. READY TO FIGHT!! ..';
      break;
    case 'fight':
      game.switchState('winner');
      button.innerHTML = '.. GO TO START ..';
      break;
    case 'winner':
      game.switchState('start');
      button.innerHTML = '.. SELECT YOUR TEAMS ..';
      break;
    default:
      break;
  }
});
///