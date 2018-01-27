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
    this.canvas1 = new DrawingCanvas(w, h, 101, 'blue');
    this.canvas2 = new DrawingCanvas(w, h, 101, 'red');
    this.canvas3 = new DrawingCanvas(w, h, 101, 'yellow');
    this.canvas4 = new DrawingCanvas(w, h, 101, 'green');

    $('#example-container').append(this.background._domElem); // eslint-disable-line
    $('#example-container').append(this.canvas1._domElem); // eslint-disable-line
    $('#example-container').append(this.canvas2._domElem); // eslint-disable-line
    $('#example-container').append(this.canvas3._domElem); // eslint-disable-line
    $('#example-container').append(this.canvas4._domElem); // eslint-disable-line
  }

  prepareDrawer(imgSrc) {
    this.background.loadBackground(imgSrc);
  }

  drawLine(playerId, x1, y1, x2, y2) {
    switch (playerId) {
      case 1:
        this.canvas1.drawLine(x1, y1, x2, y2);
        break;
      case 2:
        this.canvas2.drawLine(x1, y1, x2, y2);
        break;
      case 3:
        this.canvas3.drawLine(x1, y1, x2, y2);
        break;
      case 4:
        this.canvas4.drawLine(x1, y1, x2, y2);
        break;
      default: break;
    }
  }

  clearLines(playerId) {
    switch (playerId) {
      case 1:
        this.canvas1.clearLines();
        break;
      case 2:
        this.canvas2.clearLines();
        break;
      case 3:
        this.canvas3.clearLines();
        break;
      case 4:
        this.canvas4.clearLines();
        break;
      default: break;
    }
  }

  get domElem() { return this._domElem; }

}

export default Drawer;
