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
    if (this.isAllowedElement(widget)) {
      // Enlever super, override le zoom
      // super.addElementWidget(widget);
      this.stackDiv.css('border', `solid 10px ${widget.color}`);
      this.playerId = widget.playerId;
      this.client.socket.emit('update', 'updating phone public/private data');
    }
  }
}

export default Planet;
