import LibraryStack from 'tuiomanager/widgets/Library/LibraryStack/LibraryStack';
import Client from './client';
import Utils from './utils';
import GameCore from './gameCore';

class Planet extends LibraryStack {
  constructor(id, pId, x, y, size, stackTitle, color, isFull, allowcontentsArray) {
    super(x, y, size, stackTitle, color, !isFull, allowcontentsArray);
    this.planetId = id;
    this.playerId = pId;
    this.name = id;
    this.size = size;
    this.domElem.css('z-index', 150);
    this.stackDiv.css('border-radius', '300px');
    this.client = new Client();
    this.menu = undefined;
  }

  addElementWidget(widget) {
    // let elementToAdd;
    // Enlever super, override le zoom
    // super.addElementWidget(widget);
    // var canvasPlayer = GameCore.getInstance().drawer.canvases[widget.playerId -1];
    const elementToAdd = widget;
    this.stackDiv.css('border', `solid 10px ${widget.color}`);
    this.playerId = widget.playerId;
    this.client.socket.emit('move_fleet', Utils.parser3(widget.shipId, this.planetId - 1));
    this.client.socket.emit('conquer_planet', Utils.parser2(this.planetId - 1, this.playerId));
    // Left top
    let newX;
    let newY;
    // let decalX;
    // let decalY;
    const spaceShipSize = GameCore.getInstance().spaceShipSize;
    switch (elementToAdd.color) {
      case 'red':
        newX = (this.x + (this.width / 2)) - (spaceShipSize / 2);
        newY = this.y - (spaceShipSize / 2);
        break;
      case 'blue':
        newX = this.x - (spaceShipSize / 2);
        newY = (this.y + (this.width / 2)) - (spaceShipSize / 2);
        break;
      case 'orange':
        newX = (this.x + (this.width)) - (spaceShipSize / 2);
        newY = (this.y + (this.width / 2)) - (spaceShipSize / 2);
        break;
      case 'green':
        newX = (this.x + (this.width / 2)) - (spaceShipSize / 2);
        newY = (this.y + (this.width)) - (spaceShipSize / 2);
        break;
      default:
        newX = (this.x + (this.width / 2)) - (spaceShipSize / 2);
        newY = this.y - (spaceShipSize / 2);
        break;
    }
    widget.moveTo(newX, newY);
    // setTimeout(function(){ canvasPlayer.drawText("1",newX+40,newY-10); }, 2000);
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
