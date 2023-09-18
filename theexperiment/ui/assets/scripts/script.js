var spiraling = false;
var rotation = 0;
$(function() {

  var WIN = $(window);
  var BODY = $("body");
  var sections = $('.js-section');
  var spiral = $('.js-spiral')

  var _winW;
  var _winH;
  var smallScreen;
  var landscape;
  var aspect = 1.618033;
  var axisX = .7237;
  var axisY = .2763;
  var spiralOrigin;
  var colorsArray = [];
  var bgColorsArray = [];
  var sectionCount = sections.length;
  var currentSection = 0;
  var currentSectionName;
  var touchStartY = 0;
  var touchStartX = 0;
  var moved = 0;
  var animRAF;
  var animating = false;
  var isTouchDevice;
  var showLineTimeout;
  var accessible = false;
  var bg_array = new Array([0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]);
  var color_array = new Array([255,255,255],[255,255,255],[255,255,255],[255,255,255],[255,255,255],[255,255,255],[255,255,255],[255,255,255],[255,255,255],[255,255,255]);
  sections.each(function(i){console.log($(this).css('backgroundColor'))})

  var mobileSafari;

  var standalone = window.navigator.standalone,
      userAgent = window.navigator.userAgent.toLowerCase(),
      safari = userAgent.indexOf('safari') != -1 && userAgent.indexOf('chrome') == -1,
      firefox = userAgent.indexOf('firefox') != -1 || userAgent.indexOf('mozilla') == -1,
      ios = /iphone|ipod|ipad/.test( userAgent ),
      linux = userAgent.indexOf('linux') != -1,
      windows = userAgent.indexOf('windows') != -1;


  if (firefox) {
    BODY.addClass('is-firefox');
  }
  if( ios ) {
      safari = true;
      if ( !standalone && safari ) {
          mobileSafari = true;

      } else if ( standalone && !safari ) {
          // STANDALONE

      } else if ( !standalone && !safari ) {
          // UIWEBVIEW

      };
  }

  setTimeout(function(){
    $('.js-overlay ').css({
      display: 'none'
    })
  },5000)

  WIN.on('touchstart',function(){
    isTouchDevice = true;
  })

  resizeHandler();

// EVENTS
/////////

  // UTIL EVENTS
  WIN.on('resize',resizeHandler);

  WIN.on('mousewheel', function(e) {
    if (!accessible) {
      var deltaY = e.deltaY;
      if (windows || linux) {
        deltaY = e.deltaY * 5;
      }
      moved = -deltaY || 0;
      rotation += moved/-10;
      rotation = trimRotation();
      if (!BODY.hasClass('is-gallery')) {
        e.preventDefault();
        startScrollTimeout()
        cancelAnimationFrame(animRAF);
        scrollHandler();
      }
    }
  });

  WIN.on('touchstart', function(e) {
    if (!accessible) {
      var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
      moved = 0;
      touchStartX = touch.pageX;
      touchStartY = touch.pageY;
      cancelAnimationFrame(animRAF);
    }
  })
  WIN.on('touchmove', function(e) {
    if (!accessible) {
      if (!BODY.hasClass('is-gallery')) {
        e.preventDefault()
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        moved = ((touchStartY - touch.pageY)+(touchStartX - touch.pageX)) * 3;
        touchStartX = touch.pageX;
        touchStartY = touch.pageY;
        rotation += moved/-10;
        rotation = trimRotation();
        startScrollTimeout();
        cancelAnimationFrame(animRAF);
        scrollHandler()
      }
    }
  });
  WIN.on('touchend', function(e) {
    if (!accessible) {
      animateScroll()
    }
  })
  WIN.on('scroll',function(e) {

  })
  WIN.on('mousemove',mousemoveHandler)

  WIN.on('keydown',function(e) {
    if (e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32) {
      cancelAnimationFrame(animRAF);
      animateScroll((currentSection + 1) * -90,rotation)
    } else if (e.keyCode === 37 || e.keyCode === 38) {
      cancelAnimationFrame(animRAF);
      animateScroll((currentSection - 1) * -90,rotation)
    } else if ($('.mc-field-group input[name="EMAIL"]').is(':focus')) {
      console.log('focus')
    }
    scrollHandler()
  })

  $('#canvas').on('click',function(){
    clearTimeout(showLineTimeout)
    animateScroll(0,rotation)
  })

  $('.js-skip').on('click',function(){
    if (!accessible) {
      accessible = "somewhat";
      BODY.addClass('is-more-accessible')
      $('.js-accessible').text('less')
    } else {
      accessible = false;
      $('.js-accessible').text('more')
      BODY.removeClass('is-more-accessible')
      resizeHandler()
    }
  })

  $('.js-scroll').on('click',function(e){
    animateScroll((currentSection + 1) * -90,rotation)
    e.stopPropagation()
  })
  sections.on('click',function() {
    cancelAnimationFrame(animRAF)
    animateScroll($(this).index() * -90,rotation);
  })

  $('.js-gallery-description-box').on('click',function(e) {
    e.stopPropagation()
  })

  $('.js-project-cta').on('click', function(e) {
    if ($(this).parent().parent().hasClass('active')) {
      e.stopPropagation()
      document.body.scrollTop = 0;
      BODY.addClass('is-gallery');
      $('.js-gallery-description').html($('.js-section.active .js-description').html())
      $('.js-gallery-title').html($('.js-section.active .js-section-title').html())
      moveCloseIcon(e);
      $('.js-gallery img').attr('src','')
      for (var i=1;i<=4;i++) {
        $('.js-gallery img').eq(i-1).attr('src','ui/assets/images/projects/' + currentSectionName + i + '.jpg')
      }
    }
  })
  var viewInterval;
  $('.js-project-cta').on('mouseenter',function(){
    var i = 0;
    var text = "Open";
    var viewText = $('.js-view-text', this)
    viewText.text('');
    clearInterval(viewInterval)
    viewInterval = setInterval(function(){
      if (i > text.length) {
        clearInterval(viewInterval)
      } else {
        viewText.text(viewText.text() + text.substr(i,1))
      }
      i++;
    },60)
  })
  $('.js-project-cta').on('mouseleave',function(){
    var i = 0;
    var text = "View";
    var viewText = $('.js-view-text', this)
    viewText.text('');
    clearInterval(viewInterval)
    viewInterval = setInterval(function(){
      if (i > text.length) {
        clearInterval(viewInterval)
      } else {
        viewText.text(viewText.text() + text.substr(i,1))
      }
      i++;
    },60)
  })
  $('.js-gallery').on('click', function() {
    BODY.removeClass('is-gallery');
  })
  $('.js-close-icon').on('click', function() {
    BODY.removeClass('is-gallery');
  })

// FUNCTIONS
////////////
  function animateScroll(targR,startR,speed) {
    if (!accessible) {
      var distance = startR - targR;
      var mySpeed = speed || .2;
      if (((targR || Math.abs(targR) === 0) && Math.abs(targR - rotation) > .1) || Math.abs(moved) > 1) {
        if (targR || Math.abs(targR) === 0) {
          rotation += mySpeed * (targR - rotation);
        } else {
          moved *= .98;
          rotation += moved/-10;
        }
        rotation = trimRotation();
        scrollHandler();
        animRAF = requestAnimationFrame(function(){
          animateScroll(targR,startR,speed)
        });
      } else if (targR || Math.abs(targR) === 0) {
        cancelAnimationFrame(animRAF)
        rotation = targR;
        rotation = trimRotation();
        scrollHandler();
      }
    }
  }
  function scrollHandler() {
    if (!accessible) {
      requestAnimationFrame(function(){
        var scale = Math.pow(aspect,rotation/90);
        currentSection = Math.min(21,Math.max(-16,Math.floor((rotation-30)/-90)));
          spiral.css({
            transform: 'rotate(' + rotation + 'deg) scale(' + scale + ')',
          })
          $('.js-dot').removeClass('op-100');
          $('.js-dot').eq(currentSection).addClass('op-100')
          var currentNum = currentSection + 1;
          if (currentNum < 1 || currentNum > 13) {
            currentNum = "LOST";
          }
          $('.js-current').text(currentNum);
          currentSectionName = sections.eq(currentSection).data('project')
          var normRot = Math.abs(rotation%90/90);
          var bgRot = Math.abs(Math.floor(rotation/-90))
          var r = Math.floor((bg_array[bgRot][0] * (1-normRot)) + (bg_array[bgRot + 1][0] * (normRot))) || '0';
          var g = Math.floor((bg_array[bgRot][1] * (1-normRot)) + (bg_array[bgRot + 1][1] * (normRot))) || '0';
          var b = Math.floor((bg_array[bgRot][2] * (1-normRot)) + (bg_array[bgRot + 1][2] * (normRot))) || '0';
          var bg = 'rgb(' + r +',' + g + ',' + b + ')'

          var colorRot = Math.abs(Math.floor(rotation/-90))
          var r = Math.floor((color_array[colorRot][0] * (1-normRot)) + (color_array[colorRot + 1][0] * (normRot))) || '255';
          var g = Math.floor((color_array[colorRot][1] * (1-normRot)) + (color_array[colorRot + 1][1] * (normRot))) || '255';
          var b = Math.floor((color_array[colorRot][2] * (1-normRot)) + (color_array[colorRot + 1][2] * (normRot))) || '255';
          var color = 'rgb(' + r +',' + g + ',' + b + ')'

          $('.js-section').css({
            backgroundColor: 'transparent'
          })
          BODY.css({
            backgroundColor: bg,
            color: color
          })
          $('.js-description').css({
            color: color
          })
          $('.js-close-bg').css({
            fill: color,
          })
          $('.js-arc').css({
            color: color,
          })
          $('.js-close-lines').css({
            fill: bg,
          })
          $('.js-eye-pupil').css({
            fill: bg
          })
          $('.js-eye-retina').css({
            fill: color
          })
          $('.js-eye-lid').css({
            fill: color
          })
          $('.js-section-title-word span').css({
            transitionDelay: 0,
            transition: 0
          })
          $('.js-gallery-image').css({
            background: color
          })
          $('.js-dots').css({
            color: color
          })
          $('.js-ask').css({
            color: bg,
            background: color
          })
          sections.css({
            color: color
          })
          $('.js-view-icon').css({
            background: color,
            color: bg
          })
          $('.js-view-icon svg rect').css({
            stroke: color
          })
          $('.js-view-icon svg line').css({
            stroke: color
          })
          $('.js-view-icon svg polyline').css({
            stroke: color
          })
          $('.js-nav').css({
            color: color
          })
          $('.js-nav svg path').css({
            fill: color
          })
          sections.removeClass('active')
          sections.eq(currentSection).addClass('active')
        $('.js-message').css({
          zIndex: 10
        })
        if (currentSection < 0) {
          spiraling = 'white';
        } else if (currentSection === sectionCount - 1 && smallScreen) {
          $('.js-message').css({
            zIndex: 500
          })
        } else if (currentSection > sectionCount - 1) {
          spiraling = 'black';
          spiral.css({
            pointerEvents: 'none'
          })
        } else {
          spiraling = false;
          spiral.css({
            pointerEvents: 'auto'
          })
        }
      })
    }
  }
  function trimRotation() {
    return Math.max(-1500, Math.min(1200, rotation))
  }
  function moveCloseIcon(e) {
    if (!smallScreen) {
      $('.js-close-icon').css({
        transform: 'translate3d(' + Math.floor(e.pageX - 24) + 'px,' + Math.min($('.js-gallery-description-box').offset().top - 30 - BODY.scrollTop(),Math.floor(e.pageY - BODY.scrollTop() - 24)) + 'px,0)',
        right: 'auto'
      })
    }
  }

  function mousemoveHandler(e) {
    if (!accessible) {
      if (BODY.hasClass('is-gallery') && !smallScreen) {
        moveCloseIcon(e);
      } else {
        var currentSectionEl = $('.js-section.active');
        var retina = $('.js-eye-retina', currentSectionEl)
        var pupil = $('.js-eye-pupil', currentSectionEl)
        var highlight = $('.js-eye-highlight', currentSectionEl)
        var lid = $('.js-eye-lid', currentSectionEl)
        if (retina.offset()) {
          retina.css({
            transform: 'translate3d(' + (1-e.pageX/retina.offset().left)*-6 + 'px,' + (1-e.pageY/retina.offset().top)*-6 + 'px,0)'
          })
          pupil.css({
            transform: 'translate3d(' + (1-e.pageX/retina.offset().left)*-7 + 'px,' + (1-e.pageY/retina.offset().top)*-7 + 'px,0)'
          })
          highlight.css({
            transform: 'translate3d(' + (1-e.pageX/retina.offset().left)*-2 + 'px,' + (1-e.pageY/retina.offset().top)*-2 + 'px,0)'
          })
          lid.css({
            transform: 'scaleY(' +  Math.abs(1+Math.max(0,(1-Math.abs(e.pageY/retina.offset().top))*.2)) + ')'
          })
        }
      }
    }
  }

  function resizeHandler () { // Set the size of images and preload them
    _winW = window.innerWidth;
    _winH = window.innerHeight;
    smallScreen = _winW < 960;
    landscape = _winH < _winW;
    if (!accessible) {
      buildSpiral()
    }
  }
  function buildSpiral() {
    spiralOrigin = Math.floor(_winW * axisX) + 'px ' + Math.floor(_winW * aspect * axisY) +'px';
    var sectionOrigin = Math.floor(_winW * axisX) + 'px ' + Math.floor(_winW * aspect * axisY) +'px';
    var w = _winW * .618033;
    var h = _winW * .618033;
    if (smallScreen && !landscape) {
      spiralOrigin = Math.floor(_winW * axisX) + 'px ' + Math.floor(_winW * aspect * axisX) + 'px';
      sectionOrigin = Math.floor(_winW * axisX) + 'px ' + Math.floor(_winW * aspect * axisX) + 'px';
      w = _winW;
      h = _winW;
    }
    var translate = '';
    if (safari || firefox) {
      translate = 'translate3d(0,0,0)'
      $('svg').css({
        transform: 'translate3d(0,0,0.0001px) scale(1)',
        backfaceVisiblity: 'hidden',
      })
      $('.js-view-icon').css({
        transform: 'translate3d(0,0,0)',
        backfaceVisiblity: 'hidden'
      })
    }
    spiral.css({
      transformOrigin: spiralOrigin,
      backfaceVisiblity: 'hidden'
    })
    $('.js-total').text(sectionCount)

    sections.each(function(i){
      if ($('.js-dot').length < sectionCount) {
        var dot = $('.js-dot').eq(0).clone()
        $('.js-dots').append(dot)
      }
      var myRot = Math.floor(90*i);
      var scale = Math.pow(aspect, i);
      $(this).css({
        width: w,
        height: h,
        transformOrigin: sectionOrigin,
        backfaceVisiblity: 'hidden',
        transform: 'rotate(' + myRot + 'deg) scale(' + Math.pow(aspect, i) + ') ' + translate
      })
      if (i > 0 && bgColorsArray.length < sectionCount) {
        var bg = $(this).css('backgroundColor')
        bg = bg.substr(0, bg.indexOf(')') + 1)
        var color = $(this).css('color')
        colorsArray.push(color);
        bgColorsArray.push(bg);
        $(this).css({
          backgroundColor: bgColorsArray[0],
          color: colorsArray[0]
        })
      }
    })
    scrollHandler();
    BODY.addClass('is-in')
  }

  function startScrollTimeout () {
    clearTimeout(showLineTimeout)
    if (currentSection > -1 && currentSection < sectionCount) {
      showLineTimeout = setTimeout(function(){
        cancelAnimationFrame(animRAF);
        animateScroll(currentSection * -90,rotation,.15);
      },200);
    }
  }

})
