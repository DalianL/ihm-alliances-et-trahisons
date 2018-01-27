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
    this.moving = 0;
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
    if (!this._isInStack) {
      console.log('Creating tag');
      super.onTagCreation(tuioTag);
      if (this.isTouched(tuioTag.x, tuioTag.y)) {
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
    if (typeof (this._lastTagsValues[tuioTag.id]) !== 'undefined') {
      if (tuioTag.id === this.idTagDelete && this.canDeleteTangible) {
        this._domElem.remove();
        this.deleteWidget();
      } else if (tuioTag.id === this.idTagMove && this.canMoveTangible) {
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
    if (super.tags[tuioTagId] !== undefined && tuioTagId === this.idTagMove) {
      this.startMoving(super.tags[tuioTagId].x, super.tags[tuioTagId].y);
      // super.onTagDeletion(tuioTagId);
    }
  }

  startMoving(dirX, dirY) {
    const dX = (dirX - this.centeredX) / 10.0;
    const dY = (dirY - this.centeredY) / 10.0;
    let countdown = 10;
    // Trigger the spaceship movement
    clearInterval(this.moving);
    this.moving = setInterval(() => {
      this.updatePos(dX, dY);
      countdown -= 1;
      if (countdown === 0) {
        clearInterval(this.moving);
        this.drawer.clearLines(this.playerId);
        this.arrived();
      }
    }, 1000 / 10);
  }

  arrived() {
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
          if (isInBounds(TUIOManager.getInstance()._widgets[widgetId], this.centeredX, this.centeredY) && !TUIOManager.getInstance()._widgets[widgetId].isDisabled) {
            // Rajouter autorisation de SpaceWidget sur Planet : && TUIOManager.getInstance()._widgets[widgetId].isAllowedElement(this)) {
            // this._isInStack= true;
            TUIOManager.getInstance()._widgets[widgetId].addElementWidget(this);
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
