import LibraryStack from 'tuiomanager/widgets/Library/LibraryStack/LibraryStack';
import Client from './client';

class Planet extends LibraryStack {
  constructor(id, pId, x, y, size, stackTitle, color, colorText, isFull, allowcontentsArray) {
    super(x, y, size, stackTitle, color, colorText, isFull, allowcontentsArray);
    this.id = id;
    this.playerId = pId;
    this.name = id;
    this.domElem.css('z-index', 150);
    this.client = new Client();
    this.client.socket.emit('add_planet', '{}');
    this.menu = undefined;
  }

  addElementWidget(widget) {
    // let elementToAdd;
    if (this.isAllowedElement(widget)) {
      // Enlever super, override le zoom
      // super.addElementWidget(widget);
      this.stackDiv.css('border', `solid 10px ${widget.color}`);
      this.playerId = widget.playerId;
      this.client.socket.emit('update', 'updating phone public/private data');

      // elementToAdd = widget;
      // elementToAdd._domElem.css('transform', 'rotate(360deg)');

      // Left top
      // console.log("En déplacement vers la planete " + this._id + " (nord)")
      // let newX = this.x + (this.width / 2) - (ShipSize / 2);
      // let newY = this.y;

      // widget.moveTo(newX,newY);
    }
  }
}

export default Planet;
