import $ from 'jquery/dist/jquery.min';
import CircularMenu from 'tuiomanager/widgets/CircularMenu/CircularMenu';
import { radToDeg } from 'tuiomanager/core/helpers';
import Utils from './utils';

class CircularMenuCustom extends CircularMenu {
  constructor(rootTree, tagMenu, playerId) {
    super(parseInt(tagMenu, 16), rootTree);
    this.playerId = playerId;
    this.allowedTag = tagMenu;
    this.visibility = false;
    this.icons = ['assets/image/icons/fightIcon.png', 'assets/image/icons/defendIcon.png', 'assets/image/icons/gotoIcon.png'];
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

        const scan = Utils.checkForPlanetBeneath(tuioTag.id);
        let widget;
        for (let i = 0; i < scan.length; i += 1) {
          if (scan[i] !== undefined) {
            widget = scan[i];
            break;
          }
        }
        if (widget !== undefined && this.visibility) { // eslint-disable-line
          this._domElem.css('display', 'block');
        } else {
          this._domElem.css('display', 'none');
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

  addIconItem(iconClass, iconColor, background) {
    this.domElem.find('ul').append(
      $('<li>').attr('class', 'limenu').append(
        $('<input>').attr('id', `c ${this.nbItems}`).attr('type', 'checkbox'),
        $('<label>')
          .attr('for', `c ${this.nbItems}`)
          .append(
            $('<img>')
              .attr('class', iconClass)
              .attr('src', background),
              )
          .css('background-color', '#000000')
          .css('padding-top', '10px')
          .css('height', '50%'),
      ),
    );
  }

  constructMenu() {
    if (this.tree.name !== this.rootName) {
      this.addBackItem();
    }
    for (let i = 0; i < this.tree.childs.length; i += 1) {
      if (this.tree.childs[i].isIcon) {
        if (this.tree.childs[i]._icon == "Attack") { // eslint-disable-line
          this.addIconItem(this.tree.childs[i].icon, this.tree.childs[i].color, this.icons[0]);
        } else if (this.tree.childs[i]._icon == "Defend") { // eslint-disable-line
          this.addIconItem(this.tree.childs[i].icon, this.tree.childs[i].color, this.icons[1]);
        } else if (this.tree.childs[i]._icon == "Move") { // eslint-disable-line
          this.addIconItem(this.tree.childs[i].icon, this.tree.childs[i].color, this.icons[2]);
        }
      } else {
        this.addTextItem(this.tree.childs[i].name, this.tree.childs[i].color, this.tree.childs[i].backgroundcolor);
      }
    }
    this.toggleOptions(this.domElem);
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

}

export default CircularMenuCustom;
