class PageScript {
  constructor() {
    this.winH = window.innerHeight;
    this.scrollY = 0;
    document.addEventListener("wheel", this.handleScroll);
  }

  handleScroll = (e) => {
    this.scrollY += e.deltaY;
    // get the --background-color css variable value from the body element
    const bgColor = window
      .getComputedStyle(document.body)
      .getPropertyValue("--background-color");
    // cycle through the full color spectrum as the user scrolls
    const hue = ((234 + this.scrollY * 0.05) % 360) + 1;
    const sat = 19 + Math.sin(this.scrollY * 0.0004) * 19;
    // create a radial gradient background color based on the hue so that the color changes smoothly

    // set the new background color
    document.body.style.backgroundColor = `hsl(${hue}, ${sat}%, 19%)`;
  };
}

const pageScript = new PageScript();
