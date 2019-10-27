class Game {

  constructor(state) {
    this.state = state;

    this.player1 = new Player('P1', [
      document.getElementById('charactersLeft'),
      document.getElementById('fightLeft'),
      document.getElementById('winnerZoneLeft')
    ]);

    this.player2 = new Player('P2', [
      document.getElementById('charactersRight'),
      document.getElementById('fightRight'),
      document.getElementById('winnerZoneRight')
    ]);
  }

  switchState(state) {
    this.state = state;

    switch (state) {
      case 'intro':
        break;

      case 'start':
        this.switchToStage(state);

        // reset players
        this.player1.reset();
        this.player2.reset();

        // fill players characters
        this.player1.fillPlayerChars(true);
        this.player2.fillPlayerChars(false);

        // refresh characters listeners
        for (let item of document.getElementsByClassName('characterLeft')) {
          item.addEventListener('click', (e) => this.readyToFigth(e, this.player1));
        }
        for (let item of document.getElementsByClassName('characterRight')) {
          item.addEventListener('click', (e) => this.readyToFigth(e, this.player2));
        }

        break;
      case 'fight':
        button.disabled = true;

        this.switchToStage(state);

        // add Bars Life
        this.player1.lifeBar = new LifeBar('Life:', 100, '#83da71');
        this.player1.lifeBar.addView(document.getElementById('fightLeft'), 'lifeBar');
        this.player2.lifeBar = new LifeBar('Life:', 100, '#83da71');
        this.player2.lifeBar.addView(document.getElementById('fightRight'), 'lifeBar');

        // fight loop
        this.player1.team[0].addViews('2', 'fighterLeft', document.getElementById('fightLeft'));
        this.player2.team[0].addViews('2', 'fighterRight', document.getElementById('fightRight'), false);

        const P1 = setInterval(() => {
          let newValue = this.player1.team[0].atack(this.player2.team[0]);
          this.player2.lifeBar.changeValue(newValue);
          if (newValue == 0) {
            console.log('P1 WIN !!');
            clearInterval(P1);
            clearInterval(P2);
          }
        }, this.player1.team[0].velocity);

        const P2 = setInterval(() => {
          let newValue = this.player2.team[0].atack(this.player1.team[0]);
          this.player1.lifeBar.changeValue(newValue);
          if (newValue == 0) {
            console.log('P2 WIN !!');
            clearInterval(P1);
            clearInterval(P2);
          }
        }, this.player2.team[0].velocity);

        console.log("esto sigue...");

        //this.switchState('winner');

        button.disabled = false;
        break;
      case 'winner':
        this.switchToStage(state);
        break;
      default:
        break;
    }
  }

  switchToStage(stage) {

    switch (stage) {
      case 'intro':

        break;
      case 'start':
        this.changeInNone(this.player1.stage[0], false);
        this.changeInNone(this.player1.stage[1], true);
        this.changeInNone(this.player1.stage[2], true);

        this.changeInNone(this.player2.stage[0], false);
        this.changeInNone(this.player2.stage[1], true);
        this.changeInNone(this.player2.stage[2], true);
        break;
      case 'fight':
        this.changeInNone(this.player1.stage[0], true);
        this.changeInNone(this.player1.stage[1], false);

        this.changeInNone(this.player2.stage[0], true);
        this.changeInNone(this.player2.stage[1], false);
        break;
      case 'winner':
        this.changeInNone(this.player1.stage[1], true);
        this.changeInNone(this.player1.stage[2], false);

        this.changeInNone(this.player2.stage[1], true);
        this.changeInNone(this.player2.stage[2], false);
        break;
      default:
        break;
    }
  }


  changeInNone(stage, inNone) {
    if (inNone)
      stage.className += ' inNone';
    else
      stage.className = stage.className.replace(' inNone', '');
  }

  readyToFigth(e, player) {
    if (player.getTeamLength() < 3 || !player.characters[e.target.data].state) {
      player.characters[e.target.data].switchState();
      player.refreshTeam();

      if (this.player1.ready() && this.player2.ready()) {
        button.innerHTML = '..  READY TO FIGHT ..';
        button.disabled = false;
      } else {
        button.innerHTML = '..  SELECT YOUR TEAMS ..';
        button.disabled = true;
      }
    }
  }
}

// item.addEventListener('click', (e) => console.log(e.target.data, e.target.className));