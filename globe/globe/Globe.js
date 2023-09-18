import {
  AmbientLight,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  OrthographicCamera,
  PlaneGeometry,
  PointLight,
  Raycaster,
  Scene,
  SphereGeometry,
  TextureLoader,
  Vector3,
  Vector2,
  WebGLRenderer,
} from "./lib/three.min.js";

import { easeOutQuart, easeInOutQuart, delay } from "./utils/utils.js";
import { CountryLatLng } from "./CountryLatLng.js";
import { Country } from "./Country.js";
import { CountryLine } from "./CountryLine.js";
import { CountryBubble } from "./CountryBubble.js";
import { GlobeDots } from "./GlobeDots.js";
import { latLngToXYZ } from "./GlobeUtils.js";

const PI2 = Math.PI * 2;
const GLOBE_XR_START = Math.PI / 7;
const GLOBE_YR_START = Math.PI;
const MIN_ROT_X = Math.PI / -2;
const MAX_ROT_X = Math.PI / 4;
const SPIN_COEFFICIENT = 0.94;
const DRAG_SCALAR = -0.005;
const MOBILE_MAX_WIDTH = 512;
const RANDOM_LINE_INTERVAL = 1000;
const RANDOM_LINE_LIFESPAN = 4000;

export class Globe {
  constructor() {
    this.countriesList = [
      "us",
      "sg",
      "ie",
      "hk",
      "jp",
      "br",
      "mx",
      "in",
      "au",
      "nz",
      "de",
      "it",
      "pt",
      "ee",
    ];
    this.addCountries(this.countriesList);

    Object.entries({
      globeEl: ".js-globe",
      arcCountryLabel: ".js-arc-country-name",
      arcCountry: ".js-arc-country",
      arcPercentLabel: ".js-arc-percent",
    }).forEach(([key, className]) => {
      this[key] = document.querySelector(className);
    });

    this.globeEl.style.height = window.outerHeight;

    this.origin = new Vector3(0, 0, 0);

    this.dom = {};
    this.dom.container = this.globeEl;

    this.globeEngaged = false;
    this.globeDragging = false;
    this.globeRAF = false;
    this.globeOff = false;
    this.scrollTop = 0;
    this.globeOpacity = 0;
    this.mouse = new Vector2();
    this.raycastMouse = new Vector2();

    this.scene = new Scene();
    this.globeRadius =
      window.innerWidth > window.innerHeight
        ? window.innerHeight / 2.3
        : window.innerWidth / 2;
    this.globeRadius = Math.min(this.globeRadius, 350);
    this.globeSegments = Math.floor((this.globeRadius / 400) * 32) + 20;

    this.addRenderer();
    this.addLighting();

    this.isLoaded = false;
    this.loaded = [];
    this.loading = ["scene", "globeDots"]; //

    this.addBackgroundGlow();
    this.addGlobe();

    this.addWindowListeners();

    this.setWindowSize();
    this.addCamera();
    this.scrollHandler();

    this.addRaycaster();
    this.objectLoaded("scene");
  }

  addCamera() {
    this.cameraStartX = -this.globeRadius * 1.05;
    this.cameraStartY = 0;
    const cameraTop = this.windowH / 2;
    const cameraLeft = -(this.aspectRatio * this.windowH) / 2;
    const cameraDepth = this.globeRadius * 4;
    if (!this.camera) {
      this.camera = new OrthographicCamera(0, 0, 0, 0, 0, 0);
    }
    this.camera.left = cameraLeft;
    this.camera.right = -cameraLeft;
    this.camera.top = cameraTop;
    this.camera.bottom = -cameraTop;
    this.camera.near = -cameraDepth;
    this.camera.far = cameraDepth;
    this.shiftCamera();
    this.camera.updateProjectionMatrix();
  }

  shiftCamera() {
    const maxX = Math.PI / 2;
    const leftShift = !this.isSmallViewport ? 1.4 : 1;
    const cameraX = 0;
    if (this.scrollProgress < maxX) {
      this.camera.position.x = cameraX;

      const scale = 1;
      this.globeContainer.scale.set(scale, scale, scale);
    }
    this.camera.position.y =
      this.cameraStartY - this.scrollTop / (4800 / this.windowH);
  }

  addRenderer() {
    this.renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xdddddd, 0);
    this.renderer.sortObjects = false;
    this.dom.container.appendChild(this.renderer.domElement);
  }

  addLighting() {
    const ambientLight = new AmbientLight(0xf9f6fc, 1);
    this.scene.add(ambientLight);

    const backLight = new PointLight(0xccccff, 0.8, 0, 20);
    backLight.position.set(1100, -1100, -3600);
    this.scene.add(backLight);

    const pointLight = new PointLight(0xff0000, 0.1, 0, 10);
    pointLight.position.set(-2200, 2200, 3300);
    this.scene.add(pointLight);
  }

  addBackgroundGlow() {
    // this.auroraTexture = new TextureLoader().load(
    //   "img/aurora.png",
    //   this.objectLoaded("aurora")
    // );
    // this.backgroundContainer = new Group();
    // this.backgroundContainer.rotation.z = (12 * Math.PI) / 180;
    // this.backgroundContainer.position.z = -this.globeRadius * 3;
    // const backgroundPlane = new PlaneGeometry(
    //   this.globeRadius * AURORA_MAGNITUDE,
    //   this.globeRadius * AURORA_MAGNITUDE,
    //   1,
    //   1
    // );
    // [
    //   0x65f1f4, // cyan
    //   0xfdda94, // yellow
    //   0xf574a8, // magenta
    // ].forEach((color, i) => {
    //   const mesh = new Mesh(
    //     backgroundPlane,
    //     new MeshBasicMaterial({
    //       map: this.auroraTexture,
    //       transparent: true,
    //       color,
    //       opacity: 0.17,
    //     })
    //   );
    //   mesh.position.x = (-0.5 + (i % 2)) * this.globeRadius;
    //   mesh.position.y = (-0.5 + ((i / 2) % 2)) * this.globeRadius * 0.5;
    //   mesh.position.z = i * 0.01;
    //   this.backgroundContainer.add(mesh);
    // });
    // this.scene.add(this.backgroundContainer);
  }

  addGlobe() {
    this.globeContainer = new Group();
    this.scene.add(this.globeContainer);

    this.addGlobeListeners();

    this.addGlobeMap();

    this.addGlobeDots();

    this.addCountriesContainer();
    //this.addGlobeAurora();
    // this.addMapFill();
    this.addGlobeFill();

    this.globeContainer.position.z = -this.globeRadius * 2;
    this.globeContainer.rotation.x = GLOBE_XR_START; // tip down a bit
    this.globeContainer.rotation.y = GLOBE_YR_START;
  }

  addGlobeAurora() {
    // this.auroraFrame = 0;
    // const globeAuroraPlane = new PlaneGeometry(
    //   this.globeRadius * AURORA_MAGNITUDE,
    //   this.globeRadius * AURORA_MAGNITUDE,
    //   1,
    //   1
    // );
    // this.globeAuroraMaterial = new MeshBasicMaterial({
    //   map: this.auroraTexture,
    //   transparent: true,
    //   color: 0x65f1f4,
    //   opacity: 0,
    // });
    // this.globeAuroraMaterial2 = new MeshBasicMaterial({
    //   map: this.auroraTexture,
    //   transparent: true,
    //   color: 0xf574a8,
    //   opacity: 0,
    // });
    // this.globeAuroraMesh = new Mesh(globeAuroraPlane, this.globeAuroraMaterial);
    // this.globeAuroraMesh2 = new Mesh(
    //   globeAuroraPlane,
    //   this.globeAuroraMaterial2
    // );
    // this.scene.add(this.globeAuroraMesh);
    // this.scene.add(this.globeAuroraMesh2);
    // this.globeAuroraMesh.position.set(0, -40, -this.globeRadius * 3 + 0.1);
    // this.globeAuroraMesh2.position.set(120, 140, -this.globeRadius * 3 + 0.1);
  }

  addMapFill() {
    const mapFillTexture = new TextureLoader().load(
      "img/map_fill.png",
      (map) => {
        this.objectLoaded("map_fill");
      }
    );

    mapFillTexture.anisotropy = 8;
    this.mapFillMaterial = new MeshLambertMaterial({
      map: mapFillTexture,
      color: 0xffffff,
      premultipliedAlpha: true,
      alphaTest: 0.1,
      transparent: true,
      side: DoubleSide,
      opacity: 0,
    });
    this.mapFillMaterial.needsUpdate = true;

    // const mapFillSphere = new SphereGeometry(
    //   this.globeRadius - 0.1,
    //   this.globeSegments,
    //   this.globeSegments
    // );

    // this.globeMapFill = new Mesh(mapFillSphere, this.mapFillMaterial);
    // this.globeMap.add(this.globeMapFill);
  }

  addGlobeDots() {
    this.globeDots = new GlobeDots(this.globeRadius, () => {
      this.objectLoaded("globe dots");
    });
    this.globeMap.add(this.globeDots);
  }

  addGlobeFill() {
    this.globeFillMaterial = new MeshLambertMaterial({
      transparent: true,
      opacity: 0.95,
      alphaTest: 0.1,
      color: 0x102038,
    });

    this.globeFillSphere = new SphereGeometry(
      this.globeRadius - 1,
      this.globeSegments,
      this.globeSegments
    );
    this.globeFill = new Mesh(this.globeFillSphere, this.globeFillMaterial);

    this.globeMap.add(this.globeFill);
  }

  addGlobeMap() {
    this.globeMap = new Group();
    this.globeContainer.add(this.globeMap);
  }

  addCountriesContainer() {
    this.countriesContainer = new Group();
    this.globeContainer.add(this.countriesContainer);
  }

  addGlobeListeners() {
    let oldRotationY;
    let oldRotationX;
    let newRotationY;
    let newRotationX;
    let oldMouseX;
    let oldMouseY;
    let moveX = 0;
    let moveY = 0;
    let tension = 1;

    const mouseDownHandler = () => {
      this.globeEngaged = true;
      this.globeDragging = true;
      clearInterval(this.globeRAF);
      oldRotationX = this.globeContainer.rotation.x;
      oldRotationY = this.globeContainer.rotation.y;
    };

    const mouseMoveHandler = () => {
      if (this.globeDragging) {
        tension = 1 + Math.abs(oldRotationX);
        tension **= tension;
        moveX = (oldMouseX - this.mouse.x) * DRAG_SCALAR;
        moveY = ((oldMouseY - this.mouse.y) * DRAG_SCALAR) / tension;
        if (this.isSmallViewport) {
          moveY = 0;
        }
        newRotationY = oldRotationY + moveX;
        newRotationX = Math.max(
          MIN_ROT_X,
          Math.min(MAX_ROT_X, oldRotationX + moveY)
        );
        this.globeContainer.rotation.y = this.resetRevolutions(newRotationY);
        this.globeContainer.rotation.x = newRotationX;

        oldRotationY = this.globeContainer.rotation.y;
        oldRotationX = this.globeContainer.rotation.x;
        oldMouseX = this.mouse.x;
        oldMouseY = this.mouse.y;
      } else if (
        this.activeCountry &&
        this.mouse.y + this.scrollTop < this.globeTriggerTop - 200
      ) {
        this.raycastMouse.x = (this.mouse.x / this.windowW) * 2 - 1;
        this.raycastMouse.y = -(this.mouse.y / this.windowH) * 2 + 1;
        this.detectLineHover();
      }
    };

    const mouseUpHandler = () => {
      setTimeout(() => {
        document.documentElement.classList.remove("is-globe-dragging");
      }, 20);
      this.globeDragging = false;
      if (moveX !== 0 || Math.abs(moveY) > 0) {
        this.throwGlobe(moveX, moveY);
      }
      oldMouseX = 0;
      oldMouseY = 0;
      moveX = 0;
      moveY = 0;
    };

    window.addEventListener("keypress", (e) => {
      if (this.countriesList[e.key]) {
        this.activateCountry(this.countriesList[e.key]);
      }
    });

    this.globeEl.addEventListener("mousedown", (e) => {
      document.documentElement.classList.add("is-globe-dragging");
      document.documentElement.classList.remove("is-selecting-text");
      oldMouseX = e.clientX;
      oldMouseY = e.clientY;
      mouseDownHandler();
    });

    window.addEventListener("mouseup", () => {
      document.documentElement.style.overflow = "initial";
      mouseUpHandler();
    });

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      mouseMoveHandler();
    });

    this.globeEl.addEventListener("touchstart", (e) => {
      if (this.scrollTop > 600) {
        const touch = e.touches[0] || e.changedTouches[0];
        oldMouseX = touch.pageX;
        oldMouseY = touch.pageY;

        this.mouse.x = touch.pageX;
        this.mouse.y = touch.pageY;
        this.touchStartX = touch.pageX;
        this.touchStartY = touch.pageY;
        mouseDownHandler();
      }
    });

    window.addEventListener("touchmove", (e) => {
      if (this.scrollTop > 600) {
        const touch = e.touches[0] || e.changedTouches[0];
        this.moveX = this.mouse.x - touch.pageX;
        this.moveY = this.mouse.y - touch.pageY;
        this.touchDistanceX = Math.abs(this.touchStartX - touch.pageX);
        this.touchDistanceY = Math.abs(this.touchStartY - touch.pageY);

        if (this.touchDistanceY > this.touchDistanceX) return;
        this.mouse.x = touch.pageX;
        this.mouse.y = touch.pageY;

        mouseMoveHandler();
      }
    });

    window.addEventListener("touchend", () => {
      if (this.scrollTop > 600) {
        mouseUpHandler();
      }
    });
  }

  addRaycaster() {
    this.raycaster = new Raycaster();
  }

  throwGlobe(moveX, moveY) {
    const newX = moveX * SPIN_COEFFICIENT;
    const newY = moveY * SPIN_COEFFICIENT;
    const newRotationY = this.globeContainer.rotation.y + newX;
    const newRotationX = Math.max(
      MIN_ROT_X,
      Math.min(MAX_ROT_X, this.globeContainer.rotation.x + newY)
    );
    this.globeContainer.rotation.y = this.resetRevolutions(newRotationY);
    this.globeContainer.rotation.x = newRotationX;

    if (
      (Math.abs(newX) > 0.001 || Math.abs(newY) > 0.001) &&
      this.globeDragging === false
    ) {
      requestAnimationFrame(() => {
        this.throwGlobe(newX, newY);
      });
    }
  }

  addCountries(countryCodes, countryNames) {
    this.region = "world";
    this.activeCountryData = "";
    this.countries = [];
    this.countryNames = countryNames;
    this.lines = [];
    this.discTexture = new TextureLoader().load("img/country_disc.png");

    // this.discShadowTexture = new TextureLoader().load(
    //   "img/country_disc_shadow.png"
    // );

    delay(() => {
      countryCodes.forEach((countryCode) => {
        this.addCountry(countryCode);
      });
      this.addLines();
      this.objectLoaded("countries");
    }, 1000);
  }

  addCountry(countryCode) {
    const lat = CountryLatLng[countryCode][0];
    const long = CountryLatLng[countryCode][1];
    const sphereCoords = latLngToXYZ(lat, long, this.globeRadius);

    const country = new Country(
      sphereCoords,
      countryCode,
      this.discTexture,
      this.discShadowTexture
    );

    this.countriesContainer.add(country);
    this.countries.push(country);
  }

  activateCountry(countryCode) {
    if (this.countries) {
      this.globeEngaged = true;
      this.rotateToCountry(countryCode, 500);

      this.activeCountry = this.countries.find(
        (country) => country.countryCode === countryCode
      );
      this.activeCountry.activate();

      this.populateCountryData(countryCode);
    } else {
      // in case it hasn't finished building
      setTimeout(() => {
        this.activateCountry(countryCode);
      }, 200);
    }
  }

  rotateToCountry(countryCode, delay) {
    const lat = CountryLatLng[countryCode][0] / 90 - Math.PI / 10; // converts from rads to degrees
    const rotXScalar = 1 + Math.abs(1 - lat) * 0.4;
    const long = CountryLatLng[countryCode][1] / -65 + Math.PI / 2.25;
    setTimeout(() => {
      this.rotateGlobeTo(lat * rotXScalar, long);
    }, delay);
  }

  deactivateCountry() {
    const active =
      this.countries && this.countries.find((country) => country.active);
    if (active) {
      active.deactivate();
      for (let i = this.linesContainer.children.length - 1; i >= 0; i--) {
        this.linesContainer.remove(this.linesContainer.children[i]);
      }
      this.lines = [];
    }
  }

  populateCountryData(countryCode) {
    this.drawCountryLines(countryCode);
  }

  drawCountryLines(countryCode) {
    const line = new CountryLine(
      CountryLatLng.us,
      CountryLatLng[countryCode],
      this.arcTexture,
      this.globeRadius
    );
    line.showLine();
    this.linesContainer.add(line);
    this.lines.push(line);

    // const bubble = new CountryBubble(
    //   CountryLatLng[countryCode],
    //   this.globeRadius
    // );
    // bubble.showBubble();
    // this.linesContainer.add(bubble);
    // this.lines.push(bubble);

    // setTimeout(() => {
    //   if (this.activeCountry.countryCode === countryCode) {
    //     this.rotateToCountry('us', 0);
    //   }
    //   line.hideLine();
    //   setTimeout(() => {
    //     if (this.activeCountry.countryCode === countryCode) {
    //       this.activeCountry.disc.hide();
    //     }
    //   }, 5000);
    // }, 7000);
  }

  drawRandomLines() {
    this.randomLinesContainer = new Group();
    this.globeContainer.add(this.randomLinesContainer);

    this.liveCountriesList = this.countries.map((country) => {
      return country.countryCode;
    });
    setInterval(() => {
      if (this.activeCountry || this.region !== "world") return;
      this.drawRandomLine();
    }, RANDOM_LINE_INTERVAL);
  }

  drawRandomLine() {
    if (!this.isScrolling) {
      let startCountry = "us";
      let endCountry = "br";
      if (this.randomLinesContainer.children.length === 1) {
        startCountry = "br";
        endCountry = "ie";
      } else if (this.randomLinesContainer.children.length > 1) {
        startCountry = this.liveCountriesList[
          Math.floor(Math.random() * this.liveCountriesList.length)
        ];
        endCountry = this.liveCountriesList[
          Math.floor(Math.random() * this.liveCountriesList.length)
        ];
      }
      if (startCountry === endCountry) {
        this.drawRandomLine();
        return;
      }

      const startLatLng = CountryLatLng[startCountry];
      const endLatLng = CountryLatLng[endCountry];

      const line = new CountryLine(
        startLatLng,
        endLatLng,
        this.arcTexture,
        this.globeRadius,
        "random"
      );
      line.showLine();
      this.randomLinesContainer.add(line);

      setTimeout(() => {
        this.hideRandomLine(line);
      }, RANDOM_LINE_LIFESPAN);
    }
  }

  hideRandomLines() {
    if (this.randomLinesContainer) {
      this.randomLinesContainer.children.forEach((line) => {
        this.hideRandomLine(line);
      });
    }
  }
  hideRandomLine(line) {
    line.hideLine();
    delay(() => {
      line.disposeLine();
      this.randomLinesContainer.remove(line);
    }, 2000);
  }

  addLines() {
    this.arcTexture = new TextureLoader().load("img/arc_texture.png");
    this.linesContainer = new Group();
    this.globeContainer.add(this.linesContainer);
  }

  detectLineHover() {
    if (this.linesContainer.children[0]) {
      this.raycaster.setFromCamera(this.raycastMouse, this.camera);
      const intersects = this.raycaster.intersectObjects(
        this.linesContainer.children,
        true
      );
      const mouseX = this.mouse.x - 30;
      const mouseY = this.mouse.y - 44;
      if (intersects.length > 0 && intersects[0].object) {
        const line = intersects[0].object;
        if (this.arcAbbr) {
          this.arcCountry.classList.remove(`common-FlagIcon--${this.arcAbbr}`);
        }
        this.arcAbbr = line.abbr;
        if (!this.arcAbbr) return;
        this.arcName = line.name;
        if (this.arcAbbr === "cn") {
          this.arcName = "China"; // only current exception. create a lookup if it grows
        }
        this.arcPercent = line.percent;
        this.arcCountry.classList.add(`common-FlagIcon--${this.arcAbbr}`);
        this.arcCountryLabel.innerText = ` ${this.arcName}`;
        this.arcPercentLabel.innerText = `${this.arcPercent} `;
      }
    }
  }

  objectLoaded(item = "x") {
    this.loaded.push(item);

    if (this.loaded.length === this.loading.length) {
      this.isLoaded = true;
      this.render();
    }

    if (item === "countries") {
      setTimeout(() => {
        this.drawRandomLines();
      }, 2000);
    }
  }

  rotateGlobeTo(x, y) {
    const startRotX = this.globeContainer.rotation.x;
    const startRotY = this.globeContainer.rotation.y;
    const startTime = performance.now();
    const adjustedRotY = this.resetRevolutions(y);
    const duration = 1;

    clearInterval(this.globeRAF);
    this.globeRAF = setInterval(() => {
      requestAnimationFrame(() => {
        const ratio = Math.min(
          1,
          (performance.now() - startTime) / (duration * 2000)
        );
        this.globeContainer.rotation.x =
          startRotX + easeInOutQuart(ratio, 0, 1, duration) * (x - startRotX);
        this.globeContainer.rotation.y =
          startRotY +
          easeInOutQuart(ratio, 0, 1, duration) * (adjustedRotY - startRotY);
        if (ratio >= 1) clearInterval(this.globeRAF);
      });
    }, 1000 / 60);
  }

  resetRevolutions(rotY) {
    if (Math.abs(rotY / PI2) === 0) {
      return rotY;
    }
    const revolutions = Math.floor(Math.abs(rotY / PI2)) * Math.sign(rotY);
    return rotY - revolutions * PI2;
  }

  scrollHandler() {
    // if (this.globeDragging && !this.isSmallViewport) {
    //   document.documentElement.style.overflow = 'hidden';
    // }
    // this.isScrolling = true;
    // if (this.scrollingTimeout) this.scrollingTimeout();
    // this.scrollingTimeout = delay(() => {
    //   this.scrollingTimeout = undefined;
    //   this.isScrolling = false;
    // }, 300);
    // this.oldScrollTop = this.scrollTop;
    // this.scrollTop = document.scrollingElement.scrollTop;
    // this.scrollDelta = this.oldScrollTop - this.scrollTop;
    // this.scrollProgress = this.scrollTop / SCROLL_RANGE;
    // let rotateY = this.scrollDelta * 0.0016;
    // if (this.activeCountry) {
    //   rotateY = this.scrollDelta * 0.0011;
    // }
    // this.globeContainer.rotation.y = this.resetRevolutions(
    //   this.globeContainer.rotation.y + rotateY,
    // );
    // this.backgroundContainer.position.y =
    //   -this.globeRadius * 2 + this.scrollTop / 2;
    // this.shiftCamera();
    // if (this.globeTriggerTop < this.scrollTop) {
    //   this.globeOff = true;
    //   this.globeEl.style.transform = 'translateX(100vw)';
    // } else {
    //   this.globeOff = false;
    //   this.globeEl.style.transform = 'translateX(0)';
    // }
  }

  setWindowSize() {
    this.windowW = document.documentElement.clientWidth;
    this.windowH = window.innerHeight;
    if (this.windowW > MOBILE_MAX_WIDTH) {
      this.isSmallViewport = false;
    } else {
      this.isSmallViewport = true;
      this.windowH = window.outerHeight;
    }
    this.aspectRatio = this.windowW / this.windowH;
    this.renderer.setSize(this.windowW, this.windowH);
    this.oldInnerWidth = this.windowW;
  }

  resizeWindow() {
    this.setWindowSize();
    this.addCamera();
    this.scrollHandler();
  }

  addWindowListeners() {
    window.addEventListener("resize", () => {
      // prevents mobile triggering a resize when address bar hides
      if (
        this.oldInnerWidth !== document.documentElement.clientWidth ||
        document.documentElement.clientWidth > 800
      ) {
        this.resizeWindow();
      }
    });
    document.addEventListener("scroll", this.universalScrollHandler);
    document.addEventListener("wheel", this.universalScrollHandler);
  }

  universalScrollHandler = this.scrollHandler.bind(this);

  auroraAnimation() {
    const opacityRamp = this.auroraFrame * 0.025;
    const opacity =
      ((Math.sin(opacityRamp) * 0.5 + 0.5) * 0.37 + 0.1) *
      Math.min(1, opacityRamp);
    const opacity2 =
      ((Math.cos(opacityRamp) * 0.5 + 0.5) * 0.37 + 0.1) *
      Math.min(1, opacityRamp);
    this.globeAuroraMaterial.opacity = opacity;
    this.globeAuroraMaterial2.opacity = opacity2;
    this.auroraFrame++;
  }

  revealAnimation() {
    let ratio;

    if (this.globeOpacity < 1) {
      this.globeOpacity += 0.005;

      ratio = easeOutQuart(this.globeOpacity, 0, 1, 1);
      const scale = 0.6 + ratio * 0.4;

      // this.mapFillMaterial.opacity = ratio;
      // this.globeFillMaterial.opacity = ratio * 0.9;

      if (!this.globeEngaged) {
        this.globeContainer.scale.set(scale, scale, scale);
        this.globeContainer.rotation.y = this.resetRevolutions(
          this.globeContainer.rotation.y - (1 - ratio) * 0.05
        );
      }
    }

    if (ratio > 0.92 && !this.globeVisible) {
      this.globeVisible = true;
      //this.auroraStartFrame = this.frame;
    }

    if (
      this.globeOpacity < 1 &&
      ratio > 0.92 &&
      !this.globeVisible &&
      this.globeEngaged
    ) {
      this.revealed = true;
    }
  }

  render(frame = 0) {
    this.frame = frame;
    if (!this.globeEngaged) {
      this.globeContainer.rotation.y -= 0.001;
    }
    if (!this.globeOff && this.isLoaded) {
      this.globeDots.animate();
      if (!this.globeDragging && !this.isScrolling) {
        //this.auroraAnimation();
      }
      if (!this.revealed) {
        this.revealAnimation();
      }

      this.renderer.render(this.scene, this.camera);

      this.donePerfTesting = true;
    }
    requestAnimationFrame(() => {
      this.render(frame + 1);
    });
  }
}
