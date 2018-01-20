import $ from 'jquery/dist/jquery.min';

import TUIOWidget from 'tuiomanager/core/TUIOWidget';
// import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
// import { radToDeg } from 'tuiomanager/core/helpers';

/**
 * Class to manage the spaceships
 *
 * @class SpaceshipWidget
 * @extends TUIOWidget
 */
class SpaceshipWidget extends TUIOWidget {
  constructor(x, y, width, height, initialRotation, initialScale, src) {
    super(x, y, width, height, initialRotation);
    this.src = src;
    this.internX = x;
    this.internY = y;
    this._domElem = $('<img>');
    this._domElem.attr('src', src);
    this._domElem.css('width', `${this.width * initialScale}px`);
    this._domElem.css('height', `${this.height * initialScale}px`);
    this._domElem.css('position', 'absolute');
    this._domElem.css('z-index', `${200}`);
    this._domElem.css('left', `${x}px`);
    this._domElem.css('top', `${y}px`);
    this._domElem.css('transform', `rotate(${initialRotation}deg)`);
    this.idTagMove = 2;
    this.canMoveTangible = true;
    this.canDeleteTangible = true;
    this.hasDuplicate = false;
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
      super.onTagCreation(tuioTag);
      if (this.isTouched(tuioTag.x, tuioTag.y)) {
        this._lastTagsValues = {
          ...this._lastTagsValues,
          [tuioTag.id]: {
            x: tuioTag.x,
            y: tuioTag.y,
            angle: tuioTag.angle,
          },
        };
        //  This will be used to save the last angle recorded and make a comparison in onTagUpdate
        this._lastTagsValues.angle = 0;
        //  Setting the scale only at the start
        if (this._lastTagsValues.scale == null) {
          this._lastTagsValues.scale = this.scale;
        }
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
        const lastTagValue = this._lastTagsValues[tuioTag.id];
        const diffX = tuioTag.x - lastTagValue.x;
        const diffY = tuioTag.y - lastTagValue.y;

        const newX = this.internX + diffX;
        const newY = this.internY + diffY;
        this.moveTo(newX, newY);

        this._lastTagsValues = {
          ...this._lastTagsValues,
          [tuioTag.id]: {
            x: tuioTag.x,
            y: tuioTag.y,
          },
        };
        this._x = this._domElem.position().left;
        this._y = this._domElem.position().top;
        this._width = this._domElem.width();
        this._height = this._domElem.height();
      }
    }
  }

  /**
   * Call after a TUIOTag deletion.
   *
   * @method onTagDeletion
   * @param {number/string} tuioTagId - TUIOTag's id to delete.
   */
  // onTagDeletion(tuioTagId) {
  //   console.log('deleted');
  // }

  /**
   * Move Widget.
   *
   * @method moveTo
   * @param {string/number} x - New ImageWidget's abscissa.
   * @param {string/number} y - New ImageWidget's ordinate.
   * @param {number} angle - New ImageWidget's angle.
   */
  moveTo(x, y, angle = null) {
    this.internX = x;
    this.internY = y;
    this._domElem.css('left', `${x}px`);
    this._domElem.css('top', `${y}px`);
    if (angle !== null) {
      this._domElem.css('transform', `rotate(${angle}deg) scale(${this.scale})`);
    }
  }

}

export default SpaceshipWidget;
