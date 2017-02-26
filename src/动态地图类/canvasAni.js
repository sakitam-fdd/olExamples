/**
 * Created by FDD on 2016/12/13.
 */
var canvasAni = function () {};
canvasAni.prototype.drawSunFunc = function () {
  var that = this;
  this.sun = new Image();
  this.moon = new Image();
  this.earth = new Image();
  this.sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  this.moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
  this.earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0,0,300,300); // clear canvas

  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.strokeStyle = 'rgba(0,153,255,0.4)';
  ctx.save();
  ctx.translate(150,150);

  // Earth
  var time = new Date();
  ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
  ctx.translate(105,0);
  ctx.fillRect(0,-12,50,24); // Shadow
  ctx.drawImage(that.earth,-12,-12);

  // Moon
  ctx.save();
  ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
  ctx.translate(0,28.5);
  ctx.drawImage(that.moon,-3.5,-3.5);
  ctx.restore();

  ctx.restore();

  ctx.beginPath();
  ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
  ctx.stroke();

  ctx.drawImage(that.sun,0,0,300,300);
  window.requestAnimationFrame(this.drawSunFunc);
};

canvasAni.prototype.drawBull = function () {
  var canvas = document.getElementById('canvas_a');
  var ctx = canvas.getContext('2d');
  var ball = {
    x: 100,
    y: 100,
    radius: 25,
    color: 'blue',
    draw: function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  };
  ball.draw();
};

canvasAni.prototype.drawCircle = function (canvas) {
  var ctx = canvas.getContext('2d');
  ctx.save();
  ctx.clearRect(0,0,150,150);
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#325FA2';
  ctx.arc(0,0,142,0,Math.PI*2,true);
  ctx.stroke();
  ctx.restore();
};

function CanvasFade(canvas){
  this.canvas=canvas;
  this.ctx=canvas.getContext("2d");
  this.width=canvas.width;
  this.height=canvas.height;
}

CanvasFade.prototype={
  draw:function(config){
    var _self=this;
    var cfg=config?config:{x:200,y:200,r:120};
    var ratio=cfg.r/2;
    var grd = _self.ctx.createRadialGradient(cfg.x, cfg.y, 0.000, cfg.x, cfg.y, cfg.r);
    grd.addColorStop(0.000, 'rgba(255, 0, 0, 0.900)');
    grd.addColorStop(0.5, 'rgba(255, 0, 0, 0.600)');
    grd.addColorStop(1.0, 'rgba(255, 0, 0, 0.000)');
    _self.ctx.fillStyle = grd;
    _self.ctx.arc(cfg.x, cfg.y, cfg.r,0,Math.PI*2,true);
    _self.ctx.fill();
  }
};
