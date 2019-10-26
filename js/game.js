/** START - GLOBAL OBJs && FUNCTIONs */
const charTypes = {
  1: ['./img/IronMan.png', './img/IronMan.png', './img/IronMan.png'],
  2: ['./img/Hulk.png', './img/Hulk.png', './img/Hulk.png'],
  3: ['./img/CaptainAmerica.png', './img/CaptainAmerica.png', './img/CaptainAmerica.png'],
  4: ['./img/MsMarvel.png', './img/MsMarvel.png', './MsMarvel.png'],
  5: ['./img/Spider-Man.png', './img/Spider-Man.png', './Spider-Man.png'],
  6: ['./img/WarMachine.png', './img/WarMachine.png', './img/WarMachine.png'],
  7: ['./img/DarelDevil.png', './img/DarelDevil.png', './img/DarelDevil.png'],
  8: ['./img/Wolverine.png', './img/Wolverine.png', './img/Wolverine.png'],
  9: ['./img/DeadPool.png', './img/DeadPool.png', './img/DeadPool.png']
}
const randomStrong = () => Math.floor(Math.random() * (10 - 1) + 1) * 5;
const randomVelocity = () => Math.floor(Math.random() * (10 - 1) + 1) * 200;
const randomType = () => Math.floor(Math.random() * (10 - 1) + 1);

const fillPlayerChars = (player, container, isLeft) => {
  for (let i = 1; i < 10; i++) {
    let type = i;

    let newChar = new Character(i - 1, type, randomStrong(), randomVelocity(), charTypes[type]);
    if (isLeft)
      newChar.addViews(document.createElement('img'), undefined, 'characterLeft', container);
    else
      newChar.addViews(document.createElement('img'), undefined, 'characterRight', container);

    player.addCharacter(newChar);
  }
};

/** END - GLOBAL OBJs && FUNCTIONs */

class Game {

  constructor(state) {
    this.state = state;
    this.player1 = new Player('P1');
    this.player2 = new Player('P2');
  }

  switchState(state) {
    this.state = state;
    switch (state) {

      case 'intro':

        break;
      case 'start':
        /** fill characters player */
        fillPlayerChars(this.player1, document.getElementById('charactersLeft'), true);
        fillPlayerChars(this.player2, document.getElementById('charactersRight'), false);
        
        /** refresh characters listeners */
        for (let item of document.getElementsByClassName('characterLeft')) {
          item.addEventListener('click', (e) => {
            if (this.player1.getTeamLength() < 3 || !this.player1.characters[e.target.data].state) {
              this.player1.characters[e.target.data].switchState();
              this.player1.refreshTeam();

              if (this.player1.ready() && this.player2.ready()) {
                button.innerHTML = '..  READY TO FIGHT ..';
              } else {
                button.innerHTML = '..  SELECT YOUR TEAMS ..';
              }
            }
          });
        };
        for (let item of document.getElementsByClassName('characterRight')) {
          item.addEventListener('click', (e) => {
            if (this.player2.getTeamLength() < 3 || !this.player2.characters[e.target.data].state) {
              this.player2.characters[e.target.data].switchState();
              this.player2.refreshTeam();

              if (this.player1.ready() && this.player2.ready()) {
                button.innerHTML = '..  READY TO FIGHT ..';
              } else {
                button.innerHTML = '..  SELECT YOUR TEAMS ..';
              }
            }
          });
        };
        ///

        break;
      case 'fight':

        break;
      case 'winner':

        break;

      default:
        break;
    }
  }
}

// item.addEventListener('click', (e) => console.log(e.target.data, e.target.className));