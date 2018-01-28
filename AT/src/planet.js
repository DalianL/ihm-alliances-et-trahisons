import LibraryStack from 'tuiomanager/widgets/Library/LibraryStack/LibraryStack';
import Client from './client';

class Planet extends LibraryStack {
  constructor(id, x, y, size, stackTitle, color, colorText, isFull, allowcontentsArray) {
    super(x, y, size, stackTitle, color, colorText, isFull, allowcontentsArray);
    this.id = id;
    this.name = id;
    this.domElem.css('z-index', 150);
    this.client = new Client();
    this.client.socket.emit('add_planet', '{}');
  }

  addElementWidget(widget) {
    // Enlever super, override le zoom
    super.addElementWidget(widget);
    this.client.socket.emit('update', 'updating phone public/private data');
    // if (this.isAllowedElement(widget)) {
    //   this.client.socket.emit('update', 'updating phone public/private data');
    // }
  }
}

export default Planet;
