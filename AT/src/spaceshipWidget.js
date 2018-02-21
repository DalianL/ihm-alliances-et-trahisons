import $ from 'jquery/dist/jquery.min';

import TUIOWidget from 'tuiomanager/core/TUIOWidget';
import GameCore from './gameCore';
import Utils from './utils';
// import { radToDeg } from 'tuiomanager/core/helpers';

/**
 * Class to manage the spaceships
 *
 * @class SpaceshipWidget
 * @extends TUIOWidget
 */
class SpaceshipWidget extends TUIOWidget {
  constructor(id, playerId, planetId, x, y, width, height, initialRotation, color, src, drawer) {
    super(x, y, width, height, initialRotation);
    this.src = src;
    this.color = color;
    this.shipId = id;
    this.playerId = playerId;
    this.planetId = planetId;
    this._domElem = $('<img id="img' + id + '">'); // eslint-disable-line
    this._domElem.attr('src', src);
    this._domElem.css('width', `${this.width}px`);
    this._domElem.css('height', `${this.height}px`);
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
    this.idTagMove = GameCore.getInstance().players[playerId - 1].tagId;
    this.canMoveTangible = true;
    this.canDeleteTangible = true;
    this.hasDuplicate = false;
    this.movement = 0;
    this.canvas = this.drawer.affectCanvas(this.playerId, this.shipId);
    this.actionStep = 0;
    this.behavior = 'none';
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
    if (this.actionStep === 0 && !this._isInStack && tuioTag.id.toString() === this.idTagMove) {
      if (this.isTouched(tuioTag.x, tuioTag.y)) {
        super.onTagCreation(tuioTag);
        this.startFeedback();
        // console.log('Found departure on planet : ', this.planetId);
        this._lastTagsValues = {
          ...this._lastTagsValues,
          [tuioTag.id]: {
            x: tuioTag.x,
            y: tuioTag.y,
          },
        };
      }
    } else if (this.actionStep === 1 && !this._isInStack && tuioTag.id.toString() === this.idTagMove) {
      const scan = Utils.checkForPlanetBeneath(tuioTag.id);
      let widget;
      for (let i = 0; i < scan.length; i += 1) {
        if (scan[i] !== undefined) {
          widget = scan[i];
          break;
        }
      }

      if (widget !== undefined) {
        if (widget.planetId !== this.planetId) {
          // console.log('Found arrival planet : ', widget.planetId);
          if (this.idTagMove == GameCore.getInstance().menus[this.playerId - 1].allowedTag) { // eslint-disable-line
            GameCore.getInstance().menus[this.playerId - 1].visibility = true;
            setTimeout(() => {
              GameCore.getInstance().menus[this.playerId - 1].onTagUpdate(tuioTag);
            }, 500);
          }
          if (this.actionStep < 3) this.currentWidget = widget;
          this.drawer.drawLine(this.shipId, this.centeredX, this.centeredY, widget.x + (widget.size / 2), widget.y + (widget.size / 2));
          this.actionStep = 2;
        } else {
          // console.log('Nothing to do here');
          this.stopFeedback();
        }
      } else {
        // console.log('No arrival planets found');
        this.stopFeedback();
      }
    } else if (this.actionStep === 3) {
      // if (this.isTouched(tuioTag.x, tuioTag.y)) console.log('Movement change');
    }
  }

  /**
   * Call after a TUIOTag update.
   *
   * @method onTagUpdate
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  onTagUpdate(tuioTag) {
    if (typeof (this._lastTagsValues[tuioTag.id]) !== 'undefined' && this.canMoveTangible && tuioTag.id.toString() === this.idTagMove) {
      // console.log('Updating trajectory');
      // this.drawer.drawLine(this.shipId, this.centeredX, this.centeredY, tuioTag.x, tuioTag.y);
    }
  }

  /**
   * Call after a TUIOTag deletion.
   *
   * @method onTagDeletion
   * @param {number/string} tuioTagId - TUIOTag's id to delete.
   */
  onTagDeletion(tuioTagId) {
    if (super.tags[tuioTagId] !== undefined && this.actionStep !== 3 && tuioTagId.toString() === this.idTagMove) {
      if (this.actionStep === 2) {
        this.stopFeedback();
        this.drawer.clearLines(this.shipId);
        super.onTagDeletion(tuioTagId);
      }
    }
  }

  triggerAction(tuioTagId, action) {
    this.stopFeedback();
    this.behavior = 'none';
    this._domElem.attr('src', 'assets/image/spaceship' + this.playerId + '.png'); // eslint-disable-line
    const speed = action === 'mv' ? 1 : 2;
    GameCore.getInstance().planets[this.planetId - 1].leaveOrbit(this);
    this.startMovement(this.currentWidget.x + (this.currentWidget.size / 2), this.currentWidget.y + (this.currentWidget.size / 2), () => {
      this.planetId = this.currentWidget.planetId;
      this.currentWidget.addElementWidget(this, action);
    }, speed);
    super.onTagDeletion(tuioTagId);
    GameCore.getInstance().menus[this.playerId - 1].visibility = false;
    GameCore.getInstance().menus[this.playerId - 1].onTagDeletion(tuioTagId);
  }

  startMovement(dirX, dirY, callback, speed) {
    this.actionStep = 3;
    const dX = dirX - this.centeredX;
    const dY = dirY - this.centeredY;
    const dist = Math.sqrt((dX * dX) + (dY * dY));
    const multiplier = speed;
    let countdown = dist * multiplier;
    // Trigger the spaceship movement
    clearInterval(this.movement);
    this.movement = setInterval(() => {
      this.drawer.drawLine(this.shipId, this.centeredX, this.centeredY, dirX, dirY);
      this.updatePos(dX / (dist * multiplier), dY / (dist * multiplier));
      countdown -= 1;
      if (countdown <= 0) {
        this.actionStep = 0;
        callback();
        clearInterval(this.movement);
        this.drawer.clearLines(this.shipId);
      }
    }, 1000 / 60);
  }

  startFeedback() {
    if (this.blinking === undefined || this.blinking === 0) {
      this.blinking = setInterval(() => {
        if (this._domElem.css('display') === 'block') {
          this._domElem.css('display', 'none');
        } else {
          this._domElem.css('display', 'block');
        }
      }, 200);
    }
    this.actionStep = 1;
  }

  stopFeedback() {
    clearInterval(this.blinking);
    this.blinking = 0;
    this._domElem.css('display', 'block');
    this.actionStep = 0;
    GameCore.getInstance().menus[this.playerId - 1].visibility = false;
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
    this._x = x;
    this._y = y;
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
