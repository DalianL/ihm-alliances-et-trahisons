import TUIOWidget from 'tuiomanager/core/TUIOWidget';
// Import JQuery
import $ from 'jquery/dist/jquery.min';

class Planet extends TUIOWidget {
  constructor(x, y, width, height, initialRotation, initialScale, src) {
    super(x, y, width, height, initialRotation, initialScale);
    this.src = src;
    this._domElem = $('<img>');
    this._domElem.attr('src', src);
    this._domElem.css('width', `${this.width}px`);
    this._domElem.css('height', `${this.height}px`);
    this._domElem.css('position', 'absolute');
    this._domElem.css('z-index', '0');
    this._domElem.css('left', `${x}px`);
    this._domElem.css('top', `${y}px`);
    this._domElem.css('transform', `rotate(${initialRotation}deg)`);
    this._domElem.css('transform-origin', `scale(${initialScale})`);
    this.hasDuplicate = false;
  } // constructor


}

export default Planet;
