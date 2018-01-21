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

  constructor(canv, w, h) {
    this.canv = canv;
    this.ctx = canv.getContext('2d');
    this.w = w;
    this.h = h;
  }

  drawLine(x1, y1, x2, y2) {
    console.log('drawing...');
    this.canv.style.zIndex = 100;
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 5;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

}

export default Drawer;
