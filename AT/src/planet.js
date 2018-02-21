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
    console.log('Attacked planet has in orbit before movement : ', this.inOrbit); // eslint-disable-line
    if (action === 'atk') {
      if (this.inOrbit.length === 1) {
        // If one enemy is present
        if (this.inOrbit[0].behavior === 'dfd') {
          // And the enemy has defence status
          // The enemy wins but loses defence status
          GameCore.getInstance().switchToNormal(this.inOrbit[0]);
          GameCore.getInstance().destroy(widget);
        } else {
          // And the enemy has no defence status
          // The enemy is destroyed
          GameCore.getInstance().destroy(this.inOrbit[0]);
          this.stackDiv.css('border', `solid 10px ${widget.color}`);
          this.playerId = widget.playerId;
          this.client.socket.emit('move_fleet', Utils.parser3(widget.shipId, this.planetId - 1));
          this.client.socket.emit('conquer_planet', Utils.parser2(this.planetId - 1, this.playerId));
          this.addToOrbit(widget);
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
      } else {
        // If more than one spaceship is present, attack fails
        GameCore.getInstance().destroy(widget);
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
