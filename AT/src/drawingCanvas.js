import $ from 'jquery/dist/jquery.min';

class DrawingCanvas {
  constructor(w, h, z, color) {
    this._domElem = $('<canvas>');
    this._domElem.css('z-index', `${z}`);
    this._domElem.css('position', 'absolute');
    this.ctx = this._domElem[0].getContext('2d');
    this.color = color;
    this.ctx.canvas.width = w;
    this.ctx.canvas.height = h;
    this.w = w;
    this.h = h;
  }

  loadBackground(imgSrc) {
    this.backgr = new Image();

    this.backgr.onload = () => {
      this.ctx.drawImage(this.backgr, 0, 0, 1920, 1080);
    };

    this.backgr.src = imgSrc;
  }

  drawText(t, posX, posY) {
    this.ctx.font = '40px Georgia';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(t, posX, posY);
  }

  drawLine(x1, y1, x2, y2) {
    this.ctx.clearRect(0, 0, this.w, this.h);

    this.ctx.save();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.restore();
  }

  clearLines() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

}

export default DrawingCanvas;
