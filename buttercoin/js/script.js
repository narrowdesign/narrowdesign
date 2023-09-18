/* Author: Nick Jones

*/
$(document).ready(function() {
	var win = $(window);
	var doc = $(document);
	var initialized = false;

	var WIN_H;
	var WIN_W;

	var numPanels = $('.panel').length;
	
	var scrollAmount = 0;
	var currentPanelNum = 0;
	var currentPanel = $('.panel').eq(currentPanelNum);
	var newTop;
	var currentIcon = 0;

	var easeInterval;
	var inertia = .92;

	var touchEnabled = Modernizr.touch;
	var transform3d = Modernizr.csstransforms3d;

	var touchStartX;
	var touchStartY;
	var moved;

	var events = {
		init: function(){
			pageResize();
			win.bind('resize', pageResize);
			win.bind('keydown',keyHandler);

			win.bind('mousewheel', function(eventData,deltaY) {
				stopEasing();
				scrollHandler(deltaY);
				eventData.preventDefault();
			});
			win.bind('scroll',function(e){
				e.preventDefault();
			});
			win.bind('touchmove',function(e){
				e.preventDefault();
				stopEasing();
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				moved = touch.pageY-touchStartY;
				scrollHandler(moved/10);
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
			$('nav .button').click(function(){
				changePanel($(this).index());
			})
			$('.next').click(function(){
				changePanel(currentPanelNum+1)
			})
			buildPanels();
			setInterval(nextIcon,2000);
			function nextIcon () {
				if(currentIcon < 3){
					currentIcon++;
				}else{
					currentIcon = 0;
				}
				$('#main-icons .icon').css({
					top:currentIcon*-$('.icon').outerHeight()
				})
			}
			function pageResize (e) {
				WIN_H = win.height();
				WIN_W = win.width();
				if(win.width() < 768){
					smallScreen = true;
				}else{
					smallScreen = false;
				}
				initialized = true;
				scrollHandler(0);			
			}
			function changePanel (panelNum) {
				for(var i=0;i<numPanels;i++){
					var targY
					if(i <= panelNum){
						targY = 0;
					}else{
						targY = WIN_H
					}
					if(i<=currentPanelNum){
						delay = currentPanelNum-i;
					}else{
						delay = i;
					}
					if(transform3d){
						$('.panel').eq(i).css({
							'-webkit-transition-duration':'1s',
							'-webkit-transition-delay':'.'+delay+'s',
							'-webkit-transform':'perspective(3800px) translate3d(0,'+targY+'px,0px)',
							'-webkit-transform-origin':'100px 0',
							'-webkit-transform-style': 'preserve-3d',
							'-moz-transition-duration':'1s',
							'-moz-transition-delay':'.'+delay+'s',
							'-moz-transform':'perspective(3800px) translate3d(0,'+targY+'px,0px)',
							'-moz-transform-origin':'100px 0',
							'-moz-transform-style': 'preserve-3d',
							'transition-duration':'1s',
							'transition-delay':'.'+delay+'s',
							'transform':'perspective(3800px) translate3d(0,'+targY+'px,0px)',
							'transform-origin':'100px 0',
							'transform-style': 'preserve-3d'
						})
					}else{
						$('.panel').eq(i).css({
							'-webkit-transition-duration':'1s',
							'-webkit-transition-delay':'.'+delay+'s',
							'-moz-transition-duration':'1s',
							'-moz-transition-delay':'.'+delay+'s',
							'transition-duration':'1s',
							'transition-delay':'.'+delay+'s',
							top:targY
						})
					}
					newTop = 0;
				}
				currentPanelNum = panelNum;
				highlightNav();
				currentPanel = $('.panel').eq(panelNum);				
			}
			function highlightNav () {
				for(var i=0;i<numPanels;i++){
					$('nav .button').eq(i).removeClass('active')
				}
				$('nav .button').eq(currentPanelNum).addClass('active')
			}
			function throwScroll () {
				if(Math.abs(moved) > 1){
					easeInterval = setInterval(function(){
						moved = moved*inertia;
						if(Math.abs(moved) < 1){
							stopEasing();
						}
						scrollHandler(moved*.2);
					},10);
				}
			}
			function stopEasing(){
				moved = 0;
				clearInterval(easeInterval);
			}
			function scrollHandler(deltaY){
				scrollAmount -= deltaY/40;
				scrollAmount = Math.min(1.2,Math.max(0,scrollAmount));
				console.log(scrollAmount)
				newTop = WIN_H-(scrollAmount*WIN_H);
				currentPanel = $('.panel').eq(currentPanelNum);
				if(newTop < 0){
					if(currentPanelNum < 4){
						nextPanel();	
					}else{
						newTop = 0
					}
					
				}else if(newTop >= WIN_H){
					if(transform3d){
						currentPanel.css({
							'-webkit-transition-duration':'0',
							'-webkit-transition-delay':'0',
							'-webkit-transform':'perspective(3800px) translate3d(0,'+WIN_H+'px,0px)',
							'-webkit-transform-origin':'100px 0',
							'-webkit-transform-style': 'preserve-3d',
							'-moz-transition-duration':'0s',
							'-moz-transition-delay':'0s',
							'-moz-transform':'perspective(3800px) translate3d(0,'+WIN_H+'px,0px)',
							'-moz-transform-origin':'100px 0',
							'-moz-transform-style': 'preserve-3d',
							'transition-duration':'0s',
							'transition-delay':'0s',
							'transform':'perspective(3800px) translate3d(0,'+WIN_H+'px,0px)',
							'transform-origin':'100px 0',
							'transform-style': 'preserve-3d'
						})
					}else{
						currentPanel.css({
							'-webkit-transition-duration':'0',
							'-webkit-transition-delay':'0',
							'-moz-transition-duration':'0s',
							'-moz-transition-delay':'0s',
							'transition-duration':'0s',
							'transition-delay':'0s',
							top:WIN_H
						})
					}
					scrollAmount = 1;
					newTop = WIN_H-(scrollAmount*WIN_H);
					if(currentPanelNum >= 1){
						currentPanelNum--;
						highlightNav();
						currentPanel = $('.panel').eq(currentPanelNum);
					}
				}
				if(currentPanelNum == 0){
					newTop = 0;
				}
				if(transform3d){
					currentPanel.css({
						'-webkit-transition-duration':'0',
						'-webkit-transition-delay':'0',
						'-webkit-transform':'perspective(3800px) translate3d(0,'+newTop+'px,0px)',
						'-webkit-transform-origin':'100px 0',
						'-webkit-transform-style': 'preserve-3d',
						'-moz-transition-duration':'0s',
						'-moz-transition-delay':'0s',
						'-moz-transform':'perspective(3800px) translate3d(0,'+newTop+'px,0px)',
						'-moz-transform-origin':'100px 0',
						'-moz-transform-style': 'preserve-3d',
						'transition-duration':'0s',
						'transition-delay':'0s',
						'transform':'perspective(3800px) translate3d(0,'+newTop+'px,0px)',
						'transform-origin':'100px 0',
						'transform-style': 'preserve-3d'
					})
				}else{
					currentPanel.css({
						'-webkit-transition-duration':'0',
						'-webkit-transition-delay':'0',
						'-webkit-transition-duration':'0',
						'-moz-transition-delay':'0s',
						'-moz-transition-duration':'0s',
						'-moz-transition-delay':'0s',
						'transition-delay':'0s',
						'transition-duration':'0s',
						'transition-delay':'0s',			
						top:newTop
					})
				}
			}
			function nextPanel(){
				scrollAmount = 0;
				newTop = WIN_H-(scrollAmount*WIN_H);
				if(currentPanelNum < 5){
					currentPanelNum++;
					highlightNav();
				}
				if(transform3d){
					currentPanel.css({
						'-webkit-transform':'perspective(3800px) translate3d(0,'+0+'px,0px)',
						'-webkit-transform-origin':'100px 0',
						'-webkit-transform-style': 'preserve-3d',
						'-moz-transform':'perspective(3800px) translate3d(0,'+0+'px,0px)',
						'-moz-transform-origin':'100px 0',
						'-moz-transform-style': 'preserve-3d',
						'transform':'perspective(3800px) translate3d(0,'+0+'px,0px)',
						'transform-origin':'100px 0',
						'transform-style': 'preserve-3d'
					})
				}else{
					currentPanel.css({
						top:0
					});
				}
				currentPanel = $('.panel').eq(currentPanelNum);
			}
			function next(){
				if(currentPanel < numPanels-1){
					changePanel(currentPanel+1);
				}
			}
			function prev(){
				if(currentPanel > 0){
					changePanel(currentPanel-1);
				}
			}			
			function keyHandler (argument) {
				if(argument.keyCode==38 || argument.keyCode==37){
					if(currentPanelNum != 0){
						changePanel(currentPanelNum-1)
					}
				}else if(argument.keyCode==40 || argument.keyCode==39){
					if(currentPanelNum < numPanels-1){
						changePanel(currentPanelNum+1)
					}
				}else{
					return;
				}
			}
// PANELS
			function buildPanels () {
				for(var i=1;i<$('.panel').length;i++){
					if(transform3d){
						$('.panel').eq(i).css({
							'-webkit-transform':'perspective(3800px) translate3d(0px,'+WIN_H+'px,0px)',
							'-webkit-transform-origin':'100px 0',
							'-webkit-transform-style': 'preserve-3d',
							'-moz-transform':'perspective(3800px) translate3d(0px,'+WIN_H+'px,0px)',
							'-moz-transform-origin':'100px 0',
							'-moz-transform-style': 'preserve-3d',
							'transform':'perspective(3800px) translate3d(0px,'+WIN_H+'px,0px)',
							'transform-origin':'100px 0',
							'transform-style': 'preserve-3d'
						});
					}else{
						$('.panel').eq(i).css({
							top:WIN_H
						});
					}
				}
				if(transform3d){
					$('.panel').eq(0).css({
						'-webkit-transform':'perspective(3800px) translate3d(0px,0px,0px)',
						'-webkit-transform-origin':'100px 0',
						'-webkit-transform-style': 'preserve-3d',
						'-moz-transform':'perspective(3800px) translate3d(0px,0px,0px)',
						'-moz-transform-origin':'100px 0',
						'-moz-transform-style': 'preserve-3d',
						'transform':'perspective(3800px) translate3d(0px,0px,0px)',
						'transform-origin':'100px 0',
						'transform-style': 'preserve-3d'
					});
				}else{
					$('.panel').eq(0).css({
						top:0
					});
				}
			}
		}
	};
	events.init();
});


























