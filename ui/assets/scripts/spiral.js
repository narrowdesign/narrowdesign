(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

  var winW = window.innerWidth;
  var winH = winW*.618033;

  var smallScreen = false;
  var spirals;

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var aspect = .618033;
  var axis = .7237;
  var spiralOriginX = winW * axis
  var spiralOriginY = winW * axis*aspect
  var keydown;

  sizeCanvas();

  window.addEventListener('wheel', function(){
    drawMbp()
    drawMbp()
    drawMbp()
  }
    );
  window.addEventListener('touchmove',drawMbp);
  window.addEventListener('keydown',function() {
    if (rotation > 90 || rotation < -1300)
    keydown = true;
    drawMbp()
    drawMbp()
    drawMbp()
  });
  window.addEventListener('keyup',function() {
    keydown = false;
  });

  window.addEventListener('resize',function(){
    sizeCanvas()
  })

  function sizeCanvas() {
    winW = window.innerWidth;
    winH = window.innerHeight;
    if (winW < 960) {
      smallScreen = true;
      spirals = ['ui/assets/images/spiral-line-mobile.svg','ui/assets/images/spiral-line-black-mobile.svg','ui/assets/images/spiral-line-magenta-mobile.svg','ui/assets/images/spiral-line-cyan-mobile.svg',]
      spiralOriginX = Math.floor((winW/aspect) * aspect * (1 - axis))
      spiralOriginY = Math.floor((winW/aspect) * axis)
    } else {
      smallScreen = false;
      spirals = ['ui/assets/images/spiral-line.svg','ui/assets/images/spiral-line-black.svg','ui/assets/images/spiral-line-magenta.svg','ui/assets/images/spiral-line-cyan.svg',]
      spiralOriginX = winW * axis
      spiralOriginY = winW * aspect * axis
    }
    canvas.width = winW;
    canvas.height = winW*.618033;

    if (winW < winH) {
      canvas.width = winH*.618033;
      canvas.height = winH;
    }
  }

  var spiralRed = new Image;
  spiralRed.src = 'ui/assets/images/spiral-line.svg';
  var count = 0;
  function drawMbp() {
    count++;
    if (spiraling || keydown) {
      if (count%1000 < 250) {
        spiralRed.src = spirals[0];
      } else if (count%1000 < 500) {
        spiralRed.src = spirals[1];
      } else if (count%1000 < 750) {
        spiralRed.src = spirals[2];
      } else if (count%1000 < 1000) {
        spiralRed.src = spirals[3];
      }
      requestAnimationFrame(function(){
        ctx.globalAlpha = 1;

        ctx.translate( spiralOriginX, spiralOriginY);
        ctx.rotate(2)
        ctx.translate( -spiralOriginX, -spiralOriginY);
        ctx.drawImage(spiralRed, 0,0,winW,winH);
      })
    } else {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect (0,0,winW,winH);
    }
    // }
  }
})();
