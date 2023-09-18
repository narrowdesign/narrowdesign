var logos = ['event','twc','vivLogo','yelp','ot','grub','mapquet','stub','y!','uber','zagat','yum','us','oven','wu']
var brandDetails = ["Weather forecast came from this provider.","Some reviews came from this other provider.","Restaurant menus came from this here.","Maps and drive times came from this provider.","Some reviews and all reservation options came from this provider","Weather forecast came from this provider.","Some reviews came from this other provider.","Restaurant menus came from this here.","Maps and drive times came from this provider.","Some reviews and all reservation options came from this provider","Weather forecast came from this provider.","Some reviews came from this other provider.","Restaurant menus came from this here.","Maps and drive times came from this provider.","Some reviews and all reservation options came from this provider"]

var touchTimeout;
var isListening;
var isResults;

var _winW = window.innerWidth;
var _winH = window.innerHeight;

var youInterval;
var vivInterval;
var youTimeout;
var vivTimeout;
var isBrands = false;

var lastText = '';

var shortcut = 1;

var touchStartX = 0;
var touchNewX = 0;

var movedX = 0;
var movedY = 0;

var touchStartY = 0;
var touchNewY = 0;

var current_pull = 0;
var current_left = 0;

var youFrame = 0;
var vivFrame = 0;
var direction= "vertical";

var conversationOffset = 40;
var brandsOpen = false;

var current_confirm_height = $('.confirmation-screen').height();

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

  vivWords.push("Would you like to plan an evening out tonight?"); // 0

  youWords.push("Sure."); // 0
  // touch end

  vivWords.push("Great! What do you feel like doing?"); // 2
  
  youWords.push("We’d like to go to dinner. My date is a vegetarian."); // 1

  vivWords.push("Vegetarian, got it. Let me look for you...ok found a few different options."); // 5

  youWords.push("Is there anything rated 4 stars that has tables open outside?"); // 1

  vivWords.push("Yes, Las Iguanas has 4 stars and a table outside open at 7pm. Want me to book it?"); // 5

  youWords.push("That sounds good."); // 1

  // // touch and hold
  // vivWords.push("Tonight looks like a great evening for dinner outside... 7pm is available."); // 2
  // // touch end
  // youWords.push("Book it."); // 1

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

  $('.mic').on('click',function(e){
    startListening()
  })

  $('.keyboard').on('click',function(e){
    startListening()
  })

// BRANDS

  $('.brands').on('click',function(e){
    e.preventDefault();
    if (brandsOpen == false) {
      $('.brands').css({
        '-webkit-transition-duration': '1s',
        width: _winW-40,
      })
      $('.brand').css({
        '-webkit-transition-duration': '0s',
        width: 25 + (movedX/13),
        height: 25 + (movedX/13)
      })

      $('.brand').removeClass('active');

      brandsOpen = true;
    }
    else if (brandsOpen == true) {
      $('.brands').css({
        '-webkit-transition-duration': '.5s',
        width: 50
      })
      $('.brand').css({
        '-webkit-transition-duration': '0s',
        width: 25 + (movedX/13),
        height: 25 + (movedX/13)
      })

      $('.brand').removeClass('active');
      brandsOpen = false;
    }
  })


  $('.brands').on('touchstart',function(e){
    touchStartX = e.originalEvent.touches[0].clientX;
  })

  $('.brands').on('touchmove',function(e){

    touchNewX = e.originalEvent.touches[0].clientX;
    var movedX = Math.max(0,touchNewX-touchStartX)
    if(!$('.app').hasClass('is-brands-open')){
      $('.brands').css({
        '-webkit-transition-duration': '0s',
        width: 50 + movedX,
      })

      $('.brand').css({
        '-webkit-transition-duration': '0s',
        width: 25 + (movedX/13),
        height: 25 + (movedX/13)
      })

      $('.brand').removeClass('active');
    }
  })

  $('.brands').on('touchend',function(e){
    if($('.brands').width() < _winW-40){
      $('.brand').removeClass('active');
      $('.brands').css({
        '-webkit-transition-duration': '.5s',
        width: 50
      })

      $('.brand').css({
        '-webkit-transition-duration': '.5s',
        width: 25,
        height: 25
      })
    }
  }) 


// RESULTS EVENTS
  setTimeout(addButton,200);

  $('.see-more-cta').on('click', showMore)
  $('.see-more-cta').on('touchmove', showMore)
  $('.see-more-cta').on('click', showMore)

  $('.no-button').on('click', nextShortcut)

  $('.shortcut').on('touchmove', nextShortcut)  

  $('.result .title').on('click', function(e){
    $('.business-detail-screen').addClass('business-detail-on')
  })

  $('.close-btn').on('click', closeThings)

  $('.times').on('click',closeThings);

  $('.confirmation-screen').on('touchmove', closeThings)
  $('.menu-detail-screen').on('touchmove', closeThings)
  $('.business-detail-screen').on('touchmove', closeThings)
  $('.see-all-categories').on('touchmove', closeThings)

  $('.button.book span').on('click',function(e){
    $('.times').addClass('open')
    e.stopPropagation();
  })

  function closeThings (e) {
    $('.business-detail-screen').removeClass('business-detail-on')
    $('.see-all-categories').removeClass('on')
    $('.see-all-categories').addClass('off')
    $('.confirmation-screen').removeClass('confirmation-screen-on')
    $('.menu-detail-screen').removeClass('menu-detail-on')
    $('.times').removeClass('open')
  }

  $('.desc1, .menu.button').on('click', function(e){
    $('.menu-detail-screen').addClass('menu-detail-on')
  })

  $('.button.book').on('click', showConfirmation)

  $('.business-detail-screen .button').on('click', function(e){
    $('.menu-detail-screen').addClass('menu-detail-on');

    setTimeout(function(){
      $('.business-detail-screen').removeClass('business-detail-on');
    },800)

  })

  $('.results').on('touchstart', function(e){
    var firstMove = true;
    touchStartX = e.originalEvent.touches[0].clientX;
    touchStartY = e.originalEvent.touches[0].clientY;
    current_pull = parseInt($(this).css('transform').split(',')[5]);

    var me = $(this);
    current_left = parseInt($(this).css('transform').split(',')[4]);

    $(window).on('touchmove',function(ev){
      touchNewX = ev.originalEvent.touches[0].clientX;
      touchNewY = ev.originalEvent.touches[0].clientY;
      var movedX = touchNewX-touchStartX;
      var movedY = touchNewY-touchStartY;
      if(firstMove){
        firstMove = false;
        if(Math.abs(movedX) > Math.abs(movedY)){
          direction = "horizontal";
        }else{
          direction = "vertical";
        }
      }
      
      // SWIPE
      if(direction == "horizontal"){
        me.css({
          '-webkit-transition-duration': '0s',
          '-webkit-transform': 'translateX('+ (current_left+movedX) + 'px)'
        })

      // SCROLL
      }else{
        me.css({
          '-webkit-transition-duration': '0s',
          '-webkit-transform': 'translateY('+ Math.min(1,(current_pull + movedY)) + 'px)'
        })
        $('.confirmation-screen').css({
          '-webkit-transition-duration': '0s',
          height: Math.min(100,Math.max(50,current_confirm_height+movedY))
        })
      }
    })
  })

  $('.results').on('touchend', function(e){

    if(direction == "horizontal"){
      if(touchStartX > touchNewX){
        $(this).css({
          '-webkit-transform': 'translate3d('+(-_winW)+'px,0,0)',
          '-webkit-transition-duration': '.6s'
        })
      }else{
        $(this).css({
          '-webkit-transform': 'translate3d(0px,0,0)',
          // left: 0,
          '-webkit-transition-duration': '.6s'
        })
      }
    }else{

    }
    $(window).unbind('touchmove')
  })

  function showConfirmation (argument) {
    $('.confirmation-screen').removeClass('off')

    $('.confirmation-screen').addClass('confirmation-screen-on')
  }

  function showMore(){
    console.log('show more')

    $('.see-all-categories').removeClass('off')
    $('.see-all-categories').addClass('on')

  }


  function nextShortcut(){
    $('.greeting').addClass('hidden')
    if(shortcut != $('.shortcut').length){
      $('.shortcut'+shortcut).off('touchmove')
      $('.shortcut'+shortcut).removeClass('on');
      $('.shortcut'+shortcut).addClass('off');
      shortcut++;
      if(shortcut == 3){
        $('.accelerators').html('<div class="button left">THAI</div><div class="button right">PIZZA</div>')
      }else{
        $('.accelerators').html('<div class="button">DO IT</div>')
      }

      setTimeout(function(){
        $('.shortcut'+shortcut).addClass('on');
      },300)

    }else{
      $('.shortcut'+$('.shortcut').length).removeClass('on');
      $('.shortcut'+$('.shortcut').length).addClass('off');
      setTimeout(function(){
        $('.shortcuts').css({
          opacity: 0,
          visibility: 'hidden'
        })
        $('.app').addClass('is-shortcut-end')
        setTimeout(function(){
          $('.shortcuts').css({
            display: 'none'
          })
        },500)
      },500)
    }
  }

  function startListening () {
    $('.app').addClass('is-listening');
    $('.app').addClass('is-conversation');
    isListening = true;

    if (vivFrame >= 3) {
      showResultsUnfocused();
    }

    playYou();

    if(vivFrame == 4){
      setTimeout(showConfirmation,3000);
      $('.app').removeClass('is-listening');
    }else{
      setTimeout(playViv,2000);
    }
  }


  function addButton (delay) {
    if(vivFrame == 2){
      $('.accelerators').html('<div class="button left">DINNER</div><div class="button right">MOVIE</div>')
    }else{
      $('.accelerators').html('<div class="button">DO IT</div>')
    }
    setTimeout(function(){
      $('.app').addClass('is-accelerators');
    },delay)
  }

  function showBrands () {
    if(!isBrands){
      createBrands();
    }
    $('.app').removeClass('is-brands-unfocused');
    $('.app').addClass('is-brands-focused');

    setTimeout(function(){
      showResults();
    },1000)
  }


  function showResults () {
    $('.app').removeClass('is-result-unfocused');
    $('.app').addClass('is-result-focused');
    $('.accelerators').eq(0).addClass('BOOK');
    $('.accelerators').addClass('off')
  }

  function showBrandsUnfocused () {
    if(!isBrands){
      createBrands();
    }
    $('.app').removeClass('is-brands-focused');
    $('.app').addClass('is-brands-unfocused');

  }

  function createBrands () {
    isBrands = true;
    num = 15;
    for(var i=0;i<num;i++){
      $('.brands').append('<div class="brand"><img src="ui/assets/images/'+logos[i]+'.svg"><h5>'+brandDetails[i]+'</h5></div>')
      $('.brand').eq(i-1).css({
        '-webkit-animation-delay': i/40 + 's'
      })
    }
  }


  function showResultsUnfocused () {
    $('.app').removeClass('is-result-focused');
    $('.app').addClass('is-result-unfocused');
    setTimeout(function(){
      showBrandsUnfocused();
    },1000)
  }

  function removeBrands(number){

      var brand = $('.brand'); // don't repeatedly search for the boxes
      var total = brand.length;
      console.log("total", +total)

      for (i=0;i<10;i++){
        var randomnumber = Math.floor((Math.random() * 10) + 1);
        $(".brand:eq('"+randomnumber+"')").fadeOut(2000, function() {
            $(this).remove();
        });
      }
  }

  function animateCoversationUp () {
    
    console.log('frame=' +vivFrame);  

    var p = $(".conversation-area");
    var offset = p.offset();

    var newTop = offset.top - conversationOffset;

    //set
    $(".conversation-area").offset({ top: newTop }, 500);
    if(vivFrame == 4){
      $('.conversation-area').addClass('end');
    }

  }

  function playYou(){
    $('.app').removeClass('is-accelerators')
    var text = youWords[youFrame];
    youFrame++;
    // wait for you to start
    animateCoversationUp();
    youTimeout = setTimeout(function(){
      $('.conversation-text').append('<br><br>')
      $('.conversation-text').append('<div class="icon avatar-icon"><img src="ui/assets/images/avatar.svg"></div>')
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
        }
        var count = text.substr(i).indexOf(' ')-i
        if(count < 0){
          count = 5;
        }
        count = 5;
        $('.conversation-text').append('<span>'+text.substr(i,count)+'</span>')
        i += count;
      },100)
    }
    isTalking = false;
    $('.app').removeClass('is-talking');
  }

  function playViv(){
    
    // $('.viv-text').html('...');

    var text = vivWords[vivFrame];

    vivFrame++;
    animateCoversationUp();
    // wait for viv to start
    vivTimeout = setTimeout(function(){
      // clear viv text
      //$('.viv-text').html('');
      $('.conversation-text').append('<br><br>')
      $('.conversation-text').append('<div class="icon viv-icon"><img src="ui/assets/images/viv.svg"></div>')
      clearInterval(vivInterval);
      showVivLetters(text)
    },500)
    var i=0;

    function showVivLetters (text){
      vivInterval = setInterval(function(){
        if(i >= text.length){
          clearInterval(vivInterval);
        }
        var count = text.substr(i,100).indexOf(' ') - i
        if(count < 0){
          count = 5;
        }
        count = 5;
        $('.conversation-text').append('<span>'+text.substr(i,count)+'</span>')
        i+=count;
      },100)
    }
    isListening = false;
    $('.app').removeClass('is-listening');
    elementTimeline();
  }

  function elementTimeline() {

    if(vivFrame == 1){
      addButton(2900);
    }

    if(vivFrame == 2){
      addButton(2000);
    }

    if(vivFrame == 3){
      showBrands();
      setTimeout(removeBrands(3), 4000);
    }

    if(vivFrame == 4){
      showBrands();
      setTimeout(removeBrands(6), 3000);
      $('.results').css({
        '-webkit-transform': 'translate3d(-25%,0,0)'
      })
    }
  }


  function resizeHandler (e) {
    _winW = $(window).width();
    _winH = $(window).height();
  }
})