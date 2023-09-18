
var archetype = 'Rams'; // Archetypes_array[Math.floor(Math.random() * Archetypes_array.length)];
var wrapper = document.querySelector('.Wrapper');
var system_el = document.querySelector('.System');
var images = document.querySelectorAll('.Image img');
var covers = document.querySelectorAll('.Cover img');
var headlines = document.querySelectorAll('.Headline span');
var authors = document.querySelectorAll('.Author');

var sections = document.querySelectorAll('.Section');
var sectionClasses = [];
for (var i = 0;i< sections.length; i++) {
  sectionClasses[i] = sections[i].classList + ' ';
}

document.querySelector('.jsStop').addEventListener('click', function(){
  clearInterval(shuffleInterval);
})
document.querySelector('.Shuffle').addEventListener("click", shuffle);
document.querySelector('.hello').addEventListener("click", toggleInfo);

var shuffleInterval = setInterval(shuffle,1);
setTimeout(function(){
  clearInterval(shuffleInterval);
  shuffleInterval = setInterval(shuffle,10000);
}, 5000)



function changeSystem() {
  var newSystem = system_el.cloneNode(true);
  wrapper.appendChild(newSystem);
  system_el.className = "System "
  changePhotos();
  changeSystemClasses();
  newSystem.querySelector('.Kill').addEventListener('click',function(e){
    newSystem.remove();
  })
  newSystem.querySelector('.Class-list').addEventListener('keypress',function(e){
    if (e.keyCode == 13) {
      e.preventDefault();
      applyClasses(e.target);
    }
  })
}
function changeSystemClasses() {
  for (var branch in siteBeautyverse){
    branch = Object.keys(siteBeautyverse[branch][Object.keys(siteBeautyverse[branch])[0]]);
    var path = branch[Math.floor(Math.random()*branch.length)]
    system_el.classList.add(path);
  }
}
function changePhotos() {
  archetype = Archetypes_array[Math.floor(Math.random() * Archetypes_array.length)];
  var headline = archetype.quotes[Math.floor(Math.random() * archetype.quotes.length)];
  var author = archetype.title;
  var myPhoto = archetype.name;
  for (var i=0; i<images.length; i++ ) {
    images[i].style.objectPosition = ImageCenter_array[myPhoto]
    images[i].setAttribute('src','ui/assets/images/'+myPhoto+'.jpg');
  }
  for (var i=0; i<covers.length; i++ ) {
    covers[i].style.objectPosition = ImageCenter_array[myPhoto]
    covers[i].setAttribute('src','ui/assets/images/'+myPhoto+'.jpg');
  }
  for (var i=0; i<headlines.length; i++ ) {
    headlines[i].textContent = headline;
  }
  for (var i=0; i<authors.length; i++ ) {
    authors[i].textContent = author
  }
}

function init(){
  system_el.className = "System "+ archetype;
  createItemClassList();
  changeSystemClasses();
  for (var i=0; i<500; i++) {
    shuffle();
  }
  // shuffle();
}
function shuffle(){
  system = Archetypes_array[Math.floor(Math.random() * Archetypes_array.length)];
  changeSystem();
  createItemClassList();
  // shuffleItemClassList();
}

function createItemClassList(){
  var section = document.querySelector('.System').querySelector('.Section');
  if(section.querySelector('.Class-list')){
    section.querySelector('.Class-list').remove();
  }
  var list = document.createElement('span');
  list.classList.add('Class-list');
  list.setAttribute('contenteditable',true);
  section.insertBefore(list,section.firstChild);
  section.className = 'Section Section--components-1 section-height-fullscreen ';
  for (var branch in sectionsBeautyverse){
    var branchName = branch;
    branch = Object.keys(sectionsBeautyverse[branch][Object.keys(sectionsBeautyverse[branch])[0]]);
    if(mySectionClasses.indexOf(branchName) != -1){
      var path = branch[Math.floor(Math.random()*branch.length)]
      var listItem = document.createElement('li');
      listItem.innerHTML = path;
      list.appendChild(listItem);
      section.classList.add(path);
    }
  }

  list.addEventListener('keypress',function(e){
    if (e.keyCode == 13) {
      e.preventDefault();
      applyClasses(e.target);
    }
  })
}

function shuffleItemClassList(){
  var section = sections[0];
  for (var j=0; j<sections.length; j++ ) {
    section.className = 'Section Section--components-1 section-height-fullscreen ';
  }
  for (var branch in sectionsBeautyverse){
    var branchName = branch;
    branch = Object.keys(sectionsBeautyverse[branch][Object.keys(sectionsBeautyverse[branch])[0]]);
    if(mySectionClasses.indexOf(branchName) != -1){
      var path = branch[Math.floor(Math.random()*branch.length)]
      section
      section.classList.add(path);
    }
  }
}
function applyClasses(target) {
  var section = target.parentNode.parentNode.querySelector('Section');

  var list = section.querySelector('.Class-list')
  var items = list.querySelectorAll('li');
  var myClass = section.classList;
  myClass = 'Section Section--components-1 section-height-fullscreen ';
  for (var i=0;i<items.length;i++){
    myClass += items[i].textContent;
    if(myClass.substr(myClass.length-1) != " "){
      myClass = myClass + ' '
    }
  }
  section.className = myClass;
}
function toggleInfo() {
  document.querySelector('.hello').classList.toggle('closed')
  document.querySelector('.Wrapper').classList.toggle('active')
}
init()
