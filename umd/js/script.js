/* Author: Nick Jones

*/
$(document).ready(function() {
	var win = $(window);
	var doc = $(document);
	var initialized = false;
	var blurEnabled;
	if(Modernizr.cssfilters){
		blurEnabled = true;
	}else if(Modernizr.textshadow){
		shadowEnabled = true;
	}

	var WIN_H;
	var WIN_W;
	
	var scrollAmount = 0; // keep track of amount rotated
	var currentChallenge = 0;

	var touchEnabled = Modernizr.touch;

	var transform3d = Modernizr.csstransforms3d;

	var touchStartX;
	var touchStartY;
	var moved;
	var frame = 0;

	var myDepth = new Array();
	var myRot = new Array();
	var spaces = new Array();
	function Space(headline, message) {
	  this.headline = headline;
	  this.message = message;
	  spaces.push(this);
	}
	var space1 = new Space('The police woke you up at 2am and made you move.','Move back 1 space.');
	var space2 = new Space('Your friend lets you shower at his place.','Move forward 1 space.');
	var space3 = new Space('You have a job interview!','Move forward 5 spaces.');
	var space4 = new Space('You got mugged and someone stole your phone. Now there’s no way for employers to contact you.','Move back 10 spaces.');
	var space5 = new Space('There’s room for you at the shelter tonight.','Move forward 3 spaces.');
	var space6 = new Space('Your potential employer does a background check. They didn’t like what they saw.','Move back five spaces.');
	var space7 = new Space('You got a new outfit from the Clothing Closet for your interview tomorrow.','Move forward 1 space.');
	var space8 = new Space('You got 5 hours of work from the temp agency.','Move forward 4 spaces.');
	var space9 = new Space('You hurt your back on the job site. It’s going to be at least a week until you can work again.','Move back 10 spaces.');
	var space10 = new Space('There’s a job fair at the grocery store.','Move forward 2 spaces.');
	var space11 = new Space('A volunteer helps you make a resume.','Move forward 1 space.');
	var space12 = new Space('You’ve been living in your car. Tonight you discover that it’s been impounded.','Move back 10 spaces.');
	var space13 = new Space('Too many nights out in the cold and you’ve got pneumonia.','Move back 7 spaces.');
	var space14 = new Space('Your job coach finds you a temporary position.','Move forward 15 spaces.');
	var space15 = new Space('There’s no bus that goes to your new job.','Move back 10 spaces.');
	var space16 = new Space('Your friend says you can’t shower at his house any more.','Move back 3 spaces.');
	var space17 = new Space('The police woke you up at 2am and made you move.','Move back 1 space.');
	var space18 = new Space('Your friend lets you shower at his place.','Move forward 1 space.');
	var space19 = new Space('You have a job interview!','Move forward 5 spaces.');
	var space20 = new Space('You got mugged and someone stole your phone. Now there’s no way for employers to contact you.','Move back 10 spaces.');
	var space21 = new Space('There’s room for you at the shelter tonight.','Move forward 3 spaces.');
	var space22 = new Space('Your potential employer does a background check. They didn’t like what they saw.','Move back five spaces.');
	var space23 = new Space('You got a new outfit from the Clothing Closet for your interview tomorrow.','Move forward 1 space.');
	var space24 = new Space('You got 5 hours of work from the temp agency.','Move forward 4 spaces.');
	var space25 = new Space('You hurt your back on the job site. It’s going to be at least a week until you can work again.','Move back 10 spaces.');
	var space26 = new Space('There’s a job fair at the grocery store.','Move forward 2 spaces.');
	var space27 = new Space('A volunteer helps you make a resume.','Move forward 1 space.');
	var space28 = new Space('You’ve been living in your car. Tonight you discover that it’s been impounded.','Move back 10 spaces.');
	var space29 = new Space('Too many nights out in the cold and you’ve got pneumonia.','Move back 7 spaces.');
	var space30 = new Space('Your job coach finds you a temporary position.','Move forward 15 spaces.');

	var events = {
		init: function(){
			window.scrollTo(0, 1);
			pageResize();
			if(win.width() < 768){
				smallScreen = true;
			}
			win.bind('resize', pageResize);
			win.bind('keydown',keyHandler);

			win.mouseup(function(){
				win.unbind('mousemove');
			});
			win.bind('mousewheel', function(eventData,deltaY) {
				scrollHandler(deltaY);
				eventData.preventDefault();
			});
			win.bind('scroll',function(e){e.preventDefault();});
			win.bind('mousemove', function(eventData){
				//moveHandler(eventData);
			});
			win.bind('touchmove',function(e){
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				moved = touch.pageY-touchStartY;
				scrollHandler(Math.floor(moved/-13));
				touchStartY = touch.pageY;
			})
			win.bind('touchstart',function(e){
				moved = 0;
				e.preventDefault();
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				touchStartY = touch.pageY;
			})
			win.bind('touchend',function(e){
				throwWheel(moved);
			})
			win.bind('click',function(e){
				//nextProject();
			});
			createSpaces();
			function createSpaces(){
				for (var i = 1; i <= 15; i++) {
					$('#spaces').append(
						'<li class="space"> \
						<div class="headline">'+eval('space'+i).headline+'</div> \
						<div class="instruction">'+eval('space'+i).message+'</div> \
						<div class="space-base"></div> \
					</li>');
					$('.space').eq(i-1).css({
						'-webkit-transform':'rotateX('+(i-1)*20+'deg)',
					})
					$('.space').eq(i-1).find($('.space-base')).css({
						// background:'#'+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)
					})
				};
			}
			function pageResize (e) {
				if(win.width() < 768){
					smallScreen = true;
				}else{
					smallScreen = false;
				}
				WIN_H = win.height();
				WIN_W = win.width();
				SCROLL_MAX = (WIN_W-(WIN_W/20))-$('#scrubber').width()-20;
				initialized = true;
				scrollHandler(0);
				$('#spaces').css({
					'-webkit-transform-origin':'50% '+(1880+WIN_H)+'px 0'
				})
			}
			function nextProject () {
				$('#bg').css({
					'-webkit-filter': 'brightness(100%) contrast(300%)'
				})
			}
			function scrollHandler(deltaY){
				scrollAmount -= deltaY/600;
				scrollAmount = Math.min(Math.max(0,scrollAmount),1);
				$('#spaces').css({
					'-webkit-transition-duration':'0s',
					'-webkit-transform':'perspective(1000px) translate3d(0,0,-1900px) rotateX('+(-scrollAmount*360)+'deg) '
				})
			}
			function throwWheel(moved){
				scrollAmount += moved/200;
				$('#spaces').css({
					'-webkit-transition-duration':'1s',
					'-webkit-transform':'perspective(1000px) translate3d(0,0,-1900px) rotateX('+(-scrollAmount*360)+'deg) '
				})
			}
			function keyHandler (argument) {
				if(argument.keyCode==38 || argument.keyCode==37){
					prev();
				}else if(argument.keyCode==40 || argument.keyCode==39){
					next();
				}else{
					return;
				}
			}
			function selectProject (num) {
				var targPos = $('.challenge').eq(num).position().top;
				scrollAmount = targPos/$('.challenge').eq(17).position().top;

				$('#scrubber').css({
					left:((WIN_W/33)+scrollAmount*SCROLL_MAX)
				})
			}
			function next(){

			}
			function prev(){

			}
		}
	};
	events.init();
});


























