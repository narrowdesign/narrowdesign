const scene = document.querySelector('.scene')
const container = document.querySelector('.container')
const bgEl = document.querySelector('.bg')
const leftEl = document.querySelector('.left')
const centerEl = document.querySelector('.center')
const rightEl = document.querySelector('.right')
window.addEventListener('mousemove', handleMouseMove)
document.body.addEventListener('wheel', handleScroll)

centerEl.addEventListener('click', () => {
  document.body.classList.toggle('isWhiteRabbit')
})

function handleMouseMove(e) {
  const x = e.pageX
  const y = e.pageY
  const width = window.innerWidth
  const height = window.innerHeight

  const xPercent = x / width
  const yPercent = y / height

  const xDeg = (xPercent * 360 - 180) * -0.01
  const yDeg = (yPercent * 360 - 180) * -0.005

  scene.style.transform = `rotateX(${-yDeg}deg) rotateY(${xDeg}deg)`
}

function handleScroll(e) {
  // const delta = e.deltaY
  // progress += delta
  // const total = 1000;
  // const percent = progress / total
  // const pan = percent * window.innerHeight * 2
  // progress = Math.max(0, Math.min(total, progress))
  // bgEl.style.transform = `scale(4) translate3d(0, ${Math.min(0, -pan * 0.05)}px, -3000px)`
  // leftEl.style.transform = `scale(1.1) translate3d(0, ${Math.max(0, pan * 0.1)}px, ${Math.max(0, pan * 0.9)}px)`
  // centerEl.style.transform = `scale(1.5) translate3d(0, ${Math.max(0, pan * 0.15)}px, ${Math.max(0, pan * 0.7) - 600}px)`
  // rightEl.style.transform = `scale(1.1) translate3d(0, ${Math.max(0, pan * 0.1)}px, ${Math.max(0, pan * 0.9)}px)`
}

let progress = 0;

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

function initCards() {
  const cardList = document.querySelectorAll('.card')
  const cards = document.querySelector('.cards')

  cardList.forEach((card, i) => {
    card.style.transform =  `translate3d(-50%, -50%, calc(-${i * 200}px))`
    // card.style.filter = `blur(${i * 1}px)`;
  })

  document.addEventListener('wheel', handleWheel)
  let scrollY = -1000;
  handleWheel()
  function handleWheel(e) {
    let deltaY = e?.deltaY || 0;
    scrollY += deltaY;
    cardList.forEach((card, i) => {
      card.style.transform =  `translate3d(-50%, -50%, calc(${-i * 200 + scrollY}px)) rotateX(${(i - scrollY / 200) * 10}deg)`
      // card.style.backgroundColor = `rgb(${Math.floor(255 - i * 10)},${Math.floor(255 - i * 10)},${Math.floor(255 - i * 10)})`
      
    })
  }
}

initCards()