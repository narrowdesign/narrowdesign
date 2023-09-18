var keywords = ['uber','work'];
var logos = ['event','twc','vivLogo','yelp','ot','grub','mapquet','stub','y!','uber','zagat','yum','us','oven','wu']

var touchTimeout;
var isListening;
var isResults;
var speaking = false;

var _winW = window.innerWidth;
var _winH = window.innerHeight;

var youInterval;
var vivInterval;
var youTimeout;
var youLetterTimeout;
var vivTimeout;

var lastText = '';

var touchStartX = 0;
var touchNewX = 0;

var movedX = 0;
var movedY = 0;

var touchStartY = 0;
var touchNewY = 0;

var current_pull = 0;
var current_left = 0;

var viv_current_pull = 0;
var viv_touchNewY = 0;
var viv_touchStartY = 0;

var direction;

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

$(function() {

// DIALOGUE

  var youWords = [];
  var vivWords = [];

  // touch and hold
  vivWords.push("Uber will arrive in 5min to take you to work."); // 0
  vivWords.push("Yes?"); // 1

  youWords.push("I’d like to take Corly out this weekend."); // 0
  // touch end

  vivWords.push("Gathering ideas."); // 2
  // show brands quickly
  // collapse brands
  vivWords.push("“Out” to dinner? Maybe a concert?"); // 3
  // show 2 results

  // swipe to see more
  vivWords.push("“Out” to a movie? Maybe wine tasting?"); // 4
  // show 2 more results
  
  // touch and hold
  youWords.push("Just dinner. And she’s vegetarian."); // 1
  // touch end

  vivWords.push("Friday looks like a great evening for dinner outside. How about Panciuto?"); // 5

  // touch and hold
  youWords.push("Friday outside sounds nice. Save Panciuto for our anniversary August fourth."); // 2
  // touch end

  vivWords.push("Noted. How about Rue Cler?"); // 6

  // touch and hold
  youWords.push("Less fancy."); // 3
  // touch end

  vivWords.push("Juju? It has good reviews on vegetarian dishes and a patio."); // 7

  // touch and hold
  youWords.push("Perfect."); // 4
  // touch end

  // PAYMENT FLOW
  vivWords.push("Open Table requires a credit card to reserve this table."); // 8
  vivWords.push("Confirmed! I’ve added this to your calendar and sent Corly an invite."); //
  // LANDING MESSAGE
  
  onHome();
  resizeHandler();

  // PROVIDER DESCRIPTIONS
  var brandDetails = ["Weather forecast came from this provider.","Some reviews came from this other provider.","Restaurant menus came from this here.","Maps and drive times came from this provider.","Some reviews and all reservation options came from this provider","Weather forecast came from this provider.","Some reviews came from this other provider.","Restaurant menus came from this here.","Maps and drive times came from this provider.","Some reviews and all reservation options came from this provider","Weather forecast came from this provider.","Some reviews came from this other provider.","Restaurant menus came from this here.","Maps and drive times came from this provider.","Some reviews and all reservation options came from this provider"]

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

  $('.juju button').on('click',function(e){
    $('.result-single').css({
      '-webkit-transform': 'translateX('+(-_winW*3)+'px)'
    });
  })

  $('.add-card-button').on('click',function(){
    $('.add-card').addClass('on')
  })

  $('.visa-button').on('click',function(){
    $('.app').addClass('is-confirmed');
    $('.result-single').css({
      '-webkit-transform': 'translateX('+(-_winW*2)+'px)'
    })
    $('.juju button').html('CANCEL <span>6:30PM</span>')
    playViv();
  })

  $('.close-button').on('click',function(e){
    if(!$('.app').hasClass('is-brands-open')){
      window.location.reload();
    }else{
      $('.app').removeClass('is-brands-open');
      $('.brands').css({
        '-webkit-transition-duration': '0s',
        height: 36,
      })

      $('.brand').css({
        '-webkit-transition-duration': '0s',
        top: '30%',
        width: 30,
        height: 30
      })

      $('.brand').removeClass('active');
      $('.brand-details').removeClass('active');
      vivFrame--;
      playViv();

      $('.results').css({
        '-webkit-transition-duration': '0s',
        top: $('.brands').offset().top + 20 + $('.brands').height()
      })
    }
  })

// EXPAND BRANDS

  $('.brands').on('touchstart',function(e){
    touchStartY = e.originalEvent.touches[0].clientY;
  })

  $('.brands').on('touchmove',function(e){

    touchNewY = e.originalEvent.touches[0].clientY;
    var movedY = Math.max(0,touchNewY-touchStartY)
    if(movedY > 180 && !$('.app').hasClass('is-brands-open')){
      $('.brands').off('touchend');
      $('.app').addClass('is-brands-open');
      $('.brand').css({
        top: ''
      })
      playViv();
    }else if(!$('.app').hasClass('is-brands-open')){
      $('.brands').css({
        '-webkit-transition-duration': '0s',
        height: 36 + movedY,
      })

      $('.brand').css({
        '-webkit-transition-duration': '0s',
        top: '30%',
        width: 30 + (movedY/5),
        height: 30 + (movedY/5)
      })

      $('.brand').removeClass('active');
      var num = Math.floor(e.originalEvent.touches[0].clientX/_winW*$('.brand').length);
      var myBrand = $('.brand').eq(num);
      myBrand.addClass('active')
      $('.brand-details').addClass('active').html(brandDetails[num])

      $('.results').css({
        '-webkit-transition-duration': '0s',
        top: $('.brands').offset().top + 20 + $('.brands').height()
      })
    }
  })

  $('.brands').on('touchend',function(e){
    $('.brand').removeClass('active');
    $('.brands').css({
      '-webkit-transition-duration': '.5s',
      height: 36
    })

    $('.brand').css({
      '-webkit-transition-duration': '.5s',
      top: '30%',
      width: 30,
      height: 30
    })

    $('.results').css({
      '-webkit-transition-duration': '.5s',
      top: $('.brands').offset().top + 34
    })
  })

// TYPING EVENTS

  // $('.you-area').on('click', function(e){
  //   if(!$('.app').hasClass('is-typing')){
  //     stopListening();

  //     $('.you-text').focus();
  //     lastText = $('.you-text').html();
  //     $('.you-text').html('Coming Soon X');
  //     $('.app').addClass('is-typing');
  //   }else{
  //     $('.you-text').html(lastText);
  //     $('.app').removeClass('is-typing');
  //   }
  // })




// LISTENING EVENTS

  $('.you-area').on('touchstart', function(e){
    touchStartHandler(e);
    $(window).bind('touchend', touchEndHandler);
  })
  $('.uber').on('click', function(e){
    if(vivFrame == 1){
      if($('.extensions').hasClass('open')){
        $('.extensions').removeClass('open')
        $('.uber span').html('...')
      }else{
        $('.extensions').addClass('open')
        $('.uber span').html('×')
      }

    }
  })
  $('.viv-text').on('click', function(e){
    if(vivFrame == 1){
      if($('.extensions').hasClass('open')){
        $('.extensions').removeClass('open')
        $('.uber span').html('...')
      }else{
        $('.extensions').addClass('open')
        $('.uber span').html('×')
      }

    }
  })
  $('.viv-area').on('touchstart', function(e){
    var firstMove = true;
    viv_touchStartY = e.originalEvent.touches[0].clientY;
    viv_current_pull = parseInt($(this).css('transform').split(',')[5]);

    var me = $(this);

    $(window).on('touchmove',function(ev){
      viv_touchNewY = ev.originalEvent.touches[0].clientY;
      var movedY = viv_touchNewY-viv_touchStartY;
  
      me.css({
        '-webkit-transition-duration': '0s',
        '-webkit-transform': 'translateY('+ Math.min(1,(viv_current_pull + movedY)) + 'px)'
      })
    })
  })

  $('.viv-area').on('touchend', function(e){
    $(window).unbind('touchmove')
  })

  $('.viv-text').on('touchstart', function(e){
    $('.app').addClass('is-actions-open')
  });


// RESULTS EVENTS

  $('.results').on('touchstart', function(e){
    var firstMove = true;
    touchStartX = e.originalEvent.touches[0].clientX;
    touchStartY = e.originalEvent.touches[0].clientY;
    current_pull = parseInt($(this).css('transform').split(',')[5]);
    var current_you_top = $('.you-area').offset().top;
    console.log(vivFrame)

    var current_brands_top = $('.brands').offset().top;
    var current_viv_height = $('.viv-area').height();
    var current_viv_top = $('.viv-icon').offset().top;
    var me = $(this);
    current_left = parseInt($(this).css('transform').split(',')[4]);

    $(window).on('touchmove',function(ev){
      console.log('moving')
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

      console.log('window touchmove ' + direction)
      
      // SWIPE
      if(vivFrame < 8){
        if(direction == "horizontal"){
          me.css({
            '-webkit-transition-duration': '0s',
            '-webkit-transform': 'translateX('+ (current_left+movedX) + 'px)'
          })

        // SCROLL
        }else if($('.app').hasClass('is-result')){
          me.css({
            '-webkit-transition-duration': '0s',
            '-webkit-transform': 'translateY('+ Math.min(1,(current_pull + movedY)) + 'px)'
          })
          $('.you-area').css({
            '-webkit-transition-duration': '0s',
            top: Math.max(_winH-130,Math.min(_winH-65,current_you_top - movedY))
          })
          if($('.you-area').offset().top > _winH - 80){
            $('.tap').css({
              opacity: 0
            })
          }else{
            $('.tap').css({
              opacity: .5
            })
          }
          $('.viv-area').css({
            '-webkit-transition-duration': '0s',
            height: Math.min(100,Math.max(50,current_viv_height+movedY))
          })
          $('.viv-icon').css({
            '-webkit-transition-duration': '0s',
            top: Math.max(20,Math.min(38,current_viv_top+movedY/3))
          })
          $('.brands').css({
            '-webkit-transition-duration': '0s',
            top: Math.min(99,current_brands_top + movedY)
          })
        }
      }
    })
  })

  $('.results').on('touchend', function(e){
    console.log('results touchend ' + direction)

    if(direction == "horizontal" && vivFrame < 8){
      console.log(vivFrame)
      if(touchStartX > touchNewX){
        $('.result').eq(0).removeClass('is-visible');
        $('.result').eq(1).removeClass('is-visible');
        $('.result').eq(2).addClass('is-visible');
        $('.result').eq(3).addClass('is-visible');
        $(this).css({
          '-webkit-transform': 'translate3d('+(-_winW)+'px,0,0)',
          // left: -_winW,
          '-webkit-transition-duration': '.6s'
        })
        if(vivFrame == 4){
          playViv();
        }
      }else{
        $('.result').eq(0).addClass('is-visible');
        $('.result').eq(1).addClass('is-visible');
        $('.result').eq(2).removeClass('is-visible');
        $('.result').eq(3).removeClass('is-visible');
        $(this).css({
          '-webkit-transform': 'translate3d(0px,0,0)',
          // left: 0,
          '-webkit-transition-duration': '.6s'
        })
        if(vivFrame == 5){
          vivFrame=vivFrame-2;
          playViv();
        }
      }
    }else{

    }
    $(window).unbind('touchmove')
  })

  function startListening (e) {
    speaking = true;
    $('.app').addClass('is-listening');
    $('.you-area').css({
      height: ''
    })

    movedX = 0;
    movedY = 0;
    touchStartX = e.originalEvent.touches[0].clientX;
    touchStartY = e.originalEvent.touches[0].clientY;
    if(vivFrame > 3){
      $('.clear').css({
        display: 'none'
      })      
    }
    $('.clear').css({
      top: touchStartY-52,
      left: touchStartX-140
    })

    $(window).on('touchmove',function(ev){
      touchNewX = ev.originalEvent.touches[0].clientX;
      touchNewY = ev.originalEvent.touches[0].clientY;
      movedX = touchNewX-touchStartX;
      movedY = touchNewY-touchStartY;

      if(Math.abs(movedX) > Math.abs(movedY)){
        direction = "horizontal";
      }else{
        direction = "vertical";
      }
    })

    isListening = true;

    playYou();
  }

  function touchStartHandler (e) {
    $('.app').addClass('is-touching');

    if(vivFrame == 1){
      playViv();
    }

    touchTimeout = setTimeout(function(){
      startListening(e);
    }, 200);

    $('.cursor').css({
      left: e.originalEvent.touches[0].clientX,
      top: e.originalEvent.touches[0].clientY-44,
    })
  }
  function touchEndHandler () {
    console.log('touchEnd');
    $(window).unbind('touchend', touchEndHandler);
    if(Math.abs(movedY) > 20 || Math.abs(movedX) > 20 || speaking){
      $('.you-text').html('');
      clearInterval(youInterval);
      clearTimeout(youLetterTimeout);
      $('.you-placeholder').html('Touch and hold<br>in this area to speak');
      vivFrame--;
      youFrame--;
      if(vivFrame == 1){
        vivFrame--;
      }
      playViv();
      if(vivFrame == 1){
        $('.app').addClass('is-home')
      }
    }else {
      startVivResponse();
    }
    stopListening();

  }

  function startVivResponse () {
    if(vivFrame == 4){
      vivFrame++;
    }

    playViv();

    // 
    if(vivFrame == 3){
      showBrands(15);
    }else if(vivFrame == 6){
      showBrands(5);
      $('.app').addClass('searching-brands')
      setTimeout(function(){
        $('.app').addClass('is-result');
        $('.result-single').css({
          '-webkit-transform': 'translateX(0px)'
        })
      },2000)
    }else if(vivFrame == 7){
      $('.app').addClass('is-result');
      $('.result-single').css({
        '-webkit-transform': 'translateX('+(-_winW)+'px)'
      })
    }else if(vivFrame == 8){
      $('.result-single').css({
        '-webkit-transform': 'translateX('+(-_winW*2)+'px)'
      })
    }else if(vivFrame == 9){
      $('.result-single').css({
        '-webkit-transform': 'translateX('+(-_winW*3)+'px)'
      })
    }
  }

  function showBrands (num) {
    for(var i=0;i<num;i++){
      $('.brands').append('<div class="brand"><img src="ui/assets/images/'+logos[i]+'.svg"><h5>'+brandDetails[i]+'</h5></div>')
      $('.brand').eq(i-1).css({
        '-webkit-animation-delay': i/40 + 's'
      })
    }
    var i=0;
    var removeBrandsInterval = setInterval(function(){
      removeBrand(i);
      i++;
      if(i > $('.brand').length+3){
        clearInterval(removeBrandsInterval);
        $('.app').removeClass('searching-brands')
      }
    },100)
    $('.app').addClass('is-brands')
    setTimeout(function(){
      $('.app').addClass('is-results');
      if(vivFrame < 6){
        setTimeout(function(){
          playViv();
          $('.app').addClass('no-swipe')
        },2000)  
      }
    },2500)
  }

  function removeBrand () {
    var brand = $('.brand').eq(Math.floor(Math.random()*($('.brand').length)));
    brand.addClass('gone');
    setTimeout(function(){
      brand.remove();
    },300)
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
          speaking = false;
        }else if(text.substr(i,1) == " "){
          clearInterval(youInterval)
          youLetterTimeout = setTimeout(function(){
            showYouLetters(text)}
          ,50);
        }
        $('.you-text').append('<span>'+text.substr(i,1)+'</span>')
        i++;
      },10)
    }
  }

  function onHome(){    
    playViv();
    $('.app').addClass('is-home');
  }

  function playViv(){
    if(vivFrame > 0){
      $('.app').removeClass('is-home')
    }
    $('.viv-text').html('...');
    var text = vivWords[vivFrame];

    if(!$('.app').hasClass('is-brands-open')){
      vivFrame++;
    }else{
      text = 'This is how we did it.'
    }

    // wait for viv to start
    clearInterval(vivInterval);
    clearTimeout(vivTimeout);
    vivTimeout = setTimeout(function(){
      // clear viv text
      $('.viv-text').html('');
      showVivLetters(text);
    },500)
    var i=0;

    function showVivLetters (text){
      $('.app').addClass('viv-talking');
      vivInterval = setInterval(function(){
        if(i >= text.length){
          clearInterval(vivInterval);
          $('.app').removeClass('viv-talking');
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