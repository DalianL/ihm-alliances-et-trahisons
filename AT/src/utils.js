class Utils {
  static isInBounds(libStack, x, y) {
    if (x >= libStack.x && x <= (libStack.x + libStack.width) && y >= libStack.y && y <= (libStack.y + libStack.height)) {
      return true;
    }
    return false;
  }
}

export default Utils;
