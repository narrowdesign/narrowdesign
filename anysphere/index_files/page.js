class PageScript {
  constructor() {
    this.winW = window.innerWidth;
    this.winH = window.innerHeight;
    this.scrollY = 0;
    this.careersTop = 0;
    this.blogTop = 0;
    this.sphereInitialized = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseVX = 0;
    this.mouseVY = 0;
    this.sphereCount = 0;
    this.sphereMaxCount = 1000;

    this.titleMenuItems = document.querySelectorAll(".titleMenu__title");
    document.addEventListener("wheel", this.handleWheel);
    document.addEventListener("scroll", this.handleScroll);
    document.addEventListener("mousemove", this.handleMouseMove);

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

  handleMouseMove = (e) => {
    this.mouseX = e.clientX / window.innerWidth - 0.5;
    this.mouseY = e.clientY / window.innerHeight - 0.5;
    this.mouseVX = Math.abs(e.movementX / window.innerWidth);
    this.mouseVY = Math.abs(e.movementY / window.innerHeight);
    if (!this.sphereInitialized) {
      this.sphereInitialized = true;
      this.createSphere();
    }
  };

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

  // create a 2d canvas element and draw a circle on it
  createSphere = () => {
    const canvas = document.createElement("canvas");
    canvas.width = this.winW;
    canvas.height = this.winH;
    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.009)";
      ctx.rect(0, 0, this.winW, this.winH);
      ctx.fill();
      ctx.beginPath();
      ctx.lineWidth = 2;
      // set the color based on mouse velocity
      ctx.fillStyle = `rgba(${
        20 + Math.floor((Math.sin(performance.now() * 0.0004) + 1) * 40)
      }, 20, ${
        20 + Math.floor((Math.cos(performance.now() * 0.00033) + 1) * 40)
      }, 1)`;
      ctx.arc(
        this.mouseX * this.winW + this.winW / 2,
        this.mouseY * this.winH + this.winH / 2,
        (Math.sin(performance.now() * 0.001) + 1) * 100 + 50,
        0,
        Math.PI * 2
      );
      ctx.stroke();
      ctx.fill();
    };

    const update = () => {
      draw();
      requestAnimationFrame(update);
    };
    update();
  };
}

const pageScript = new PageScript();
