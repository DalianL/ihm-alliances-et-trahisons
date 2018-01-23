import $ from 'jquery/dist/jquery.min';

import TUIOWidget from 'tuiomanager/core/TUIOWidget';
// import { radToDeg } from 'tuiomanager/core/helpers';

/**
 * Class to manage the spaceships
 *
 * @class SpaceshipWidget
 * @extends TUIOWidget
 */
class SpaceshipWidget extends TUIOWidget {
  constructor(x, y, width, height, initialRotation, initialScale, src, drawer) {
    super(x, y, width, height, initialRotation);
    this.src = src;
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
    this.initialX = x + (this._width / 2);
    this.initialY = y + (this._height / 2);
    this.drawer = drawer;
    this.direction = {};
    this.idTagMove = 2;
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
    console.log('Creating tag');
    if (!this._isInStack) {
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
    console.log('Updating tag');
    if (typeof (this._lastTagsValues[tuioTag.id]) !== 'undefined') {
      if (tuioTag.id === this.idTagDelete && this.canDeleteTangible) {
        this._domElem.remove();
        this.deleteWidget();
      } else if (tuioTag.id === this.idTagMove && this.canMoveTangible) {
        // Computing where to move
        // const lastTagValue = this._lastTagsValues[tuioTag.id];
        // const diffX = tuioTag.x - lastTagValue.x;
        // const diffY = tuioTag.y - lastTagValue.y;
        // const newX = this.internX + diffX;
        // const newY = this.internY + diffY;
        // this.moveTo(newX, newY);
        this.drawTrajectory(this.initialX, this.initialY, tuioTag.x, tuioTag.y);

        // Saving the old positions
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
   * Call after a TUIOTag deletion.
   *
   * @method onTagDeletion
   * @param {number/string} tuioTagId - TUIOTag's id to delete.
   */
  onTagDeletion(tuioTagId) {
    if (super.tags[tuioTagId] !== undefined) {
      this.direction.x = super.tags[tuioTagId].x;
      this.direction.y = super.tags[tuioTagId].y;
    }
    this.startMoving();
  }

  startMoving() {
    const dX = (this.direction.x - this.initialX) / 10.0;
    const dY = (this.direction.y - this.initialY) / 10.0;
    let countdown = 10;
    // Trigger the spaceship movement
    clearInterval(this.moving);
    this.moving = setInterval(() => {
      const newX = this._x + dX;
      const newY = this._y + dY;
      this.moveTo(newX, newY);
      // console.log('moved to :', newX, newY);
      // Saving the new positions
      this._x = newX;
      this._y = newY;
      countdown -= 1;
      if (countdown === 0) {
        this.initialX = this._x;
        this.initialY = this._y;
        this.direction = {};
        clearInterval(this.moving);
        this.clearLines();
      }
    }, 1000 / 10);
  }

  drawTrajectory(x1, y1, x2, y2) {
    this.drawer.drawLine(x1, y1, x2, y2);
  }

  clearLines() {
    this.drawer.clearLines();
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
    this._x = x;
    this._y = y;
    this._domElem.css('left', `${x}px`);
    this._domElem.css('top', `${y}px`);
    if (angle !== null) {
      this._domElem.css('transform', `rotate(${angle}deg) scale(${this.scale})`);
    }
  }

}

export default SpaceshipWidget;
