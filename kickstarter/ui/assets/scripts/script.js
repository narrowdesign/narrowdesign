
$(function() {

  var WIN = $(window);

  var _winW;
  var _winH;
  var smallScreen;

  var frame = 0;
  var currentSection = 0;
  var touchStartY = 0;
  var touchStartX = 0;
  var moved = 0;
  var animRAF;
  var animating = false;
  var scrollTimeout;
  var path_array = [2665, 1011, 627, 437, 414, 1393, 2075]
  var top_array = []
  var ratio = 0;

  var userAgent = window.navigator.userAgent.toLowerCase(),
      firefox = userAgent.indexOf('firefox') != -1 || userAgent.indexOf('mozilla') == -1,
      ios = /iphone|ipod|ipad/.test( userAgent ),
      safari = (userAgent.indexOf('safari') != -1 && userAgent.indexOf('chrome') == -1) || ios,
      linux = userAgent.indexOf('linux') != -1,
      windows = userAgent.indexOf('windows') != -1;

  resizeHandler();

// EVENTS
/////////

  WIN.on('resize',resizeHandler);
  WIN.on('click',function(){
    $('.click span').css({
      opacity: 0
    })
  })
  WIN.on('scroll',function(e){
    e.preventDefault();
  })

  WIN.on('wheel', function(e) {
    var deltaY = -e.originalEvent.deltaY;
    if (windows || linux) {
      deltaY = e.deltaY * 5;
    }
    moved = -deltaY || 0;
    frame += moved/-7.5;
    e.preventDefault();
    scrollHandler();
  });

  setTimeout

  WIN.on('touchstart', function(e) {
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    moved = 0;
    touchStartX = touch.pageX;
    touchStartY = touch.pageY;
  })
  WIN.on('touchmove', function(e) {
    e.preventDefault()
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    moved = ((touchStartY - touch.pageY)+(touchStartX - touch.pageX)) * 3;
    touchStartX = touch.pageX;
    touchStartY = touch.pageY;
    frame += moved/-10;
    scrollHandler()
  });
  WIN.on('touchend', function(e) {

  })


// FUNCTIONS
////////////
  function scrollHandler() {
    $('.click').css({
      opacity: 0
    });
    console.log(audio);
    audio.play();
    $('.blink').removeClass('blink')
    requestAnimationFrame(function(){
      var frameOffset = 0;
      var scriptTop = Math.max(-$('.js-script').innerHeight() - _winH + 220,frame/4)
      $('.js-script').css({
        transform: 'translate3d(0,'+ scriptTop +'px,0)'
      })
      $('.js-script span').eq(Math.floor(-frame/450)).css({
        transitionDuration: '1s',
        opacity: 1,
        filter: 'blur(0)'
      })
      for (var i=0;i<currentSection;i++) {
        frameOffset += path_array[i];
      }
      var offset = Math.max(0,path_array[currentSection] + (frame+frameOffset));
      $('.path').eq(currentSection).css({
        strokeDashoffset: offset + "px"
      })
      if (frame < -2000 && currentSection == 0) {
        $('.js-funded').css({transition: '2s', opacity: 1})
        $('.we').css({
          opacity: .9,
          transitionDuration: '1s'
        })
      } else {
        $('.we').css({
          opacity: 0,
          transitionDuration: '.3s'
        })
      }
      if (frame < -3900 && currentSection == 2) {
        $('.dancer').css({
          opacity: .8,
          transitionDuration: '1s'
        })
      } else {
        $('.dancer').css({
          opacity: 0,
          transitionDuration: '.3s'
        })
      }

      if (frame < -8800 && currentSection == 6) {
        $('.vm').css({
          opacity: 1,
          transitionDuration: '1s'
        })
      } else {
        $('.vm').css({
          opacity: 0,
          transitionDuration: '.3s'
        })
      }

      $('svg').css({
        transform: 'translate3d(0,-' + top_array[currentSection] + 'px,0)'
      })

      if (frame < -11000) {
        $('.vm').css({
          opacity: 0,
          transitionDuration: '.3s'
        })
        $('svg').css({
          opacity: 0,
          transform: 'translate3d(0,-' + Math.floor(2600*ratio) + 'px,0)'
        })
      }
      if (parseInt($('.path').eq(5).css('strokeDashoffset'), 10) === 0) {
        currentSection = 6;
      } else if (parseInt($('.path').eq(4).css('strokeDashoffset'), 10) === 0) {
        currentSection = 5;
      } else if (parseInt($('.path').eq(3).css('strokeDashoffset'), 10) === 0) {
        currentSection = 4;
      } else if (parseInt($('.path').eq(2).css('strokeDashoffset'), 10) === 0) {
        currentSection = 3;
      } else if (parseInt($('.path').eq(1).css('strokeDashoffset'), 10) === 0) {
        currentSection = 2;
      } else if (parseInt($('.path').eq(0).css('strokeDashoffset'), 10) === 0) {
        currentSection = 1;
      } else {
        currentSection = 0;
      }

      if (parseInt($('.path').eq(6).css('strokeDashoffset'), 10) > path_array[6]) {
        $('.path').eq(6).css({
          'strokeDashoffset': path_array[6]
        })
        currentSection = 5
      }
      if (parseInt($('.path').eq(5).css('strokeDashoffset'), 10) > path_array[5]) {
        $('.path').eq(5).css({
          'strokeDashoffset': path_array[5]
        })
        currentSection = 4
      }
      if (parseInt($('.path').eq(4).css('strokeDashoffset'), 10) > path_array[4]) {
        $('.path').eq(4).css({
          'strokeDashoffset': path_array[4]
        })
        currentSection = 3
      }
      if (parseInt($('.path').eq(3).css('strokeDashoffset'), 10) > path_array[3]) {
        $('.path').eq(3).css({
          'strokeDashoffset': path_array[3]
        })
        currentSection = 2
      }
      if (parseInt($('.path').eq(2).css('strokeDashoffset'), 10) > path_array[2]) {
        $('.path').eq(2).css({
          'strokeDashoffset': path_array[2]
        })
        currentSection = 1
      }
      if (parseInt($('.path').eq(1).css('strokeDashoffset'), 10) > path_array[1]) {
        $('.path').eq(1).css({
          'strokeDashoffset': path_array[1]
        })
        currentSection = 0
      }


      $('.image').each(function(i){
        var image = $('.image').eq(i);
        image.removeClass('current')
        image.removeClass('out')
        if (i === currentSection) {
          image.addClass('current')
        } else if (i < currentSection) {
          image.addClass('out')
        }
      })
      var scale = 1.2 + frame/50000
      $('.container').css({
        transform: 'scale(' + scale +')'
      })
    })
  }

  function resizeHandler () { // Set the size of images and preload them
    _winW = window.innerWidth;
    _winH = window.innerHeight;
    smallScreen = _winW < 960;
    ratio = (_winW/1600);
    top_array = [0,Math.floor(2000*ratio),Math.floor(2000*ratio),Math.floor(2600*ratio),Math.floor(2600*ratio),Math.floor(2600*ratio),Math.floor(2600*ratio)]
  }
  var m_array = []
  $('.path').each(function(i) {
    m_array.push($(this).get(0).getTotalLength())
    console.log(m_array)
    $(this).css({
      'stroke-dasharray': path_array[i],
      'stroke-dashoffset': path_array[i]
    })
  });

  var audio = new Audio('ui/assets/audio/eden.m4a');
})


