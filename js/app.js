/** START - GLOBAL OBJs && FUNCTIONs */
const button = document.getElementById('controlZone');

const charTypes = {
  1: ['./img/IronMan.png', './img/IronMan.png', './img/IronMan.png', './img/IronMan.png'],
  2: ['./img/Hulk.png', './img/Hulk.png', './img/Hulk.png', './img/Hulk.png'],
  3: ['./img/CaptainAmerica.png', './img/CaptainAmerica.png', './img/CaptainAmerica.png'],
  4: ['./img/MsMarvel.png', './img/MsMarvel.png', './MsMarvel.png', './MsMarvel.png'],
  5: ['./img/Spider-Man.png', './img/Spider-Man.png', './Spider-Man.png', './Spider-Man.png'],
  6: ['./img/WarMachine.png', './img/WarMachine.png', './img/WarMachine.png', './img/WarMachine.png'],
  7: ['./img/DarelDevil.png', './img/DarelDevil.png', './img/DarelDevil.png', './img/DarelDevil.png'],
  8: ['./img/Wolverine.png', './img/Wolverine.png', './img/Wolverine.png', './img/Wolverine.png'],
  9: ['./img/DeadPool.png', './img/DeadPool.png', './img/DeadPool.png', './img/DeadPool.png']
}

const randomStrong = () => Math.floor(Math.random() * (10 - 1) + 1) * 5;
const randomVelocity = () => Math.floor(Math.random() * (10 - 1) + 1) * 200;
const randomType = () => Math.floor(Math.random() * (10 - 1) + 1);
///


/** instantiating && starting GAME */
let game = new Game('start');
game.switchState('start');
///


/** start - control listeners */
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