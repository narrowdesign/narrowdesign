const titleScreenContainerEl = document.querySelector('.titleScreen__container');
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
  titleScreenContainerEl.style.transform = `scale(${1 - window.scrollY * 0.0005})`;
  titleScreenContainerEl.style.filter = `blur(${window.scrollY * 0.005}px)`;
  whiteRabbitEl.style.filter = `blur(${6 - window.scrollY * 0.005}px)`;
  whiteRabbitEl.style.transform = `scale(${1.5 - window.scrollY * 0.0005})`;
  whiteRabbitLogoEl.style.transform = `scale(${1.8 - window.scrollY * 0.0007})`;
  dominionXEl.style.filter = `blur(${6 - window.scrollY * 0.005}px)`;
  dominionXEl.style.transform = `scale(${2.0 - window.scrollY * 0.0005})`;
  dominionXLogoEl.style.transform = `scale(${2.3 - window.scrollY * 0.0007})`;
}