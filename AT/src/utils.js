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
}

export default Utils;
