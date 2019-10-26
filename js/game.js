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
        // reset players
        this.player1.reset();
        this.player2.reset();
        
        // fill players characters
        this.player1.fillPlayerChars(document.getElementById('charactersLeft'), true);
        this.player2.fillPlayerChars(document.getElementById('charactersRight'), false);

        // refresh characters listeners
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