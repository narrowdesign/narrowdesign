
var context = document.getElementById('myCanvas').getContext('2d');
context.drawImage(document.querySelector('img'), 0, 0, 40, 40);

// Get the CanvasPixelArray from the given coordinates and dimensions.
var imgd = context.getImageData(0, 0, 40, 40);
console.log(imgd);
var pix = imgd.data;
// Draw the ImageData at the given (x,y) coordinates.
context.putImageData(imgd, x, y);