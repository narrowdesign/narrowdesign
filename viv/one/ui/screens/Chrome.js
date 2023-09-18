var gc;

gc = function(el) {
  return document.getElementsByClassName(el)[0];
};

gc('my-area').addEventListener('click', function() {
  return alert('test');
});
