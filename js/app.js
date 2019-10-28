/** START - GLOBAL OBJs && FUNCTIONs */
const button = document.getElementById('controlZone');

const charTypes = {
  1: ['./img/IronMan0.png', './img/IronMan0.png', './img/IronMan2.png', './img/IronMan3.png'],
  2: ['./img/Hulk0.png', './img/Hulk0.png', './img/Hulk2.png', './img/Hulk3.png'],
  3: ['./img/CaptainAmerica0.png', './img/CaptainAmerica0.png', './img/CaptainAmerica2.png', './img/CaptainAmerica.png3'],
  4: ['./img/MsMarvel0.png', './img/MsMarvel0.png', './img/MsMarvel2.png', './img/MsMarvel3.png'],
  5: ['./img/Spider-Man0.png', './img/Spider-Man0.png', './img/Spider-Man2.png', './img/Spider-Man3.png'],
  6: ['./img/WarMachine0.png', './img/WarMachine0.png', './img/WarMachine2.png', './img/WarMachine3.png'],
  7: ['./img/DarelDevil0.png', './img/DarelDevil0.png', './img/DarelDevil2.png', './img/DarelDevil3.png'],
  8: ['./img/Wolverine0.png', './img/Wolverine0.png', './img/Wolverine2.png', './img/Wolverine3.png'],
  9: ['./img/DeadPool0.png', './img/DeadPool0.png', './img/DeadPool2.png', './img/DeadPool3.png']
}

const randomStrong = () => Math.floor(Math.random() * (10 - 1) + 1) * 5;
const randomVelocity = () => Math.floor(Math.random() * (10 - 1) + 1) * 200;
const randomType = () => Math.floor(Math.random() * (10 - 1) + 1);
///


/** instantiating && starting GAME */
let game = new Game('start');
game.switchState('start');


/** start - control listeners */
button.addEventListener('click', (e) => {
  switch (game.state) {
    case 'intro':
      game.switchState('start');
      button.innerHTML = '.. SELECT YOUR TEAMS ..';
      break;
    case 'start':
      game.switchState('fight');
      button.innerHTML = '.. IN FIGHT ..';
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