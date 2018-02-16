import TUIOManager from 'tuiomanager/core/TUIOManager';

class Utils {
  /* eslint-disable no-underscore-dangle, consistent-return */

  static checkForPlanetBeneath(id) {
    const res = [];
    Object.keys(TUIOManager.getInstance()._widgets).forEach((widgetId) => {
      if (TUIOManager.getInstance()._widgets[widgetId].constructor.name === 'Planet') {
        const selectedWidget = TUIOManager.getInstance()._widgets[widgetId];
        const selectedTag = TUIOManager.getInstance()._tags[id];
        if (this.isInBounds(selectedWidget, selectedTag.x, selectedTag.y) && !selectedWidget.isDisabled) {
          res.push(selectedWidget);
        } else {
          res.push(undefined);
        }
      }
    });
    return res;
  }

  /* eslint-enable no-underscore-dangle, consistent-return */

  static isInBounds(libStack, x, y) {
    if (x >= libStack.x && x <= (libStack.x + libStack.width) && y >= libStack.y && y <= (libStack.y + libStack.height)) {
      return true;
    }
    return false;
  }

  static givePosByColor(color, x, y, width, height, spaceShipSize) {
    // Left top
    let newX;
    let newY;

    switch (color) {
      case 'red':
        newX = (x + (width / 2)) - (spaceShipSize / 3);
        newY = y - (spaceShipSize / 2);
        break;
      case 'blue':
        newX = x - (spaceShipSize / 2);
        newY = (y + (height / 2)) - (spaceShipSize / 2);
        break;
      case 'orange':
        newX = (x + (width)) - (spaceShipSize / 3);
        newY = (y + (height / 2)) - (spaceShipSize / 2);
        break;
      case 'green':
        newX = (x + (width / 2)) - (spaceShipSize / 3);
        newY = (y + (height)) - (spaceShipSize / 3);
        break;
      default:
        newX = x;
        newY = y;
        break;
    }

    return {
      x: newX,
      y: newY,
    };
  }

  static parser(amount, data) {
    return "{ \"id_planet\": " + amount + ", \"id_player\": " + data.id + " }"; // eslint-disable-line
  }

  static parser2(id1, id2) {
    return "{ \"id_planet\": " + id1 + ", \"id_player\": " + id2 + " }"; // eslint-disable-line
  }

  static parser3(id1, id2) {
    return "{\"id_fleet\": " + id1 + ", \"id_planet\": " + id2 + " }"; // eslint-disable-line
  }
}

export default Utils;
