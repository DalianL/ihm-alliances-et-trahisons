import CircularMenu from 'tuiomanager/widgets/CircularMenu/CircularMenu';

class CircularMenuCustom extends CircularMenu {
  constructor(tagMenu, rootTree) {
    super(tagMenu, rootTree);
    this.visibility = 'none';
  }

  /* eslint-disable */

  /**
   * Call after a TUIOTag creation.
   *
   * @method onTagCreation
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  onTagCreation(tuioTag) {
    // super.onTagCreation(tuioTag);
    this._domElem.css('display', this.visibility);
  }

  /**
   * Call after a TUIOTag update.
   *
   * @method onTagUpdate
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  onTagUpdate(tuioTag) {
    // super.onTagUpdate(tuioTag);
  }

  /**
   * Call after a TUIOTag deletion.
   *
   * @method onTagDeletion
   * @param {number/string} tuioTagId - TUIOTag's id to delete.
   */
  onTagDeletion(tuioTagId) {
    // super.onTagDeletion(tuioTagId);
  }

  /* eslint-enable */

}

export default CircularMenuCustom;
