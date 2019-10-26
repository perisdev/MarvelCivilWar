/** START CLASSES */
class Player {
  constructor(name) {
    this.name = name;
    this.characters = [];
    this.team = [];
  }

  addCharacter(character) {
    this.characters.push(character);
  }

  getTeamLength() {
    return this.team.length;
  }

  ready() {
    return (this.team.length >=3)? true:false;
  }

  refreshTeam() {
    // reset team
    this.team.map(item => item.selDom.remove());
    this.team = [];

    // filter active characters
    let tmpTeam = this.characters.filter((item) => !item.state);

    // refresh team
    for (let item of tmpTeam) {
      if (this.name == 'P1')
        item.addViews(undefined, document.createElement('img'), 'charSelLeft', document.getElementById('selectLeft'));
      else
        item.addViews(undefined, document.createElement('img'), 'charSelRight', document.getElementById('selectRight'));

      this.team.push(item);
    }
  }

  reset() {
    this.characters.map(item => item.charDom.remove());
    this.characters = [];
    this.characters.map(item => item.selDom.remove());
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
    this.charDom = null;
    this.selDom = null;
    this.imgs = imgs;
  }

  switchState() {
    if (this.state) {
      this.charDom.className += ' opacity';
      this.state = false;
    } else {
      this.charDom.className = this.charDom.className.replace(' opacity', '');
      this.state = true;
    }
    //document.dispatchEvent(new Event("newSel", { "bubbles": true, "cancelable": false }));
  }

  addViews(charDom, selDom, classes, container) {

    if (charDom) {
      this.charDom = charDom;
      this.charDom.className = classes;
      this.charDom.src = this.imgs[0];
      this.charDom.data = this.id;
      container.appendChild(this.charDom);

    } else if (selDom) {
      this.selDom = selDom;
      this.selDom.className = classes;
      this.selDom.src = this.imgs[1];
      container.appendChild(this.selDom);
    }
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