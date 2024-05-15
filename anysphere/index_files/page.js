class PageScript {
  constructor() {
    this.winH = window.innerHeight;
    this.scrollY = 0;
    this.careersTop = 0;
    this.blogTop = 0;

    this.titleMenuItems = document.querySelectorAll(".titleMenu__title");
    document.addEventListener("wheel", this.handleWheel);
    document.addEventListener("scroll", this.handleScroll);

    const setTops = () => {
      this.careersTop =
        document.querySelector(".careers__copy").offsetTop -
        window.innerHeight * 0.4 +
        146;
      this.blogTop =
        document.querySelector(".blog__copy").offsetTop -
        window.innerHeight * 0.4 +
        146;
    };
    setTops();
    window.addEventListener("resize", () => {
      setTops();
    });

    this.titleMenuItems[0].addEventListener("click", () => {
      // smooth scroll to 0, 0
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
    this.titleMenuItems[1].addEventListener("click", () => {
      window.scrollTo({
        top: this.careersTop + 4,
        left: 0,
        behavior: "smooth",
      });
    });
    this.titleMenuItems[2].addEventListener("click", () => {
      window.scrollTo({
        top: this.blogTop + 4,
        left: 0,
        behavior: "smooth",
      });
    });
  }

  handleScroll = (e) => {
    if (window.scrollY > this.careersTop - 150) {
      this.titleMenuItems[0].classList.remove("isActive");
      this.titleMenuItems[1].classList.add("isActive");
      this.titleMenuItems[2].classList.remove("isActive");
    } else {
      this.titleMenuItems[0].classList.add("isActive");
      this.titleMenuItems[1].classList.remove("isActive");
      this.titleMenuItems[2].classList.remove("isActive");
      return;
    }
    if (window.scrollY > this.blogTop - 150) {
      this.titleMenuItems[0].classList.remove("isActive");
      this.titleMenuItems[1].classList.remove("isActive");
      this.titleMenuItems[2].classList.add("isActive");
    }
  };

  handleWheel = (e) => {
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
