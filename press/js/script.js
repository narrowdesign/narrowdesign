window.onbeforeunload = function() {
  document.scrollingElement.scrollTo(0, 0);
};

const isTyler = location.search.includes('?tyler');
const tylerColor = location.search.substr(location.search.indexOf('0x'));
if (isTyler) {
  document.body.classList.add('isTyler');
}
const isDevMode = location.search.includes('?dev');

const IPHONE = /iPhone/.test(navigator.userAgent); // used to account for address bar show/hide

// SETTINGS
const INITIALIZED_CLASS = 'isInitialized';
const DEV_CLASS = 'isDev';
const ACTIVE_PRODUCT_CLASS = 'isActiveProduct';
const DRAGGING_CLASS = 'isDragging';
const SCROLLING_CLASS = 'isScrolling';
const ACTIVE_CLASS = 'isActive';
const CANVAS_CLASS = 'PressHomepageCanvas';
const CANVAS_HEIGHT = 1018;
const SCREEN_WIDTH = 1792;
const MAX_CANVAS_WIDTH = 1400;
const MAX_CANVAS_ASPECT = MAX_CANVAS_WIDTH / CANVAS_HEIGHT;
const XSMALL_SCREEN_WIDTH = 600;
const SMALL_SCREEN_WIDTH = 900;
const CAMERA_SCROLL_RATIO = 0.0222;
const CAMERA_SCROLL_RATIO_ACTIVE = 0.027;
const CAMERA_SCROLL_RATIO_ACTIVE_MOBILE = 0.04;
const CAMERA_START_Y = 6.5;
const CAMERA_POSITION_Z = 100;
const BOOK_POSITION_Z = -3;
const BOOK_TRIGGER_PERCENT = 0.35;
const BOOK_TRIGGER_PERCENT_MOBILE = 0.35;
const ACTIVE_BOOK_POSITION_X_MOBILE = 0;
const ACTIVE_BOOK_POSITION_X = isTyler ? 0 : -13;
const ACTIVE_BOOK_POSITION_Y = -4;
const ACTIVE_BOOK_POSITION_Z_MOBILE = -90;
const ACTIVE_BOOK_POSITION_Z = -56;
const INACTIVE_BOOK_POSITION_X_MOBILE = 0;
const INACTIVE_BOOK_POSITION_X = -13;
const INACTIVE_BOOK_POSITION_Y = -4;
const INACTIVE_BOOK_POSITION_Z = -50;
const MOUSE_ROTATION_FORCE = 0.00015;
const DRAG_ROTATION_FORCE = 0.003;
const ACTIVE_SCROLL_ROTATION_FORCE = 0.0004;
const ACTIVE_SCROLL_ROTATION_FORCE_MOBILE = 0.0008;
const MAX_TRANSITION_SPEED = 0.15;
const HALF_PI = Math.PI * 0.5;
const TWO_PI = Math.PI * 2;
const MOBILE_MAX_WIDTH = 800;
const COLOR_HEX_STRING = '#ffffff';
const BG_HEX = 0x211815;
const BG_HEX_STRING = '#211815';
const SCROLL_FRICTION = 0.4;
const INITIAL_BOOK_ROTATION_X = -0.7;
const INITIAL_BOOK_GAP = 10;
const TRANSITION_SPEED_INCREMENT = 0.006;

const canvasContainerEl = document.querySelector(
  '.PressHomepageCanvas__container',
);
const introNameEl = document.querySelector('.PressHomepageIntro__name');
const introTaglineEl = document.querySelector('.PressHomepageIntro__tagline');
const productListContainerEl = document.querySelector(
  '.PressHomepageProductList__container',
);
const bookListEls = document.querySelectorAll(
  '.PressHomepageBook',
);
const bookTitleEls = document.querySelectorAll(
  '.PressHomepageBook__title',
);
const bookAuthorEls = document.querySelectorAll(
  '.PressHomepageBook__author',
);
const bookDescriptionTextEl = document.querySelector(
  '.PressHomepageBookDescription__text',
);
const productDetailsEls = document.querySelectorAll(
  '.PressHomepageProductDetails',
);
const productDetailsListEl = document.querySelector(
  '.PressHomepageProductDetailsList',
);
const bookDetailsTitleEls = document.querySelectorAll(
  '.PressHomepageBookDetails__title',
);
const bookDetailsAuthorEls = document.querySelectorAll(
  '.PressHomepageBookDetails__author',
);
const bookDetailsSummaryEls = document.querySelectorAll(
  '.PressHomepageBookDetails__summary',
);
const bookDetailsBuyEls = document.querySelectorAll(
  '.PressHomepageBookDetails__buy',
);
const bookDetailsAuthorIntroNameEls = document.querySelectorAll(
  '.PressHomepageBookDetails__authorIntroName',
);
const bookDetailsAuthorIntroEls = document.querySelectorAll(
  '.PressHomepageBookDetails__authorIntro',
);
const bookDetailsAuthorBioEls = document.querySelectorAll(
  '.PressHomepageBookDetails__authorBio',
);
const bookDetailsAuthorLinkGroupEls = document.querySelectorAll(
  '.PressHomepageBookDetails__authorLinkGroup',
);
const bookDetailsZineEls = document.querySelectorAll(
  '.PressHomepageBookDetails__zine',
);
const bookDetailsZineCoverEls = document.querySelectorAll(
  '.PressHomepageBookDetails__zineCover',
);
const bookDetailsVideoEls = document.querySelectorAll(
  '.PressHomepageBookDetails__video',
);
const bookDetailsVideoPosterEls = document.querySelectorAll(
  '.PressHomepageBookDetails__videoPoster',
);
const bookDetailsVideoTitleEls = document.querySelectorAll(
  '.PressHomepageBookDetails__videoTitle',
);
const bookDetailsPraiseContainerEls = document.querySelectorAll(
  '.PressHomepageBookDetails__praiseContainer',
);
const bookDetailsPraiseCarouselEls = document.querySelectorAll(
  '.PressHomepageBookDetails__praiseCarousel',
);
const filmPlayEl = document.querySelectorAll('.PressHomepageFilmDetails__play');
const filmEl = document.querySelector(
  '.PressHomepageFilm',
);
const productListEls = [...bookListEls, filmEl];
const filmOverlayEl = document.querySelector('.PressHomepageFilmOverlay');
const filmOverlayTrailerEl = document.querySelector('.PressHomepageFilmOverlay__trailer');
const filmTickerEl = document.querySelector('.PressHomepageFilmDetails__tickerText');
const filmHandEl = document.querySelector('.PressHomepageFilmDetails__hand');
const earthBlueDotEl = document.querySelector(
  '.PressHomepageFilmDetails__earthBlueDot',
);
const earthBrownEl = document.querySelector('.PressHomepageFilmDetails__earthBrown');
const earthCueBallEl = document.querySelector(
  '.PressHomepageFilmDetails__earthCueBall',
);
const earthInsideEl = document.querySelector(
  '.PressHomepageFilmDetails__earthInside',
);
const earthPinkBack_el = document.querySelector(
  '.PressHomepageFilmDetails__earthPinkBack',
);
const earthPinkFront_el = document.querySelector(
  '.PressHomepageFilmDetails__earthPinkFront',
);
const earthPinkInside_el = document.querySelector(
  '.PressHomepageFilmDetails__earthPinkInside',
);
const earthRedCircleEl = document.querySelector(
  '.PressHomepageFilmDetails__earthRedCircle',
);
const earthShellEl = document.querySelector(
  '.PressHomepageFilmDetails__earthShell',
);
const earthYellowBackEl = document.querySelector(
  '.PressHomepageFilmDetails__earthYellowBack',
);
const earthYellowFrontEl = document.querySelector(
  '.PressHomepageFilmDetails__earthYellowFront',
);
const earthYellowInsideEl = document.querySelector(
  '.PressHomepageFilmDetails__earthYellowInside',
);

const logoEl = document.querySelector('.PressHomepageMenu__logo');
const aboutBtnEl = document.querySelector('.PressHomepageMenu__about');
const returnEl = document.querySelector('.PressHomepageMenu__return');
const menuBookListEl = document.querySelector(
  '.PressHomepageMenu__bookList',
);
const filmIndicatorEl = document.querySelector('.PressHomepageMenu__film');
const productIndicatorEls = [];
const aboutEl = document.querySelector('.PressHomepageAboutSection');
let menuEls = [];

const backgroundColor = BG_HEX;
let screenWidth = window.innerWidth;
let canvasWidth = Math.min(MAX_CANVAS_WIDTH, screenWidth);
let canvasHeight = window.innerHeight;
let canvasCenterX = window.innerWidth * 0.5;
let canvasCenterY = canvasHeight * 0.5;
let canvasScale = 1;
let coverImageWidth = 1920; //canvasWidth === 1400 ? 1680 : Math.max(1100, Math.ceil(canvasWidth / 100) * 100 + 200);
let coverImageQuality = 60;
let coverImageFormat = 'webp';

let isIntroDone = false;
let isScrolling = false;
let isInitialized = false;
let isFilmOverlayInitialized = false;
let isDragging = false;
let wasDragging = false;
let isTwirling = false;
let isWindowBlurred = false;
let isTransitioning = false;
let isSmallScreen = document.documentElement.clientWidth < SMALL_SCREEN_WIDTH;
let isXSmallScreen = document.documentElement.clientWidth < XSMALL_SCREEN_WIDTH;

let books = [];
let activeProduct;
let activeProductIndex;
let oldActiveProductIndex;
let centerProductIndex = 0;
let hoveredBookSpine;
let hoveredBookSpineIndex;
let hoveredBookSpineTop = 0;

let films = [];

let scrollY = 0;
let oldScrollY = 0;
let activeScrollY = 0;
let scrollVelocity = 0;
let scrollTimeout;
let scrollTicking = false;
let scrollTarget = 0;

let mouseY = canvasCenterX;
let mouseX = canvasCenterY;
let mouseDownX = 0;
let mouseDownY = 0;
let yAxisDirection = 1; // flips between 1/-1 depending on cover.rotation.x
let dragStartRotationX = 0;
let dragStartRotationY = 0;
let dragEndRotationX = 0;
let dragEndRotationY = 0;
let bookCoverDragRotationX = 0;
let bookCoverDragRotationY = 0;
let mouseRotationX;
let mouseRotationY;
let oldMouseRotationX;
let oldMouseRotationY;
let bookTwirlX = 0;
let bookTwirlY = 0;

let screenHeightRatio = 1;
let activeScrollRatio;
let mainScrollRatio;
let cameraScrollRatio = CAMERA_SCROLL_RATIO;
let currentTransitionSpeed = 0;
let detailsContainerHeight;
let mainContainerHeight;
let detailsHeights = [];
let detailsTops = [];
let productListTops = [];
let praiseTops = [];
let menuTops = [];
let aboutMarginTop = 0;
let tickerTop = 0;

let canvasProperties = {
  exposure: 1,
  camera: {
    position: {
      x: 0,
      y: CAMERA_START_Y, // updates on scroll
      z: 100, // updates on resize for smaller screens
      startY: CAMERA_START_Y,
    },
    rotation: {
      x: -0.06,
      xSmallX: -0.09,
    },
    fov: isXSmallScreen ? 15 : 12,
  },
  bookSpine: {
    gap: -6,
    draggingGap: 20,
    position: {
      x: 0,
      y: -0.1,
      z: BOOK_POSITION_Z, // updates on resize for smaller screens
    },
    rotation: {
      x: -HALF_PI,
      y: 0,
      z: HALF_PI,
    },
    cover: {
      position: {
        x: 11,
      },
      rotation: {
        x: 0,
        y: -HALF_PI,
        order: 'ZYX', // avoids gimble lock
      },
    },
  },
  hoveredBookSpine: {
    position: {
      z: 6,
    },
    rotation: {
      x: -Math.PI * 0.45,
    },
  },
  activeBook: {
    position: {
      x: ACTIVE_BOOK_POSITION_X, // updates on resize for smaller screens
      y: ACTIVE_BOOK_POSITION_Y,
      z: ACTIVE_BOOK_POSITION_Z,
    },
    rotation: {
      x: -0.5,
      y: 0.35,
      z: 0.18,
    },
    cover: {
      position: {
        x: 0,
      },
      rotation: {
        order: 'XYZ', // avoids gimble lock
      },
    },
  },
  inactiveBook: {
    position: {
      x: INACTIVE_BOOK_POSITION_X, // updates on resize for smaller screens
      y: INACTIVE_BOOK_POSITION_Y,
      z: INACTIVE_BOOK_POSITION_Z,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    cover: {
      position: {
        x: 0,
      },
      rotation: {
        order: 'XYZ', // avoids gimble lock
      },
    },
  },
  filmPoster: {
    active: {
      position: {
        z: -113,
        y: -85,
        y_small_screen: -87,
      }
    },
    inactive: {
      position: {
        z: -200,
        y: -125,
        y_small_screen: -127,
      }
    }
  },
  ambientLight: {
    color: 0xf1e3e3,
    intensity: 0.4,
  },
  environmentLight: {
    intensity: 0.22,
  },
  backLight: {
    color: 0xffe6cc,
    intensity: 0.4,
    position: {
      x: -32,
      y: 12,
      z: -16,
    },
  },
  frontLight: {
    color: 0xeeffff,
    intensity: 0.6,
    position: {
      x: 4,
      y: 9.5,
      z: 6,
      zActive: 2
    },
  },
  spotlight: {
    color: 0xcceecc,
    angle: 0.25,
    intensity: 0.5,
    activeIntensity: 0.2,
    penumbra: 1,
    position: {
      x: 24,
      y: 5.4,
      z: 1,
    },
    target: {
      position: {
        x: -6,
        activeX: -11,
        y: -8,
        z: -6.5,
        activeZ: -55,
      },
    },
  },
};

initUI();

// Create scene (camera / renderer)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  canvasProperties.camera.fov,
  canvasWidth / canvasHeight,
  1,
  650,
);
let target;
const renderer = new THREE.WebGLRenderer({antialias: false, alpha: true});
camera.position.set(
  canvasProperties.camera.position.x,
  canvasProperties.camera.position.y,
  canvasProperties.camera.position.z,
);
camera.rotation.x = isXSmallScreen
  ? canvasProperties.camera.rotation.xSmallX
  : canvasProperties.camera.rotation.x;
camera.aspect = canvasWidth / canvasHeight;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvasWidth, canvasHeight);
renderer.setClearColor(BG_HEX, 0);
renderer.powerPreference = 'high-performance';
renderer.domElement.classList.add(CANVAS_CLASS);

// 

canvasContainerEl.appendChild(renderer.domElement);
const MAX_ANISOTROPY = renderer.capabilities.getMaxAnisotropy();

// setupRenderTarget();

function setupRenderTarget() {

  if ( target ) target.dispose();

  target = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
  target.texture.format = THREE.RGBAFormat;
  target.texture.minFilter = THREE.NearestFilter;
  target.texture.magFilter = THREE.NearestFilter;
  target.texture.generateMipmaps = false;
  target.stencilBuffer = false;
  target.depthBuffer = true;
  target.depthTexture = new THREE.DepthTexture();
  target.depthTexture.format = THREE.DepthFormat;
  target.depthTexture.type = THREE.UnsignedShortType;
  target.anisotropy = MAX_ANISOTROPY;
  // Setup post processing stage
  postCamera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
  postMaterial = new THREE.ShaderMaterial( {
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      #include <packing>

      varying vec2 vUv;
      uniform sampler2D tDiffuse;
      uniform sampler2D tDepth;
      uniform float cameraNear;
      uniform float cameraFar;
      uniform vec2 u_resolution;

      float readDepth( sampler2D depthSampler, vec2 coord ) {
        float fragCoordZ = texture2D( depthSampler, coord ).x;
        float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
        return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
      }
      /*
      author: Patricio Gonzalez Vivo
      description: heatmap palette
      use: heatmap(<float> value)
      license: |
        Copyright (c) 2017 Patricio Gonzalez Vivo.
        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.    
      */
      
      vec3 heatmap(float v) {
          vec3 r = v * 2.1 - vec3(1.8, 1.14, 0.3);
          return 1.0 - r * r;
      }
      /*
      author: Dennis Gustafsson
      description:  http://blog.tuxedolabs.com/2018/05/04/bokeh-depth-of-field-in-single-pass.html
      use: textureDoF(<sampler2D> texture, <sampler2D> depth, <vec2> st, <float> focusPoint, <float> focusScale)
      options:
          TEXTUREDOF_TYPE:
          TEXTUREDOF_BLUR_SIZE:
          TEXTUREDOF_RAD_SCALE:
          TEXTUREDOF_DEPTH_FNC(UV):
          TEXTUREDOF_COLOR_FNC(UV):
      */

      // #define TEXTUREDOF_DEBUG
      #define TEXTUREDOF_BLUR_SIZE 4.0

      // Smaller = nicer blur, larger = faster
      #define TEXTUREDOF_RAD_SCALE 0.8

      #define GOLDEN_ANGLE 2.39996323

      #define TEXTUREDOF_DEPTH_FNC(UV)readDepth(texDepth,UV)

      #define TEXTUREDOF_COLOR_FNC(UV)texture2D(tex,UV)

      #define TEXTUREDOF_TYPE vec4

      float getBlurSize(float depth,float focusPoint,float focusScale){
          float coc = clamp((1./focusPoint-1./depth)*focusScale,-1.,1.);
          return abs(coc) * TEXTUREDOF_BLUR_SIZE;
      }

      TEXTUREDOF_TYPE textureDoF(sampler2D tex,sampler2D texDepth,vec2 texCoord,vec2 pixelSize,float focusPoint,float focusScale){
          float pct=0.;
          
          float centerDepth = TEXTUREDOF_DEPTH_FNC(texCoord);
          float centerSize = getBlurSize(centerDepth, focusPoint, focusScale);
          TEXTUREDOF_TYPE color = TEXTUREDOF_COLOR_FNC(texCoord);
          
          float total = 1.0;
          float radius = TEXTUREDOF_RAD_SCALE;
          for (float angle = 0.0 ; angle < 60.; angle += GOLDEN_ANGLE){
              if (radius >= TEXTUREDOF_BLUR_SIZE)
                  break;

              vec2 tc = texCoord + vec2(cos(angle), sin(angle)) * pixelSize * radius;
              float sampleDepth = TEXTUREDOF_DEPTH_FNC(tc);
              float sampleSize = getBlurSize(sampleDepth, focusPoint, focusScale);
              if (sampleDepth > centerDepth)
                  sampleSize=clamp(sampleSize, 0.0, centerSize*2.0);
              pct = smoothstep(radius-0.5, radius+0.5, sampleSize);
              TEXTUREDOF_TYPE sampleColor = TEXTUREDOF_COLOR_FNC(tc);
              #ifdef TEXTUREDOF_DEBUG
              sampleColor.rgb = heatmap(pct*0.5+(angle/TEXTUREDOF_BLUR_SIZE)*0.1);
              #endif
              color += mix(color/total, sampleColor, pct);
              total += 1.0;
              radius += TEXTUREDOF_RAD_SCALE/radius;
          }
          return color/=total;
      }

      void main() {
        //vec3 diffuse = texture2D( tDiffuse, vUv ).rgb;
        // float depth = readDepth( tDepth, vUv );

        // gl_FragColor.rgb = 1.0 - vec3( depth );
        gl_FragColor.rgba = textureDoF(tDiffuse,tDepth,vUv,1.0/u_resolution,0.159,0.9);
        // gl_FragColor.a = 1.0;
      }
    `,
    uniforms: {
      cameraNear: { value: camera.near },
      cameraFar: { value: camera.far },
      u_resolution: { value: [canvasWidth, canvasHeight] },
      tDiffuse: { value: null },
      tDepth: { value: null }
    }
  } );
  const postPlane = new THREE.PlaneGeometry( 2, 2 );
  const postQuad = new THREE.Mesh( postPlane, postMaterial );
  postScene = new THREE.Scene();
  postScene.add( postQuad );

}

// Lights

const ambientLight = new THREE.AmbientLight(canvasProperties.ambientLight.color);
ambientLight.intensity = canvasProperties.ambientLight.intensity;
scene.add(ambientLight);

const environmentLight = new THREE.AmbientLight(BG_HEX);
environmentLight.intensity = canvasProperties.environmentLight.intensity;
scene.add(environmentLight);

const backLight = new THREE.DirectionalLight(canvasProperties.backLight.color);
backLight.position.set(
  canvasProperties.backLight.position.x,
  canvasProperties.backLight.position.y,
  canvasProperties.backLight.position.z,
);
backLight.intensity = canvasProperties.backLight.intensity;
scene.add(backLight);

const frontLight = new THREE.DirectionalLight(canvasProperties.frontLight.color);
frontLight.position.set(
  canvasProperties.frontLight.position.x,
  canvasProperties.frontLight.position.y,
  canvasProperties.frontLight.position.z,
);
frontLight.intensity = canvasProperties.frontLight.intensity;
scene.add(frontLight);

const spotlight = new THREE.SpotLight(canvasProperties.spotlight.color);
spotlight.angle = canvasProperties.spotlight.angle;
spotlight.position.set(
  canvasProperties.spotlight.position.x,
  canvasProperties.spotlight.position.y,
  canvasProperties.spotlight.position.z,
);
spotlight.intensity = canvasProperties.spotlight.intensity;
spotlight.penumbra = canvasProperties.spotlight.penumbra;
spotlight.target.position.set(
  canvasProperties.spotlight.target.position.x,
  canvasProperties.spotlight.target.position.y,
  canvasProperties.spotlight.target.position.z,
);
scene.add(spotlight);
scene.add(spotlight.target);

//
// Cover materials
//
const bookTextureLoader = new THREE.TextureLoader();
let bookTextureCount = 0;
const bookTextureFiles = [
  `https://images.ctfassets.net/fzn2n1nzq965/48bjCo7hZ07iMN45fVi0XW/f9168047c30e67484e8e4339710f87f8/WIMFC_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/1BP6fmkh8YJQGnVPFrZ5Hj/93645036d8829d58a8a81a384b4ce95b/WIMFC_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/1WghVN4OzScMvJlXtCD71S/eb7c881d008753499cc079cfea91ec5d/WIMFC_foil.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/3pAkRz3rZgntldyi6LEZmO/d9171b2f13998c749729ecd84a20b2dc/TBS_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/4q24nJ4BxBJ4fGckOgtpX9/69a626a9c883473de2cd9c1a782323ad/TBS_foil.png?fm=webp`,
  `https://images.ctfassets.net/fzn2n1nzq965/3UIFMwh9irrX147Pef5xnO/f3d9cb8f14b77aeff5b36e9e9d4e77c8/TBS_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/5x3yOcmVNMssgNJbAkl2jY/426a20f158a4682cd3ff44d566de4da8/SF_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/2a7739fCj3KI5KYTV6RqSU/fc6f679c6314f7ff4e87b775ea498a75/shared_bump_buckram.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/5hofqL08noCppsPsdxjvso/c84c2a958f8ecf22ac08c7f503e394b9/shared_bump_paper.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/5kON77i1wHLP73SOBDNlJV/51e1684d6650038bc2ce70da92b53f3f/shared_diffuse_overlay.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/4AA678nVT05ZSq4ibzOUsQ/2922c45b2b649ec42d560c81c1e30106/shared_diffuse_none.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/5NL8NZRoh8by6UR8ZLDJZD/148a9c962eb4545a50a80b557c3e4a2f/shared_bump_none.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/2UxGW08BEH706ppN3GE1qR/6691bf729bc1344ecbc2a084f61073b8/SF_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/4gGpwmX9KhcRMyMDWSsIko/c9b9739f55a4dec320a8bf78d56c252a/SF_foil.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/3KEDi9TMrfBkGSkWzEOtdh/bedb0c1eb3028f04159833f6f7fbfdc5/shared_foil_none.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/6ofvxdT98sQkSGQVsNwvCw/7ec263469b68cfb79b258223ff584d05/AEP_bump.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/7nAMwiShXZ1ZseQv9izipm/2dfc29aa312ee847de992eb00bf32919/AEP_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/PehIbTjr2zkzUp1Q9U1oS/53ea6f9deca89a057d9777cd99299b20/AEP_foil.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/165Ql0VyUmqJrvek8BzP9M/8d8ef6bee43bbdb42f8c2e34c93a90a5/GT_bump.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/7oJ7kReVTiseh5o8rfuNEd/263ac13f97b2839aee7f1ef52119b20a/GT_diffuse.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/5e9DBYelRDQaXlBqLKvKIP/6838e04381e6c9f37927cf1dfcd9c3dd/GT_foil.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/6lCgWYRcJ8RdUb3jD5GahZ/b3e29520cb2bd40fbbdc95196c5e7dbf/HGH_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/1Mu5x9yVhG5Bk4h58EV7sT/16e6fee37e30b9c28d77c7c020517a51/HGH_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/5IAAo6yjRgsQWvHz2oN7T2/65b82130bd2347711821ed12b012a372/POP_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/2lSAXeOJLSmdtkRSUDOs8Y/8dbcd8979a937c60002d7c51cc9e4b40/POP_diffuse.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/4Ca5Hhny1HtnJT8gZL83aV/0b04470a198bab491924df66744eee15/ROTP_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/4VISloTqMRbo2YTMcKY3lf/35879f0994f5ae815e74c7f57ac7bf40/ROTP_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/46jf1aRXKht6nh6N9GblL/e93e907c8b33e7d13e266d3a0263cf61/ROTP_foil.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/bTOGPaootCfudD3UyCCrw/9a406d55a1e23fc06341006e0ff02449/SA_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/2CGmRH2GstW66s5KNTW2B5/c4f90da5ae1d4e6c19255736e7caf14b/SA_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/kbRE3NhvjI0SFrPAXyEh6/b6325415ccf3a7656da18c303878ec30/SA_foil.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/4Z9N9aTPc89LYZX8vKcBLO/022240091852875588b56e8cbcd280e5/TADSE_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/56OcExXFKWH5ibDzmGmhNT/0f77e825e04633c8bef0dd57e3f879c0/TADSE_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/4NJ9u7zEiHd8a2kjAK6JGs/456bfbef7c6d1d7bb1e223eefe68f988/TADSE_foil.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/3rg6VJWaMO4rrz0m1Rpz4g/dee54e716c40e89849982a85ea6e1512/TDM_bump.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/7itLc708oUSntS10BARYE/c086759323b20781959feecf13808ab5/TDM_diffuse.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/1UEFL6ze2ortMaoPIJH4y8/a557300ee8519d4fcf846a7310074588/TDM_foil.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/5su1CiUZFjwfGEEVnG90yB/2af1e8595ea55cc2073ae605da845423/WIP_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
  `https://images.ctfassets.net/fzn2n1nzq965/4yQnbUm2Lwj3uYDuSn2grX/1b65d40af95583e1f7487a84306e13a3/WIP_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`,
];

const bookTextures = bookTextureFiles.reduce((bookTexturesAcc, file) => {
  bookTexturesAcc[file] = bookTextureLoader.load(
    file,
    (texture) => {
      bookTextureCount++;
      if (bookTextureCount === bookTextureFiles.length) {
        // confirms all textures are loaded
        loadBooks();
      }
      return texture;
    },
  );
  bookTexturesAcc[file].name = file;
  bookTexturesAcc[file].anisotropy = MAX_ANISOTROPY;
  // bookTexturesAcc[file].minFilter = THREE.LinearFilter; TURN ON FOR SAFARI? SOMETHING ABOUT WEBGL2
  return bookTexturesAcc;
}, {});

const vertexShader = `

varying vec2 vUv;
varying vec3 vViewPosition;
varying vec3 vNormal;

uniform float thickness;

// Thickness of the base mesh in centimeters
const float modelThickness = 3.374;

void main() {
  vUv = vec2(uv.x, 1.0 - uv.y);

  // Normals

  vec3 objectNormal = vec3( normal );
  vec3 transformedNormal = normalMatrix * objectNormal;
  vNormal = normalize( transformedNormal );

  // Book thickness

  vec3 transformed = vec3( position );
  float thicknessDelta = (thickness - modelThickness) / 2.0;

  if (transformed.x > 1.0) transformed.x += thicknessDelta;
  else if (transformed.x < -1.0) transformed.x -= thicknessDelta;

  // Projection

  vec4 mvPosition = vec4( transformed, 1.0 );
  mvPosition = modelViewMatrix * mvPosition;

  gl_Position = projectionMatrix * mvPosition;

  vViewPosition = - mvPosition.xyz;
}
`;

const fragmentShader = `
  
#define PHONG

varying vec2 vUv;

uniform vec3 specular;
uniform float shininess;
uniform float reflectiveness;

uniform sampler2D diffuseMapBase;
uniform sampler2D diffuseMapCustom;

uniform sampler2D bumpMapBase;
uniform sampler2D bumpMapCustom;
uniform float bumpScaleBase;
uniform float bumpScaleCustom;

uniform sampler2D foilMap;
uniform float foilDetail;
uniform float foilOpacity;
uniform float foilSpecular;
uniform float foilEmissive;
const vec2 foilUvSize = vec2(0.14, -0.19);

#include <common>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_phong_pars_fragment>

// 
// Utils
// 

float blendOverlay(float base, float blend) {
  return base < 0.5 
    ? 2.0 * base * blend 
    : 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
}

float blendOverlay(float base, float blend, float opacity) {
  return blendOverlay(base, blend) * opacity + base * (1.0 - opacity);
}

vec4 blendOverlay(vec4 base, vec4 blend) {
  return vec4(
    blendOverlay(base.r, blend.r),
    blendOverlay(base.g, blend.g),
    blendOverlay(base.b, blend.b),
    (base.a + blend.a) / 2.0
  );
}

vec4 blendOverlay(vec4 base, vec4 blend, float opacity) {
  return vec4(
    blendOverlay(base.r, blend.r, opacity),
    blendOverlay(base.g, blend.g, opacity),
    blendOverlay(base.b, blend.b, opacity),
    (base.a + blend.a) / 2.0
  );
}

//
// Bump map functions
// 

vec2 dHdxy_fwd() {

  vec2 dSTdx = dFdx( vUv );
  vec2 dSTdy = dFdy( vUv );

  float inverseFoilCoverage = 1.0 - texture2D( foilMap, vUv ).r * foilOpacity;

  float scaleMax = max(bumpScaleBase, bumpScaleCustom);
  float scaleBaseNorm = bumpScaleBase / scaleMax;
  float scaleCustomNorm = bumpScaleCustom / scaleMax;

  float Hll = scaleMax * blendOverlay(
    0.5 + (texture2D( bumpMapBase,   vUv ).x - 0.5) * scaleBaseNorm * inverseFoilCoverage,
    0.5 + (texture2D( bumpMapCustom, vUv ).x - 0.5) * scaleCustomNorm
  );
  float dBx = scaleMax * blendOverlay(
    0.5 + (texture2D( bumpMapBase,   vUv + dSTdx ).x - 0.5) * scaleBaseNorm * inverseFoilCoverage,
    0.5 + (texture2D( bumpMapCustom, vUv + dSTdx ).x - 0.5) * scaleCustomNorm
  ) - Hll;
  float dBy = scaleMax * blendOverlay(
    0.5 + (texture2D( bumpMapBase,   vUv + dSTdy ).x - 0.5) * scaleBaseNorm * inverseFoilCoverage,
    0.5 + (texture2D( bumpMapCustom, vUv + dSTdy ).x - 0.5) * scaleCustomNorm
  ) - Hll;

  return vec2( dBx, dBy );

}

vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

  // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

  vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
  vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
  vec3 vN = surf_norm;		// normalized

  vec3 R1 = cross( vSigmaY, vN );
  vec3 R2 = cross( vN, vSigmaX );

  float fDet = dot( vSigmaX, R1 ) * faceDirection;

  vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
  return normalize( abs( fDet ) * surf_norm - vGrad );

}

// 
// Main
// 

void main() {

  vec3 normal = perturbNormalArb( -vViewPosition, vNormal, dHdxy_fwd(), 1.0 );

  // Combine diffuse textures

  vec4 diffuseColor = blendOverlay(
    texture2D( diffuseMapBase, vUv ),
    texture2D( diffuseMapCustom, vUv )
  );

  // Foil

  vec2 foilIndex = vec2(
    sin(-normal.y * foilDetail  +  vViewPosition.y * foilDetail / 10.0),
    cos(-normal.x * foilDetail  +  vViewPosition.x * foilDetail / 10.0)
  ) / 2.0;
  foilIndex = vec2(0.0, 1.0) + foilUvSize / 2.0 + foilIndex * foilUvSize;

  vec4 foilColor = texture2D( diffuseMapCustom, foilIndex );
  float foilCoverage = texture2D( foilMap, vUv ).r;

  diffuseColor = mix(diffuseColor, foilColor, foilCoverage * foilOpacity);

  // Lighting

  float specularStrength = reflectiveness + foilCoverage * foilSpecular;

  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

  #include <lights_phong_fragment>
  #include <lights_fragment_begin>
  #include <lights_fragment_maps>
  #include <lights_fragment_end>

  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse 
                      + reflectedLight.directSpecular + reflectedLight.indirectSpecular;

  outgoingLight = mix(outgoingLight, foilColor.rgb, foilCoverage * foilEmissive * foilOpacity);

  gl_FragColor = vec4( outgoingLight, diffuseColor.a );

}
`;

const shadowVertexShader = `

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
}
`;

const shadowFragmentShader = `

#define PI 3.1415926538

varying vec2 vUv;
varying vec3 vPosition;

uniform vec3  shadowColor;
uniform float shadowOpacity;
uniform vec3  occlusionColor;
uniform float occlusionOpacity;

uniform float shadowFocus;
uniform vec3  lightDirection;
uniform float groundHeight;
uniform float bookThickness;
uniform mat4  bookMatrix;

const float bookHeight = 23.678 / 2.0;
const float bookWidth = 15.907 / 2.0;


// 
// https://www.shadertoy.com/view/WslGz4
// https://www.shadertoy.com/view/ttlBWf
// https://iquilezles.org/www/articles/boxfunctions/boxfunctions.htm
// 

float dot2( in vec3 v ) { return dot(v,v); }

mat4 translate( float x, float y, float z )
{
  return mat4( 1.0, 0.0, 0.0, 0.0,
               0.0, 1.0, 0.0, 0.0,
               0.0, 0.0, 1.0, 0.0,
               x,   y,   z,   1.0 );
}

float boxOcclusion( in vec3 pos, in vec3 nor, in mat4 txx, in mat4 txi, in vec3 rad ) 
{
  vec3 p = (txx*vec4(pos,1.0)).xyz;
  vec3 n = (txx*vec4(nor,0.0)).xyz;
    
  // Orient the hexagon based on p
  vec3 f = rad * sign(p);
  
  // Make sure the hexagon is always convex
  vec3 s = sign(rad - abs(p));
  
  // 6 verts
  vec3 v0 = normalize( vec3( 1.0, 1.0,-1.0)*f - p);
  vec3 v1 = normalize( vec3( 1.0, s.x, s.x)*f - p);
  vec3 v2 = normalize( vec3( 1.0,-1.0, 1.0)*f - p);
  vec3 v3 = normalize( vec3( s.z, s.z, 1.0)*f - p);
  vec3 v4 = normalize( vec3(-1.0, 1.0, 1.0)*f - p);
  vec3 v5 = normalize( vec3( s.y, 1.0, s.y)*f - p);
  
  // 6 edges
  return abs(
    dot( n, normalize( cross(v0,v1)) ) * acos( dot(v0,v1) ) +
    dot( n, normalize( cross(v1,v2)) ) * acos( dot(v1,v2) ) +
    dot( n, normalize( cross(v2,v3)) ) * acos( dot(v2,v3) ) +
    dot( n, normalize( cross(v3,v4)) ) * acos( dot(v3,v4) ) +
    dot( n, normalize( cross(v4,v5)) ) * acos( dot(v4,v5) ) +
    dot( n, normalize( cross(v5,v0)) ) * acos( dot(v5,v0) )
  ) / 6.2831;
}

float segShadow( in vec3 ro, in vec3 rd, in vec3 pa, float sh )
{
  float dm = dot(rd.yz,rd.yz); // dm = 1.0 - rd.x*rd.x
  float k1 = (ro.x-pa.x)*dm;
  float k2 = (ro.x+pa.x)*dm;
  vec2  k5 = (ro.yz+pa.yz)*dm;
  float k3 = dot(ro.yz+pa.yz,rd.yz);
  vec2  k4 = (pa.yz+pa.yz)*rd.yz;
  vec2  k6 = (pa.yz+pa.yz)*dm;
  
  for( int i=0; i<4; i++ )
  {
    vec2  s = vec2(i&1,i>>1);
    float t = dot(s,k4) - k3;
    
    if( t>0.0 )
    sh = min(sh,dot2(vec3(clamp(-rd.x*t,k1,k2),k5-k6*s)+rd*t)/(t*t));
  }
  return sh;
}

float boxSoftShadow( in vec3 ro, in vec3 rd, in mat4 txx, in vec3 rad, in float sk ) 
{
  vec3 rdd = (txx*vec4(rd,0.0)).xyz;
  vec3 roo = (txx*vec4(ro,1.0)).xyz;

  vec3 m = 1.0/rdd;
  vec3 n = m*roo;
  vec3 k = abs(m)*rad;

  vec3 t1 = -n - k;
  vec3 t2 = -n + k;

  float tN = max( max( t1.x, t1.y ), t1.z );
  float tF = min( min( t2.x, t2.y ), t2.z );

  if( tN<tF && tF>0.0) return 0.0;
  
  float sh = 1.0;
  sh = segShadow( roo.xyz, rdd.xyz, rad.xyz, sh );
  sh = segShadow( roo.yzx, rdd.yzx, rad.yzx, sh );
  sh = segShadow( roo.zxy, rdd.zxy, rad.zxy, sh );
  sh = clamp(sk*sqrt(sh),0.0,1.0);

  return sh*sh*(3.0-2.0*sh);
}

// 
// Main
// 

void main() {

  vec3 pos = vec3(vPosition.x, 0.0, -vPosition.y);

  mat4 txx = translate(0.0, -groundHeight, 0.0) * bookMatrix; 
  mat4 txi = inverse( txx );

  vec3 box = vec3(bookThickness/2.0, bookHeight, bookWidth);

  float occ = boxOcclusion( pos, lightDirection, txi, txi, box );
  float dif = 1.0 - boxSoftShadow( pos, lightDirection, txi, box, shadowFocus );
  float alpha = pow(occ*dif + occ*occlusionOpacity + dif*shadowOpacity, 2.0);

  vec3 color = mix(shadowColor, occlusionColor, occ);

  gl_FragColor = vec4( color, alpha );
}
`;

const bookCoverPresets = [
  {
    material: {
      shininess: 8,
      reflectiveness: 0.1,
      thickness: 2.4,
      diffuseMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/48bjCo7hZ07iMN45fVi0XW/f9168047c30e67484e8e4339710f87f8/WIMFC_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpMapBase: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/2a7739fCj3KI5KYTV6RqSU/fc6f679c6314f7ff4e87b775ea498a75/shared_bump_buckram.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleBase: 0.04,
      bumpMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/1BP6fmkh8YJQGnVPFrZ5Hj/93645036d8829d58a8a81a384b4ce95b/WIMFC_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleCustom: 0.04,
      foilMap: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/1WghVN4OzScMvJlXtCD71S/eb7c881d008753499cc079cfea91ec5d/WIMFC_foil.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      foilDetail: 1,
      foilSpecular: 0.5,
      foilOpacity: 0.8,
    },
    palette: {
      backgroundColor: 0x96DCED,
      color: 0x3D3D3D,
    },
  },
  {
    material: {
      shininess: 8,
      reflectiveness: 0.2,
      thickness: 3.4,
      diffuseMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/3UIFMwh9irrX147Pef5xnO/f3d9cb8f14b77aeff5b36e9e9d4e77c8/TBS_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpMapBase: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/2a7739fCj3KI5KYTV6RqSU/fc6f679c6314f7ff4e87b775ea498a75/shared_bump_buckram.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleBase: 0.06,
      bumpMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/3pAkRz3rZgntldyi6LEZmO/d9171b2f13998c749729ecd84a20b2dc/TBS_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleCustom: 0.14,
      foilMap: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/4q24nJ4BxBJ4fGckOgtpX9/69a626a9c883473de2cd9c1a782323ad/TBS_foil.png?fm=webp`],
      foilDetail: 2.5,
      foilSpecular: 1,
      foilOpacity: 1.8,
    },
    palette: {
      backgroundColor: 0x442C25,
      color: 0xE48244,
    },
  },
  {
    material: {
      shininess: 10,
      reflectiveness: 0.1,
      thickness: 2.4,
      diffuseMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/5x3yOcmVNMssgNJbAkl2jY/426a20f158a4682cd3ff44d566de4da8/SF_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpMapBase: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/2a7739fCj3KI5KYTV6RqSU/fc6f679c6314f7ff4e87b775ea498a75/shared_bump_buckram.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleBase: 0.03,
      bumpMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/2UxGW08BEH706ppN3GE1qR/6691bf729bc1344ecbc2a084f61073b8/SF_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleCustom: 0.02,
      foilMap: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/4gGpwmX9KhcRMyMDWSsIko/c9b9739f55a4dec320a8bf78d56c252a/SF_foil.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      foilDetail: 4,
      foilOpacity: 1.5,
      foilSpecular: 0.6,
    },
    palette: {
      backgroundColor: 0x222222,
      color: 0xFF4445,
    },
  },
  {
    material: {
      shininess: 12,
      reflectiveness: 0.1,
      thickness: 2.4,
      diffuseMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/4yQnbUm2Lwj3uYDuSn2grX/1b65d40af95583e1f7487a84306e13a3/WIP_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpMapBase: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/2a7739fCj3KI5KYTV6RqSU/fc6f679c6314f7ff4e87b775ea498a75/shared_bump_buckram.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleBase: 0.04,
      bumpMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/5su1CiUZFjwfGEEVnG90yB/2af1e8595ea55cc2073ae605da845423/WIP_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleCustom: 0.1,
      foilMap: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/3KEDi9TMrfBkGSkWzEOtdh/bedb0c1eb3028f04159833f6f7fbfdc5/shared_foil_none.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
    },
    palette: {
      backgroundColor: 0xFFB55E,
      color: 0x19359b,
    },
  },
  {
    material: {
      shininess: 12,
      reflectiveness: 0.1,
      thickness: 3.4,
      diffuseMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/56OcExXFKWH5ibDzmGmhNT/0f77e825e04633c8bef0dd57e3f879c0/TADSE_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpMapBase: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/2a7739fCj3KI5KYTV6RqSU/fc6f679c6314f7ff4e87b775ea498a75/shared_bump_buckram.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleBase: 0.05,
      bumpMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/4Z9N9aTPc89LYZX8vKcBLO/022240091852875588b56e8cbcd280e5/TADSE_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleCustom: 0.1,
      foilMap: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/4NJ9u7zEiHd8a2kjAK6JGs/456bfbef7c6d1d7bb1e223eefe68f988/TADSE_foil.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      foilDetail: 1,
      foilSpecular: 0.4,
      foilOpacity: 1,
    },
    palette: {
      backgroundColor: 0x303328,
      color: 0xe0e19f,
    },
  },
  {
    material: {
      shininess: 10,
      reflectiveness: 0.03,
      thickness: 3.4,
      diffuseMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/2lSAXeOJLSmdtkRSUDOs8Y/8dbcd8979a937c60002d7c51cc9e4b40/POP_diffuse.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpMapBase: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/2a7739fCj3KI5KYTV6RqSU/fc6f679c6314f7ff4e87b775ea498a75/shared_bump_buckram.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleBase: 0.05,
      bumpMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/5IAAo6yjRgsQWvHz2oN7T2/65b82130bd2347711821ed12b012a372/POP_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleCustom: 0.1,
      foilMap: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/3KEDi9TMrfBkGSkWzEOtdh/bedb0c1eb3028f04159833f6f7fbfdc5/shared_foil_none.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
    },
    palette: {
      backgroundColor: 0x2f35c8,
      color: 0xef9e40,
    },
  },
  {
    material: {
      shininess: 20,
      reflectiveness: 0.1,
      thickness: 2.4,
      diffuseMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/7oJ7kReVTiseh5o8rfuNEd/263ac13f97b2839aee7f1ef52119b20a/GT_diffuse.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpMapBase: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/5hofqL08noCppsPsdxjvso/c84c2a958f8ecf22ac08c7f503e394b9/shared_bump_paper.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleBase: 0.07,
      bumpMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/165Ql0VyUmqJrvek8BzP9M/8d8ef6bee43bbdb42f8c2e34c93a90a5/GT_bump.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleCustom: 0.1,
      foilMap: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/5e9DBYelRDQaXlBqLKvKIP/6838e04381e6c9f37927cf1dfcd9c3dd/GT_foil.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      foilDetail: 1.5,
      foilEmissive: 0.5,
      foilSpecular: -0.1,
    },
    palette: {
      backgroundColor: 0xEF8964,
      color: 0x452121,
    },
  },
  {
    material: {
      shininess: 8,
      reflectiveness: 0.04,
      thickness: 3.4,
      diffuseMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/7nAMwiShXZ1ZseQv9izipm/2dfc29aa312ee847de992eb00bf32919/AEP_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpMapBase: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/2a7739fCj3KI5KYTV6RqSU/fc6f679c6314f7ff4e87b775ea498a75/shared_bump_buckram.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleBase: 0.04,
      bumpMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/6ofvxdT98sQkSGQVsNwvCw/7ec263469b68cfb79b258223ff584d05/AEP_bump.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleCustom: 0.05,
      foilMap: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/PehIbTjr2zkzUp1Q9U1oS/53ea6f9deca89a057d9777cd99299b20/AEP_foil.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      foilDetail: 1,
      foilSpecular: 0.1,
      foilOpacity: 1,
    },
    palette: {
      backgroundColor: 0x222222,
      color: 0xffffff,
    },
  },
  {
    material: {
      shininess: 15,
      reflectiveness: 0.1,
      thickness: 3.4,
      diffuseMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/4VISloTqMRbo2YTMcKY3lf/35879f0994f5ae815e74c7f57ac7bf40/ROTP_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpMapBase: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/2a7739fCj3KI5KYTV6RqSU/fc6f679c6314f7ff4e87b775ea498a75/shared_bump_buckram.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleBase: 0.07,
      bumpMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/4Ca5Hhny1HtnJT8gZL83aV/0b04470a198bab491924df66744eee15/ROTP_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleCustom: 0.1,
      foilMap: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/46jf1aRXKht6nh6N9GblL/e93e907c8b33e7d13e266d3a0263cf61/ROTP_foil.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      foilDetail: 2,
      foilSpecular: -1,
      foilOpacity: 1.2,
      foilEmissive: 0.5,
    },
    palette: {
      backgroundColor: 0xF796FF,
      color: 0x201E8E,
    },
  },
  {
    material: {
      shininess: 14,
      reflectiveness: 0.1,
      thickness: 2.4,
      diffuseMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/2CGmRH2GstW66s5KNTW2B5/c4f90da5ae1d4e6c19255736e7caf14b/SA_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpMapBase: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/2a7739fCj3KI5KYTV6RqSU/fc6f679c6314f7ff4e87b775ea498a75/shared_bump_buckram.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleBase: 0.03,
      bumpMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/bTOGPaootCfudD3UyCCrw/9a406d55a1e23fc06341006e0ff02449/SA_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleCustom: 0.2,
      foilMap: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/kbRE3NhvjI0SFrPAXyEh6/b6325415ccf3a7656da18c303878ec30/SA_foil.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      foilDetail: 4,
      foilSpecular: 0.35,
      foilOpacity: 0.2,
    },
    palette: {
      
      backgroundColor: 0xFFA6A6,
      color: 0x222222,
    },
  },
  {
    material: {
      shininess: 10,
      reflectiveness: 0.3,
      thickness: 3.4,
      diffuseMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/7itLc708oUSntS10BARYE/c086759323b20781959feecf13808ab5/TDM_diffuse.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpMapBase: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/2a7739fCj3KI5KYTV6RqSU/fc6f679c6314f7ff4e87b775ea498a75/shared_bump_buckram.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleBase: 0.05,
      bumpMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/3rg6VJWaMO4rrz0m1Rpz4g/dee54e716c40e89849982a85ea6e1512/TDM_bump.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleCustom: 0.1,
      foilMap: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/1UEFL6ze2ortMaoPIJH4y8/a557300ee8519d4fcf846a7310074588/TDM_foil.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      foilDetail: 1,
      foilSpecular: -0.25,
      foilEmissive: 0.25,
      foilOpacity: 0.8,
    },
    palette: {
      backgroundColor: 0xc7c7c7,
      color: 0x222222,
    },
  },
  {
    material: {
      shininess: 10,
      reflectiveness: 0.1,
      thickness: 3.4,
      diffuseMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/1Mu5x9yVhG5Bk4h58EV7sT/16e6fee37e30b9c28d77c7c020517a51/HGH_diffuse.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpMapBase: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/2a7739fCj3KI5KYTV6RqSU/fc6f679c6314f7ff4e87b775ea498a75/shared_bump_buckram.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleBase: 0.05,
      bumpMapCustom: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/6lCgWYRcJ8RdUb3jD5GahZ/b3e29520cb2bd40fbbdc95196c5e7dbf/HGH_bump.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
      bumpScaleCustom: 0.3,
      foilMap: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/3KEDi9TMrfBkGSkWzEOtdh/bedb0c1eb3028f04159833f6f7fbfdc5/shared_foil_none.png?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
    },
    palette: {
      backgroundColor: 0x3F4552,
      color: 0x0AEB9A,
    },
  },
];

let bookCount = bookCoverPresets.length;

const filmTextureLoader = new THREE.TextureLoader();

function loadBooks() {
  for (let b = 0; b < bookCoverPresets.length; b++) {
    createProductIndicator(b); // LIQUID
    hydrateBookContent(b); // LIQUID
    loadBook(b);
  }
  createProductIndicator('film');
  menuEls = [
    logoEl,
    returnEl,
    ...productIndicatorEls,
    filmIndicatorEl,
    aboutBtnEl
  ]
}

function loadBook(i) {
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: Object.assign(
      {
        specular: {type: 'c', value: new THREE.Color(0xffffff)},
        shininess: {value: 10},
        reflectiveness: { value: 0.1 },
        thickness: {value: 1.4},

        diffuseMapBase: {
          type: 't',
          value: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/5kON77i1wHLP73SOBDNlJV/51e1684d6650038bc2ce70da92b53f3f/shared_diffuse_overlay.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
        },
        diffuseMapCustom: {type: 't'},

        bumpMapBase: {
          type: 't',
          value: bookTextures[`https://images.ctfassets.net/fzn2n1nzq965/2a7739fCj3KI5KYTV6RqSU/fc6f679c6314f7ff4e87b775ea498a75/shared_bump_buckram.jpg?fm=${coverImageFormat}&q=${coverImageQuality}&w=${coverImageWidth}`],
        },
        bumpMapCustom: {type: 't'},
        bumpScaleBase: {value: 0.05},
        bumpScaleCustom: {value: 0.1},

        foilMap: {type: 't'},
        foilDetail: {value: 0.5},
        foilEmissive: { value: 0.0 },
        foilOpacity: {value: 1.0},
        foilSpecular: {value: 0.1},
      },
      THREE.UniformsLib.lights,
    ),
    lights: true,
    defines: {
      USE_UV: '',
      USE_MAP: '',
      USE_BUMPMAP: '',
    },
    extensions: {
      derivatives: true,
    },
  });

  new THREE.GLTFLoader().load('covers/shared_geometry.gltf', (gltf) => {
    const book = gltf.scene;
    book.matrixWorldNeedsUpdate = true;
    const presets = bookCoverPresets[i];
    book.children[0].material = material;
    book.cover = book.getObjectByName('book');
    book.cover.rotation.order = canvasProperties.bookSpine.cover.rotation.order;
    // new BookShadow(book);

    scene.add(book);

    Object.entries(presets.material).forEach(([key, val]) => {
      material.uniforms[key].value = val;
    });
    book.backgroundColor = new THREE.Color(presets.palette.backgroundColor);
    book.color = new THREE.Color(presets.palette.color);
    book.position.set(
      canvasProperties.bookSpine.position.x,
      0,
      -i * INITIAL_BOOK_GAP,
    );
    book.rotation.set(
      INITIAL_BOOK_ROTATION_X,
      canvasProperties.bookSpine.rotation.y,
      canvasProperties.bookSpine.rotation.z,
    );
    books[i] = book;
    const booksLength = books.reduce((acc, cv) => (cv ? acc + 1 : acc), 0); // counts the number of books finished loading into the array
    if (booksLength === bookCount) {
      initScene();
    }
  });
}

function loadFilmPoster() {
  const texture = filmTextureLoader.load(
    `https://images.ctfassets.net/fzn2n1nzq965/2bVqdjWtT4vYI9svLddJvY/b8a28464406a5a37a2ad8d4a81512f19/WAAG_poster.png?fm=webp&q=60&w=1000`,
  );
  texture.anisotrophy = MAX_ANISOTROPY;
  const colCount = 100;
  const rowCount = 100;
  const posterGeometry = new THREE.PlaneGeometry(
    22,
    30,
    colCount - 1,
    rowCount - 1,
  );
  const posterMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
  });
  const poster = new THREE.Mesh(posterGeometry, posterMaterial);
  poster.position.z = canvasProperties.filmPoster.active.position.z;
  poster.material.opacity = 0;

  posterGeometry.initialAttributes = JSON.parse(
    JSON.stringify(posterGeometry.attributes),
  );
  poster.color = new THREE.Color(0xffd943);
  poster.backgroundColor = new THREE.Color(0x181818);
  films.push(poster);
  scene.add(poster);
  handleResizeWindow();
  updateFilm();
}

function initUI() {
  typeText(introNameEl);
  setTimeout(() => {
    typeText(introTaglineEl, () => {
      isIntroDone = true;
    });
  }, 900);
}

function typeText(el, callback) {
  let letterEls = Array.from(
    el.querySelectorAll('.PressHomepageIntro__letter'),
  );
  let frame = 0;
  let index = 0;
  const lps = 60 / 16; // letters per second;
  function typeLetter() {
    frame++;
    index = Math.floor(frame / lps);
    if (index < letterEls.length) {
      letterEls[index].style.opacity = 1;
      requestAnimationFrame(typeLetter);
    } else if (callback) {
      callback();
    }
  }
  requestAnimationFrame(typeLetter);
}

function hydrateBookContent(i) {
  // LIQUID
  const bookData = booksData[i];
  bookTitleEls[i].innerHTML = bookData.shortTitle
    ? bookData.shortTitle
    : bookData.title;
  bookAuthorEls[i].innerHTML = bookData.author.name;
  productDetailsEls[i].style.color = bookData.palette.color;
  productDetailsEls[i].style.background = bookData.palette.backgroundColor;
  productDetailsEls[i].style.setProperty(
    '--backgroundColor',
    bookData.palette.backgroundColor,
  );
  productDetailsEls[i].style.setProperty('--color', bookData.palette.color);
  bookDetailsTitleEls[i].innerHTML = bookData.title;
  bookDetailsAuthorEls[i].innerHTML = bookData.author.name;
  bookDetailsSummaryEls[i].innerHTML = bookData.summary;
  bookDetailsAuthorIntroNameEls[i].innerHTML = `${bookData.author.name} `;
  bookDetailsAuthorIntroEls[i].innerHTML += bookData.author.intro;
  bookDetailsAuthorBioEls[i].innerHTML = bookData.author.bio;
  bookDetailsBuyEls[i].innerHTML = `Purchase $${bookData.price}`;
  bookDetailsBuyEls[i].setAttribute('href', bookData.buyPath);
  if (bookData.zine) {
    bookDetailsZineCoverEls[
      i
    ].innerHTML = `<img class="PressHomepageBookDetails__zineImg" src="${bookData.zine.cover}">`;
  } else {
    bookDetailsZineEls[i].style.display = 'none';
  }
  if (bookData.video) {
    bookDetailsVideoPosterEls[
      i
    ].innerHTML = `<img class="PressHomepageBookDetails__videoImg" src="${bookData.video.poster}">`;
    bookDetailsVideoTitleEls[i].innerHTML = `${bookData.video.title}`;
  } else {
    bookDetailsVideoEls[i].style.display = 'none';
  }
  const praisesEl = bookDetailsPraiseCarouselEls[i];
  const linkGroupEl = bookDetailsAuthorLinkGroupEls[i];
  bookData.praises.forEach((praise) => {
    const template = praisesEl
      .querySelectorAll('.PressHomepageBookDetails__praise')[0]
      .cloneNode(true);
    template.querySelector(
      '.PressHomepageBookDetails__praiseName',
    ).innerHTML = `${praise.name}`;
    template.querySelector(
      '.PressHomepageBookDetails__praiseRole',
    ).innerHTML = `${praise.role}`;
    template.querySelector(
      '.PressHomepageBookDetails__praiseQuote',
    ).innerHTML = `${praise.quote}`;
    praisesEl.appendChild(template);
  });
  if (bookData.author.links) {
    bookData.author.links.forEach((link) => {
      const template = linkGroupEl
        .querySelectorAll('.PressHomepageBookDetails__authorLink')[0]
        .cloneNode(true);
      template.innerHTML = `<a href="${link.url}">${link.label}</a>`;
      linkGroupEl.appendChild(template);
    });
    linkGroupEl
      .querySelectorAll('.PressHomepageBookDetails__authorLink')[0]
      .remove();
  } else {
    linkGroupEl.remove();
  }
  praisesEl.querySelectorAll('.PressHomepageBookDetails__praise')[0].remove();
}

function createProductIndicator(i) {
  // LIQUID (except click events)
  if (i === 'film') {
    filmIndicatorEl.addEventListener('click', () => {
      handleClickFilm();
    });
    filmIndicatorEl.addEventListener('mouseenter', () =>
      handleMouseEnterIndicator(productIndicatorEls.length),
    );
    filmIndicatorEl.addEventListener('mouseleave', () =>
      handleMouseLeaveIndicator(),
    );
    filmIndicatorEl.dataset.jsSlug = '/press/three/we-are-as-gods';
    productIndicatorEls.push(filmIndicatorEl);
  } else {
    const bookData = booksData[i];
    const animationDelay = 1.4;
    const animationDelayIncrement = 0.1;
    let indicatorEl = menuBookListEl.appendChild(
      document.createElement('button'),
    );
    let indicatorFillEl = indicatorEl.appendChild(
      document.createElement('DIV'),
    );
    let indicatorLabelEl = indicatorEl.appendChild(
      document.createElement('DIV'),
    );
    indicatorFillEl.classList.add('PressHomepageMenu__productIndicatorFill');
    indicatorLabelEl.classList.add('PressHomepageMenu__productIndicatorLabel');
    indicatorLabelEl.innerHTML = bookData.shortTitle
      ? bookData.shortTitle
      : bookData.title;
    indicatorEl.classList.add('PressHomepageMenu__productIndicator');
    indicatorEl.style.animationDelay = `${i * animationDelayIncrement +
      animationDelay}s`;
    indicatorEl.addEventListener('click', () => {
      handleClickBook(i);
      handleMouseLeaveIndicator(i);
    });
    indicatorEl.addEventListener('mouseenter', () =>
      handleMouseEnterIndicator(i),
    );
    indicatorEl.addEventListener('mouseleave', () =>
      handleMouseLeaveIndicator(i),
    );
    indicatorEl.dataset.jsSlug = bookData.slug;
    productIndicatorEls.push(indicatorEl);
  }
}

function initScene() {
  if (!isIntroDone) {
    setTimeout(() => {
      initScene();
    }, 100);
    return;
  }
  const bookPositionYStart = 3;
  const bookPositionYGap = 3;
  const bookPositionZStart = -30;
  addEventListeners();
  render();
  books.forEach((book, i) => {
    book.position.set(
      canvasProperties.bookSpine.position.x,
      -i * bookPositionYGap + bookPositionYStart,
      i + bookPositionZStart,
    );
  });
  isInitialized = true;
  document.body.classList.add(INITIALIZED_CLASS);
  loadFilmPoster();
}

function addEventListeners() {
  window.addEventListener('mousemove', handleMousemove);
  window.addEventListener('mouseup', handleMouseup);
  window.addEventListener('keyup', handleKeyUp);
  window.addEventListener('blur', handleBlurWindow);
  window.addEventListener('focus', handleFocusWindow);
  window.addEventListener('resize', handleResizeWindow);
  window.addEventListener('scroll', (e) => {
    oldScrollY = window.scrollY;

    if (!scrollTicking) {
      window.requestAnimationFrame(function() {
        handleScroll();
        scrollTicking = false;
      });

      scrollTicking = true;
    }
  });
  bookListEls.forEach((el, i) => {
    el.addEventListener('mouseenter', () => handleMouseEnterBookSpine(i));
    el.addEventListener('mousedown', (e) => handleDragStartBookSpine(e, i));
    el.addEventListener('click', () => handleClickBook(i));
    el.addEventListener('mouseleave', handleMouseLeaveBookSpine);
    el.addEventListener('focus', () => handleMouseEnterBookSpine(i));
    el.addEventListener('blur', () => handleMouseLeaveBookSpine(i));
    el.querySelector('.PressHomepageBook__cta').addEventListener(
      'mousedown',
      (e) => {
        e.stopPropagation();
        e.preventDefault();
      },
    );
    el.querySelector(
      '.PressHomepageBook__cta',
    ).addEventListener('click', () => handleClickBook(i));
    el.addEventListener('keyup', (e) => handleKeyUpBook(e, i));
  });
  productDetailsEls.forEach((el) => {
    if (!el.querySelector('.PressHomepageBookDetails__left')) return;
    el.querySelector('.PressHomepageBookDetails__left').addEventListener('touchstart', handleTouchStart);
    el.querySelector('.PressHomepageBookDetails__left').addEventListener('mousedown', handleDragStartBook);
  })
  filmEl.addEventListener('click', handleClickFilm);
  filmPlayEl.forEach((el) => {
    el.addEventListener('click', openFilmOverlay);
  });
  filmOverlayEl.addEventListener('click', handleClickFilmOverlay);
  logoEl.addEventListener('click', handleClickLogo);
  aboutBtnEl.addEventListener('click', handleClickAbout);
  returnEl.addEventListener('click', handleClickReturn);
  returnEl.addEventListener('mouseenter', () =>
    handleMouseEnterIndicator(-1),
  );
  returnEl.addEventListener('mouseleave', () =>
    handleMouseLeaveIndicator(-1),
  );
}

// EVENT HANDLERS

function handleBlurWindow() {
  if (isDragging) {
    handleMouseup();
  }
  isWindowBlurred = true;
}

function handleFocusWindow() {
  setWindowFocus();
}

function setWindowFocus() {
  if (!isWindowBlurred) return;
  isWindowBlurred = false;
}

function handleResizeWindow() {
  devLog('handleResizeWindow');
  // TODO Debounce
  const canvasHeightScalar = IPHONE ? 1.2 : 1;
  screenWidth = document.documentElement.clientWidth;
  const oldCanvasWidth = canvasWidth;
  canvasWidth = Math.min(MAX_CANVAS_WIDTH, screenWidth);
  canvasHeight = document.documentElement.clientHeight * canvasHeightScalar;
  coverImageWidth = canvasWidth > 1400 ? '' : Math.max(1000, Math.ceil(canvasWidth / 100) * 100 + 200);
  // if (
  //   oldCanvasWidth === canvasWidth &&
  //   canvasWidth < MOBILE_MAX_WIDTH
  // ) {
  //   return;
  // }
  // prevents mobile triggering a resize when address bar hides
  measureDom();
  const screenWidthRatio = canvasWidth / SCREEN_WIDTH;
  screenHeightRatio = canvasHeight / CANVAS_HEIGHT;
  if (canvasWidth < SMALL_SCREEN_WIDTH) {
    // TODO make this more intelligent based on ratio
    isSmallScreen = true;
    isXSmallScreen = canvasWidth < XSMALL_SCREEN_WIDTH;
    canvasProperties.activeBook.position.z = ACTIVE_BOOK_POSITION_Z_MOBILE;
    canvasProperties.activeBook.position.y = ACTIVE_BOOK_POSITION_Y;
    canvasProperties.activeBook.position.x = ACTIVE_BOOK_POSITION_X_MOBILE;
    canvasProperties.inactiveBook.position.x = INACTIVE_BOOK_POSITION_X_MOBILE;
    activeScrollRatio = CAMERA_SCROLL_RATIO_ACTIVE_MOBILE;
    mainScrollRatio = CAMERA_SCROLL_RATIO;
    bookTriggerPercent = BOOK_TRIGGER_PERCENT_MOBILE;
    activeScrollRotationForce = ACTIVE_SCROLL_ROTATION_FORCE_MOBILE;
  } else {
    isSmallScreen = false;
    isXSmallScreen = false;
    canvasProperties.activeBook.position.z = ACTIVE_BOOK_POSITION_Z;
    canvasProperties.activeBook.position.x = Math.max(ACTIVE_BOOK_POSITION_X, ACTIVE_BOOK_POSITION_X * screenWidthRatio);
    canvasProperties.inactiveBook.position.x = Math.max(INACTIVE_BOOK_POSITION_X, INACTIVE_BOOK_POSITION_X * screenWidthRatio);
    activeScrollRatio = CAMERA_SCROLL_RATIO_ACTIVE;
    mainScrollRatio = CAMERA_SCROLL_RATIO;
    bookTriggerPercent = BOOK_TRIGGER_PERCENT;
    activeScrollRotationForce = ACTIVE_SCROLL_ROTATION_FORCE;
  }
  canvasScale = isXSmallScreen
    ? 1
    : Math.max(1, ((canvasHeight * MAX_CANVAS_ASPECT) / canvasWidth) * 1.1);
  document.body.style.setProperty('--canvasScale', canvasScale);
  camera.position.z = isXSmallScreen
    ? CAMERA_POSITION_Z
    : CAMERA_POSITION_Z * canvasHeightScalar * canvasScale;
  canvasProperties.bookSpine.position.z = BOOK_POSITION_Z;

  canvasCenterX = window.innerWidth * 0.5;
  canvasCenterY = canvasHeight * 0.5;

  setCameraScrollRatio();

  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvasWidth, canvasHeight);
  handleScroll();
}

function handleKeyUp(e) {
  switch (e.key) {
    case 'Escape':
      closeProductDetails();
      break;
    case 'ArrowDown':
      if (activeProduct) {
        activateProduct(Math.min(bookCount, activeProductIndex + 1));
      }
      break;
    case 'ArrowUp':
      if (activeProduct) {
        activateProduct(Math.max(0, activeProductIndex - 1));
      }
      break;
  }
}

function handleMouseEnterIndicator(index) {
  if (isDragging) return;
  document.body.classList.add('isIndicatorLabel');
  const baseScaleX = 2.5;
  const scaleMultiplier = 2;
  productIndicatorEls.forEach((indicator, i) => {
    const indexOffset = Math.abs(index - i);
    const indexOffsetNorm = indexOffset / productIndicatorEls.length;
    const angle = indexOffsetNorm * Math.PI;
    const scaleX = Math.cos(angle) * scaleMultiplier + baseScaleX;
    if (indicator.querySelector('.PressHomepageMenu__productIndicatorFill')) {
      indicator.querySelector(
        '.PressHomepageMenu__productIndicatorFill',
      ).style.transform = `scaleX(${scaleX})`;
    }
  });
}

function handleMouseLeaveIndicator() {
  if (isDragging) return;
  document.body.classList.remove('isIndicatorLabel');
  productIndicatorEls.forEach((indicator, i) => {
    if (indicator.querySelector('.PressHomepageMenu__productIndicatorFill')) {
      indicator.querySelector(
        '.PressHomepageMenu__productIndicatorFill',
      ).style.transform = `scaleX(1)`;
    }
  });
}

function handleMouseEnterBookSpine(index) {
  if (isDragging || isSmallScreen) return;
  if (!activeProduct) {
    hoveredBookSpine = books[index];
    hoveredBookSpineIndex = index;
  } else {
    hoveredBookSpine = null;
    hoveredBookSpineIndex = null;
  }
}

function handleMouseLeaveBookSpine() {
  if (isDragging) return;
  hoveredBookSpine = null;
  hoveredBookSpineIndex = null;
}

function twirlBook() {
  const twirlSpeed = 0.95;
  if (!activeProduct) return;
  if (Math.abs(bookTwirlX) + Math.abs(bookTwirlY) > 0.001) {
    dragStartRotationX = activeProduct.cover.rotation.x;
    dragStartRotationY = HALF_PI + activeProduct.cover.rotation.y;
    dragEndRotationX = 0;
    dragEndRotationY = 0;
    bookTwirlX = bookTwirlX * twirlSpeed;
    bookTwirlY = bookTwirlY * twirlSpeed;
    isTwirling = true;
  } else {
    bookTwirlX = 0;
    bookTwirlY = 0;
    isTwirling = false;
  }
}

function handleKeyUpBook(e, index) {
  if (e.key === 'Enter') {
    handleClickBook(index);
  }
}

function handleClickBook(index) {
  if (wasDragging) return;
  activateProduct(index);
}

function openFilmOverlay() {
  if (!isFilmOverlayInitialized) {
    isFilmOverlayInitialized = true;
    filmOverlayTrailerEl.innerHTML = `<iframe class="PressHomepageFilmOverlay__iframe" width="1280" height="720" src="https://www.youtube.com/embed/hixwoe3UnqY?modestbranding=1&autohide=1&showinfo=0&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }
  document.body.classList.add('isFilmOverlay');
}

function handleClickFilm() {
  activateProduct(books.length);
}

function closeFilmOverlay() {
  if (isFilmOverlayInitialized) {
    document.body.classList.remove('isFilmOverlay');
    document
      .querySelector('.PressHomepageFilmOverlay__iframe')
      .contentWindow.postMessage(
        '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
        '*',
      );
  }
}

function handleMousemove(e) {
  setWindowFocus();

  if (hoveredBookSpine) {
    handleMousemoveSpine(e);
  } else if (activeProduct && !isTwirling) {
    handleMousemoveCover(e);
  }

  if (
    !activeProduct &&
    scrollY > productListTops[productListTops.length - 2] - canvasHeight
  ) {
    handleMousemoveFilm(e);
  }
}

function handleMousemoveFilm(e) {
  updateMousePosition(e);
  const filmRotationMultiplier = 0.3;
  films[0].rotation.y = (mouseX / canvasWidth) * filmRotationMultiplier;
  films[0].rotation.x = (mouseY / canvasHeight) * filmRotationMultiplier;
}

function handleMousemoveCover(e) {
  updateMousePosition(e);
  let rotationSpeedX = isDragging ? DRAG_ROTATION_FORCE : MOUSE_ROTATION_FORCE;
  let rotationSpeedY = rotationSpeedX * yAxisDirection;
  rotationSpeedY *= isXSmallScreen ? 3 : 1;
  bookCoverDragRotationX = isXSmallScreen ? bookCoverDragRotationX : ((mouseY - mouseDownY) * rotationSpeedX + dragStartRotationX + dragEndRotationX) % TWO_PI;
  bookCoverDragRotationY = (-HALF_PI + (mouseX - mouseDownX) * rotationSpeedY + dragStartRotationY + dragEndRotationY) % TWO_PI;
  oldMouseRotationX = bookCoverDragRotationX;
  oldMouseRotationY = bookCoverDragRotationY;

  if (activeProduct === films[0]) return;
  mouseRotationX = activeProduct.cover.rotation.x;
  mouseRotationY = activeProduct.cover.rotation.y;
  activeProduct.cover.rotation.x = bookCoverDragRotationX;
  activeProduct.cover.rotation.y = bookCoverDragRotationY;
}

function handleMousemoveSpine(e) {
  setWindowFocus();
  mouseY = e.pageY - scrollY - hoveredBookSpineTop;
  mouseX = e.pageX - canvasCenterX;

  bookCoverDragRotationX = (mouseX - mouseDownX) * DRAG_ROTATION_FORCE;
  bookCoverDragRotationY = -HALF_PI - (mouseY - mouseDownY) * DRAG_ROTATION_FORCE;
  const dragAmount = Math.abs(mouseX - mouseDownX) + Math.abs(mouseY - mouseDownY);
  if (isDragging && dragAmount > 4) {
    wasDragging = true;
  }
}

function handleTouchStart(e) {
  window.addEventListener('touchmove', handleTouchMove, {passive: false});
  window.addEventListener('touchend', handleTouchEnd, {passive: false});
  handleDragStartBook(e.touches[0]);
}

function handleTouchMove(e) {
  const touchMoveX = Math.abs(mouseX - e.touches[0].pageX + canvasCenterX);
  const touchMoveY = Math.abs(mouseY - e.touches[0].pageY + canvasCenterY + scrollY);
  const horizontalScroll = touchMoveY / touchMoveX < 5;
  if (horizontalScroll || touchMoveY === 0) {
    e.preventDefault();
    handleMousemove(e.touches[0]);
  }
}

function handleTouchEnd(e) {
  const touchMoveX = Math.abs(mouseX - e.changedTouches[0].pageX + canvasCenterX);
  const touchMoveY = Math.abs(mouseY - e.changedTouches[0].pageY + canvasCenterY + scrollY);
  const horizontalScroll = touchMoveY / touchMoveX < 5;
  if (horizontalScroll || touchMoveY === 0) {
    e.preventDefault();
    handleMouseup(e.changedTouches[0]);
  }
  window.removeEventListener('touchmove', handleTouchMove);
  window.removeEventListener('touchend', handleTouchEnd);
}

function handleDragStartBook(e) {
  if (activeProduct === films[0]) return;
  const cover = activeProduct.cover;
  isDragging = true;
  document.body.classList.add(DRAGGING_CLASS);
  updateMousePosition(e);
  bookCoverDragRotationX = Math.abs(activeProduct.cover.rotation.x);
  yAxisDirection = bookCoverDragRotationX % TWO_PI > HALF_PI && bookCoverDragRotationX < TWO_PI - HALF_PI ? -1 : 1;
  bookTwirlX = 0;
  bookTwirlY = 0;
  mouseDownX = mouseX;
  mouseDownY = mouseY;
  dragEndRotationX = 0;
  dragEndRotationY = 0;
  dragStartRotationX = cover.rotation.x;
  dragStartRotationY = HALF_PI + cover.rotation.y;
}

function handleDragStartBookSpine(e, index) {
  if (isSmallScreen) return;
  const cover = hoveredBookSpine.cover;
  isDragging = true;
  hideFilmPoster();
  positionBookDescription(index);
  updateCssColor(hoveredBookSpine);
  document.body.classList.add(DRAGGING_CLASS);
  hoveredBookSpineTop = e.target.getBoundingClientRect().top;
  bookCoverDragRotationX = cover.rotation.x;
  bookCoverDragRotationY = cover.rotation.y;
  mouseX = e.pageX - canvasCenterX;
  mouseY = e.pageY - scrollY - hoveredBookSpineTop;
  mouseDownX = mouseX;
  mouseDownY = mouseY;
  dragEndRotationX = 0;
  dragEndRotationY = 0;
  dragStartRotationX = cover.rotation.x;
  dragStartRotationY = HALF_PI + cover.rotation.y;
  // TODO FOCUS SPOTLIGHT WHERE DRAGGING
  // pointSpotlights(mouseX / canvasWidth * 10, mouseY / canvasHeight * 10, 1);
}

function handleMouseup(e) {
  isDragging = false;
  document.body.classList.remove(DRAGGING_CLASS);
  updateMousePosition(e);
  dragStartRotationX = 0;
  dragStartRotationY = 0;
  setTimeout(() => {
    wasDragging = false;
  }, 300);
  currentTransitionSpeed = 0;

  if (!activeProduct) {
    showFilmPoster();
    resetCssColor();
    setTimeout(() => {
      resetCssBackgroundColor();
    }, 500);
    return;
  }
  if (activeProduct === films[0]) return;
  dragEndRotationX = activeProduct.cover.rotation.x;
  dragEndRotationY = HALF_PI + activeProduct.cover.rotation.y;
  mouseDownX = mouseX;
  mouseDownY = mouseY;
  bookTwirlX = Math.min(
    0.3,
    Math.max(-0.3, mouseRotationX - oldMouseRotationX),
  );
  bookTwirlY = Math.min(
    0.3,
    Math.max(-0.3, mouseRotationY - oldMouseRotationY),
  );
}

function handleScroll() {
  setWindowFocus();
  const scrollDelta = scrollY - oldScrollY;
  scrollY = oldScrollY;
  let containerHeight = activeProduct
    ? detailsContainerHeight
    : mainContainerHeight;
  let containerY = Math.max(-scrollY, -containerHeight + canvasHeight);
  if (activeProduct) {
    activeScrollY = scrollY - detailsTops[activeProductIndex];
    productDetailsListEl.style.transform = `translateY(${containerY}px)`;
  } else {
    activeScrollY = 0;
    productListContainerEl.style.transform = `translateY(${containerY}px)`;
  }
  let scrollTotalY = -containerY;
  
  if (activeProduct && !isSmallScreen) {
    let praiseScrollTotal = 0;
    for (let i = 0; i < activeProductIndex; i++) {
      praiseScrollTotal += praiseHeights[i];
    }
    const praiseScrollY = Math.max(
      0,
      canvasHeight - praiseTops[activeProductIndex] + scrollY,
    );
    scrollTotalY = praiseScrollTotal + praiseScrollY;
  }
  let cameraY = scrollTotalY * cameraScrollRatio;
  canvasProperties.camera.position.y = canvasProperties.camera.position.startY - cameraY;

  clearTimeout(scrollTimeout);
  if (!isScrolling) {
    isScrolling = true;
    document.body.classList.add(SCROLLING_CLASS);
  }

  // TODO: check the time instead of a timeout
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
    document.body.classList.remove(SCROLLING_CLASS);
  }, 400);

  colorIndicators();
  
  updateScrollVelocity(scrollDelta);
  updateCenterProduct();
  updateLights();
  updateFilm();
}

function colorIndicators() {
  menuEls.forEach((el, i) => {
    if (activeProduct) {
      let color = hexToCSS(activeProduct.color);
      if (scrollY > detailsTops[activeProductIndex + 1] - canvasHeight + menuTops[menuTops.length - 1 - i]) {
        if (books[activeProductIndex + 1]) {
          color = hexToCSS(books[activeProductIndex + 1].color);
        } else if (activeProduct !== films[0]) {
          color = hexToCSS(films[0].color);
        }
      } else {
        color = hexToCSS(activeProduct.color);
      }
      el.style.setProperty('--color', color);
      const label = el.querySelector('.PressHomepageMenu__productIndicatorLabel') || el.querySelector('.PressHomepageMenu__returnLabel') || el.querySelector('.PressHomepageMenu__filmLabel')
      if (label) {
        label.style.setProperty('--color', hexToCSS(activeProduct.color));
      }
    }
  })
}

function measureDom() {
  mainContainerHeight = productListContainerEl.getBoundingClientRect().height;
  detailsContainerHeight = productDetailsListEl.getBoundingClientRect().height;
  setAboutMargin();
  measureMenu();

  if (activeProduct) {
    measureProductDetails();
  } else {
    measureProductList();
  }
}

function measureMenu() {
  menuTops = [];
  menuEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    menuTops.push(rect.top + rect.height * 0.5);
  })
}

function measureProductList() {
  devLog('measureProductList', measureProductList.caller.name);
  productListTops = [];
  productListContainerEl.style.transform = `translateY(0px)`;
  productListEls.forEach((el) => {
    const productListRect = el.getBoundingClientRect();
    productListTops.push(productListRect.top);
  });
}

function measureProductDetails() {
  devLog('measureProductDetails', measureProductDetails.caller.name);
  detailsHeights = [];
  detailsTops = [];
  praiseHeights = [];
  praiseTops = [];
  productDetailsEls.forEach((el, i) => {
    const detailsRect = el.getBoundingClientRect();
    detailsTops.push(detailsRect.top + scrollY);
    detailsHeights.push(detailsRect.height);
    if (bookDetailsPraiseContainerEls[i]) {
      const praiseRect = bookDetailsPraiseContainerEls[
        i
      ].getBoundingClientRect();
      praiseTops.push(praiseRect.top + scrollY);
      praiseHeights.push(praiseRect.height + canvasHeight);
    }
  });
  tickerTop = filmTickerEl.getBoundingClientRect().top + scrollY;
}

function positionBookDescription(index) {
  const descriptionY = mouseY < 0 ? canvasHeight * 0.25 : canvasHeight * -0.3;
  bookDescriptionTextEl.innerHTML = booksData[index].description;
  bookDescriptionTextEl.style.transform = `translateY(${descriptionY}px)`;
}

function updateMousePosition(e) {
  if (!e) return;
  mouseY = e.pageY - scrollY - canvasCenterY;
  mouseX = e.pageX - canvasCenterX;
}

function updateScrollVelocity(scrollDelta) {
  scrollVelocity = isSmallScreen ? 0 : scrollDelta * 0.003;
}

function updateCenterProduct() {
  if (!detailsTops) return;
  let newCenterProductIndex = 0;
  let productListTriggerPercent = isSmallScreen ? 0.1 : 0.333;
  let productListTriggerPoint = canvasHeight * productListTriggerPercent;

  if (activeProduct) {
    for (let i = detailsTops.length; i > 0; i--) {
      const detailsTop = detailsTops[i];
      if (detailsTop - canvasHeight * bookTriggerPercent <= scrollY) {
        newCenterProductIndex = i;
        break;
      }
    }
  } else {
    productListTops.forEach((top, i) => {
      if (top - productListTriggerPoint < scrollY) {
        newCenterProductIndex = i;
      }
    });
  }

  if (activeProduct && newCenterProductIndex !== centerProductIndex || !isInitialized) {
    // TODO do not rely on checking this class
    currentTransitionSpeed = 0;
    if (newCenterProductIndex < centerProductIndex) {
      productDetailsEls[centerProductIndex].classList.remove(ACTIVE_CLASS);
    }
    productIndicatorEls[centerProductIndex].classList.remove(ACTIVE_CLASS);
    centerProductIndex = newCenterProductIndex;
    productIndicatorEls[centerProductIndex].classList.add(ACTIVE_CLASS);
    productDetailsEls[centerProductIndex].classList.add(ACTIVE_CLASS);
    resetDragRotation();
  }

  if (activeProduct && !isTransitioning && centerProductIndex !== activeProductIndex) {
    setActiveProduct(centerProductIndex);
  }
}

function activateProduct(index) {
  devLog('activateProduct', activateProduct.caller.name);
  isTransitioning = true;
  currentTransitionSpeed = 0;
  closeFilmOverlay();
  hideFilmPoster();
  if (!activeProduct) {
    document.body.classList.add(ACTIVE_PRODUCT_CLASS);
  }
  productDetailsListEl.style.transform = `translateY(0px)`;
  setActiveProduct(index);
  oldScrollY = 0;
  scrollY = 0;
  measureDom();
  setCameraScrollRatio();
  scrollTarget = detailsTops[index] - detailsTops[0];
  document.scrollingElement.scrollTop = scrollTarget;
  handleResizeWindow();
}

function setActiveProduct(index) {
  devLog('setActiveProduct', setActiveProduct.caller.name);
  isDragging = false;
  hoveredBookSpine = null;
  hoveredBookSpineIndex = null;
  const oldProduct = activeProduct;
  if (index < books.length) {
    activeProduct = books[index];
  } else {
    activeProduct = films[0];
  }
  activeProductIndex = index;
  if (activeProduct === oldProduct) return;
  if (oldProduct && oldProduct !== films[0]) {
    oldProduct.cover.rotation.order =
      canvasProperties.bookSpine.cover.rotation.order;
  }
  if (activeProduct !== films[0]) {
    activeProduct.cover.rotation.order =
      canvasProperties.activeBook.cover.rotation.order;
  }
  // TODO: move activeProduct.position.y to the same screenspace position it was in when clicked
  requestAnimationFrame(() => {
    updateCssColor(activeProduct);
  })
  updateLights();
}

function setCameraScrollRatio() {
  cameraScrollRatio =
    (activeProduct ? activeScrollRatio : mainScrollRatio) / screenHeightRatio;
  cameraScrollRatio *= canvasScale;
}

function setAboutMargin() {
  aboutMarginTop = activeProduct ? detailsContainerHeight : mainContainerHeight;
  aboutEl.style.marginTop = `${aboutMarginTop}px`;
}

function resetDragRotation() {
  isTwirling = false;
  bookTwirlX = 0;
  bookTwirlY = 0;
  mouseDownX = 0;
  mouseDownY = 0;
  dragEndRotationX = 0;
  dragEndRotationY = 0;
  dragStartRotationX = 0;
  dragStartRotationY = 0;
  bookCoverDragRotationX = 0;
  bookCoverDragRotationY = -HALF_PI;
}

function hideFilmPoster() {
  films[0].position.x = 1000;
}

function showFilmPoster() {
  films[0].position.x = 0;
}

function handleClickFilmOverlay() {
  closeFilmOverlay();
}

function handleClickLogo() {
  closeFilmOverlay();
  closeProductDetails();
}

function handleClickAbout() {
  document.scrollingElement.scrollTop = aboutMarginTop;
}

function handleClickReturn() {
  closeProductDetails();
}

function closeProductDetails() {
  if (!activeProduct) return;
  resetCssColor();
  isTransitioning = true;
  currentTransitionSpeed = 0;
  resetDragRotation();
  if (activeProduct !== films[0]) {
    activeProduct.cover.rotation.order =
    canvasProperties.bookSpine.cover.rotation.order;
  }
  scrollTarget = productListTops[activeProductIndex] - productListTops[0];
  oldActiveProductIndex = activeProductIndex;
  activeProduct = null;
  activeProductIndex = null;
  document.body.classList.remove(ACTIVE_PRODUCT_CLASS);
  productDetailsListEl.style.transform = `translateY(0)`;
  transformResetBookList();
  updateLights();
  document.scrollingElement.scrollTop = scrollTarget;
  setTimeout(handleResizeWindow, 90);
  showFilmPoster();
  setTimeout(resetCssBackgroundColor, 500);
}

function transformResetBookList() {
  let bookYAccumulated = canvasProperties.activeBook.position.y; //productListTops[0] * -cameraScrollRatio + canvasProperties.bookSpine.position.y;
  let bookParams = canvasProperties.bookSpine;
  const gap = bookParams.gap;

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    let targY = bookYAccumulated + (oldActiveProductIndex - i) * 100;
    let bookCoverRotationX = book.cover.rotation.x; //0;
    let bookCoverRotationY = book.cover.rotation.y; //-HALF_PI;

    book.position.y = targY;
    bookYAccumulated += gap;

    bookCoverRotationX += currentTransitionSpeed * (bookParams.cover.rotation.x - book.cover.rotation.x);
    bookCoverRotationY += currentTransitionSpeed * (bookParams.cover.rotation.y - book.cover.rotation.y);
    book.cover.rotation.x = bookCoverRotationX;
    book.cover.rotation.y = bookCoverRotationY;
    transformBook(book, bookParams);
  }
}

function transformBooks() {
  if (!activeProduct) {
    transformBookList();
  } else {
    transformBookDetailsList();
  }
}

function transformBookList() {
  let bookYAccumulated = 0;
  const targetBookParams = canvasProperties.bookSpine;
  const gap = targetBookParams.gap;
  const bookCoverTargetX = targetBookParams.cover.position.x;

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    let bookTargetY = bookYAccumulated;
    let bookCoverRotationX = book.cover.rotation.x; //0;
    let bookCoverRotationY = book.cover.rotation.y; //-HALF_PI;

    if (isDragging) {
      bookTargetY += (hoveredBookSpineIndex - i) * targetBookParams.draggingGap;
    }
    
    book.position.y += currentTransitionSpeed * (bookTargetY - book.position.y);
    bookYAccumulated += gap;

    bookCoverRotationX += currentTransitionSpeed * (canvasProperties.bookSpine.cover.rotation.x - book.cover.rotation.x);
    bookCoverRotationY += currentTransitionSpeed * (canvasProperties.bookSpine.cover.rotation.y - book.cover.rotation.y);

    if (book === hoveredBookSpine) {
      hoveredBookSpine.position.z += 0.1 * (canvasProperties.hoveredBookSpine.position.z - book.position.z);

      if (isDragging) {
        bookCoverRotationX = bookCoverDragRotationX;
        bookCoverRotationY = bookCoverDragRotationY;
      }
    }
    
    updateCoverRotation(book, bookCoverRotationX, bookCoverRotationY);
    book.cover.position.x += currentTransitionSpeed * (bookCoverTargetX - book.cover.position.x);
    transformBook(book, targetBookParams, i);
  }
}

function transformBookDetailsList() {
  let bookYAccumulated = canvasProperties.activeBook.position.y;
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const targetBookParams = activeProduct === book ? canvasProperties.activeBook : canvasProperties.inactiveBook;
    const scrollHeight = isSmallScreen ? detailsHeights[i] : praiseHeights[i];
    const gap = scrollHeight * -cameraScrollRatio;
    const bookTargetY = bookYAccumulated;
    let bookCoverTargetX = targetBookParams.cover.position.x;
    let bookCoverRotationX = book.cover.rotation.x; //0;
    let bookCoverRotationY = book.cover.rotation.y; //-HALF_PI;

    bookYAccumulated += gap;
    book.position.y = bookTargetY;

    if (activeProduct === book) {
      if (bookTwirlX || bookTwirlY) {
        bookCoverRotationX -= bookTwirlX;
        bookCoverRotationY -= bookTwirlY;
      }
    } else {
      bookCoverRotationX += currentTransitionSpeed * (canvasProperties.bookSpine.cover.rotation.x - book.cover.rotation.x);
      bookCoverRotationY += currentTransitionSpeed * (canvasProperties.bookSpine.cover.rotation.y - book.cover.rotation.y);
    }

    book.cover.rotation.x = bookCoverRotationX % TWO_PI;
    book.cover.rotation.y = bookCoverRotationY % TWO_PI;
    book.cover.position.x += currentTransitionSpeed * (bookCoverTargetX - book.cover.position.x);
    transformBook(book, targetBookParams);
  }
}

function transformBook(book, targetBookParams) {
  let scrollRotation = book === activeProduct ? activeScrollY * activeScrollRotationForce : 0;
  const rotX = isXSmallScreen
    ? targetBookParams.rotation.x + 0.16
    : targetBookParams.rotation.x;
  book.position.x +=
    currentTransitionSpeed * (targetBookParams.position.x - book.position.x);
  book.position.z +=
    currentTransitionSpeed * (targetBookParams.position.z - book.position.z);
  book.rotation.x +=
    currentTransitionSpeed * (rotX - book.rotation.x + scrollVelocity);
  book.rotation.y +=
    currentTransitionSpeed * (targetBookParams.rotation.y + scrollRotation - book.rotation.y);
  book.rotation.z +=
    currentTransitionSpeed * (targetBookParams.rotation.z - book.rotation.z);
}

function updateCoverRotation(book, bookCoverRotationX, bookCoverRotationY) {
  book.cover.rotation.x = bookCoverRotationX % TWO_PI;
  book.cover.rotation.y = bookCoverRotationY % TWO_PI;
}

function updateFilm() {
  if (activeProduct && scrollY > detailsTops[bookCount] - canvasHeight) {
    updateFilmDetailGraphic();
    updateFilmTicker();
    document.body.classList.add('isFilmDetails');
  } else {
    document.body.classList.remove('isFilmDetails');
    updateFilmPoster();
  }
}

function updateFilmPoster() {

  const spreadAmount =
    (productListTops[bookCount - 1] + canvasHeight * 0.3 - scrollY) * 0.0015;
  const isPosterVisible =
    !activeProduct &&
    films[0] &&
    productListTops[bookCount - 1] - canvasHeight - scrollY < 0 &&
    spreadAmount < 1.4;
    
  
  if (!activeProduct && spreadAmount < 1.6) {
    document.body.classList.add('isFilmPoster');
  } else {
    document.body.classList.remove('isFilmPoster');
  }
  if (!isPosterVisible) {
    return;
  }
  if (spreadAmount < 0.1) {
    // keep the bg but do not update the poster folds
    return;
  }
  const rowCount = 100;
  const colCount = 100;
  const waveHeight = 20;
  const amplitude = waveHeight / 2;
  let side = 1;
  let fold = 1;
  let yShift = 0;
  let rowSeam = rowCount / 5;
  let colSeam = colCount / 2;
  let seam;
  const attributes = films[0].geometry.attributes;
  const initialAttributes = films[0].geometry.initialAttributes;
  const startZ = isSmallScreen ? -60 : -18;

  films[0].position.z = startZ - (1 - spreadAmount) * 50;
  films[0].material.opacity = 1;
  films[0].rotation.z = spreadAmount / 25;

  for (let r = 0; r < rowCount; r++) {
    let elevation = Math.abs(((r / 2) % waveHeight) - amplitude);
    yShift += Math.cos(Math.atan(elevation / r)) / 5;
    if (elevation >= amplitude || elevation <= 0) {
      side *= -1;
    }
    for (let c = 0; c < colCount; c++) {
      const isColSeam = c % colSeam === 0;
      const isRowSeam = r % rowSeam === 0;
      if (isColSeam) fold *= -1;
      if (isColSeam || isRowSeam) {
        seam = 0.2 * fold;
      } else {
        seam = 0;
      }
      let dips =
        (Math.sin(Math.abs(((c / colCount) * 8) % 8) - 4) +
          Math.sin(Math.abs(((r / rowCount) * 16) % 16) - 8 - r / 1.5)) *
        0.07 *
        side;
      const x = c * 3 + r * colCount * 3;
      const y = x + 1;
      const z = x + 2;
      attributes.position.array[z] =
        initialAttributes.position.array[z] +
        (elevation + dips * 4 + seam) * spreadAmount;
      attributes.position.array[y] =
        initialAttributes.position.array[y] + yShift * spreadAmount;
      attributes.normal.array[x] =
        initialAttributes.normal.array[x] +
        ((elevation / amplitude) * side + dips + seam) * spreadAmount * 3;
      attributes.normal.array[y] =
        initialAttributes.normal.array[y] +
        ((elevation / amplitude) * side * dips + seam) * spreadAmount * 3;
      attributes.normal.array[z] =
        initialAttributes.normal.array[z] +
        ((elevation / amplitude) * side + dips + seam) * spreadAmount * 3;
    }
  }
  attributes.position.needsUpdate = true;
  attributes.normal.needsUpdate = true;
}

function updateFilmDetailGraphic() {
  const filmTop = scrollY - detailsTops[bookCount];
  const handY = filmTop * 0.45;
  const pinkY = Math.max(0, filmTop * 0.18);
  const yellowY = -140 + pinkY * 0.95;
  const earthY = 160 - pinkY * 1.1;
  filmHandEl.style.transform = `translateY(${handY}px)`;
  earthBlueDotEl.style.transform = `translateY(${Math.min(0, -300 + pinkY * 1.3)}px)`;
  earthBrownEl.style.transform = `translateY(${Math.min(0, -200 + pinkY * 0.9)}px)`;
  earthCueBallEl.style.transform = `translateY(${Math.min(0, -220 + pinkY * 1.16)}px)`;
  earthRedCircleEl.style.transform = `translateY(${Math.min(0, -230 + pinkY * 1.2)}px)`;
  earthYellowBackEl.style.transform = `translateY(${Math.min(0, yellowY)}px)`;
  earthYellowFrontEl.style.transform = `translateY(${Math.min(0, yellowY)}px)`;
  earthYellowInsideEl.style.transform = `translateY(${Math.min(0, yellowY)}px)`;
  earthInsideEl.style.transform = `translateY(${Math.max(0, earthY)}px)`;
  earthShellEl.style.transform = `translateY(${Math.max(0, earthY)}px)`;
}

function updateFilmTicker() {
  const tickerLeft = (tickerTop - scrollY) * 0.5;
  filmTickerEl.style.transform = `translateX(${tickerLeft}px)`
}

function transformFilmPoster() {
  if (!films[0]) return;
  const params = activeProduct ? canvasProperties.filmPoster.inactive : canvasProperties.filmPoster.active;
  films[0].position.y += currentTransitionSpeed * (params.position.y - films[0].position.y);
}

function updateScroll() {
  scrollVelocity *= SCROLL_FRICTION;

  if (isTransitioning) {
    document.scrollingElement.scrollTop = scrollTarget;
    requestAnimationFrame(() => isTransitioning = false);
  }
  camera.position.y = canvasProperties.camera.position.y;
}

function updateCssColor(book) {
  let color = hexToCSS(book.color);
  let backgroundColor = hexToCSS(book.backgroundColor);
  document.body.style.setProperty('--color', color);
  document.body.style.setProperty('--backgroundColor', backgroundColor);
}

function resetCssColor() {
  document.body.style.setProperty('--color', COLOR_HEX_STRING);
  menuEls.forEach((el) => {
    el.style.setProperty('--color', COLOR_HEX_STRING);
    const label = el.querySelector('.PressHomepageMenu__productIndicatorLabel') || el.querySelector('.PressHomepageMenu__returnLabel') || el.querySelector('.PressHomepageMenu__filmLabel')
    if (label) {
      label.style.setProperty('--color', COLOR_HEX_STRING);
    }
  })
}

function resetCssBackgroundColor() {
  document.body.style.setProperty('--backgroundColor', BG_HEX_STRING);
}

function updateLights() {
  updateSpotlights();
  updateEnvironmentLight();
}

function updateEnvironmentLight() {
  const newColor = environmentLight.color;
  let targetBackgroundColor = activeProduct ? activeProduct.backgroundColor : new THREE.Color(BG_HEX);
  if (hoveredBookSpine && isDragging) {
    targetBackgroundColor = hoveredBookSpine.backgroundColor;
  }
  newColor.r += currentTransitionSpeed * (targetBackgroundColor.r - newColor.r);
  newColor.g += currentTransitionSpeed * (targetBackgroundColor.g - newColor.g);
  newColor.b += currentTransitionSpeed * (targetBackgroundColor.b - newColor.b);
  environmentLight.color = newColor;
}

function updateSpotlights() {
  spotlight.position.x = canvasProperties.spotlight.position.x;
  spotlight.position.y = canvasProperties.camera.position.y;

  spotlight.target.position.y = canvasProperties.camera.position.y - CAMERA_START_Y;

  if (activeProduct) {
    spotlight.intensity = canvasProperties.spotlight.activeIntensity * canvasProperties.exposure;

    spotlight.target.position.x = canvasProperties.spotlight.target.position.activeX;
    spotlight.target.position.z = canvasProperties.spotlight.target.position.activeZ;
    frontLight.position.z = canvasProperties.frontLight.position.zActive;
  } else {
    spotlight.intensity = canvasProperties.spotlight.intensity * canvasProperties.exposure;

    spotlight.target.position.x = canvasProperties.spotlight.target.position.x;
    spotlight.target.position.z = canvasProperties.spotlight.target.position.z;
    frontLight.position.z = canvasProperties.frontLight.position.z;
  }
}

function render(lastTime) {
  requestAnimationFrame(() => render(performance.now()));

  updateScroll();
  if (isWindowBlurred || isTransitioning) return;
  updateLights();
  twirlBook();
  transformBooks();
  transformFilmPoster();
  currentTransitionSpeed = Math.min(
    MAX_TRANSITION_SPEED,
    currentTransitionSpeed + TRANSITION_SPEED_INCREMENT,
  );
  // renderer.setRenderTarget( target );
  renderer.render(scene, camera);

  // postMaterial.uniforms.tDiffuse.value = target.texture;
  // postMaterial.uniforms.tDepth.value = target.depthTexture;

  // renderer.setRenderTarget( null );
  // renderer.render( postScene, postCamera );
}

function devLog(message, caller) {
  if (!isDevMode) return;
  console.log(`Function: ${message} \n  Caller: ${caller}`);
}

function hexToCSS(color) {
  const css = `rgb(${Math.floor(color.r * 255)},${Math.floor(
    color.g * 255,
  )},${Math.floor(color.b * 255)})`;
  return css;
}

