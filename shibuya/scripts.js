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

  const xPercent = x / width - 0.5;
  const yPercent = y / height - 0.5;

  scene.style.transform = `translate(${xPercent * -window.innerWidth / 10}px, ${yPercent * -window.innerHeight / 10}px)`
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
    card.style.transform =  `translate3d(-50%, -50%, calc(-${i * 300}px))`
  })

  document.addEventListener('wheel', handleWheel)
  handleWheel()
  function handleWheel(e) {
    const scrollY = window.scrollY;
    cardList.forEach((card, i) => {
      const z = -i * 300 - 1000 + scrollY;
      const y = Math.cos(Math.max(z, 0) * 0.004) * -300 + 300;
      const rotX = (Math.cos(Math.max(z, 0) * 0.005) - 1) * 35;
      card.style.transform =  `translate3d(-50%, calc(-50% + ${y}px), ${z}px) rotateX(${rotX}deg)`
      
    })
  }
}

initCards()