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
	var STORY_H;

	var numProjects;
	
	var scrollAmount = 0;
	var currentProject;

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

	var scrollTop;

	var quote1 = document.createElement('audio');
	quote1.setAttribute('src', "img/rich1.mp3");
	quote1.load();

	var quote2 = document.createElement('audio');
	quote2.setAttribute('src', "img/rich2.mp3");
	quote2.load();

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
				// stopEasing();
				// scrollHandler(deltaY);
				// eventData.preventDefault();
			});
			win.bind('scroll',function(e,deltaY){
				scrollHandler();
			});
			win.bind('mousemove', function(eventData){
				//moveHandler(eventData);
			});
			win.bind('touchmove',function(e){
				e.preventDefault();
				stopEasing();
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				moved = touch.pageY-touchStartY;
				scrollHandler(Math.floor(moved/10));
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
				//e.preventDefault();
				dragging = true;
				stopEasing();
				oldMouseY = e.pageY;
				oldMouseX = e.pageX;
				var dir;			
				win.bind('mousemove',function(e) {
					e.preventDefault();
    				newMouseY = e.pageY;
    				newMouseX = e.pageX;
    				win.click( function(e){
						e.preventDefault();
						win.unbind('click');
					});
					if(dir != 'h'){
						moved = (newMouseY-oldMouseY)/2;
					}
					if(dir != 'v'){
						movedX = (newMouseX-oldMouseX)/(($('#numbers').outerWidth()-20)/600);
					}
					if(Math.abs(moved) > Math.abs(movedX)){
						scrollHandler(moved);
						dir = 'v'
					}else{
						scrollHandler(-movedX);	
						dir = 'h'
					}
					oldMouseY = e.pageY;
					oldMouseX = e.pageX;
    			});
			});
		    win.bind('mouseup', function(e){
				win.unbind('mousemove');
				throwScroll();
			});				
			win.bind('click',function(e){
				
			});
			$('#wtf').click(function(e){
				$('#wtf-img').css({
					display:'block',
					left:e.pageX-400,
					top:Math.max(e.pageY-scrollTop-260,20)
				})
			})
			$('#wtf-img').click(function(e){
				$('#wtf-img').css({
					display:'none'
				})
			})
			$('#begin-btn').click(function(e){
				$('#stores').css({
					width:'25%',
				})
				$('#stores h1').css({
					left:-$(this).outerWidth(),
					opacity:0
				})
				$('#begin-btn').css({
					top:-370
				})
				$('#begin-btn').html('BEGIN YOUR STORY');
				$('#begin-btn').click(function(){
					window.open('http://bigcartel.com');
				});
			})
			buildLists();
			pageResize();
			function buildLists(){
				for(var i=30;i>=0;i--){
					$('#years').append('<div class="year">'+(2012-i)+'<br><br></div>')
				}
				// for(var i=250;i>=0;i--){
				// 	$('#stores').append('<div class="store">'+(250000-(i*1000)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'<br><br></div>')
				// }
			}
			function pageResize (e) {
				WIN_H = win.height();
				WIN_W = win.width();
				STORY_H = $('.chapter').eq($('.chapter').length-1).offset().top + $('.chapter').eq($('.chapter').length-1).outerHeight();
				yearRatio = ($('#years').outerHeight()-WIN_H)/(STORY_H-400);
				storeRatio = ($('#stores').outerHeight()-WIN_H)/(STORY_H-WIN_H);
				if(win.width() < 768){
					smallScreen = true;
				}else{
					smallScreen = false;
				}
				initialized = true;		
			}
			function throwScroll () {
				if(Math.abs(moved) > 1){
					easeInterval = setInterval(function(){
						moved = moved*inertia;
						if(Math.abs(moved) < 1){
							stopEasing();
						}
						scrollHandler(moved/10);
					},10);
				}
			}
			function stopEasing(){
				moved = 0;
				clearInterval(easeInterval);
			}
			function scrollHandler(deltaY){
				scrollTop = win.scrollTop();
				var left = Math.min((scrollTop*.5)+(WIN_W*.25),(WIN_W*.35)-20);
				$('#years').css({
					'top':(scrollTop*-yearRatio)+scrollTop
				})
				$('.store-number').html((Math.max(0,(scrollTop*40)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")));
				$('#story').css({
					left:left,
					width: WIN_W-left
				})
				if(scrollTop > $('.audio').eq(0).offset().top && scrollTop < $('.audio').eq(0).offset().top + $('.audio').eq(0).outerHeight()){
					audio = 1;
					quote1.play();
				}
				if(scrollTop > $('.audio').eq(1).offset().top && scrollTop < $('.audio').eq(1).offset().top + $('.audio').eq(1).outerHeight()){
					audio = 2;
					quote2.play();
				}
				if(scrollTop > $('.audio').eq(1).offset().top-WIN_H && scrollTop < $('.audio').eq(1).offset().top+WIN_H + $('.audio').eq(1).outerHeight()){
					$('.map-img').css({
						left:($('.audio').eq(1).offset().top-scrollTop)/2
					})
				}
				if(scrollTop > $('.art').offset().top-WIN_H && scrollTop < $('.art').offset().top+WIN_H + $('.art').outerHeight()){
					$('#art-img-holder').css({
						left:($('.art').offset().top-WIN_H-scrollTop)/2
					})
				}
				if(scrollTop >= STORY_H-420){
					$('#begin-btn').css({
						background:'#c7d9e5',
					})
					$('#begin-btn:hover').css({
						background:'#fff'
					})
					$('.video').css({
						top:220
					})
				}else{
					$('.video').css({
						top:'100%'
					})
				}
			}
			function next(){
				if(currentProject < numProjects-1){
					changeProject(currentProject+1);
				}
			}
			function prev(){
				if(currentProject > 0){
					changeProject(currentProject-1);
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


























