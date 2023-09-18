/* Author: Nick Jones

*/
$(document).ready(function() {
	var win = $(window);
	var doc = $(document);
	var initialized = false;

	var WIN_H;
	var WIN_W;

	var touchEnabled = Modernizr.touch;

	var transform3d = Modernizr.csstransforms3d;

	var touchStartX;
	var touchStartY;
	var moved;

	var running;
	var runInterval;

	var left=0;
	var rot = 0;

	var coins = new Array();
	var coinRowH = 70;
	var coinColW = 70;

	var events = {
		init: function(){
			window.scrollTo(0, 1);
			pageResize();
			if(win.width() < 768){
				smallScreen = true;
			}
			win.bind('resize', pageResize);
			win.bind('keydown',keyDownHandler);
			win.bind('keyup',keyUpHandler);
			win.bind('click',function(e){
				jump();
			});
			createCoins();
			function createCoins(){
				var j = 0;
				var k = 0;
				for (var i = 0; i <= 450; i++) {
					if(j>150){
						j=0;
						k++;
					}
					j++;					
					$('#coins').append('<li class="coin"></li>');
					$('.coin').eq(i).css({
						left:(j*coinColW)+(37*(k%2)),
						top:k*coinRowH
					})
				};
			}
			function pageResize (e) {
				WIN_H = win.height();
				WIN_W = win.width();
				initialized = true;
			}
			function keyDownHandler (argument) {
				if(argument.keyCode==37){
					moveBackward();
				}else if(argument.keyCode==39){
					moveForward();
				}else if(argument.keyCode == 38 || argument.keyCode == 32){
					jump();
				}
			}
			function keyUpHandler (argument) {
				if(argument.keyCode==37 || argument.keyCode==39){
					stopMoving();
				}
			}
			function moveForward(){
				move(-10);
			}
			function moveBackward(){
				move(10);
			}
			function move (move) {
				if(!running){
					running = true;
					runInterval = setInterval(function(){
						run(move);
					},30);
				}
			}
			function run (dist) {
				left = left+dist;
				currentCoinCol = Math.ceil((-left/coinColW)+3.5);
				rot += dist*-2;
				$('.nelson').css({
					'-webkit-transform':"rotate("+rot+"deg)"
				})
				$('#coins').css({
					'left':left
				});
				// if($('.nelson'))
			}
			function stopMoving(){
				clearInterval(runInterval);
				running = false;
			}
			function jump(){
				$('.nelson').removeClass('down').addClass('up');
				setTimeout(function(){
					$('.nelson').removeClass('up').addClass('down');
				},400)
			}
		}
	};
	events.init();
});


























