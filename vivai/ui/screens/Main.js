var touchTimeout;
var isListening;
var isResults;

var _winW = window.innerWidth;
var _winH = window.innerHeight;

var youInterval;
var vivInterval;
var youTimeout;
var vivTimeout;

var lastText = '';

var touchStartX = 0;
var touchNewX = 0;

var youFrame = 0;
var vivFrame = 0;

///**************************************************///
// INITIALIZE

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function(e) {
    FastClick.attach(document.body);
  });
  false;
}

///************************************///
// GLOBAL EVENTS



$(function() {

// DIALOGUE

  var youWords = [];
  var vivWords = [];

  // touch and hold
  vivWords.push("Uber will arrive in 5min to take you to work."); // 0
  vivWords.push("Yes?"); // 1

  youWords.push("I’d like to take Corly out this weekend."); // 0
  // touch end

  vivWords.push("Pulling some ideas for you and Corly to do this weekend."); // 2
  // show brands quickly
  // collapse brands
  vivWords.push("“Out” to a film? Maybe a concert?"); // 3
  // show 2 results

  // swipe to see more
  vivWords.push("“Out” to a movie? Maybe wine tasting?"); // 4
  // show 2 more results
  
  // touch and hold
  youWords.push("No, dinner. And she’s vegetarian."); // 1
  // touch end

  vivWords.push("Friday looks like a great evening for dinner outside. How about Panciuto?"); // 5

  // touch and hold
  youWords.push("Friday outside sounds nice. But save Panciuto for August fourth. It’s our anniversary."); // 2
  // touch end

  vivWords.push("Noted. How about Rue Cler?"); // 6

  // touch and hold
  youWords.push("Let’s do someplace less fancy."); // 3
  // touch end

  vivWords.push("Juju? It has good reviews on vegetarian dishes and a patio."); // 7

  // touch and hold
  youWords.push("Perfect."); // 4
  // touch end

  // PAYMENT FLOW
  vivWords.push("Confirmed through OpenTable. It’s on your calendar."); // 8

  // LANDING MESSAGE
  
  playViv();
  resizeHandler();

  _winW = window.innerWidth
  _winH = window.innerHeight


// GENERAL EVENTS

  $('.viv-icon').on('click', function(e){
    window.location.reload();
  })
  
  $('.avatar').on('click', function(e){
    window.location.reload();
  })

  $('body').on('touchmove',function(e){
    e.preventDefault()
  })

  $('body').on('touchstart',function(e){
    e.preventDefault()
  })

  $('.brands').on('touchstart',function(e){
    e.stopPropagation();
  })
  $('.brands').on('touchmove',function(e){
    e.stopPropagation();
  })


// TYPING EVENTS

  $('.you-area').on('click', function(e){
    if(!$('.app').hasClass('is-typing')){
      stopListening();

      $('.you-text').focus();
      lastText = $('.you-text').html();
      $('.you-text').html('Coming Soon X');
      $('.app').addClass('is-typing');
    }else{
      $('.you-text').html(lastText);
      $('.app').removeClass('is-typing');
    }
  })




// LISTENING EVENTS

  $('.you-area').on('touchstart', function(e){
    touchStartHandler(e);
  })

  $('.you-area').on('touchend', function(e){
    if($('.app').hasClass('is-listening')){
      touchEndHandler(e);
    }
  });


// RESULTS EVENTS

  $('.results').on('touchstart', function(e){
    $('.cursor').css({
      display: 'none'
    })
    touchStartX = e.originalEvent.touches[0].clientX;

    // ON MOVE
    $(window).on('touchmove',function(e){
      touchNewX = e.originalEvent.touches[0].clientX;
      $('.results').css({
        '-webkit-transition-duration': '0s',
        '-webkit-transform': 'translateX('+ (touchNewX - touchStartX) + 'px)'
      })
    })
  })

  $('.results').on('touchend', function(e){
    if(touchStartX > touchNewX){
      $('.result').eq(0).removeClass('is-visible');
      $('.result').eq(1).removeClass('is-visible');
      $('.result').eq(2).addClass('is-visible');
      $('.result').eq(3).addClass('is-visible');
      $('.results').css({
        '-webkit-transform': 'translate3d(0,0,0)',
        left: -_winW,
        '-webkit-transition-duration': '.6s'
      })
    }else{
      vivFrame=vivFrame-2;
      $('.result').eq(0).addClass('is-visible');
      $('.result').eq(1).addClass('is-visible');
      $('.result').eq(2).removeClass('is-visible');
      $('.result').eq(3).removeClass('is-visible');
      $('.results').css({
        '-webkit-transform': 'translate3d(0,0,0)',
        left: 0,
        '-webkit-transition-duration': '.6s'
      })
    }
    playViv();
  })

  $('.result').on('click', function(e){
    expandResult($(this));
  })

  function startListening () {
    $('.app').addClass('is-listening');
    isListening = true;

    playYou();
  }

  function touchStartHandler (e) {
    $('.app').addClass('is-touching');

    if(vivFrame == 1){
      playViv();
    }

    touchTimeout = setTimeout(function(){
      startListening();
    }, 200);

    $('.cursor').css({
      left: e.originalEvent.touches[0].clientX,
      top: e.originalEvent.touches[0].clientY-44,
    })
  }
  function touchEndHandler () {

    stopListening();
    startVivResponse();

  }

  function startVivResponse () {
    if(vivFrame == 4){
      vivFrame++;
    }

    playViv();

    // 
    if(vivFrame == 3){
      showBrands();
    }else if(vivFrame == 6){
      $('.app').addClass('is-result');
    }
  }

  function showBrands () {
    $('.app').addClass('is-brands')
    setTimeout(function(){
      $('.app').addClass('is-results');
      playViv();
    },3000)
  }

  function stopListening () {
    isListening = false;
    clearTimeout(touchTimeout);
    clearTimeout(youTimeout);

    $('.app').removeClass('is-touching');
    $('.app').removeClass('is-listening');
  }

  function playYou(){
    var text = youWords[youFrame];
    youFrame++;
    // wait for you to start
    $('.you-text').html('...');
    youTimeout = setTimeout(function(){
      // clear you text
      $('.you-text').html('');
      $('.you-placeholder').html('');
      clearInterval(youInterval);
      $('.app').addClass('is-talking');
      // show a letter every .05s
      showYouLetters(text)
    },1000)
    var i=0;

    function showYouLetters (text) {
      youInterval = setInterval(function(){
        if(i >= text.length){
          clearInterval(youInterval);
        }else if(text.substr(i,1) == " "){
          clearInterval(youInterval)
          setTimeout(function(){
            showYouLetters(text)}
          ,50);
        }
        $('.you-text').append('<span>'+text.substr(i,1)+'</span>')
        i++;
      },10)
    }
  }

  function playViv(){
    $('.viv-text').html('...');
    var text = vivWords[vivFrame];

    vivFrame++;
    // wait for viv to start
    vivTimeout = setTimeout(function(){
      // clear viv text
      $('.viv-text').html('');
      clearInterval(vivInterval);
      showVivLetters(text)
    },500)
    var i=0;

    function showVivLetters (text){
      vivInterval = setInterval(function(){
        if(i >= text.length){
          clearInterval(vivInterval);
        }else if(text.substr(i,1) == " "){
          clearInterval(vivInterval)
          setTimeout(function(){
            showVivLetters(text)}
          ,50);
        }
        $('.viv-text').append('<span>'+text.substr(i,1)+'</span>')
        i++;
      },10)
    }
  }

  function resizeHandler (e) {
    _winW = $(window).width();
    _winH = $(window).height();
  }
})