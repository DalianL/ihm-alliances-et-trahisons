import CircularMenu from 'tuiomanager/widgets/CircularMenu/CircularMenu';

class CircularMenuCustom extends CircularMenu {
  constructor(rootTree, tagMenu1, playerId) {
    super(parseInt(tagMenu1, 16), rootTree);
    this.playerId = playerId;
    this.allowedTag1 = tagMenu1;
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
    if (tuioTag.id.toString() === this.allowedTag1) {
      super.onTagCreation(tuioTag);
      this._domElem.css('display', this.visibility);
      this._domElem.attr('class', 'selector');
    }
  }

  /**
   * Call after a TUIOTag update.
   *
   * @method onTagUpdate
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  onTagUpdate(tuioTag) {
    super.onTagUpdate(tuioTag);
  }

  /**
   * Call after a TUIOTag deletion.
   *
   * @method onTagDeletion
   * @param {number/string} tuioTagId - TUIOTag's id to delete.
   */
  onTagDeletion(tuioTagId) {
    if (tuioTagId.toString() === this.allowedTag1) {
      // super.onTagDeletion(tuioTagId);
      this._domElem.css('display', 'none');
    }
  }

  /* eslint-enable */

}

export default CircularMenuCustom;
