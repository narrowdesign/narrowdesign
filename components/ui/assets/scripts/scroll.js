(function(){
  var scrollTop = 0;
  var bg = document.querySelector('.Bg .Cover img'); // first backround image

  scrollHandler(); // initial scroll position jump

  window.addEventListener('wheel',scrollHandler)
  window.addEventListener('scroll',scrollHandler)
  window.addEventListener('resize',scrollHandler);

  function scrollHandler() {
    scrollTop = document.body.scrollTop;
    // bg.style.webkitTransform = 'translate3d(0,'+scrollTop/3+'px,0)';
    // bg.style.webkitTransitionDuration = '0s';
  }

})()
