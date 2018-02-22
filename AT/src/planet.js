import LibraryStack from 'tuiomanager/widgets/Library/LibraryStack/LibraryStack';
import Client from './client';
import Utils from './utils';
import GameCore from './gameCore';

class Planet extends LibraryStack {
  constructor(id, pId, x, y, size, stackTitle, color, isFull, allowcontentsArray) {
    super(x, y, size, stackTitle, color, !isFull, allowcontentsArray);
    this.planetId = id;
    this.playerId = pId;
    this.inOrbit = [];
    this.name = id;
    this.size = size;
    this.domElem.css('z-index', 150);
    this.stackDiv.css('border-radius', '300px');
    this.client = new Client();
    this.menu = undefined;
  }

  addElementWidget(widget, action) {
    // const canvasPlayer = GameCore.getInstance().drawer.canvases[widget.playerId - 1];
    console.log('\nAttacked planet has in orbit before movement : ', this.inOrbit); // eslint-disable-line
    if (action === 'atk') {
      if (this.inOrbit.length === 1) {
        if (this.inOrbit[0].color === widget.color) {
          // If the present spaceship belongs to the player, just move
          // and conquer in case the other spaceship only used "Move"
          this.conquerHere(widget);
          console.log('Attacking where one owned unit is present -> win');
        } else if (this.inOrbit[0].behavior === 'dfd') {
          // Else an enemy is present
          // In this case the enemy has defence status
          // The enemy wins but loses defence status
          GameCore.getInstance().switchToNormal(this.inOrbit[0]);
          GameCore.getInstance().destroy(widget);
          console.log('Attacking where one defending enemy unit is present -> draw');
        } else {
          // In this case the enemy has no defence status
          // The enemy is destroyed
          GameCore.getInstance().destroy(this.inOrbit[0]);
          this.conquerHere(widget);
          console.log('Attacking where one vulnerable enemy unit is present -> win');
        }
      } else if (this.inOrbit.length === 0) {
        // Move to planet if none is present
        this.client.socket.emit('move_fleet', Utils.parser3(widget.shipId, this.planetId - 1));
        if (this.playerId !== widget.playerId) {
          // If not already owned, conquer planet
          this.stackDiv.css('border', `solid 10px ${widget.color}`);
          this.playerId = widget.playerId;
          this.client.socket.emit('conquer_planet', Utils.parser2(this.planetId - 1, this.playerId));
        }
        this.addToOrbit(widget);
        console.log('Attacking where no one is present -> win');
      } else {
        let enemyStength = 0;
        let ownStrength = 0;
        let firstEnemyId = -1;
        let firstEnemyIndex = -1;
        // Determines the fighting power of owned and enemy units
        for (let i = 0; i < this.inOrbit.length; i += 1) {
          if (this.inOrbit[i].playerId === widget.playerId) {
            ownStrength += 1;
          } else {
            enemyStength += 1;
            if (firstEnemyId === -1) {
              // The first ship in the list that isn't an owned unit might get attacked
              firstEnemyId = this.inOrbit[i].shipId;
              firstEnemyIndex = i;
            }
          }
        }

        if (enemyStength === 0) {
          // Only owned units are present on the planet
          // Move and conquer in case the others only used "Move"
          this.conquerHere(widget);
          console.log('Attacking where only owned units are present -> nothing');
        } else if (enemyStength < ownStrength) {
          // The unit power is enough to take out all the enemies
          this.inOrbit.forEach((s) => {
            if (s.playerId !== widget.playerId) {
              GameCore.getInstance().destroy(s);
            }
          });
          this.conquerHere(widget);
          console.log('Attacking where more owned than enemy units are present -> win');
        } else {
          // The enemy unit power is superior or equal
          // The attack fails but one enemy unit is attacked
          GameCore.getInstance().destroy(widget);
          this.inOrbit.forEach((s) => {
            if (s.shipId === firstEnemyId) {
              if (s.behavior === 'dfd') {
                GameCore.getInstance().switchToNormal(this.inOrbit[firstEnemyIndex]);
              } else {
                GameCore.getInstance().destroy(s);
              }
            }
          });
          console.log('Attacking where more enemy than owned units ally are present -> lose');
        }
      }
    } else if (action === 'dfd') {
      GameCore.getInstance().switchToDefence(widget);
      if (this.inOrbit.length > 0) {
        // Help the other spaceships if present
        this.client.socket.emit('move_fleet', Utils.parser3(widget.shipId, this.planetId - 1));
        this.addToOrbit(widget);
      } else if (this.inOrbit.length === 0) {
        // Move to planet if none is present
        this.client.socket.emit('move_fleet', Utils.parser3(widget.shipId, this.planetId - 1));
        if (this.playerId !== widget.playerId) {
          // If not already owned, conquer planet
          this.stackDiv.css('border', `solid 10px ${widget.color}`);
          this.playerId = widget.playerId;
          this.client.socket.emit('conquer_planet', Utils.parser2(this.planetId - 1, this.playerId));
        }
        this.addToOrbit(widget);
      } else {
        // Only move by default
        this.client.socket.emit('move_fleet', Utils.parser3(widget.shipId, this.planetId - 1));
        this.addToOrbit(widget);
      }
    } else if (action === 'mv') {
      this.client.socket.emit('move_fleet', Utils.parser3(widget.shipId, this.planetId - 1));
      this.addToOrbit(widget);
    }
    console.log('Attacked planet has in orbit after movement : ', this.inOrbit); // eslint-disable-line
    const newPos = Utils.givePosByColor(widget.color, this.x, this.y, this.width, this.height, GameCore.getInstance().spaceShipSize);
    widget.moveTo(newPos.x, newPos.y);

    // setTimeout(() => {
    //   Utils.writeNumberOfFleet(canvasPlayer, '1', newPos.x, newPos.y, widget.color);
    // }, 1000);
  }

  conquerHere(widget) {
    this.stackDiv.css('border', `solid 10px ${widget.color}`);
    this.playerId = widget.playerId;
    this.client.socket.emit('move_fleet', Utils.parser3(widget.shipId, this.planetId - 1));
    this.client.socket.emit('conquer_planet', Utils.parser2(this.planetId - 1, this.playerId));
    this.addToOrbit(widget);
  }

  addToOrbit(spaceship) {
    this.inOrbit.push(spaceship);
  }

  leaveOrbit(spaceship) {
    let index;
    for (let i = 0; i < this.inOrbit.length; i += 1) {
      if (this.inOrbit[i].shipId === spaceship.shipId) {
        index = i;
        break;
      }
    }
    this.inOrbit.splice(index, 1);
  }

  /* eslint-disable */

  onTouchCreation(t) { }

  onTouchUpdate(t) { }

  onTouchDeletion(t) { }

  onTagCreation(t) { }

  onTagUpdate(t) { }

  onTagDeletion(t) { }

  /* eslint-enable */
}

export default Planet;
