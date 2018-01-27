import $ from 'jquery/dist/jquery.min';
import DrawingCanvas from './drawingCanvas';

// let drawer = null;

class Drawer {
  // constructor(ctx) {
  //   if (drawer !== null) {
  //     return drawer;
  //   }

  //   this.ctx = ctx;
  //   drawer = this;

  //   return drawer;
  // }

  // static getInstance() {
  //   return new Drawer();
  // }

  constructor(w, h) {
    this.background = new DrawingCanvas(w, h, 100);
    this.canvas1 = new DrawingCanvas(w, h, 101);

    $('#example-container').append(this.canvas1._domElem); // eslint-disable-line
    $('#example-container').append(this.background._domElem); // eslint-disable-line
  }

  prepareDrawer(imgSrc) {
    this.background.loadBackground(imgSrc);
  }

  drawLine(x1, y1, x2, y2) {
    this.canvas1.drawLine(x1, y1, x2, y2);
  }

  clearLines() {
    this.canvas1.clearLines();
  }

  get domElem() { return this._domElem; }

}

export default Drawer;
