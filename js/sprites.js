/** 
 * PLAYER
 * 
 * stages []  -> [0] charMapZone, [1] fightZone, [2] winnerZone
 * */
class Player {
  constructor(name, stages) {
    this.name = name;
    this.characters = [];
    this.charOrder = 0;
    this.team = [];
    this.stage = stages;
    this.lifeBar = null;
  }

  fillPlayerChars = (isLeft) => {
    for (let i = 1; i < 10; i++) {
      let type = i;
  
      let newChar = new Character(i - 1, type, randomStrong(), randomVelocity(), charTypes[type]);
      if (isLeft)
        newChar.addViews('0', 'characterLeft', this.stage[0]);
      else
        newChar.addViews('0', 'characterRight', this.stage[0]);
  
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
    let tmpTeam = this.characters.filter((item) => !item.state).sort((a, b) => a.order - b.order);

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
    this.lifeBar? this.lifeBar.view.remove():null;

    this.characters.map(item => {
      for(let i = 0; i< 3; i++) 
        item.views[i]? item.views[i].remove():null;
    });

    this.characters = [];
    this.team = [];
    this.charOrder = 0;
  }
}

/** CHARACTER */
class Character {
  constructor(id, type, strong, velocity, imgs) {
    this.id = id;
    this.order = 99;
    this.state = true;
    this.type = type;
    this.life = 100;
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

  switchState(order) {
    if (this.state) {
      this.views[0].className += ' opacity';
      this.state = false;
      this.order = order;
    } else {
      this.views[0].className = this.views[0].className.replace(' opacity', '');
      this.state = true;
      this.order = 99; 
    }
    //document.dispatchEvent(new Event("newSel", { "bubbles": true, "cancelable": false }));
  }

  addViews(typeView, classes, container, isLeft = true) {

    let newView = document.createElement('img');
    newView.className = classes;
    newView.src = this.imgs[typeView];
    newView.data = this.id;

    (!isLeft)? newView.setAttribute('style', 'transform: scaleX(-1)'):null;

    this.views[typeView] = newView;
    container.appendChild(newView);
  }

  atack(enemic) {
    let tmpLife = enemic.life - this.strong;
    enemic.life = (tmpLife > 0)? tmpLife:0;
    return enemic.life;
  }
}

/** LIFE BAR */
class LifeBar {
  constructor(tittle, value, color){
    this.tittle = tittle;
    this.value = value;
    this.view = null;
    this.color = color;
  }

  addView (container, classes){
    let newView = document.createElement('div');
    newView.className = classes;
    newView.innerHTML = this.tittle;
    newView.setAttribute('style', `background: ${this.color}; width: ${this.value}%`);
    this.view = newView;
    container.appendChild(newView);    
  }

  changeColor(color){
    this.color = color;
    let oldStyle = this.view.getAttribute('style').split(';');  // [0] background [1] width
    this.view.setAttribute('style', `background: ${color}; ${oldStyle[1]}`);
  }
  changeValue(value){
    this.value = (value > 0)? value:0;
    let oldStyle = this.view.getAttribute('style').split(';');  // [0] background [1] width
    this.view.setAttribute('style', `${oldStyle[0]}; width: ${value}%`);
  }
}



// let p1 = new Personaje();
// let p2 = new Personaje();

// do {
//   if (p1.Velocidad > p2.Velocidad)
//     p2.Vida = p1.atacar(p2);
//   else
//     p1.Vida = p2.atacar(p1);

// } while (p1.Vida > 0 && p2.Vida > 0);