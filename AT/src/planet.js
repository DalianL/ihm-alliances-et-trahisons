import LibraryStack from 'tuiomanager/widgets/Library/LibraryStack/LibraryStack';
import Client from './client';
import GameCore from './gameCore';

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

  /**
   * Call after a TUIOTag creation.
   *
   * @method onTagCreation
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  onTagCreation(tuioTag) {
    if (tuioTag.id === (this.playerId - 1) && this.isTouched(tuioTag.x, tuioTag.y)) {
      GameCore.getInstance().menu.isHide = true;
    }
  }

  /**
   * Call after a TUIOTag deletion.
   *
   * @method onTagUpdate
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  onTagDeletion(tuioTagid) {
    if (tuioTagid === (this.playerId - 1) && this.menu !== undefined) {
      GameCore.getInstance().menu.isHide = true;
    }
  }
}

export default Planet;
