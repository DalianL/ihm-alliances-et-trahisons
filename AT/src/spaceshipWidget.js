import TUIOWidget from 'tuiomanager/core/TUIOWidget';

/**
 * Abstract class
 *
 * @class ElementWidget
 * @extends TUIOWidget
 */
class SpaceshipWidget extends TUIOWidget {
  /**
   * Call after a TUIOTag creation.
   *
   * @method onTagCreation
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  onTagCreation(tuioTag) {
    // console.log(tuioTag);
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
}

export default SpaceshipWidget;
