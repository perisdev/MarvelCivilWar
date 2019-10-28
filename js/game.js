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

    this.scores = {
      winner: '',
      msgWin: 'YOU WIN !!',
      msgLose: 'YOU LOSE !!',
      score: '',
      rounds: {
        1: '',
        2: '',
        3: ''
      },
      views: {
        0: null,
        1: null
      }    // [0] team1, [1] team2
    }
  }

  switchState(state) {
    this.state = state;

    switch (state) {
      case 'intro':
        break;

      case 'start':
        this.switchToStage(state);

        // reset scores
        this.scores.views[0]? this.scores.views[0].remove():null;
        this.scores.views[1]? this.scores.views[1].remove():null;

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

        // fight process
        this.figth().then(winner => {
          this.scores.winner = winner[0];
          this.scores.score = winner[1];

          // add winner && loser views
          if (winner[0] == 'E1'){
            this.addWinnerView(0, this.scores.msgWin, document.getElementById('winnerZoneLeft'));
            this.addWinnerView(1, this.scores.msgLose, document.getElementById('winnerZoneRight'));
          } else {
            this.addWinnerView(0, this.scores.msgLose, document.getElementById('winnerZoneLeft'));
            this.addWinnerView(1, this.scores.msgWin, document.getElementById('winnerZoneRight'));
          }

          this.switchState('winner');
          button.disabled = false;
        });

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
        button.disabled = true;
        this.changeInNone(this.player1.stage[0], false);
        this.changeInNone(this.player1.stage[1], true);
        this.changeInNone(this.player1.stage[2], true);

        this.changeInNone(this.player2.stage[0], false);
        this.changeInNone(this.player2.stage[1], true);
        this.changeInNone(this.player2.stage[2], true);
        button.innerHTML = '.. SELECT YOUR TEAMS ..';
        break;
      case 'fight':
        this.changeInNone(this.player1.stage[0], true);
        this.changeInNone(this.player1.stage[1], false);

        this.changeInNone(this.player2.stage[0], true);
        this.changeInNone(this.player2.stage[1], false);
        button.innerHTML = '.. IN FIGHT ..';
        break;
      case 'winner':
        this.changeInNone(this.player1.stage[1], true);
        this.changeInNone(this.player1.stage[2], false);

        this.changeInNone(this.player2.stage[1], true);
        this.changeInNone(this.player2.stage[2], false);
        button.innerHTML = '.. GO TO START ..';
        break;
      default:
        break;
    }
  }

  addWinnerView(view, msg, container) {
    let newView = document.createElement('p');
    newView.innerHTML = `${msg}<br><br><br>${this.scores.score}<br>
    ----------------------------------<br>${this.scores.rounds[0]}<br>${this.scores.rounds[1]}<br>
    ${this.scores.rounds[2]}`;
    this.scores.views[view] = newView;

    container.appendChild(newView);
  }

  changeInNone(stage, inNone) {
    if (inNone && stage.className.indexOf('inNone') == -1)
      stage.className += ' inNone';
    else
      stage.className = stage.className.replace(' inNone', '');
  }

  readyToFigth(e, player) {
    if (player.getTeamLength() < 3 || !player.characters[e.target.data].state) {
      player.characters[e.target.data].switchState(player.charOrder++);
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

  // FIGHT PROCESS - WITH ASYNC AWAIT .................................................
  roundPromise = round => new Promise((res, req) => {
    // E1 atack E2
    const AP1 = setInterval(() => {
      let newLife = this.player1.team[round].atack(this.player2.team[round]);
      this.player2.lifeBar.changeValue(newLife);

      if (newLife <= 0) {
        clearInterval(AP1);
        clearInterval(AP2);
        res('E1');
      }
    }, this.player1.team[round].velocity);

    // E2 atack E1
    const AP2 = setInterval(() => {
      let newLife = this.player2.team[round].atack(this.player1.team[round]);
      this.player1.lifeBar.changeValue(newLife);

      if (newLife <= 0) {
        clearInterval(AP1);
        clearInterval(AP2);
        res('E2');
      }
    }, this.player2.team[round].velocity);
  });

  figth = async function fight() {
    let pointsT1 = 0;
    let pointsT2 = 0;
    let winner = null;

    for (let i = 0; i < this.player1.team.length; i++) {

      // refresh life bars
      this.player1.lifeBar.changeValue(100);
      this.player2.lifeBar.changeValue(100);

      // add new character view  
      this.player1.team[i].addViews('2', 'fighterLeft', document.getElementById('fightLeft'));
      this.player2.team[i].addViews('2', 'fighterRight', document.getElementById('fightRight'), false);

      // fight
      winner = await this.roundPromise(i);
      (winner === 'E1') ? pointsT1++ : pointsT2++;

      this.scores.rounds[i] = `round ${i + 1} -> ${winner} win!!`;

      // remove last character view
      this.player1.team[i].views[2].remove();
      this.player2.team[i].views[2].remove();
    }

    return (pointsT1 > pointsT2) ? ['E1', `${pointsT1}/${pointsT2}`] : ['E2', `${pointsT1}/${pointsT2}`];
    // return (pointsT1 > pointsT2) ? `TEAM 1 win!!  ${pointsT1}/${pointsT2}` : `TEAM 2 win!!  ${pointsT2}/${pointsT1}`;
  }
  /// END FIGHT PROCESS...
}

// item.addEventListener('click', (e) => console.log(e.target.data, e.target.className));