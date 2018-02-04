import LibraryStack from 'tuiomanager/widgets/Library/LibraryStack/LibraryStack';
import Client from './client';
import Utils from './utils';

class Planet extends LibraryStack {
  constructor(id, pId, x, y, size, stackTitle, color, isFull, allowcontentsArray) {
    super(x, y, size, stackTitle, color, !isFull, allowcontentsArray);
    this.planetId = id;
    this.playerId = pId;
    this.name = id;
    this.domElem.css('z-index', 150);
    this.stackDiv.css('border-radius', '300px');
    this.client = new Client();
    this.menu = undefined;
  }

  addElementWidget(widget) {
    // let elementToAdd;
    // Enlever super, override le zoom
    // super.addElementWidget(widget);
    this.stackDiv.css('border', `solid 10px ${widget.color}`);
    this.playerId = widget.playerId;
    this.client.socket.emit('conquer_planet', Utils.parser2(this.planetId, this.playerId));

    // elementToAdd = widget;
    // elementToAdd._domElem.css('transform', 'rotate(360deg)');

    // Left top
    // console.log("En déplacement vers la planete " + this._id + " (nord)")
    // let newX = this.x + (this.width / 2) - (ShipSize / 2);
    // let newY = this.y;

    // widget.moveTo(newX,newY);
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
