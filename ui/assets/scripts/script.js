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
  var aspect = .618033;
  var axis = .7237;
  var spiralOrigin;
  var colorsArray = [];
  var bgColorsArray = [];
  var sectionCount = sections.length;
  var currentSection = 0;
  var currentSectionName;
  var touchStartY = 0;
  var touchStartX = 0;
  var mouseX = window.innerWidth / 2
  var mouseY = window.innerHeight / 2
  var moved = 0;
  var prevMoved = 0;
  var animRAF;
  var animating = false;
  var isTouchDevice;
  var showLineTimeout;
  var accessible = false;

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
      rotation += Math.max(-10, Math.min(10, moved / -6));
      rotation = trimRotation();
      if (!BODY.hasClass('is-gallery')) {
        e.preventDefault();
        startScrollTimeout()
        cancelAnimationFrame(animRAF);
        scrollHandler();
      } else {
        moveCloseIcon();
      }
    }
  });

  WIN.on('touchstart', function(e) {
    if (!accessible) {
      var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
      moved = 0;
      prevMoved = 0;
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
        prevMoved = moved;
        moved = ((touchStartY - touch.pageY) + ((touchStartX - touch.pageX) / 2)) * 5;
        touchStartX = touch.pageX;
        touchStartY = touch.pageY;
        rotation += moved / -10;
        rotation = trimRotation();
        startScrollTimeout();
        cancelAnimationFrame(animRAF);
        scrollHandler()
      }
    }
  });
  WIN.on('touchend', function(e) {
    if (!accessible) {
      if (prevMoved > 15) {
        animateScroll((currentSection + 1) * -90, rotation)
      } else if (prevMoved < -15) {
        animateScroll((currentSection - 1) * -90, rotation)
      }
    }
  })
  WIN.on('scroll',function(e) {

  })
  WIN.on('mousemove',mousemoveHandler)

  WIN.on('keydown',function(e) {
    if (e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32) {
      cancelAnimationFrame(animRAF);
      animateScroll((currentSection + 1) * -90, rotation)
    } else if (e.keyCode === 37 || e.keyCode === 38) {
      cancelAnimationFrame(animRAF);
      animateScroll((currentSection - 1) * -90, rotation)
    } else {
      $('.js-arc').css({
        display: 'block'
      })
    }
    scrollHandler()
  })
  WIN.on('keyup',function(e){
    $('.js-arc').css({
      display: 'none'
    })
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
      moveCloseIcon();
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
  function animateScroll(targR, startR, speed) {
    if (!accessible) {
      var distance = startR - targR;
      var mySpeed = speed || .2;
      if (((targR || Math.abs(targR) === 0) && Math.abs(targR - rotation) > .1) || (Math.abs(moved) > 1 && Math.abs(targR - rotation) > .1)) {
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
      } else {

      }
    }
  }
  function scrollHandler() {
    if (!accessible) {
      var scale = Math.pow(aspect,rotation/90);
      currentSection = Math.min(21,Math.max(-16,Math.floor((rotation-30)/-90)));
      if (currentSection < 20 && currentSection > -15) {
        $('body').addClass('is-false')
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
        var bg = bgColorsArray[currentSection-1]
        var color = colorsArray[currentSection-1]
        BODY.css({
          backgroundColor: color,
          color: bg,
        })
        $('.js-close-bg').css({
          fill: color,
        })
        $('.js-arc').css({
          backgroundColor: color,
        })
        $('.js-close-lines').css({
          fill: bg,
        })
        $('.js-eye-pupil').css({
          fill: bg,
        })
        $('.js-eye-retina').css({
          fill: color,
        })
        $('.js-eye-lid').css({
          fill: color,
        })
        $('.js-section-title-word span').css({
          transitionDelay: 0,
          transition: 0
        })
        $('.js-gallery-image').css({
          background: color,
        })
        $('.js-dots').css({
          color: color,
        })
        $('.js-ask').css({
          color: bg,
          background: color,
        })
        sections.css({
          color: color,
        })
        $('.js-view-icon').css({
          background: color,
          color: bg,
        })
        $('.js-view-icon svg rect').css({
          stroke: bg,
        })
        $('.js-view-icon svg line').css({
          stroke: bg,
        })
        $('.js-view-icon svg polyline').css({
          stroke: bg,
        })
        $('.js-nav').css({
          color: color,
        })
        $('.js-nav svg path').css({
          fill: color,
        })
        for (var i=0;i<sectionCount;i++) {
          if (i - currentSection < -1) {
            sections.eq(i).css({
              display: 'none'
            })
          } else {
            sections.eq(i).css({
              display: 'block'
            })
          }
          sections.eq(i).css({
            background: bg,
            // transitionDelay: (i-currentSection)/20 + 's'
          })
        }
        sections.removeClass('active')
        sections.eq(currentSection).addClass('active')
      }
      $('.js-message').css({
        zIndex: 10
      })
      if (currentSection > 1) {
        $('.js-hello')[0].innerText = "Goodbye.";
      } else {
        $('.js-hello')[0].innerText = "Hello.";
      }
      if (currentSection < 0) {
        spiraling = 'white';
        $('body').addClass('is-spiraling');
      } else if (currentSection === sectionCount - 1 && smallScreen) {
        $('.js-message').css({
          zIndex: 500
        })
        $('body').addClass('is-spiraling')
      } else if (currentSection > sectionCount - 1) {
        spiraling = 'black';
        spiral.css({
          pointerEvents: 'none'
        })
        $('body').addClass('is-spiraling')
      } else {
        $('body').removeClass('is-spiraling')
        spiraling = false;
        spiral.css({
          pointerEvents: 'auto'
        })
      }
    }
  }
  function trimRotation() {
    return Math.max(-1000, Math.min(1000, rotation))
  }
  function moveCloseIcon() {
    if (!smallScreen) {
      $('.js-close-icon').css({
        transform: 'translate3d(' + Math.floor(mouseX - 24) + 'px,' + Math.min($('.js-gallery-description-box').offset().top - 30 - window.scrollY,Math.floor(mouseY - 24)) + 'px,0)',
        right: 'auto'
      })
    }
  }

  function mousemoveHandler(e) {
    mouseX = e.pageX
    mouseY = e.pageY - window.scrollY
    if (!accessible) {
      if (BODY.hasClass('is-gallery') && !smallScreen) {
        moveCloseIcon();
      } else {
        var currentSectionEl = $('.js-section.active');
        var retina = $('.js-eye-retina', currentSectionEl)
        var pupil = $('.js-eye-pupil', currentSectionEl)
        var highlight = $('.js-eye-highlight', currentSectionEl)
        var lid = $('.js-eye-lid', currentSectionEl)
        if (retina.offset()) {
          retina.css({
            transform: 'translate3d(' + (1-mouseX/retina.offset().left)*-6 + 'px,' + (1-mouseY/retina.offset().top)*-6 + 'px,0)'
          })
          pupil.css({
            transform: 'translate3d(' + (1-mouseX/retina.offset().left)*-7 + 'px,' + (1-mouseY/retina.offset().top)*-7 + 'px,0)'
          })
          highlight.css({
            transform: 'translate3d(' + (1-mouseX/retina.offset().left)*-2 + 'px,' + (1-mouseY/retina.offset().top)*-2 + 'px,0)'
          })
          lid.css({
            transform: 'scaleY(' +  Math.abs(1+Math.max(0,(1-Math.abs(mouseY/retina.offset().top))*.2)) + ')'
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
    spiralOrigin = Math.floor(_winW * axis) + 'px ' + Math.floor(_winW * aspect * axis) +'px';
    var sectionOrigin = Math.floor(_winW * axis) + 'px ' + Math.floor(_winW * aspect * axis) +'px';
    var w = _winW * aspect;
    var h = _winW * aspect;
    if (smallScreen && !landscape) {
      spiralOrigin = Math.floor((_winW/aspect) * aspect * (1 - axis)) +'px ' + Math.floor((_winW/aspect) * axis) + 'px ';
      sectionOrigin = Math.floor((_winW/aspect) * aspect * (1 - axis)) +'px ' + Math.floor((_winW/aspect) * axis) + 'px ';
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
    $('.js-overlay-line').css({
      transition: '2s ease',
      strokeDashoffset: 0
    })
    setTimeout(function(){
      BODY.addClass('is-in')
    },1000)

  }

  function startScrollTimeout () {
    clearTimeout(showLineTimeout)
    if (currentSection > -1 && currentSection < sectionCount) {
      showLineTimeout = setTimeout(function(){
        cancelAnimationFrame(animRAF);
        animateScroll(currentSection * -90, rotation, .15);
      }, 200);
    }
  }
})
