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
    if (this.isAllowedElement(widget)) {
      // Enlever super, override le zoom
      // super.addElementWidget(widget);
      this.stackDiv.css('border', `solid 10px ${widget.color}`);
      this.client.socket.emit('update', 'updating phone public/private data');
    }
  }

  /**
   * Call after a TUIOTag creation.
   *
   * @method onTagCreation
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  onTagCreation(tuioTag) {
    if (tuioTag.id === this.showTag && this.isTouched(tuioTag.x, tuioTag.y)) {
      // showTag must be the tag of the planet's player
      // console.log('tagging planet');
    }
  }

}

export default Planet;
