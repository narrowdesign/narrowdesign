import {
  AmbientLight,
  Group,
  Mesh,
  MeshLambertMaterial,
  MeshNormalMaterial,
  OrthographicCamera,
  PointLight,
  Scene,
  SphereGeometry,
  TextureLoader,
  Vector3,
  Vector2,
  WebGLRenderer,
} from "./lib/three.min.js";

import {easeOutQuart} from './utils/utils.js';
import {CountryLatLng} from './CountryLatLng.js';
import {GlobeLine} from './GlobeLine.js';
import {GlobeDots} from './GlobeDots.js';

const PI2 = Math.PI * 2;
const HALF_PI = Math.PI * 0.5;
const GLOBE_ROT_X_START = Math.PI * 0.05;
const GLOBE_ROT_Y_START = Math.PI * 0.4;
const GLOBE_ROT_Y_STATIC = Math.PI * 0.1;
const GLOBE_RADIUS_MIN = 450;
const GLOBE_SEGMENTS_MIN = 30;
const GLOBE_FILL_OPACITY = 0.94;
const GLOBE_OPACITY_INCREMENT = 0.005;
const GLOBE_ROT_INCREMENT_START = 0.002;
const MIN_ROT_X = Math.PI * -0.5;
const MAX_ROT_X = Math.PI * 0.5;
const SPIN_COEFFICIENT = 0.94;
const DRAG_SCALAR = -0.003;
const MOBILE_MAX_WIDTH = 512;
const MAX_LINE_COUNT = 5;
const LINE_INTERVAL = 1000;
const LINE_LIFESPAN = 4000;
const COUNTRY_LIST = ['br', 'jp', 'de', 'mx', 'ca', 'zm'];
const ARC_TEXTURES = [
  'https://images.ctfassets.net/fzn2n1nzq965/21KQEBsC7QG4IYZV5RuhDz/d3180249af4082f42a22cb5f3ccc8e09/arc-texture-1.png',
  'https://images.ctfassets.net/fzn2n1nzq965/22Apsqcv7VIDzlCuSOEzPQ/2194c40aac8bced46d48582d5d712bf6/arc-texture-2.png',
  'https://images.ctfassets.net/fzn2n1nzq965/79YUdAMNjtlQuuFLN0RBLG/f779fbfcc31d6360893844a29ec5fb4f/arc-texture-3.png',
  'https://images.ctfassets.net/fzn2n1nzq965/7ez6kk9Dk9uuhgdRLFyhZX/220a177ca8529de208f8ae3cc3b10609/arc-texture-4.png',
];
const DISC_TEXTURE =
  'https://images.ctfassets.net/fzn2n1nzq965/2wn0qc94lx6dbfTVt1vpuO/cf3e66080a3cddeb7275a8fefbca5134/disc_texture.png';

export class Globe {
  eastCountryList = ['my', 'sg', 'au', 'nz', 'hk', 'jp', 'in'];
  westCountryList = ['ca', 'mx', 'us', 'br'];
  middleCountryList = [
    'be',
    'gb',
    'at',
    'dk',
    'ee',
    'fi',
    'fr',
    'gr',
    'de',
    'ie',
    'it',
    'lv',
    'lt',
    'lu',
    'nl',
    'no',
    'pl',
    'pt',
    'es',
    'sk',
    'si',
    'se',
    'ch',
    'cy',
    'bg',
    'ro',
    'cz',
  ];
  liveCountryList = [
    ...this.eastCountryList,
    ...this.westCountryList,
    ...this.middleCountryList,
  ];
  countryList = Object.keys(CountryLatLng);
  origin = new Vector3(0, 0, 0);
  dom = {};
  mouse = new Vector2();
  isDragging = false;
  isAutoRotating = true;
  isDiscTextureLoaded = false;
  arcTexturesLoaded = 0;
  globeOff = false;
  scrollTop = 0;
  globeOpacity = 0;
  lineCount = 0;
  currentLines = [];

  arcColors = [
    [0xf94148, 0xffcb57],
    [0xab63ea, 0x90e0ff],
    [0xf94148, 0xab63ea],
    [0xffcb57, 0x90e0ff],
  ];

  scene = new Scene();
  globeRadius = GLOBE_RADIUS_MIN;
  globeSegments = GLOBE_SEGMENTS_MIN;
  isLoaded = false;
  loaded = [];
  loading = [];
  isScrolling = false;
  isRevealed = false;
  frame = 0;
  oldRotationY = 0;
  oldRotationX = 0;
  newRotationY = 0;
  newRotationX = 0;
  globeRotationIncrement = GLOBE_ROT_INCREMENT_START;
  targetScale = 1;
  scale = 1;
  oldMouseX = 0;
  oldMouseY = 0;
  moveX = 0;
  moveY = 0;
  tension = 1;
  globeRAF = false;
  countryEls = document.querySelectorAll('.Country__btn');

  initialized = false;

  constructor(el) {
    this.el = el;
    this.load();
  }

  load() {
    this.loading.push('scene');
    // this.el.style.height = window.outerHeight;
    this.dom.container = this.el;
    this.isDotsOnly = false;
    this.isLayers = false;

    this.globeRadius = Math.min(this.el.clientWidth / 2 - 30, GLOBE_RADIUS_MIN);
    this.addRenderer();
    this.addLighting();

    this.addGlobe();
    this.addListeners();
    this.setWindowSize();
    this.addCamera();
    this.objectLoaded('scene');

    this.play();

    return true;
  }

  play() {
    if (this.initialized) {
      // this.currentLines.forEach((line) => line.play());
      // this.drawLines();
    } else {
      // this.addLines();
    }

    if (!(this.initialized && this.isStatic)) {
      this.render(this.frame);
    }

    this.initialized = true;
  }

  pause() {
    this.currentLines.forEach((line) => line.pause());
    cancelAnimationFrame(this.renderAnimationFrame);
    clearInterval(this.lineInterval);
  }

  disconnect() {
    clearInterval(this.lineInterval);

    cancelAnimationFrame(this.renderAnimationFrame);
    cancelAnimationFrame(this.throwAnimationFrame);
    window.removeEventListener('resize', this.handleResize);

    if (this.isStatic) return;
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    this.el.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleMouseUp);
    this.el.removeEventListener('mousedown', this.handleMouseDown);
  }

  setCountryList(list) {
    this.countryList = list;
  }

  addCamera() {
    const cameraTop = this.windowH * 0.5;
    const cameraLeft = -(this.aspectRatio * this.windowH) * 0.5;
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
    this.camera.updateProjectionMatrix();
  }

  addRenderer() {
    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xdddddd, 0);
    this.renderer.sortObjects = false;
    this.dom.container.appendChild(this.renderer.domElement);
  }

  addLighting() {
    const ambientLight = new AmbientLight(0x99e6fc, 1);
    this.scene.add(ambientLight);

    const backLight = new PointLight(0xc2f0fd, 2.0, 0, 2);
    backLight.position.set(-1000, -1100, -3300);
    this.scene.add(backLight);

    const frontLight = new PointLight(0xa1a5af, 0.8, 0, 20);
    frontLight.position.set(-3000, 3000, 3300);
    this.scene.add(frontLight);
  }

  addGlobe() {
    this.globeContainer = new Group();
    this.scene.add(this.globeContainer);

    this.addGlobeMap();

    this.addGlobeDots();
    this.addGlobeFill();

    this.globeContainer.position.z = -this.globeRadius * 2;
    this.globeContainer.rotation.x = this.isDotsOnly
      ? HALF_PI
      : GLOBE_ROT_X_START; // tip down a bit
    this.globeContainer.rotation.y = !this.isStatic
      ? GLOBE_ROT_Y_START
      : GLOBE_ROT_Y_STATIC;
  }

  addGlobeDots() {
    const radius = this.isLayers
      ? this.globeRadius - this.globeRadius * 0.25
      : this.globeRadius;
    this.loading.push('globeDots');
    this.globeDots = new GlobeDots(
      radius,
      () => {
        this.objectLoaded('globeDots');
      },
      this.isStatic,
      this.isDotsOnly,
    );
    this.globeMap.add(this.globeDots);
  }

  addGlobeFill() {
    this.globeFillMaterial = new MeshLambertMaterial({
      transparent: true,
      opacity: 1,
      color: 0x102038,
    });

    const radius = this.isLayers
      ? this.globeRadius - this.globeRadius * 0.5
      : this.globeRadius - 0.1;

    this.globeFillSphere = new SphereGeometry(
      radius,
      this.globeSegments,
      this.globeSegments,
    );
    this.globeFill = new Mesh(this.globeFillSphere, this.globeFillMaterial);
    this.globeMap.add(this.globeFill);
  }

  addGlobeMap() {
    this.globeMap = new Group();
    this.globeContainer.add(this.globeMap);
  }

  handleDragStart = () => {
    this.globeDots.startDragging();
    this.isDragging = true;
    this.isAutoRotating = false;
    this.oldRotationX = this.globeContainer.rotation.x;
    this.oldRotationY = this.globeContainer.rotation.y;
    this.targetScale = !this.isStatic ? 0.98 : 1;
    // $FlowFixMe
    document.documentElement.classList.add('is-globe-dragging');
  };

  handleTouchStart = (e) => {
    const touch = e.touches[0] || e.changedTouches[0];
    this.oldMouseX = touch.pageX;
    this.oldMouseY = touch.pageY;

    this.mouse.x = touch.pageX;
    this.mouse.y = touch.pageY;
    this.touchStartX = touch.pageX;
    this.touchStartY = touch.pageY;
    this.handleDragStart();
  };

  handleMouseMove = (e) => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    this.handleDragging();
  };

  handleTouchMove = (e) => {
    const touch = e.touches[0] || e.changedTouches[0];
    this.touchDistanceX = Math.abs(this.touchStartX - touch.pageX);
    this.touchDistanceY = Math.abs(this.touchStartY - touch.pageY);

    if (this.touchDistanceY > this.touchDistanceX) return;

    this.mouse.x = touch.pageX;
    this.mouse.y = touch.pageY;
    this.handleDragging();
  };

  handleMouseUp = () => {
    setTimeout(() => {
      // $FlowFixMe
      document.documentElement.classList.remove('is-globe-dragging');
    }, 20);
    this.isDragging = false;
    if (this.moveX !== 0 || Math.abs(this.moveY) > 0) {
      this.throwGlobe(this.moveX, this.moveY);
    }
    this.oldMouseX = 0;
    this.oldMouseY = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.targetScale = 1;
    this.globeDots.stopDragging();
  };

  handleMouseDown = (e) => {
    // $FlowFixMe
    document.documentElement.classList.add('is-globe-dragging');
    this.oldMouseX = e.clientX;
    this.oldMouseY = e.clientY;
    this.handleDragStart();
  };

  handleDragging = () => {
    if (!this.isDragging) return;

    this.tension = 1 + Math.abs(this.oldRotationX);
    this.tension **= this.tension;
    this.moveX = (this.oldMouseX - this.mouse.x) * DRAG_SCALAR;
    this.moveY = ((this.oldMouseY - this.mouse.y) * DRAG_SCALAR) / this.tension;
    this.newRotationY = this.resetRevolutions(this.oldRotationY + this.moveX);
    this.newRotationX = Math.max(
      MIN_ROT_X,
      Math.min(MAX_ROT_X, this.oldRotationX + this.moveY),
    );
    this.globeContainer.rotation.y = this.newRotationY;
    this.globeContainer.rotation.x = this.newRotationX;

    this.oldRotationY = this.newRotationY;
    this.oldRotationX = this.newRotationX;
    this.oldMouseX = this.mouse.x;
    this.oldMouseY = this.mouse.y;
  };

  throwGlobe(moveX, moveY) {
    const newX = moveX * SPIN_COEFFICIENT;
    const newY = moveY * SPIN_COEFFICIENT;
    const newRotationY = this.globeContainer.rotation.y + newX;
    const newRotationX = Math.max(
      MIN_ROT_X,
      Math.min(MAX_ROT_X, this.globeContainer.rotation.x + newY),
    );
    this.globeContainer.rotation.y = this.resetRevolutions(newRotationY);
    this.globeContainer.rotation.x = newRotationX;

    if (
      (Math.abs(newX) > 0.001 || Math.abs(newY) > 0.001) &&
      this.isDragging === false
    ) {
      this.throwAnimationFrame = requestAnimationFrame(() => {
        this.throwGlobe(newX, newY);
      });
    }
  }

  addLines() {
    if (this.isDotsOnly) return;
    this.circleTexture = new TextureLoader().load(DISC_TEXTURE, () => {
      this.isDiscTextureLoaded = true;
    });
    this.arcTextures = ARC_TEXTURES.map((texture) =>
      new TextureLoader().load(texture, () => {
        this.arcTexturesLoaded += 1;
      }),
    );

    this.linesContainer = new Group();
    this.globeContainer.add(this.linesContainer);

    this.drawLines();

    if (this.isLayers) {
      this.globeOuterLayerMaterial = new MeshNormalMaterial({
        transparent: true,
        opacity: 0.05,
      });

      this.globeOuterLayerSphere = new SphereGeometry(
        this.globeRadius,
        this.globeSegments,
        this.globeSegments,
      );
      this.globeOuterLayer = new Mesh(
        this.globeOuterLayerSphere,
        this.globeOuterLayerMaterial,
      );
      this.globeContainer.add(this.globeOuterLayer);
    }
  }

  drawLines() {
    if (!this.isStatic && !this.isDotsOnly) {
      clearInterval(this.lineInterval);
      this.lineInterval = setInterval(() => {
        this.drawLine();
      }, LINE_INTERVAL);

      return;
    }

    if (this.lineCount !== 0) return;

    for (let i = 0; i < MAX_LINE_COUNT; i += 1) {
      this.drawLine();
    }
  }

  drawLine() {
    this.lineCount += 1;
    const rotY = this.resetRevolutions(this.globeContainer.rotation.y);
    let startCountry = this.countryList[
      this.lineCount % this.countryList.length
    ];
    let endCountry = this.liveCountryList[
      this.lineCount % this.liveCountryList.length
    ];

    // TODO: systemetize this. These are hand-tuned values to only draw lines to visible countries
    if ((rotY < 5.7 && rotY > 4.4) || (rotY > -2 && rotY < -0.2)) {
      endCountry = this.eastCountryList[
        this.lineCount % this.eastCountryList.length
      ];
    } else if ((rotY < 4.2 && rotY > 2.2) || (rotY > -4 && rotY < -1.7)) {
      if ((rotY < -1.7 && rotY > -3) || (rotY > 3 && rotY < 4.2)) {
        startCountry = this.eastCountryList[
          this.lineCount % this.eastCountryList.length
        ];
      }
      endCountry = this.westCountryList[
        this.lineCount % this.westCountryList.length
      ];
    } else if ((rotY < 2.2 && rotY > 0.3) || (rotY > -6.28 && rotY < -4)) {
      endCountry = this.middleCountryList[
        this.lineCount % this.middleCountryList.length
      ];
    }

    if (startCountry === endCountry) {
      this.drawLine();
      return;
    }

    const startLatLng = CountryLatLng[startCountry];
    const endLatLng = CountryLatLng[endCountry];
    const arcColorNum = this.lineCount % this.arcColors.length;
    const arcColor = this.arcColors[arcColorNum];

    const line = new GlobeLine(
      startLatLng,
      endLatLng,
      arcColor,
      this.arcTextures[arcColorNum],
      this.circleTexture,
      this.globeRadius * 1.001 + Math.random() * 0.01,
      this.isStatic,
    );
    this.linesContainer.add(line);
    this.currentLines.push(line);

    if (this.isStatic) return;

    setTimeout(() => {
      this.hideLine(line);

      // Remove from lines we play/pause
      const index = this.currentLines.indexOf(line);
      if (index > -1) this.currentLines.splice(index, 1);
    }, LINE_LIFESPAN);
  }

  hideLine(line) {
    line.hideLine();
    setTimeout(() => {
      line.disposeLine();
      this.linesContainer.remove(line);
    }, 1500);
  }

  objectLoaded(item = 'x') {
    this.loaded.push(item);

    if (this.loaded.length !== this.loading.length) return;

    this.isLoaded = true;
  }

  resetRevolutions(rotY) {
    if (Math.abs(rotY / PI2) === 0) {
      return rotY;
    }
    const revolutions = Math.floor(Math.abs(rotY / PI2)) * Math.sign(rotY);
    return rotY - revolutions * PI2;
  }

  setWindowSize = () => {
    // $FlowFixMe
    this.windowW = this.el.clientWidth;
    this.windowH = this.el.clientHeight;
    this.aspectRatio = 1;
    this.renderer.setSize(this.windowW, this.windowH);
    this.oldInnerWidth = this.windowW;
  };

  addListeners() {
    window.addEventListener('resize', this.handleResize);

    if (this.isStatic) return;
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    this.el.addEventListener('touchstart', this.handleTouchStart, {
      passive: true,
    });
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    this.el.addEventListener('mousedown', this.handleMouseDown);
    this.countryEls.forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        this.isAutoRotating = false;
        // make an api call to a service on https://google.com/latlng that returns the lat/lng of any location I input so I can rotate to it
        // look up any country by name or abbreviation
        if (btn.innerText === "Mexico") {
          this.rotateGlobeTo(0.3, 0.7);
        } else if (btn.innerText === "Canada") {
          this.rotateGlobeTo(0.3, 0.7);
        } else if (btn.innerText === "Brazil") { 
          this.rotateGlobeTo(0.3, 0.7);
        } else if (btn.innerText === "Japan") {
          this.rotateGlobeTo(-0.2, -0.6)
        } else if (btn.innerText === "Germany") {
          this.rotateGlobeTo(-0.3, 2.7)
        }
        this.activateCountry(i);
      })
    })
  }

  handleResize = () => {
    // $FlowFixMe
    const {clientWidth} = document.documentElement;

    // prevents mobile triggering a resize when address bar hides
    if (this.oldInnerWidth !== clientWidth || clientWidth > MOBILE_MAX_WIDTH) {
      this.setWindowSize();
      this.addCamera();
    }
  };

  revealAnimation() {
    const progress = !this.isStatic
      ? easeOutQuart(this.globeOpacity, 0, 1, 0.5)
      : 1;

    this.globeOpacity += GLOBE_OPACITY_INCREMENT;
    this.globeFillMaterial.opacity = progress * GLOBE_FILL_OPACITY;
    this.globeRotationIncrement = GLOBE_ROT_INCREMENT_START;

    if (progress > 0.999) {
      this.isRevealed = true;
    }
  }

  autoRotateGlobe() {
    if (!this.isAutoRotating || this.isDragging || this.isScrolling) return;
    this.globeContainer.rotation.y -=
      this.globeRotationIncrement;
  }

  activateCountry(country) {
    this.globeDots.activateCountry(COUNTRY_LIST[country]);
    if (document.querySelector('.Country__btn--isActive')) {
      document.querySelector('.Country__btn--isActive').classList.remove('Country__btn--isActive');
    }
    document.querySelectorAll('.Country__btn')[country].classList.add('Country__btn--isActive');
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
          (performance.now() - startTime) / (duration * 1000),
        );
        this.globeContainer.rotation.x =
          startRotX + ratio * (x - startRotX);
        this.globeContainer.rotation.y =
          startRotY +
          ratio * (adjustedRotY - startRotY);
        if (ratio >= 1) clearInterval(this.globeRAF);
      });
    }, 1000 / 60);
  }

  render(frame = 0) {
    this.frame = frame;
    
    this.autoRotateGlobe();
    if (Math.abs(this.scale - this.targetScale) > 0.001) {
      this.scale -= 0.1 * (this.scale - this.targetScale);
      this.globeFill.scale.set(this.scale, this.scale, this.scale);
    }
    if (!this.globeOff && this.isLoaded) {
      this.globeDots.animate();

      if (!this.isRevealed) {
        this.revealAnimation();
      }

      this.renderer.render(this.scene, this.camera);
    }

    this.renderAnimationFrame = requestAnimationFrame(() => {
      if (
        this.isRevealed &&
        this.arcTexturesLoaded === ARC_TEXTURES.length &&
        this.isDiscTextureLoaded
      ) {
        this.renderer.render(this.scene, this.camera);
        return;
      }
      this.render(frame + 1.7);
    });
  }
}
