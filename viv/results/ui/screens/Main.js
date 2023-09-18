var swipeTimeout;
var throwInterval;

var _winW = window.innerWidth;
var _winH = window.innerHeight;

var touchStart = 0;
var touchNew = 0;

var moved = 0;
var moved = 0;

var currentPos = 0;

var current_result = 0;
var old_result = 0;

var swiping = false;

var is_vertical = true;

var duration = '.3s';

///**************************************************///
// INITIALIZE

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function(e) {
    FastClick.attach(document.body);
  });
  false;
}

$(function() {

  _winW = window.innerWidth
  _winH = window.innerHeight

  resizeHandler();

// RESET EVENTS
  $('body').on('touchmove',function(e){
    e.preventDefault()
  })

  $('body').on('touchstart',function(e){
    e.preventDefault()
  })

// DEMO EVENTS

  $('.toggle').on('click',function(e){
    is_vertical = !is_vertical;
    $('.app').toggleClass('is-vertical')
    // if(is_vertical){
    //   $('.result-set').eq(1).addClass('current')
    // }
    current_result = 0;
    setClasses();
    $('.results').css({
      '-webkit-transform': 'translate3d(0,0,0)'
    })
    resizeHandler();
  })

// RESULTS EVENTS

  $('.result-set').on('touchstart',function(e) {
    $(this).addClass('touched')
  })

  $('.results').on('touchstart', function(e){
    var firstMove = true;
    
    swiping = true;
    clearTimeout(swipeTimeout)
    swipeTimeout = setTimeout(function(){swiping = false},400);

    // AMOUNT SCROLLED

    var me = $(this);

    if(!is_vertical){
      touchStart = e.originalEvent.touches[0].clientX;
      current_pos = parseInt($(this).css('transform').split(',')[4]); 
    }else{
      touchStart = e.originalEvent.touches[0].clientY;
      current_pos = parseInt($(this).css('transform').split(',')[5]);
    }

    $(window).on('touchmove',function(ev){
      console.log('moving')
      if(!is_vertical){
        touchNew = ev.originalEvent.touches[0].clientX;
      }else{
        touchNew = ev.originalEvent.touches[0].clientY;
      }

      moved = touchNew-touchStart;
      
      // SWIPE
      if(current_result == 0){
        if(moved > 0){
          $('.count').eq(0).addClass('on')  
        }else{
          $('.count').eq(0).removeClass('on')  
        }
      }else if(current_result == $('.result-set').length-1){
        if(moved < 0){
          $('.count').eq(1).addClass('on')  
        }else{
          $('.count').eq(1).removeClass('on')  
        }
      }
      var targPos;
      if(!is_vertical){
        targPos = (current_pos+moved) +'px,0,0'
      }else{
        targPos = '0,' + (current_pos+moved) +'px,0'
      }
      console.log(targPos)
      me.css({
        '-webkit-transition-duration': '0s',
        '-webkit-transform': 'translate3d('+ targPos + ')'
      })
    })
  })

  $('.results').on('touchend', function(e){

    $('.count').removeClass('on')
    $('.result-set').removeClass('touched')
    var targPos // target X or Y position

    if(Math.abs(moved) > _winSize/2 || swiping){
      if(touchStart > touchNew){
        current_result++;
        current_result = Math.min($('.result-set').length-1,current_result)
      }else{
        current_result--;
        current_result = Math.max(0,current_result)
      }
      
      setClasses();
    }
    if(!is_vertical){
      targPos = Math.min(0,-(getPanelSize())) +'px,0,0'
    }else{
      targPos = '0,' + Math.min(0,-(getPanelSize())) +'px,0'
    }
    
    if(current_result != old_result){
      duration = '.4s'
    }else{
      duration = '.7s'
    }
    $(this).css({
      '-webkit-transform': 'translate3d('+targPos+')',
      '-webkit-transition-duration': duration
    })
    old_result = current_result;
    $(window).unbind('touchmove')
  })

  // function thrown (speed) {
  //   throwInterval = setInterval(function(){

  //   })
  // }

  function setClasses () {
    $('.result-set').removeClass('current')
    $('.result-set').removeClass('before');
    $('.result-set').removeClass('after');
    $('.result-set').removeClass('next');
    $('.result-set').removeClass('previous');
    for(var i=0;i<$('.result-set').length;i++){
      if(i<current_result){
        $('.result-set').eq(i).addClass('before');
        if(i==current_result-1){
          $('.result-set').eq(i).addClass('previous');
        }
      }else if(i==current_result){
        $('.result-set').eq(i).addClass('current');
      }else{
        $('.result-set').eq(i).addClass('after');
        if(i==current_result+1){
          $('.result-set').eq(i).addClass('next');
        }
      }
    }
    // $('.result-set').eq(current_result-1).addClass('previous');
    // $('.result-set').eq(current_result+1).addClass('next');
  }
  function getPanelSize () {
    if(!is_vertical){
      return current_result*_winW*.88;
    }else{
      if($('.app').hasClass('is-single')){
        return current_result*_winH*.5;
      }else{
        return current_result*_winH*.7;
      }
    }
  }

  function resizeHandler (e) {
    _winW = $(window).width();
    _winH = $(window).height();
    if(!is_vertical){
      _winSize = _winW
    }else{
      _winSize = _winH
    }
  }
})