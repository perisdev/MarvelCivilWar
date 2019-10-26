/** START CLASSES */
class Player {
  constructor(name) {
    this.name = name;
    this.characters = [];
    this.team = [];
  }

  fillPlayerChars = (container, isLeft) => {
    for (let i = 1; i < 10; i++) {
      let type = i;
  
      let newChar = new Character(i - 1, type, randomStrong(), randomVelocity(), charTypes[type]);
      if (isLeft)
        newChar.addViews('0', 'characterLeft', container);
      else
        newChar.addViews('0', 'characterRight', container);
  
      this.addCharacter(newChar);
    }
  };

  addCharacter(character) {
    this.characters.push(character);
  }

  getTeamLength() {
    return this.team.length;
  }

  ready() {
    return (this.team.length >= 3) ? true : false;
  }

  refreshTeam() {
    // reset team
    this.team.map(item => item.views[1].remove());
    this.team = [];

    // filter active characters
    let tmpTeam = this.characters.filter((item) => !item.state);

    // refresh team
    for (let item of tmpTeam) {
      if (this.name == 'P1')
        item.addViews('1', 'charSelLeft', document.getElementById('selectLeft'));
      else
        item.addViews('1', 'charSelRight', document.getElementById('selectRight'));

      this.team.push(item);
    }
  }

  reset() {
    this.characters.map(item => {
      for(let i = 0; i< 3; i++) 
        item.views[i]? item.views[i].remove():null;
    });

    this.characters = [];
    this.team = [];
  }
}


class Character {
  constructor(id, type, strong, velocity, imgs) {
    this.id = id;
    this.state = true;
    this.type = type;
    this.live = 100;
    this.strong = strong;
    this.velocity = velocity;  //ms
    this.views = {
      0: null,    // charDom
      1: null,     // selDom
      2: null,   // fightDom
      3: null   // winnerDom
    }
    this.charDom = null;
    this.selDom = null;
    this.imgs = imgs;
  }

  switchState() {
    if (this.state) {
      this.views[0].className += ' opacity';
      this.state = false;
    } else {
      this.views[0].className = this.views[0].className.replace(' opacity', '');
      this.state = true;
    }
    //document.dispatchEvent(new Event("newSel", { "bubbles": true, "cancelable": false }));
  }

  addViews(typeView, classes, container) {

    let newView = document.createElement('img');
    newView.className = classes;
    newView.src = this.imgs[typeView];
    newView.data = this.id;

    this.views[typeView] = newView;
    container.appendChild(newView);
  }

  atack(enemic) {
    return enemic.live - this.strong;
  }
}

/** END - CLASSES */




// let p1 = new Personaje();
// let p2 = new Personaje();

// do {
//   if (p1.Velocidad > p2.Velocidad)
//     p2.Vida = p1.atacar(p2);
//   else
//     p1.Vida = p2.atacar(p1);

// } while (p1.Vida > 0 && p2.Vida > 0);