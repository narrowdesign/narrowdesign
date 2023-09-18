/* Author: Nick Jones

*/
$(document).ready(function() { 
	var win = $(window);
	var doc = $(document);
	var maxH = 600;
	var startTime;
	var stopTime;
	var time1;
	var time2;
	var seconds;
	var stopped = true;
	var currentSet = 1;
	var events = {
		init: function(){
			$("#start1").bind('click',function (event) {
				if(currentSet < 3){
					startTimer();
				}else{
					window.location.reload();
				}
			});
			$("#stop1").bind('click',function (event) {
				stopTimer();
			});
			doc.bind('keypress',function(event){
				if ((event.which == 13 || event.which==32)&&stopped == false) {
					stopTimer();
				}
			});
			setImageH();
			win.bind('resize',function(){
				setImageH();
			});
		}
	}
	function setImageH () {
		maxH = win.height()-180;
		$('.sets').width(maxH);
		$('#stop1').css('top',maxH+80);
		if($('#set'+currentSet).css('opacity') > 0){
			$('#set'+currentSet).css('height',maxH);
			$('#set'+currentSet).css('width',maxH);
		}
	}
	function startTimer() {
		stopped = false;
		startTime = new Date();
		$('#set'+currentSet).css({'height':maxH+'px','opacity':'1'});
		$('#start1').hide();
		$('#start2').hide();
		$('#stop1').show();
		$('#resultMessage').hide();
		
	}
	function stopTimer () {
		stopped = true;
		stopTime = new Date();
		time = stopTime-startTime;
		$('#set'+currentSet).css({'height':'0px','opacity':'0'});
		$('#stop1').hide();
		$('#start1').show();
		$('#start2').show();
		$('#resultMessage').show();
		if(currentSet == 1){
			$("#start2").css({'background':'#ff0000','cursor':'pointer'});
			$("#start2").hover(function(){$(this).css('background','#000')},function(){
			      $(this).css('background-color', '#ff0000');
			   });
			$("#start2").bind('click',function (event) {
				startTimer();
			})
			$("#start1").css({'background':'#ccc','cursor':'auto'});
			$("#start1").unbind('click');
			$('#resultMessage').html('The 1st set took<br>'+Math.round(time/100)/10+' seconds<hr>');
		}else if(currentSet == 2){
			$('#resultMessage').html($('#resultMessage').html()+'The 2nd set took <br>'+Math.round(time/100)/10+' seconds');
			$("#start2").hide();
			$("#start1").css({'background':'#ff0000','cursor':'pointer'});
			$("#start1").hover(function(){$(this).css('background','#000')},function(){
			      $(this).css('background-color', '#ff0000');
			 });
			$('#start1').html('AGAIN!');
			$("#start1").bind('click',function (event) {
				window.location.reload();
			})
		}
		currentSet++;
	}
	events.init();
});


























