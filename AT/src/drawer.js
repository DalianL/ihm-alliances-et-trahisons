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

  constructor(w, h, core) {
    this.background = new DrawingCanvas(w, h, 100);
    this.core = core;
    this.w = w;
    this.h = h;
    this.canvases = [];
  }

  prepareDrawer(imgSrc) {
    $('#example-container').append(this.background._domElem); // eslint-disable-line

    this.background.loadBackground(imgSrc);
  }

  affectCanvas(pId, sId) {
    const newCanvas = new DrawingCanvas(this.w, this.h, 101, this.core.playerColors[pId - 1]);
    this.canvases[sId] = newCanvas;
    $('#example-container').append(newCanvas._domElem); // eslint-disable-line
  }

  drawLine(sId, x1, y1, x2, y2) {
    this.canvases[sId].drawLine(x1, y1, x2, y2);
  }

  clearLines(sId) {
    this.canvases[sId].clearLines();
  }

  get domElem() { return this._domElem; }

}

export default Drawer;
