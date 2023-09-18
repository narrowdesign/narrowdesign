/* Author: Nick Jones

*/
$(document).ready(function() {
	var win = $(window);
	var doc = $(document);
	var initialized = false;
	if(Modernizr.cssfilters){
		blurEnabled = true;
	}

	var WIN_H;
	var WIN_W;

	var numProjects;
	
	var scrollAmount = 0;
	var currentChapter;
	var navH = $('#nav').height();

	var easeInterval;
	var inertia = .92;

	var touchEnabled = Modernizr.touch;
	var transform3d = Modernizr.csstransforms3d;

	var touchStartX;
	var touchStartY;
	var oldMouseY;
	var oldMouseX;
	var newMouseY;
	var newMouseX;
	var moved;
	var quotePlayed = false;
	var quote = document.createElement('audio');
	//quote.setAttribute('src', "img/quote.wav");
	//quote.load();

	var transitionCallbackEvent = whichTransitionEvent();

	var events = {
		init: function(){
			// window.scrollTo(0, 1);
			win.bind('resize', pageResize);
			win.bind('keydown',keyHandler);

			win.mouseup(function(){
				win.unbind('mousemove');
			});
			win.bind('mousewheel', function(eventData,deltaY) {
				stopEasing();
				scrollHandler(deltaY*20);
				eventData.preventDefault();
			});
			win.bind('scroll',function(e,deltaY){
				//scrollHandler();
			});
			win.bind('mousemove', function(eventData){
				//moveHandler(eventData);
			});
			win.bind('touchmove',function(e){
				e.preventDefault();
				stopEasing();
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				moved = touch.pageY-touchStartY;
				scrollHandler(Math.floor(moved));
				touchStartY = touch.pageY;
			})
			win.bind('touchstart',function(e){
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				touchStartY = touch.pageY;
			})	
			win.bind('touchend',function(e){
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				touchEndY = touch.pageY;
				throwScroll();				
			})
			win.bind('mousedown', function(e){
				e.preventDefault();
				dragging = true;
				stopEasing();
				oldMouseY = e.pageY;
				oldMouseX = e.pageX;
				var dir;			
				win.bind('mousemove',function(e) {
					$('.audio').unbind('click');
					e.preventDefault();
    				newMouseY = e.pageY;
    				newMouseX = e.pageX;
    				win.click( function(e){
						e.preventDefault();
						win.unbind('click');
					});
					moved = (newMouseY-oldMouseY);
					scrollHandler(moved*1.5);
					dir = 'v'
					oldMouseY = e.pageY;
					oldMouseX = e.pageX;
    			});
			});
		    win.bind('mouseup', function(e){
		    	$('.audio').click(function(){playSound(2)});
				win.unbind('mousemove');
				throwScroll();
			});				
			win.bind('click',function(e){
				
			});
			$('.audio').click(function(){playSound(2)});
			pageResize();
			function pageResize (e) {
				WIN_H = win.height();
				WIN_W = 1024;
				initialized = true;		
			}
			function playSound (num) {
				//quotePlayed = true;
				//quote.play();
			}
			function throwScroll () {
				if(Math.abs(moved) > 1){
					easeInterval = setInterval(function(){
						moved = moved*inertia;
						if(Math.abs(moved) < 1){
							stopEasing();
						}
						scrollHandler(moved);
					},10);
				}
			}
			function stopEasing(){
				moved = 0;
				clearInterval(easeInterval);
			}
			function scrollHandler(deltaY){
				scrollAmount = Math.min(0,scrollAmount+(deltaY));
				// if(myLeft < -$('#cover-img').width()+1024){
				// 	$('#cover1').css({
				// 		display:'none'
				// 	})
				// 	$('#cover2').css({
				// 		display:'block'
				// 	})
				// }else{
				// 	$('#cover2').css({
				// 		display:'none'
				// 	})
				// 	$('#cover1').css({
				// 		display:'block'
				// 	})
				// }
				$('#chapter').css({
					top:Math.min(navH,navH+scrollAmount)
				})
				$('#nav').css({
					top:Math.min(Math.max(-navH+75,(scrollAmount)),0)
				})
				$('#logo').css({
					top:Math.min(Math.max(12,70+(scrollAmount/3)),70)
				})
				$('#cover-img').css({
					left:Math.min(0,Math.max(-19*WIN_W,(Math.round(scrollAmount/18))*WIN_W))
				})
				// if(!quotePlayed && scrollAmount < -$('.module.empty').position().top){
				// 	playSound(2);
				// }
				if(scrollAmount < -500){
					$('.title').css({
						opacity:0
					})
				}else{
					$('.title').css({
						opacity:1
					})
				}
				if(scrollAmount < -1160){
					$('#steering').css({
						left:Math.min(0,(scrollAmount+1200)/3)
					})
					$('#pan').css({
						opacity:1
					})
				}else{
					$('#pan').css({
						opacity:0
					})
				}
			}
			function next(){
				if(currentChapter < numProjects-1){
					changeProject(currentChapter+1);
				}
			}
			function prev(){
				if(currentChapter > 0){
					changeProject(currentChapter-1);
				}
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
		}
	};
	events.init();
});


























