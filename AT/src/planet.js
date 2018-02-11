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
    if (action === 'atk') {
      // Destroy other spaceships
      if (this.inOrbit.length === 0) {
        // Conquer planet if none left
        this.stackDiv.css('border', `solid 10px ${widget.color}`);
        this.playerId = widget.playerId;
        this.client.socket.emit('move_fleet', Utils.parser3(widget.shipId, this.planetId - 1));
        this.client.socket.emit('conquer_planet', Utils.parser2(this.planetId - 1, this.playerId));
        this.addToOrbit(widget);
      } else {
        // Be destroyed if failure
      }
    } else if (action === 'dfd') {
      if (this.playerId === widget.playerId) {
        this.behaviour = 'dfd';
        this.client.socket.emit('move_fleet', Utils.parser3(widget.shipId, this.planetId - 1));
        this.addToOrbit(widget);
      } else {
        this.stackDiv.css('border', `solid 10px ${widget.color}`);
        this.playerId = widget.playerId;
        this.client.socket.emit('move_fleet', Utils.parser3(widget.shipId, this.planetId - 1));
        this.client.socket.emit('conquer_planet', Utils.parser2(this.planetId - 1, this.playerId));
        this.addToOrbit(widget);
      }
    } else if (action === 'mv') {
      this.client.socket.emit('move_fleet', Utils.parser3(widget.shipId, this.planetId - 1));
      this.addToOrbit(widget);
    }

    const newPos = Utils.givePosByColor(widget.color, this.x, this.y, this.width, this.height, GameCore.getInstance().spaceShipSize);
    widget.moveTo(newPos.x, newPos.y);
    // setTimeout(function(){ canvasPlayer.drawText("1",newX+40,newY-10); }, 2000);
  }

  addToOrbit(spaceship) {
    this.inOrbit.push(spaceship);
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
