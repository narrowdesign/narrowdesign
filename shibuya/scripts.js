const titleScreenContainerEl = document.querySelector('.titleScreen__container');
const titleScreen2023El = document.querySelector('.titleScreen__title--2023');
const titleScreenEls = document.querySelectorAll('.titleScreen');
const titleLetterEls = document.querySelectorAll('.titleScreen__title span');
const titleImageEl = document.querySelector('.titleScreen img');
const whiteRabbitEl = document.querySelector('.whiteRabbit');
const whiteRabbitLogoEl = document.querySelector('.whiteRabbit__logo');
const dominionXEl = document.querySelector('.dominionX');
const dominionXLogoEl = document.querySelector('.dominionX__logo');

window.addEventListener('scroll', handleScroll);

titleScreenEls.forEach((el,i) => {
  const time = i < 3 ? i * 2 : i * 2 + 5;
  el.style.opacity = 1;
  el.style.transitionDelay = `${time}s`;
});

titleLetterEls.forEach((el,i) => {
  el.style.transitionDelay = `${i * 0.03 + 4}s`;
  el.style.opacity = 1;
})

titleImageEl.style.transitionDelay = `4.5s`;
titleImageEl.style.filter = `blur(0)`;
titleImageEl.style.opacity = `1`;
titleImageEl.style.transform = `scale(1)`;

function handleScroll() {
  scaleScreen(titleScreenContainerEl, titleScreen2023El);
  scaleScreen(whiteRabbitEl, whiteRabbitLogoEl);
  scaleScreen(dominionXEl, dominionXLogoEl);
}

function scaleScreen(el, titleEl) {
  const top = el.getBoundingClientRect().top;
  const scale = 1 - (1 - (Math.cos(Math.max(-Math.PI, Math.min(Math.PI, top * -0.004))) + 1) / 2) * 0.1;
  el.style.transform = `scale(${scale})`;
  titleEl.style.transform = `scale(${scale + (1 - scale)})`;
}