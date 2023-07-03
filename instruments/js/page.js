
class PageScript {
  constructor() {
    this.winH = window.innerHeight;
    // clientside javascript here
    if (!window.location.search.includes('instrument')) {
      document.body.classList.remove('isInitialized');
    }
    this.scrollActivatedEls = document.querySelectorAll('.jsScrollActivated');
    if (this.scrollActivatedEls.length > 0) {
      this.scrollActivatedTops = this.scrollActivatedEls.map((el) => {
        el.getBoundingClientRect().top;
      })
      document.addEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll = () => {
    const scrollY = window.scrollY;
    this.scrollActivatedTops.forEach((top, i) => {
      if (scrollY > top + this.winH / 2) {
        this.scrollActivatedEls[i].classList.add('isActive');
      }
    })
  }
}

const pageScript = new PageScript();