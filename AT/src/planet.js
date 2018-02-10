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
    // Enlever super, override le zoom
    // super.addElementWidget(widget);
    // var canvasPlayer = GameCore.getInstance().drawer.canvases[widget.playerId -1];

    this.stackDiv.css('border', `solid 10px ${widget.color}`);
    this.playerId = widget.playerId;
    this.client.socket.emit('move_fleet', Utils.parser3(widget.shipId, this.planetId - 1));
    this.client.socket.emit('conquer_planet', Utils.parser2(this.planetId - 1, this.playerId));

    const newPos = Utils.givePosByColor(widget.color, this.x, this.y, this.width, this.height, GameCore.getInstance().spaceShipSize);
    widget.moveTo(newPos.x, newPos.y);
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
