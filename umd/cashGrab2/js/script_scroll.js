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
	var currentProject = 0;

	var touchEnabled = Modernizr.touch;

	var transform3d = Modernizr.csstransforms3d;

	var touchStartX;
	var touchStartY;
	var moved;
	var frame = 0;

	var myDepth = new Array();
	var myRot = new Array();

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
				scrollHandler(Math.floor(moved/3));
				touchStartY = touch.pageY;
			})
			win.bind('touchstart',function(e){
				e.preventDefault();
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				touchStartY = touch.pageY;
			})	
			win.bind('click',function(e){
				//nextProject();
			});
			$('.number').click(function(){selectProject($(this).index())});
			createNav();
			function createNav(){}
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
				for(var i=0;i<=17;i++){
					myDepth[i] = -1000;
					myRot[i] = 60;
					$('.project').eq(i).css({
						top:i*600,
						// '-webkit-transform':'perspective(2000px) rotateY(-60deg)'
					})
				}
			}
			function nextProject () {
				$('#bg').css({
					'-webkit-filter': 'brightness(100%) contrast(300%)'
				})
			}
			function scrollHandler(deltaY){
				scrollAmount -= deltaY/600;
				scrollAmount = Math.min(Math.max(0,scrollAmount),1);
				oldProject = currentProject;
				currentProject = Math.round(scrollAmount*18);
				if(currentProject != oldProject){
					$('.number').eq(oldProject).css({
						color:'#4c4c4c',
						'box-shadow':'none'
					})
					$('.number').eq(currentProject).css({
						color:'#e6dbde',
						'box-shadow':'0px 20px 72px #000 inset'
					})
					$('.project').eq(oldProject-1).css({
						opacity:'0'
					})
					$('.project').eq(currentProject-1).css({
						opacity:'1'
					})
				}
				frame=frame+.1;
				frame = Math.max(frame,3);
				$('#logo').css({
					top:-(scrollAmount*WIN_H*.63)+(WIN_H*.7)
				})
				$('#mission').css({
					height:330-(scrollAmount*509)
				})
				$('#projects').css({
					'-webkit-transition-duration':"0s",
					top:800-scrollAmount*$('.project').eq(17).position().top
				})
				for(var i=0;i<=17;i++){
					$('#scrubber').css({
						left:(WIN_W/20)+(scrollAmount)*SCROLL_MAX
					})
					$('.project').eq(i).css({
						// '-webkit-transform':'perspective(2000px) rotateY(-'+myRot[i]+'deg)'
					})
					if($('#projects').position().top < -$('.project').eq(i).position().top+700){
						myRot[i] = myRot[i]+deltaY;
					}
					$('.project').eq(i).find($('.screen1')).css({
						'background-position':(892*Math.floor(frame))+'px'
					})
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
			function selectProject (num) {
				var targPos = $('.project').eq(num).position().top;
				scrollAmount = targPos/$('.project').eq(17).position().top;
				$('#projects').css({
					'-webkit-transition-duration':"1s",
					top:-targPos
				})
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


























