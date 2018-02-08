import $ from 'jquery/dist/jquery.min';
import CircularMenu from 'tuiomanager/widgets/CircularMenu/CircularMenu';
import { radToDeg } from 'tuiomanager/core/helpers';

class CircularMenuCustom extends CircularMenu {
  constructor(rootTree, tagMenu, playerId) {
    super(parseInt(tagMenu, 16), rootTree);
    this.playerId = playerId;
    this.allowedTag = tagMenu;
  }

  /* eslint-disable */

  /**
   * Call after a TUIOTag creation.
   *
   * @method onTagCreation
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  onTagCreation(tuioTag) {
    if (tuioTag.id.toString() == this.allowedTag) {
      if (parseInt(tuioTag.id.toString(), 16) === this.idTagMenu) {
        this._tags = {
          ...this._tags,
          [tuioTag.id]: tuioTag,
        };
        this._tags[tuioTag.id].addWidget(this);

        this._lastTagsValues = {
          ...this._lastTagsValues,
          [tuioTag.id]: {
            x: tuioTag.x,
            y: tuioTag.y,
          },
        };
        this.nbItems = 0;
        this._domElem.find('ul').empty();
        this.constructMenu();
        this.topSelector = tuioTag.y - (this.domElem.height() / 2);
        this.leftSelector = tuioTag.x - (this.domElem.width() / 2);
        this.domElem.css('top', this.topSelector);
        this.domElem.css('left', this.leftSelector);
        this._domElem.show();
        this.isHide = false;
        const li = this.domElem.find('li');
        this.menuItemCoord = [];
        for (let i = 0; i < li.length; i += 1) {
          const x = $(li[i]).find('label')[0].getBoundingClientRect().left;
          const y = $(li[i]).find('label')[0].getBoundingClientRect().top;
          const width = $(li[i]).find('label').width();
          const height = $(li[i]).find('label').height();
          this.menuItemCoord.push({ xmin: x, ymin: y, xmax: x + width, ymax: y + height });
        }
      }
      this._domElem.css('display', 'none');
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
    if (typeof (this._lastTagsValues[tuioTag.id]) !== 'undefined') {
      if (parseInt(tuioTag.id.toString(), 16) === this.idTagMenu) {
        const lastTagValue = this._lastTagsValues[tuioTag.id];
        const diffX = tuioTag.x - lastTagValue.x;
        const diffY = tuioTag.y - lastTagValue.y;

        this.topSelector = this.topSelector + diffY;
        this.leftSelector = this.leftSelector + diffX;
        this.domElem.css('top', this.topSelector);
        this.domElem.css('left', this.leftSelector);
        this._domElem.css('transform', `rotate(${radToDeg(tuioTag.angle)}deg)`);
        const li = this.domElem.find('li');
        this.menuItemCoord = [];
        for (let i = 0; i < li.length; i += 1) {
          const x = $(li[i]).find('label')[0].getBoundingClientRect().left;
          const y = $(li[i]).find('label')[0].getBoundingClientRect().top;
          const width = $(li[i]).find('label').width();
          const height = $(li[i]).find('label').height();
          this.menuItemCoord.push({ xmin: x, ymin: y, xmax: x + width, ymax: y + height });
        }

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
    if (tuioTagId.toString() == this.allowedTag) {
      // super.onTagDeletion(tuioTagId);
      this._domElem.css('display', 'none');
    }
  }

  /* eslint-enable */

}

export default CircularMenuCustom;
