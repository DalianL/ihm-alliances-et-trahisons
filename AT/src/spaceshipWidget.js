import $ from 'jquery/dist/jquery.min';
import TUIOWidget from 'tuiomanager/core/TUIOWidget';

/**
 * Abstract class
 *
 * @class ElementWidget
 * @extends TUIOWidget
 */
class SpaceshipWidget extends TUIOWidget {
  constructor(x, y, width, height, imgSrc) {
    super(x, y, width, height);

    this._lastTouchesValues = {};
    this._lastTagsValues = {};

    this._domElem = $('<img>');
    this._domElem.attr('src', imgSrc);
    this._domElem.css('width', `${width}px`);
    this._domElem.css('height', `${height}px`);
    this._domElem.css('position', 'absolute');
    this._domElem.css('left', `${x}px`);
    this._domElem.css('top', `${y}px`);
  }

  /**
   * Call after a TUIOTag creation.
   *
   * @method onTagCreation
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  onTagCreation(tuioTag) {
    if (!this._isInStack) {
      console.log('creating : ', tuioTag);
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

  onTagUpdate(tuioTag) {
    // super.onTagUpdate();
    console.log('updating ? ', tuioTag, this._isInStack);
  }

}

export default SpaceshipWidget;
