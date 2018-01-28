import $ from 'jquery/dist/jquery.min';

import TUIOManager from 'tuiomanager/core/TUIOManager';
import TUIOWidget from 'tuiomanager/core/TUIOWidget';
// import { radToDeg } from 'tuiomanager/core/helpers';

/**
 * Class to manage the spaceships
 *
 * @class SpaceshipWidget
 * @extends TUIOWidget
 */
class SpaceshipWidget extends TUIOWidget {
  constructor(playerId, x, y, width, height, initialRotation, initialScale, src, drawer, tag) {
    super(x, y, width, height, initialRotation);
    this.src = src;
    this.playerId = playerId;
    this._domElem = $('<img>');
    this._domElem.attr('src', src);
    this._domElem.css('width', `${this.width * initialScale}px`);
    this._domElem.css('height', `${this.height * initialScale}px`);
    this._domElem.css('position', 'absolute');
    this._domElem.css('z-index', `${200}`);
    this._domElem.css('left', `${x}px`);
    this._domElem.css('top', `${y}px`);
    this._domElem.css('transform', `rotate(${initialRotation}deg)`);
    this._width = this._domElem.width();
    this._height = this._domElem.height();
    this.centeredX = x + (this._width / 2);
    this.centeredY = y + (this._height / 2);
    this.drawer = drawer;
    this.idTagMove = tag;
    this.canMoveTangible = true;
    this.canDeleteTangible = true;
    this.hasDuplicate = false;
    this.movement = 0;
    this.moving = false;
  }

  /**
    * SpaceWidget's domElem.
    *
    * @returns {JQuery Object} SpaceWidget's domElem.
    */
  get domElem() { return this._domElem; }

  /**
   * Called after a TUIOTag creation.
   *
   * @method onTagCreation
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  onTagCreation(tuioTag) {
    if (!this._isInStack && tuioTag.id === this.playerId - 1) {
      if (this.isTouched(tuioTag.x, tuioTag.y)) {
        super.onTagCreation(tuioTag);
        console.log('Creating tag', tuioTag);
        this._lastTagsValues = {
          ...this._lastTagsValues,
          [tuioTag.id]: {
            x: tuioTag.x,
            y: tuioTag.y,
          },
        };
      }
    }
  }

  /**
   * Call after a TUIOTag update.
   *
   * @method onTagUpdate
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  onTagUpdate(tuioTag) {
    if (typeof (this._lastTagsValues[tuioTag.id]) !== 'undefined' && tuioTag.id === this.playerId - 1) {
      if (tuioTag.id === this.idTagMove && this.canMoveTangible) {
        console.log('Updating trajectory');
        this.drawer.drawLine(this.playerId, this.centeredX, this.centeredY, tuioTag.x, tuioTag.y);
      }
    }
  }

  /**
   * Call after a TUIOTag deletion.
   *
   * @method onTagDeletion
   * @param {number/string} tuioTagId - TUIOTag's id to delete.
   */
  onTagDeletion(tuioTagId) {
    if (super.tags[tuioTagId] !== undefined && tuioTagId === this.idTagMove && !this.moving && tuioTagId === this.playerId - 1) {
      this.arrivalCheck(tuioTagId);
      // console.log('Deleting tag', tuioTagId);
      super.onTagDeletion(tuioTagId);
    }
  }

  startMovement(dirX, dirY) {
    this.moving = true;
    const dX = dirX - this.centeredX;
    const dY = dirY - this.centeredY;
    const dist = Math.sqrt((dX * dX) + (dY * dY));
    let countdown = dist;
    // Trigger the spaceship movement
    clearInterval(this.movement);
    this.movement = setInterval(() => {
      this.updatePos(dX / dist, dY / dist);
      countdown -= 1;
      if (countdown <= 0) {
        this.moving = false;
        clearInterval(this.movement);
        this.drawer.clearLines(this.playerId);
      }
    }, 1000 / 60);
  }

  arrivalCheck(id) {
    function isInBounds(libStack, x, y) {
      if (x >= libStack.x && x <= (libStack.x + libStack.width) && y >= libStack.y && y <= (libStack.y + libStack.height)) {
        return true;
      }
      return false;
    }

    /* eslint-disable no-underscore-dangle */

    if (!this.isInStack) {
      Object.keys(TUIOManager.getInstance()._widgets).forEach((widgetId) => {
        if (TUIOManager.getInstance()._widgets[widgetId].constructor.name === 'Planet') {
          const selectedWidget = TUIOManager.getInstance()._widgets[widgetId];
          const selectedTag = TUIOManager.getInstance()._tags[id];
          if (isInBounds(selectedWidget, selectedTag.x, selectedTag.y) && !selectedWidget.isDisabled) {
            // Rajouter autorisation de SpaceWidget sur Planet ? && TUIOManager.getInstance()._widgets[widgetId].isAllowedElement(this)) {
            // this._isInStack= true;
            this.startMovement(super.tags[id].x, super.tags[id].y);
            selectedWidget.addElementWidget(this);
          } else {
            this.drawer.clearLines(this.playerId);
          }
        }
      });
    }

    /* eslint-enable no-underscore-dangle */
  }

  updatePos(dX, dY) {
    // Computing where to move
    // const lastTagValue = this._lastTagsValues[tuioTag.id];
    // const diffX = tuioTag.x - lastTagValue.x;
    // const diffY = tuioTag.y - lastTagValue.y;
    // const newX = this.internX + diffX;
    // const newY = this.internY + diffY;
    // this.moveTo(newX, newY);

    // Saving the old positions
    // this._lastTagsValues = {
    //   ...this._lastTagsValues,
    //   [tuioTag.id]: {
    //     x: tuioTag.x,
    //     y: tuioTag.y,
    //   },
    // };
    const newX = this.x + dX;
    const newY = this.y + dY;
    this.moveTo(newX, newY);
    // console.log('moved to :', newX, newY);
  }

  /**
   * Move Widget.
   *
   * @method moveTo
   * @param {string/number} x - New ImageWidget's abscissa.
   * @param {string/number} y - New ImageWidget's ordinate.
   * @param {number} angle - New ImageWidget's angle.
   */
  moveTo(x, y, angle = null) {
    this.x = x;
    this.y = y;
    this.centeredX = x + (this._width / 2);
    this.centeredY = y + (this._height / 2);
    this._domElem.css('left', `${x}px`);
    this._domElem.css('top', `${y}px`);
    if (angle !== null) {
      this._domElem.css('transform', `rotate(${angle}deg) scale(${this.scale})`);
    }
  }

}

export default SpaceshipWidget;
