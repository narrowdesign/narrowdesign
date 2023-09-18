window.onbeforeunload = function () {
  document.scrollingElement.scrollTo(0, 0);
}

let isTyler = location.search.includes('?tyler');
let tylerColor = location.search.substr(location.search.indexOf('0x'));
if (isTyler) {
  document.body.classList.add('isTyler');
}

const iPhone = /iPhone/.test(navigator.userAgent);

// SETTINGS
const INITIALIZED_CLASS = 'isInitialized';
const DEV_CLASS = 'isDev';
const ACTIVE_BOOK_CLASS = 'isActiveBook';
const DRAGGING_CLASS = 'isDragging';
const SCROLLING_CLASS = 'isScrolling';
const ACTIVE_CLASS = 'isActive';
const CANVAS_HEIGHT = 1018;
const SCREEN_WIDTH = 1792;
const MAX_CANVAS_WIDTH = 1400;
const MAX_CANVAS_ASPECT = MAX_CANVAS_WIDTH / CANVAS_HEIGHT;
const XSMALL_SCREEN_WIDTH = 600;
const SMALL_SCREEN_WIDTH = 720;
const CAMERA_SCROLL_RATIO = 0.0222;
const CAMERA_SCROLL_RATIO_MOBILE = 0.03;
const CAMERA_SCROLL_RATIO_ACTIVE = 0.027;
const CAMERA_SCROLL_RATIO_ACTIVE_MOBILE = 0.04;
const CAMERA_START_Y = 6.5;
const CAMERA_POSITION_Z_MOBILE = 110;
const CAMERA_POSITION_Z = 100;
const BOOK_POSITION_Z_MOBILE = -50;
const BOOK_POSITION_Z = -3;
const BOOK_TRIGGER_PERCENT = 0.35;
const BOOK_TRIGGER_PERCENT_MOBILE = 0.5;
const ACTIVE_BOOK_POSITION_X_MOBILE = 0;
const ACTIVE_BOOK_POSITION_X = isTyler ? 0 : -13; // updated if ?tyler
const ACTIVE_BOOK_POSITION_Y = -4;
const ACTIVE_BOOK_POSITION_Z_MOBILE = -90;
const ACTIVE_BOOK_POSITION_Z = -56;
const INACTIVE_BOOK_POSITION_X_MOBILE = 0;
const INACTIVE_BOOK_POSITION_X = -13;
const INACTIVE_BOOK_POSITION_Y = -4;
const INACTIVE_BOOK_POSITION_Z_MOBILE = -160;
const INACTIVE_BOOK_POSITION_Z = -36;
const MOUSE_ROTATION_FORCE = 0.00015;
const DRAG_ROTATION_FORCE = 0.003;
const MAX_TRANSITION_SPEED = 0.15;
const HALF_PI = Math.PI * 0.5;
const TWO_PI = Math.PI * 2;
const MOBILE_MAX_WIDTH = 512;
const COLOR_HEX_STRING = '#ffffff';
const BG_HEX = 0x211815;
const BG_HEX_STRING = '#211815';
const BG_COLOR = new THREE.Color(BG_HEX);
const SCROLL_FRICTION = 0.4;
const CSS_PERSPECTIVE = '5000px';
const INITIAL_BOOK_ROTATION_X = -0.7;
const INITIAL_BOOK_GAP = 10;
const TRANSITION_INCREMENT = 0.006;

const canvasContainerEl = document.querySelector('.canvas__container');
const introNameEl = document.querySelector('.intro__name');
const introTaglineEl = document.querySelector('.intro__tagline');
const mainContainerEl = document.querySelector('.mainContainer');
const mainListBookEls = document.querySelectorAll('.PressHomepageProductList__book');
const mainListBookTitleEls = document.querySelectorAll('.PressHomepageProductList__bookTitle')
const mainListBookAuthorEls = document.querySelectorAll('.PressHomepageProductList__bookAuthor')
const oneLinerTextEl = document.querySelector('.oneLiner__text');
const bookDetailsContainerEl = document.querySelector('.PressHomepageBookDetails__container');
const bookDetailsEls = document.querySelectorAll('.bookDetails');
const bookDetailsTitleEls = document.querySelectorAll('.PressHomepageBookDetails__title');
const bookDetailsAuthorEls = document.querySelectorAll('.PressHomepageBookDetails__author');
const bookDetailsSummaryEls = document.querySelectorAll('.PressHomepageBookDetails__summary');
const bookDetailsBuyEls = document.querySelectorAll('.PressHomepageBookDetails__buy');
const bookDetailsAuthorIntroNameEls = document.querySelectorAll('.PressHomepageBookDetails__authorIntroName');
const bookDetailsAuthorIntroEls = document.querySelectorAll('.PressHomepageBookDetails__authorIntro');
const bookDetailsAuthorBioEls = document.querySelectorAll('.PressHomepageBookDetails__authorBio');
const bookDetailsAuthorLinkGroupEls = document.querySelectorAll('.PressHomepageBookDetails__authorLinkGroup');
const bookDetailsZineEls = document.querySelectorAll('.PressHomepageBookDetails__zine');
const bookDetailsZineCoverEls = document.querySelectorAll('.PressHomepageBookDetails__zineCover');
const bookDetailsVideoEls = document.querySelectorAll('.PressHomepageBookDetails__video');
const bookDetailsVideoPosterEls = document.querySelectorAll('.PressHomepageBookDetails__videoPoster');
const bookDetailsVideoTitleEls = document.querySelectorAll('.PressHomepageBookDetails__videoTitle');
const bookDetailsPraiseContainerEls = document.querySelectorAll('.PressHomepageBookDetails__praiseContainer');
const bookDetailsPraiseCarouselEls = document.querySelectorAll('.PressHomepageBookDetails__praiseCarousel');
const filmTrailerEl = document.querySelector('.PressHomepageProductList__filmTrailer');
const filmPosterEl = document.querySelector('.PressHomepageProductList__filmPoster');
const filmOverlayEl = document.querySelector('.filmOverlay');
const logoEl = document.querySelector('.logo');
const aboutBtnEl = document.querySelector('.about__btn');
const backEl = document.querySelector('.scrollProgress__back');
const dragAreaEl = document.querySelector('.bookDragArea');
const scrollProgressBooksEl = document.querySelector('.scrollProgress__books');
const scrollIndicatorEls = [];
const bgFillEl = document.querySelectorAll('.bgFill');
const bgFillBlockEls = document.querySelectorAll('.bgFill__block');
const aboutEl = document.querySelector('.about');

const backgroundColor = BG_HEX;
let screenWidth = window.innerWidth;
let canvasWidth = Math.min(MAX_CANVAS_WIDTH, screenWidth);
let canvasHeight = window.innerHeight;
let centerX = window.innerWidth * 0.5;
let centerY = canvasHeight * 0.5;
let canvasScale = 1;
let canvasHeightScalar = iPhone ? 1.2 : 1;

let isIntroDone = false;
let isScrolling = false;
let isInitialized = false;
let isFilmInitialized = false;
let isDragging = false;
let wasDragging = false;
let isTwirling = false;
let isWindowBlurred = false;
let isTransitioning = false;
let isMouseDown = false;
let isSmallScreen = document.documentElement.clientWidth < SMALL_SCREEN_WIDTH;
let isXSmallScreen = document.documentElement.clientWidth < XSMALL_SCREEN_WIDTH;
const coverSizeFolder = ''; //TODO export small images and turn on isSmallScreen ? 'small/' : '';

let books = [];
let activeBook;
let activeBookIndex;
let oldActiveBookIndex;
let centerBookIndex = 0;
let hoveredSpine;
let hoveredSpineIndex;
let hoveredSpineTop = 0;
let topBook;
let topBookIndex = 0;

let scrollY = 0;
let oldScrollY = 0;
let scrollVelocity = 0;
let scrollTimeout;
let scrollTicking = false;
let scrollTarget = 0;

let mouseY = centerX;
let mouseX = centerY;
let bookMouseY = 0;
let mouseDownX = 0;
let mouseDownY = 0;
let yAxisDirection = 1; // flips between 1/-1 depending on cover.rotation.x
let dragStartRotationX = 0;
let dragStartRotationY = 0;
let dragEndRotationX = 0;
let dragEndRotationY = 0;
let coverDragRotationX = 0;
let coverDragRotationY = 0;
let mouseRotationX;
let mouseRotationY;
let oldMouseRotationX;
let oldMouseRotationY;
let twirlX = 0;
let twirlY = 0;

let screenHeightRatio = 1;
let activeScrollRatio;
let mainScrollRatio;
let cameraScrollRatio = CAMERA_SCROLL_RATIO;
let currentTransitionSpeed = 0;
let detailsContainerHeight;
let detailsHeights;
let detailsTops;
let mainContainerHeight;
let mainListTops;
let praiseTops;
let aboutMarginTop;

let canvasParams = {
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
  spine: {
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
      z: HALF_PI
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
    }
  },
  stackedBook: {
    gap: 0.01,
    thickness: 0.01,
    position: {
      x: 0,
      y: -9.5, 
      z: BOOK_POSITION_Z, // updates on resize for smaller screens
    },
    rotation: {
      x: -0.3,
      y: 0.2,
      z: 0.02,
    },
    cover: {
      position: {
        x: 0,
      },
      rotation: {
        x: 0,
        y: 0,
        order: 'ZYX', // avoids gimble lock
      },
    }
  },
  hoveredSpine: {
    position: {
      z: 6,
    },
    rotation: {
      x: -Math.PI * 0.45,
    }
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
      z: 0.15,
    },
    cover: {
      position: {
        x: 0,
      },
      rotation: {
        order: 'XYZ', // avoids gimble lock
      },      
    }
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
    }
  },
  ambientLight: {
    color: '#f1e3e3',
    intensity: 0.4,
  },
  environmentLight: {
    intensity: 0.2,
  },
  frontLight: {
    color: "#ffffec",
    intensity: 0.15,
    position: {
      x: -5, 
      y: -2, 
      z: 4.75
    },
  },
  backLight: {
    color: "#ffffff",
    intensity: 0.2,
    position: {
      x: 3, 
      y: 123, 
      z: 11,
    },
  },
  leftLight: {
    color: "#eeffff",
    intensity: 0.3,
    position: {
      x: 3, 
      y: 6.5, 
      z: 13
    },
  },
  spotlight1: {
    color: "#ffeedd",
    angle:  0.32,
    position: {
      x: 52, 
      y: 16, 
      z: 32,
    },
    intensity:  0.15,
    activeIntensity: 0.15,
    penumbra:  1,
    target: {
      position: {
        x: 0,
        activeX: -14.3,
        y: -2,
        z: -6.5,
        activeZ: -61,
      }
    },
  },
  spotlight2: {
    color: "#cceecc",
    angle:  0.15,
    position: {
      x: 24, 
      y: 5.4, 
      z: 1,
    },
    intensity:  0.75,
    activeIntensity: 0.05,
    penumbra:  1,
    target: {
      position: {
        x: -6,
        activeX: -14.3,
        y: -4,
        z: -6.5,
        activeZ: -61,
      }
    },
  }
};


initUI();

// Scene

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(canvasParams.camera.fov, canvasWidth / canvasHeight, 1, 650);
camera.position.set(canvasParams.camera.position.x, canvasParams.camera.position.y, canvasParams.camera.position.z);
camera.rotation.x = isXSmallScreen ? canvasParams.camera.rotation.xSmallX : canvasParams.camera.rotation.x;
camera.aspect = canvasWidth / canvasHeight;

const renderer = new THREE.WebGLRenderer({ 
  antialias: false,
  alpha: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvasWidth, canvasHeight);
renderer.backgroundColor = new THREE.Color(backgroundColor);
renderer.setClearColor(0xdddddd, 0);
// renderer.setClearColor(renderer.backgroundColor);
renderer.powerPreference = "high-performance";
canvasContainerEl.appendChild(renderer.domElement);
renderer.domElement.classList.add('canvas');

// Lights

const ambientLight = new THREE.AmbientLight(new THREE.Color(canvasParams.ambientLight.color));
ambientLight.intensity = canvasParams.ambientLight.intensity;
scene.add(ambientLight);

const environmentLight = new THREE.AmbientLight(BG_HEX);
environmentLight.intensity = canvasParams.environmentLight.intensity;
scene.add(environmentLight);

const frontLight = new THREE.DirectionalLight(new THREE.Color(canvasParams.frontLight.color));
frontLight.position.set(
  canvasParams.frontLight.position.x,
  canvasParams.frontLight.position.y,
  canvasParams.frontLight.position.z,
);
frontLight.intensity = canvasParams.frontLight.intensity;
scene.add(frontLight);

const backLight = new THREE.DirectionalLight(new THREE.Color(canvasParams.backLight.color));
backLight.position.set(
  canvasParams.backLight.position.x,
  canvasParams.backLight.position.y,
  canvasParams.backLight.position.z,
);
backLight.intensity = canvasParams.backLight.intensity;
scene.add(backLight);

const leftLight = new THREE.DirectionalLight(new THREE.Color(canvasParams.leftLight.color));
leftLight.position.set(
  canvasParams.leftLight.position.x,
  canvasParams.leftLight.position.y,
  canvasParams.leftLight.position.z,
);
leftLight.intensity = canvasParams.leftLight.intensity;
scene.add(leftLight);

// TODO add sunlight up high
// const sunLight = new THREE.PointLight(0xffff99);
// sunLight.position.set(3.3, 11.5, -13.5);
// sunLight.intensity = 0.75;
// scene.add(sunLight);

const spotlight1 = new THREE.SpotLight(new THREE.Color(canvasParams.spotlight1.color));
spotlight1.angle = canvasParams.spotlight1.angle;
spotlight1.position.set(canvasParams.spotlight1.position.x, canvasParams.spotlight1.position.y, canvasParams.spotlight1.position.z);
spotlight1.intensity = canvasParams.spotlight1.intensity;
spotlight1.penumbra = canvasParams.spotlight1.penumbra;
spotlight1.target.position.set(canvasParams.spotlight1.target.position.x, canvasParams.spotlight1.target.position.y, canvasParams.spotlight1.target.position.z);
scene.add(spotlight1);
scene.add(spotlight1.target);

const spotlight2 = new THREE.SpotLight(new THREE.Color(canvasParams.spotlight2.color));
spotlight2.angle = canvasParams.spotlight2.angle;
spotlight2.position.set(canvasParams.spotlight2.position.x, canvasParams.spotlight2.position.y, canvasParams.spotlight2.position.z);
spotlight2.intensity = canvasParams.spotlight2.intensity;
spotlight2.penumbra = canvasParams.spotlight2.penumbra;
spotlight2.target.position.set(canvasParams.spotlight2.target.position.x, canvasParams.spotlight2.target.position.y, canvasParams.spotlight2.target.position.z);
scene.add(spotlight2);
scene.add(spotlight2.target);

// 
// Cover materials
// 
const bookTextureLoader = new THREE.TextureLoader();
let bookTextureCount = 0;
const bookTextureFiles = [
  'WIMFC_diffuse.png',
  'TBS_diffuse.webp',
  'SF_diffuse.webp',
  'shared_bump_buckram.webp',
  'TBS_bump.webp',
  'TBS_foil.webp',
  'WIMFC_bump.png',
  'WIMFC_foil.png',
  'SF_bump.webp',
  'SF_foil.webp',
  'shared_diffuse_overlay.webp',
  'shared_diffuse_none.webp',
  'shared_bump_none.webp',
  'shared_bump_paper.webp',
  'shared_foil_none.webp',
  'AEP_bump.webp',
  'AEP_diffuse.webp',
  'AEP_foil.webp',
  'GT_bump.webp',
  'GT_diffuse.webp',
  'GT_foil.webp',
  'HGH_bump.webp',
  'HGH_diffuse.webp',
  'POP_bump.webp',
  'POP_diffuse.webp',
  'ROTP_bump.webp',
  'ROTP_diffuse.webp',
  'ROTP_foil.webp',  
  'SA_bump.png',
  'SA_diffuse.webp',
  'SA_foil.webp',  
  'TADSE_bump.webp',
  'TADSE_diffuse.webp',
  'TADSE_foil.webp',
  'TDM_bump.webp',
  'TDM_diffuse.webp',
  'TDM_foil.webp',
  'WIP_bump.webp',
  'WIP_diffuse.webp',
];

const bookTextures = bookTextureFiles.reduce((bookTextures, file, i) => {
  bookTextures[file] = bookTextureLoader.load(`covers/${coverSizeFolder}${file}`, (texture) => {
    bookTextureCount++;
    if (bookTextureCount === bookTextureFiles.length) { // confirms all textures are loaded
      loadBooks();
    }
    return texture;
  });
  bookTextures[file].name = file;
  bookTextures[file].anisotropy = renderer.capabilities.getMaxAnisotropy();
  return bookTextures;
}, {});

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vViewPosition;
  varying vec3 vNormal;

  uniform float thickness;
  
  const float modelThickness = 1.3;

  void main() {
    vUv = vec2(uv.x, 1.0 - uv.y);

    // Normals

    vec3 objectNormal = vec3( normal );
    vec3 transformedNormal = normalMatrix * objectNormal;
    vNormal = normalize( transformedNormal );

    // Book thickness

    vec3 transformed = vec3( position );
    float thicknessDelta = (thickness - modelThickness);

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

    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

    // Combine diffuse textures

    vec4 diffuseColor = blendOverlay(
      texture2D( diffuseMapBase, vUv ),
      texture2D( diffuseMapCustom, vUv )
    );

    // Foil

    vec2 foilIndex = vec2(
      sin(normal.y * foilDetail  +  vViewPosition.y * foilDetail / 10.0),
      cos(normal.x * foilDetail  +  vViewPosition.x * foilDetail / 10.0)
    ) / 2.0;
    foilIndex = vec2(0.0, 1.0) + foilUvSize / 2.0 + foilIndex * foilUvSize;

    vec4 foilColor = texture2D( diffuseMapCustom, foilIndex );
    float foilCoverage = texture2D( foilMap, vUv ).r * foilOpacity;

    diffuseColor = mix(diffuseColor, foilColor, foilCoverage);

    // Lighting

    float specularStrength = 1.0 + foilCoverage * foilSpecular;

    #include <lights_phong_fragment>
    #include <lights_fragment_begin>
    #include <lights_fragment_maps>
    #include <lights_fragment_end>

    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse 
                        + reflectedLight.directSpecular + reflectedLight.indirectSpecular;

    gl_FragColor = vec4( outgoingLight, diffuseColor.a );

  }
`;

const bookCoverPresets = {
  'Where is My Flying Car': {
    material: {
      shininess:        8,
      thickness:        0.8,
      diffuseMapCustom: bookTextures["WIMFC_diffuse.png"],
      bumpMapBase:      bookTextures["shared_bump_buckram.webp"],
      bumpScaleBase:    0.04,
      bumpMapCustom:    bookTextures["WIMFC_bump.png"],
      bumpScaleCustom:  0.04,
      foilMap:          bookTextures["WIMFC_foil.png"],
      foilDetail:       1,
      foilSpecular:     1,
      foilOpacity:      0.8,
    },
    backgroundColor: 0x3d3d3d,
    color: 0x4bc8e8,
  },
  'The Big Score': {
    material: {
      shininess:        8,
      thickness:        1.4,
      diffuseMapCustom: bookTextures["TBS_diffuse.webp"],
      bumpMapBase:      bookTextures["shared_bump_buckram.webp"],
      bumpScaleBase:    0.04,
      bumpMapCustom:    bookTextures["TBS_bump.webp"],
      bumpScaleCustom:  0.14,
      foilMap:          bookTextures["TBS_foil.webp"],
      foilDetail:       2.5,
      foilSpecular:     1,
      foilOpacity:      1.8,
    },
    backgroundColor: 0x482b23,
    color: 0xf95728,
  },
  'Scientific Freedom': {
    material: {
      shininess:        10,
      thickness:        0.8,
      diffuseMapCustom: bookTextures["SF_diffuse.webp"],
      bumpMapBase:      bookTextures["shared_bump_buckram.webp"],
      bumpScaleBase:    0.03,
      bumpMapCustom:    bookTextures["SF_bump.webp"],
      bumpScaleCustom:  0.02,
      foilMap:          bookTextures["SF_foil.webp"],
      foilDetail:       4,
      foilOpacity:      1.5,
      foilSpecular:     1.5,
    },
    backgroundColor: 0x3d3d3d,
    color: 0xfd2234,
  },  
  'Working in Public': {
    material: {
      shininess:        8,
      thickness:        0.8,
      diffuseMapCustom: bookTextures["WIP_diffuse.webp"],
      bumpMapBase:      bookTextures["shared_bump_buckram.webp"],
      bumpScaleBase:    0.04,
      bumpMapCustom:    bookTextures["WIP_bump.webp"],
      bumpScaleCustom:  0.1,
      foilMap:          bookTextures["shared_foil_none.webp"],
    },
    backgroundColor: 0xFF7E76,
    color: 0x19359B,
  }, 
  'The Art of Doing Science and Engineering': {
    material: {
      shininess:        12,
      thickness:        1.4,
      diffuseMapCustom: bookTextures["TADSE_diffuse.webp"],
      bumpMapBase:      bookTextures["shared_bump_buckram.webp"],
      bumpScaleBase:    0.05,
      bumpMapCustom:    bookTextures["TADSE_bump.webp"],
      bumpScaleCustom:  0.10,
      foilMap:          bookTextures["TADSE_foil.webp"],
      foilDetail:       1,
      foilSpecular:     1,
      foilOpacity:      0.75,
    },
    backgroundColor: 0x303328,
    color: 0xE0E19F,
  },
  'Prince of Persia': {
    material: {
      shininess:        10,
      thickness:        1.3,
      diffuseMapCustom: bookTextures["POP_diffuse.webp"],
      bumpMapBase:      bookTextures["shared_bump_buckram.webp"],
      bumpScaleBase:    0.05,
      bumpMapCustom:    bookTextures["POP_bump.webp"],
      bumpScaleCustom:  0.1,
      foilMap:          bookTextures["shared_foil_none.webp"],
    },
    backgroundColor: 0x2F35C8,
    color: 0xEF9E40,
  },   
  'Get Together': {
    material: {
      shininess:        15,
      thickness:        0.8,
      diffuseMapCustom: bookTextures["GT_diffuse.webp"],
      bumpMapBase:      bookTextures["shared_bump_paper.webp"],
      bumpScaleBase:    0.07,
      bumpMapCustom:    bookTextures["GT_bump.webp"],
      bumpScaleCustom:  0.10,
      foilMap:          bookTextures["GT_foil.webp"],
      foilDetail:       1.5,
      foilSpecular:     -0.75,
    },
    backgroundColor: 0xFF825A,
    color: 0x452121,
  },
  'An Elegant Puzzle': {
    material: {
      shininess:        8,
      thickness:        1.4,
      diffuseMapCustom: bookTextures["AEP_diffuse.webp"],
      bumpMapBase:      bookTextures["shared_bump_buckram.webp"],
      bumpScaleBase:    0.04,
      bumpMapCustom:    bookTextures["AEP_bump.webp"],
      bumpScaleCustom:  0.05,
      foilMap:          bookTextures["AEP_foil.webp"],
      foilDetail:       1,
      foilSpecular:     1,
      foilOpacity:      1.4,
    },
    backgroundColor: 0x2F2F2F,
    color: 0xffffff,
  },
  'Revolt of the Public': {
    material: {
      shininess:        15,
      thickness:        1.4,
      diffuseMapCustom: bookTextures["ROTP_diffuse.webp"],
      bumpMapBase:      bookTextures["shared_bump_buckram.webp"],
      bumpScaleBase:    0.07,
      bumpMapCustom:    bookTextures["ROTP_bump.webp"],
      bumpScaleCustom:  0.10,
      foilMap:          bookTextures["ROTP_foil.webp"],
      foilDetail:       2,
      foilSpecular:     -1,
      foilOpacity:      1.2,      
    },
    backgroundColor: 0x201e8e,
    color: 0xf260ff,
  },
  'Stubborn Attachments': {
    material: {
      shininess:        14,
      thickness:        0.8,
      diffuseMapCustom: bookTextures["SA_diffuse.webp"],
      bumpMapBase:      bookTextures["shared_bump_buckram.webp"],
      bumpScaleBase:    0.03,
      bumpMapCustom:    bookTextures["SA_bump.png"],
      bumpScaleCustom:  0.2,
      foilMap:          bookTextures["SA_foil.webp"],
      foilDetail:       4,
      foilSpecular:     13.75,
      foilOpacity:      0.2,
    },
    backgroundColor: 0xFF5C5C,
    color: 0x222222,
  },
  'The Dream Machine': {
    material: {
      shininess:        10,
      thickness:        1.4,
      diffuseMapCustom: bookTextures["TDM_diffuse.webp"],
      bumpMapBase:      bookTextures["shared_bump_buckram.webp"],
      bumpScaleBase:    0.05,
      bumpMapCustom:    bookTextures["TDM_bump.webp"],
      bumpScaleCustom:  0.10,
      foilMap:          bookTextures["TDM_foil.webp"],
      foilDetail:       1,
      foilSpecular:     -1.7,
      foilOpacity:      0.8,
    },
    backgroundColor: 0xC7C7C7,
    color: 0x222222,
  },
  'High Growth Handbook': {
    material: {
      shininess:        10,
      thickness:        1.4,
      diffuseMapCustom: bookTextures["HGH_diffuse.webp"],
      bumpMapBase:      bookTextures["shared_bump_buckram.webp"],
      bumpScaleBase:    0.05,
      bumpMapCustom:    bookTextures["HGH_bump.webp"],
      bumpScaleCustom:  0.3,
      foilMap:          bookTextures["shared_foil_none.webp"],
    },
    backgroundColor: 0x35453F,
    color: 0x08BA7A,
  },  
};

let bookCount = Object.entries(bookCoverPresets).length;

function loadBooks() {
  Object.entries(bookCoverPresets).forEach(([key], i) => {
    createScrollIndicator(i);
    loadBook(key, i);
    hydrateBookContent(i);
  });
}

function loadBook(bookTitle, i) {
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: Object.assign(
      {
        specular:          { type: 'c', value: new THREE.Color(0x333333) },
        shininess:         { value: 10 },
        thickness:         { value: 1.4 },

        diffuseMapBase:    { type: 't', value: bookTextures["shared_diffuse_overlay.webp"] },
        diffuseMapCustom:  { type: 't'},

        bumpMapBase:       { type: 't', value: bookTextures["shared_bump_buckram.webp"] },
        bumpMapCustom:     { type: 't'},
        bumpScaleBase:     { value: 0.05 },
        bumpScaleCustom:   { value: 0.1 },

        foilMap:           { type: 't'},
        foilDetail:        { value: 0.5 },
        foilOpacity:       { value: 1.0 },
        foilSpecular:      { value: 0.1 },
      }, 
      THREE.UniformsLib['lights']
    ),
    lights: true,
    defines: {
      USE_UV: '',
      USE_MAP: '',
      USE_BUMPMAP: '',
    },
    extensions:{
      derivatives: true
    },
  });
  
  new THREE.GLTFLoader().load('covers/shared_geometry.gltf', gltf => {
    const book = gltf.scene;
    book.children[0].material = material;
    book.cover = book.getObjectByName('book');
    book.cover.rotation.order = canvasParams.spine.cover.rotation.order;
    
    scene.add(book);
  
    Object.entries(bookCoverPresets[bookTitle].material).forEach(([key, val]) => {
      material.uniforms[key].value = val;
    });
    book.backgroundColor = new THREE.Color(bookCoverPresets[bookTitle].backgroundColor);
    book.color = new THREE.Color(bookCoverPresets[bookTitle].color);
    book.position.set(canvasParams.spine.position.x, 0, -i * INITIAL_BOOK_GAP);
    book.rotation.set(INITIAL_BOOK_ROTATION_X, canvasParams.spine.rotation.y, canvasParams.spine.rotation.z);
    books[i] = book;
    const booksLength = books.reduce((acc,cv)=>(cv)?acc+1:acc,0); // counts the number of books in the array
    if (booksLength === bookCount) {
      initScene();
    }
  });
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
  let letterEls = Array.from(el.querySelectorAll('.letter'));
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
  const bookData = booksData[i];
  mainListBookTitleEls[i].innerHTML = bookData.shortTitle ? bookData.shortTitle : bookData.title;;
  mainListBookAuthorEls[i].innerHTML = bookData.author.name;
  bookDetailsEls[i].style.color = bookData.colors.color;
  bookDetailsEls[i].style.background = bookData.colors.backgroundColor;
  bookDetailsEls[i].style.setProperty('--backgroundColor', bookData.colors.backgroundColor);
  bookDetailsEls[i].style.setProperty('--color', bookData.colors.color);
  bookDetailsTitleEls[i].innerHTML = bookData.title;
  bookDetailsAuthorEls[i].innerHTML = bookData.author.name;
  bookDetailsSummaryEls[i].innerHTML = bookData.synopsis;
  bookDetailsAuthorIntroNameEls[i].innerHTML = `${bookData.author.name} `;
  bookDetailsAuthorIntroEls[i].innerHTML += bookData.author.intro;
  bookDetailsAuthorBioEls[i].innerHTML = bookData.author.desc;
  bookDetailsBuyEls[i].innerHTML = `Purchase $${bookData.price}`;
  bookDetailsBuyEls[i].setAttribute('href', bookData.buyPath);
  bookDetailsBuyEls[i].setAttribute('target', '_blank');
  if (bookData.zine) {
    bookDetailsZineCoverEls[i].innerHTML = `<img class="PressHomepageBookDetails__zineImg" src="${bookData.zine.cover}">`;
  } else {
    bookDetailsZineEls[i].style.display = "none";
  }
  if (bookData.video) {
    bookDetailsVideoPosterEls[i].innerHTML = `<img class="PressHomepageBookDetails__videoImg" src="${bookData.video.poster}">`;
    bookDetailsVideoTitleEls[i].innerHTML = `${bookData.video.title}`;
  } else {
    bookDetailsVideoEls[i].style.display = "none";
  }
  const praisesEl = bookDetailsPraiseCarouselEls[i];
  const linkGroupEl = bookDetailsAuthorLinkGroupEls[i];
  bookData.praises.forEach((praise) => {
    const template = praisesEl.querySelectorAll('.PressHomepageBookDetails__praise')[0].cloneNode(true);
    template.querySelector('.PressHomepageBookDetails__praiseName').innerHTML = `${praise.name}`;
    template.querySelector('.PressHomepageBookDetails__praiseRole').innerHTML = `${praise.background}`;
    template.querySelector('.PressHomepageBookDetails__praiseQuote').innerHTML = `${praise.quote}`;
    praisesEl.appendChild(template);
  })
  if (bookData.author.links) {
    bookData.author.links.forEach((link) => {
      const template = linkGroupEl.querySelectorAll('.PressHomepageBookDetails__authorLink')[0].cloneNode(true);
      template.innerHTML = `<a href="${link.url}">${link.label}</a>`;
      linkGroupEl.appendChild(template);
    })
    linkGroupEl.querySelectorAll('.PressHomepageBookDetails__authorLink')[0].remove();
  } else {
    linkGroupEl.remove();
  }
  praisesEl.querySelectorAll('.PressHomepageBookDetails__praise')[0].remove();
}

function createScrollIndicator(i) {
  const bookData = booksData[i];
  const animationDelay = 1.4;
  const animationDelayIncrement = 0.1;
  let indicatorEl = scrollProgressBooksEl.appendChild(document.createElement("DIV"));
  let indicatorFillEl = indicatorEl.appendChild(document.createElement("DIV"));
  let indicatorLabelEl = indicatorEl.appendChild(document.createElement("DIV"));
  indicatorFillEl.classList.add('scrollIndicator__fill');
  indicatorLabelEl.classList.add('scrollIndicator__label');
  indicatorLabelEl.innerHTML = bookData.shortTitle ? bookData.shortTitle : bookData.title;
  indicatorEl.classList.add('scrollIndicator');
  indicatorEl.style.animationDelay = `${(i) * animationDelayIncrement + animationDelay}s`;
  indicatorEl.addEventListener('click', () => {
    handleClickBook(i);
    handleMouseLeaveIndicator(i);
  });
  indicatorEl.addEventListener('mouseenter', () => handleMouseEnterIndicator(i));
  indicatorEl.addEventListener('mouseleave', () => handleMouseLeaveIndicator(i));
  scrollIndicatorEls.push(indicatorEl);
}

function initScene() {
  if (!isIntroDone) {
    setTimeout(() => {
      initScene();
    }, 100);
    return;
  }
  const bookPositionYStart = 3;
  const bookPositionYIncrement = 3;
  const bookPositionZStart = -30;
  scrollY = 0;
  addEventListeners();
  handleResize();
  handleScroll();
  render();
  books.forEach((book, i) => {
    book.position.set(canvasParams.spine.position.x, -i * bookPositionYIncrement + bookPositionYStart, i + bookPositionZStart);
  })
  initializeDevTools();
  isInitialized = true;
  document.body.classList.add(INITIALIZED_CLASS);
}

function addEventListeners() {
  dragAreaEl.addEventListener('mousedown', handleDragStart);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseup);
  dragAreaEl.addEventListener('touchstart', handleTouchStart);
  window.addEventListener('resize', handleResize);
  window.addEventListener('blur', handleBlur);
  window.addEventListener('focus', handleFocus);
  window.addEventListener('scroll', (e) => {
    oldScrollY = window.scrollY;

    if (!scrollTicking) {
      window.requestAnimationFrame(function() {
        handleScroll(e);
        scrollTicking = false;
      });

      scrollTicking = true;
    }
  });
  mainListBookEls.forEach((el, i) => {
    el.addEventListener('mouseenter', () => handleMouseEnterSpine(i));
    el.addEventListener('mousedown', (e) => handleDragStartSpine(e, i));
    el.addEventListener('click', () => handleClickBook(i));
    el.addEventListener('mouseleave', handleMouseLeaveSpine);
    el.addEventListener('focus', () => handleMouseEnterSpine(i));
    el.addEventListener('blur', () => handleMouseLeaveSpine(i));
    el.querySelector('.PressHomepageProductList__bookCta').addEventListener('mousedown', (e) => {e.stopPropagation(); e.preventDefault();});
    el.querySelector('.PressHomepageProductList__bookCta').addEventListener('click', () => handleClickBook(i));
    el.addEventListener('keyup', (e) => handleKeyUpBook(e, i));
  });
  filmTrailerEl.addEventListener('click', handleClickFilm);
  filmOverlayEl.addEventListener('click', handleClickFilmOverlay);
  document.addEventListener('keyup', handleKeyUp);
  logoEl.addEventListener('click', handleClickLogo);
  aboutBtnEl.addEventListener('click', handleClickAbout);
  backEl.addEventListener('click', closeBook);
}

// EVENT HANDLERS

function handleBlur() {
  if (isDragging) {
    handleMouseup();
  }
  isWindowBlurred = true;
}

function handleFocus() {
  setFocus();
}

function setFocus() {
  if (!isWindowBlurred) return;
  isWindowBlurred = false;
}

function handleResize() {
  // TODO Debounce
  screenWidth = document.documentElement.clientWidth;
  canvasWidth = Math.min(MAX_CANVAS_WIDTH, screenWidth);
  canvasHeight = document.documentElement.clientHeight * canvasHeightScalar;
  // prevents mobile triggering a resize when address bar hides
  if (this.oldInnerWidth === canvasWidth && canvasWidth < MOBILE_MAX_WIDTH) return;

  measureDom();
  setAboutMargin();
  const screenWidthRatio = canvasWidth / SCREEN_WIDTH;
  screenHeightRatio = canvasHeight / CANVAS_HEIGHT;
  if (canvasWidth < SMALL_SCREEN_WIDTH) { // TODO make this more intelligent based on ratio
    isSmallScreen = true;
    isXSmallScreen = canvasWidth < XSMALL_SCREEN_WIDTH;
    canvasParams.activeBook.position.z = ACTIVE_BOOK_POSITION_Z_MOBILE;
    canvasParams.activeBook.position.y = ACTIVE_BOOK_POSITION_Y;
    canvasParams.activeBook.position.x = ACTIVE_BOOK_POSITION_X_MOBILE;
    canvasParams.inactiveBook.position.x = INACTIVE_BOOK_POSITION_X_MOBILE;
    activeScrollRatio = CAMERA_SCROLL_RATIO_ACTIVE_MOBILE;
    mainScrollRatio = CAMERA_SCROLL_RATIO;
    bookTriggerPercent = BOOK_TRIGGER_PERCENT_MOBILE;
  } else {
    isSmallScreen = false;
    canvasParams.activeBook.position.z = ACTIVE_BOOK_POSITION_Z;
    canvasParams.activeBook.position.x = Math.max(ACTIVE_BOOK_POSITION_X, ACTIVE_BOOK_POSITION_X * screenWidthRatio);
    canvasParams.inactiveBook.position.x = Math.max(INACTIVE_BOOK_POSITION_X, INACTIVE_BOOK_POSITION_X * screenWidthRatio);
    activeScrollRatio = CAMERA_SCROLL_RATIO_ACTIVE;
    mainScrollRatio = CAMERA_SCROLL_RATIO;
    bookTriggerPercent = BOOK_TRIGGER_PERCENT;
  }
  canvasScale = isXSmallScreen ? 1 : Math.max(1, (canvasHeight * MAX_CANVAS_ASPECT) / canvasWidth * 1.1);
  document.body.style.setProperty('--canvasScale', canvasScale);
  camera.position.z = isXSmallScreen ? CAMERA_POSITION_Z : CAMERA_POSITION_Z * canvasHeightScalar * canvasScale;
  canvasParams.spine.position.z = BOOK_POSITION_Z;
  
  centerX = window.innerWidth * 0.5;
  centerY = canvasHeight * 0.5;
  
  setCameraScrollRatio();

  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( canvasWidth, canvasHeight );
  handleScroll();
}

function handleKeyUp(e) {
  switch (e.key) {
    case 'Escape':
      closeBook();
      break;
    case 'ArrowDown':
      if (activeBook) {
        activateBook(Math.min(bookCount - 1, activeBookIndex + 1));
      }
      break;
    case 'ArrowUp':
      if (activeBook) {
        activateBook(Math.max(0, activeBookIndex - 1));
      }
      break;
  }
}

function handleThrow(e) {
  topBook = books[topBookIndex];
  topBook.position.y += 3;
}

function handleMouseEnterIndicator(index) {
  if (isDragging) return;
  document.body.classList.add('isIndicatorLabel');
  const baseScaleX = 2.5;
  const scaleMultiplier = 2;
  scrollIndicatorEls.forEach((indicator, i) => {
    const indexOffset = Math.abs(index - i);
    const indexOffsetNorm = indexOffset / scrollIndicatorEls.length;
    const angle = indexOffsetNorm * Math.PI;
    const scaleX = Math.cos(angle) * scaleMultiplier + baseScaleX;
    indicator.querySelector('.scrollIndicator__fill').style.transform = `scaleX(${scaleX})`;
  })
  if (!activeBook) {
    resetCssBackgroundColor();
  }
}

function handleMouseLeaveIndicator() {
  if (isDragging) return;
  document.body.classList.remove('isIndicatorLabel');
  scrollIndicatorEls.forEach((indicator, i) => {
    indicator.querySelector('.scrollIndicator__fill').style.transform = `scaleX(1)`;
  })
}

function handleMouseEnterSpine(index) {
  if (isDragging || isSmallScreen) return;
  // if (!activeBook) {
    hoveredSpine = books[index];
    hoveredSpineIndex = index;
  // } else {
  //   hoveredSpine = null;
  //   hoveredSpineIndex = null;
  // }
}

function handleMouseLeaveSpine() {
  if (isDragging) return;
  hoveredSpine = null;
  hoveredSpineIndex = null;
}

function handleKeyUpBook(e, index) {
  if (e.key === "Enter") {
    handleClickBook(index)
  }
}

function handleClickBook(index) {
  if (wasDragging) return;
  activateBook(index);
}

function handleClickFilm() {
  if (!isFilmInitialized) {
    isFilmInitialized = true;
    filmOverlayEl.innerHTML += `<iframe class="filmOverlay__iframe" width="1280" height="720" src="https://www.youtube.com/embed/hixwoe3UnqY?modestbranding=1&autohide=1&showinfo=0&enablejsapi=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }
  document.body.classList.add('isFilmOverlay');
}

function closeFilm() {
  if (isFilmInitialized) {
    document.body.classList.remove('isFilmOverlay');
    document.querySelector('.filmOverlay__iframe').contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  }
}

function handleMouseMove(e) {
  setFocus();

  if (hoveredSpine) {
    handleMouseMoveSpine(e);
  } else if (activeBook && !isTwirling) {;
    handleMouseMoveCover(e);
  }

  if (!activeBook && scrollY > mainListTops[mainListTops.length - 1] - canvasHeight) {
    handleMouseMoveFilm(e);
  }
}

function handleMouseMoveFilm(e) {
  updateMousePosition(e);
  const mouseXNorm = mouseX / canvasWidth;
  filmTrailerEl.style.transform = `perspective(${screenWidth}px) translateX(${Math.abs(mouseXNorm) * 200}px) rotateY(${mouseXNorm * -24}deg) scale(${Math.min(1.5, 1 - mouseXNorm * 0.3)})`;
  filmTrailerEl.style.opacity = Math.max(0.1, 1 - mouseXNorm * 3);
  filmPosterEl.style.transform = `perspective(${screenWidth}px) translateX(${Math.abs(mouseXNorm) * -200}px) rotateY(${-mouseXNorm * 24}deg) scale(${Math.min(1.5, 1 + mouseXNorm * 0.3)})`;
  filmPosterEl.style.opacity = Math.max(0.1, 1 + mouseXNorm * 3);
  filmPosterEl.style.zIndex = mouseX > 0 ? 2 : 0;
}

function handleMouseMoveCover(e) {
  updateMousePosition(e);
  let rotationSpeedX = isDragging ? DRAG_ROTATION_FORCE : MOUSE_ROTATION_FORCE;
  let rotationSpeedY = rotationSpeedX * yAxisDirection;
  coverDragRotationX = isXSmallScreen ? coverDragRotationX : ((mouseY - mouseDownY) * rotationSpeedX + dragStartRotationX + dragEndRotationX) % TWO_PI;
  coverDragRotationY = (-HALF_PI + (mouseX - mouseDownX) * rotationSpeedY + dragStartRotationY + dragEndRotationY) % TWO_PI;
  oldMouseRotationX = coverDragRotationX;
  oldMouseRotationY = coverDragRotationY;

  mouseRotationX = activeBook.cover.rotation.x;
  mouseRotationY = activeBook.cover.rotation.y;
  activeBook.cover.rotation.x = coverDragRotationX;
  activeBook.cover.rotation.y = coverDragRotationY;
}

function handleMouseMoveSpine(e) {
  setFocus();
  mouseY = e.pageY - scrollY - hoveredSpineTop;
  mouseX = e.pageX - centerX;
  
  coverDragRotationX = ((mouseX - mouseDownX) * DRAG_ROTATION_FORCE);
  coverDragRotationY = -HALF_PI - (mouseY - mouseDownY) * DRAG_ROTATION_FORCE;
  if (isDragging) {
    wasDragging = true;
    // positionOneLiner();
  }
}

function handleTouchStart(e) {
  window.addEventListener('touchmove', handleTouchMove, {passive: false});
  window.addEventListener('touchend', handleTouchEnd, {passive: false});
  handleDragStart(e.touches[0]);
}

function handleTouchMove(e) {
  const touchMoveX = Math.abs(mouseX - e.touches[0].pageX + centerX);
  const touchMoveY = Math.abs(mouseY - e.touches[0].pageY + centerY + scrollY);
  const horizontalScroll = touchMoveY / touchMoveX < 10;
  if (horizontalScroll || touchMoveY === 0) {
    e.preventDefault();
    handleMouseMove(e.touches[0]);
  }
}

function handleTouchEnd(e) {
  const touchMoveX = Math.abs(mouseX - e.changedTouches[0].pageX + centerX);
  const touchMoveY = Math.abs(mouseY - e.changedTouches[0].pageY + centerY + scrollY);
  const horizontalScroll = touchMoveY / touchMoveX < 10;
  if (horizontalScroll || touchMoveY === 0) {
    e.preventDefault();
    handleMouseup(e.changedTouches[0]);
  }
  window.removeEventListener('touchmove', handleTouchMove);
  window.removeEventListener('touchend', handleTouchEnd);
}

function handleDragStart(e) {
  const cover = activeBook.cover;
  isDragging = true;
  document.body.classList.add(DRAGGING_CLASS);
  updateMousePosition(e);
  coverDragRotationX = Math.abs(activeBook.cover.rotation.x);
  yAxisDirection = coverDragRotationX % TWO_PI > HALF_PI && coverDragRotationX < TWO_PI - HALF_PI ? -1 : 1;
  twirlX = 0;
  twirlY = 0;
  mouseDownX = mouseX;
  mouseDownY = mouseY;
  dragEndRotationX = 0;
  dragEndRotationY = 0;
  dragStartRotationX = cover.rotation.x;
  dragStartRotationY = HALF_PI + cover.rotation.y;
}

function handleDragStartSpine(e, index) {
  if (isSmallScreen) return;
  const cover = hoveredSpine.cover;
  mouseY = e.pageY - scrollY - centerY;
  positionOneLiner(index);
  isDragging = true;
  updateCssColor(hoveredSpine);
  document.body.classList.add(DRAGGING_CLASS);
  hoveredSpineTop = e.target.getBoundingClientRect().top;
  coverDragRotationX = cover.rotation.x;
  coverDragRotationY = cover.rotation.y;
  mouseX = e.pageX - centerX;
  mouseY = e.pageY - scrollY - hoveredSpineTop;
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

  if (!activeBook) {
    resetCssColor();
    return;
  }
  dragEndRotationX = activeBook.cover.rotation.x;
  dragEndRotationY = HALF_PI + activeBook.cover.rotation.y;
  mouseDownX = mouseX;
  mouseDownY = mouseY;
  twirlX = Math.min(0.3, Math.max(-0.3, mouseRotationX - oldMouseRotationX));
  twirlY = Math.min(0.3, Math.max(-0.3, mouseRotationY - oldMouseRotationY));
}

function handleScroll() {
  let containerHeight = activeBook ? detailsContainerHeight : mainContainerHeight;
  setFocus();
  scrollVelocity = isSmallScreen ? 0 : (scrollY - oldScrollY) * 0.003;
  scrollY = oldScrollY;
  let containerY = Math.max(-scrollY, -containerHeight + canvasHeight);
  if (activeBook) {
    bookDetailsContainerEl.style.transform = `translateY(${containerY}px)`;
  } else {
    mainContainerEl.style.transform = `translateY(${containerY}px)`;
  }
  let scrollTotalY = -containerY;
  if (activeBook && !isSmallScreen) {
    let praiseScrollTotal = 0;
    for (let i = 0; i < activeBookIndex; i++) {
      praiseScrollTotal += praiseHeights[i];
    }
    const praiseScrollY = Math.max(0, canvasHeight - praiseTops[activeBookIndex] + scrollY);
    scrollTotalY = praiseScrollTotal + praiseScrollY;
    const bgScrollY = Math.max(0, (praiseScrollY - 700) / 700);
    const block = Math.max(0, bgFillBlockEls.length - 1 - Math.floor(bgScrollY * (bgFillBlockEls.length - 1)));
    //bgFillBlockEls[block].style.background = `rgb(${books[activeBookIndex + 1].backgroundColor.r * 255},${books[activeBookIndex + 1].backgroundColor.g * 255},${books[activeBookIndex + 1].backgroundColor.b * 255})`;
  }
  let cameraY = scrollTotalY * cameraScrollRatio;

  canvasParams.camera.position.y = canvasParams.camera.position.startY - cameraY;
  clearTimeout(scrollTimeout);
  if (!isScrolling) {
    isScrolling = true;
    document.body.classList.add(SCROLLING_CLASS);
  }

  // check the time instead of a timeout
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
    document.body.classList.remove(SCROLLING_CLASS);
  }, 400);
  
  updateCenterBook();
  updateSpotlights();
}

function measureDom() {
  mainContainerHeight = mainContainerEl.getBoundingClientRect().height;
  detailsContainerHeight = bookDetailsContainerEl.getBoundingClientRect().height;
  
  mainListTops = [];
  detailsHeights = [];
  praiseTops = [];
  praiseHeights = [];
  detailsTops = [];

  bookDetailsEls.forEach((el, i) => {
    const praiseRect = bookDetailsPraiseContainerEls[i].getBoundingClientRect();
    const detailsRect = el.getBoundingClientRect();
    const mainListRect = mainListBookEls[i].getBoundingClientRect();
    mainListTops.push(mainListRect.top + scrollY);
    detailsHeights.push(detailsRect.height);
    detailsTops.push(detailsRect.top + scrollY);
    praiseTops.push(praiseRect.top + scrollY);
    praiseHeights.push(praiseRect.height + canvasHeight);
  });
}

function positionOneLiner(index) {
  const oneLinerY = mouseY < 0 ? canvasHeight * 0.25 : canvasHeight * -0.3;
  oneLinerTextEl.innerHTML = booksData[index].oneLiner;
  oneLinerTextEl.style.transform = `translateY(${oneLinerY}px)`;
}

function updateMousePosition(e) {
  if (!e) return;
  mouseY = e.pageY - scrollY - centerY;
  mouseX = e.pageX - centerX;
}

function updateCenterBook() {
  if (!detailsTops) return;
  let newCenterBookIndex = 0;
  let mainListTriggerPercent = isSmallScreen ? 0.1 : 0.333;
  let mainListTriggerPoint = canvasHeight * mainListTriggerPercent;

  if (activeBook) {
    for (let i = detailsTops.length; i > 0; i--) {
      const detailsTop = detailsTops[i];
      if (detailsTop - canvasHeight * bookTriggerPercent <= scrollY) {
        newCenterBookIndex = i;
        break;
      }
    }
  } else {
    mainListTops.forEach((top, i) => {
      if (top - mainListTriggerPoint < scrollY) {
        newCenterBookIndex = i;
      }
    });
  }

  if (newCenterBookIndex !== centerBookIndex || !bookDetailsEls[centerBookIndex].classList.contains(ACTIVE_CLASS) || !isInitialized) { // TODO do not rely on checking this class
    currentTransitionSpeed = 0;
    if (newCenterBookIndex < centerBookIndex) {
      bookDetailsEls[centerBookIndex].classList.remove(ACTIVE_CLASS);
    }
    scrollIndicatorEls[centerBookIndex].classList.remove(ACTIVE_CLASS);
    centerBookIndex = newCenterBookIndex;
    scrollIndicatorEls[centerBookIndex].classList.add(ACTIVE_CLASS);
    bookDetailsEls[centerBookIndex].classList.add(ACTIVE_CLASS);
    resetDragRotation();
  }

  if (activeBook && !isTransitioning) {
    setActiveBook(centerBookIndex);
  }
}

function activateBook(index) {
  closeFilm();
  isDragging = false;
  isTransitioning = true;
  currentTransitionSpeed = 0;
  hoveredSpine = null;
  if (!activeBook) {
    document.body.classList.add(ACTIVE_BOOK_CLASS);
    measureDom();
  }
  setActiveBook(index);
  setAboutMargin();
  setCameraScrollRatio();
  scrollTarget = detailsTops[index] - detailsTops[0];
  document.scrollingElement.scrollTop = scrollTarget;
  handleScroll();
  handleResize();
  updateSpotlights();
}

function setActiveBook(index) {
  const oldBook = activeBook;
  activeBook = books[index];
  activeBookIndex = index;
  if (activeBook === oldBook) return;
  if (oldBook) {
    oldBook.cover.rotation.order = canvasParams.spine.cover.rotation.order;
  }
  activeBook.cover.rotation.order = canvasParams.activeBook.cover.rotation.order;
  // TODO: move activeBook.position.y to the same screenspace position it was in when clicked
  updateCssColor(activeBook);
}

function setCameraScrollRatio() {
  cameraScrollRatio = (activeBook ? activeScrollRatio : mainScrollRatio) / screenHeightRatio;
  cameraScrollRatio *= canvasScale;
}

function setAboutMargin() {
  aboutMarginTop = activeBook ? detailsContainerHeight : mainContainerHeight;
  aboutEl.style.marginTop = `${aboutMarginTop}px`;
}

function resetDragRotation() {
  isTwirling = false;
  twirlX = 0;
  twirlY = 0;
  mouseDownX = 0;
  mouseDownY = 0;
  dragEndRotationX = 0;
  dragEndRotationY = 0;
  dragStartRotationX = 0;
  dragStartRotationY = 0;
  coverDragRotationX = 0;
  coverDragRotationY = -HALF_PI;
}

function handleClickFilmOverlay() {
  closeFilm();
}

function handleClickLogo() {
  closeFilm();
  closeBook();
}

function handleClickAbout() {
  document.scrollingElement.scrollTop = aboutMarginTop;
}

function closeBook() {
  if (!activeBook) return;
  resetCssColor();
  isTransitioning = true;
  currentTransitionSpeed = 0;
  resetDragRotation();
  activeBook.cover.rotation.order = canvasParams.spine.cover.rotation.order;
  scrollTarget = mainListTops[activeBookIndex] - mainListTops[0];
  oldActiveBookIndex = activeBookIndex;
  activeBook = null;
  activeBookIndex = null;
  setCameraScrollRatio();
  document.body.classList.remove(ACTIVE_BOOK_CLASS);
  bookDetailsContainerEl.style.transform = `translateY(0)`;
  setAboutMargin();
  transformResetBookList();
  updateSpotlights();
  document.scrollingElement.scrollTop = scrollTarget;
  setTimeout(resetCssBackgroundColor, 500);
}

function twirl() {
  if (!activeBook) return;
  if (Math.abs(twirlX) + Math.abs(twirlY) > 0.001) {
    dragStartRotationX = activeBook.cover.rotation.x;
    dragStartRotationY = HALF_PI + activeBook.cover.rotation.y;
    dragEndRotationX = 0;
    dragEndRotationY = 0;
    twirlX = twirlX * 0.95;
    twirlY = twirlY * 0.95;
    isTwirling = true;
  } else {
    twirlX = 0;
    twirlY = 0;
    isTwirling = false;
  }
}

function transformResetBookList() {
  let bookYAccumulated = canvasParams.activeBook.position.y; //mainListTops[0] * -cameraScrollRatio + canvasParams.spine.position.y;
  let bookParams = canvasParams.spine;
  const gap = bookParams.gap;

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const cover = book.cover;
    let targY = bookYAccumulated + (oldActiveBookIndex - i) * 100;
    let coverRotationX = cover.rotation.x; //0;
    let coverRotationY = cover.rotation.y; //-HALF_PI;
    
    book.position.y = targY;
    bookYAccumulated += gap;

    coverRotationX += currentTransitionSpeed * (bookParams.cover.rotation.x - cover.rotation.x);
    coverRotationY += currentTransitionSpeed * (bookParams.cover.rotation.y - cover.rotation.y);  
    cover.rotation.x = coverRotationX;
    cover.rotation.y = coverRotationY;
    transformBook(book, bookParams, i);
  }
}

function transformBookList() {
  let bookYAccumulated = activeBook ? canvasParams.activeBook.position.y : 0;
  // TODO ONLY update books in view
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const cover = book.cover;
    const scrollHeight = isSmallScreen ? detailsHeights[i] : praiseHeights[i];
    let targetBookParams = canvasParams.spine;
    const gap = activeBook ? scrollHeight * -cameraScrollRatio : targetBookParams.gap;
    let targY = bookYAccumulated;
    let coverTargX = targetBookParams.cover.position.x;
    let coverRotationX = cover.rotation.x; //0;
    let coverRotationY = cover.rotation.y; //-HALF_PI;
    
    if (!activeBook && isDragging) {
      targY += (hoveredSpineIndex - i) * canvasParams.spine.draggingGap;
    }

    if (!activeBook) {
      book.position.y += currentTransitionSpeed * (targY - book.position.y);
    } else {
      book.position.y = targY;
    }
    bookYAccumulated += gap;

    if (activeBook === book) {
      targetBookParams = canvasParams.activeBook;
      coverTargX = canvasParams.activeBook.cover.position.x
      if (twirlX || twirlY) {
        coverRotationX -= twirlX;
        coverRotationY -= twirlY;
      }
    } else if (activeBook) {
      targetBookParams = canvasParams.inactiveBook;
      coverTargX = canvasParams.inactiveBook.cover.position.x
      coverRotationX += currentTransitionSpeed * (canvasParams.spine.cover.rotation.x - cover.rotation.x);
      coverRotationY += currentTransitionSpeed * (canvasParams.spine.cover.rotation.y - cover.rotation.y); 
    } else {
      coverRotationX += currentTransitionSpeed * (canvasParams.spine.cover.rotation.x - cover.rotation.x);
      coverRotationY += currentTransitionSpeed * (canvasParams.spine.cover.rotation.y - cover.rotation.y);  
    }
    if (book === hoveredSpine) { // TODO: break these out into 
      hoveredSpine.position.z += 0.1 * (canvasParams.hoveredSpine.position.z - book.position.z);

      if (isDragging) {
        coverRotationX = coverDragRotationX;
        coverRotationY = coverDragRotationY;
      }
    }
    cover.rotation.x = coverRotationX % TWO_PI;
    cover.rotation.y = coverRotationY % TWO_PI;
    cover.position.x += currentTransitionSpeed * (coverTargX - cover.position.x);
    transformBook(book, targetBookParams, i);
  }
}

function transformBook(book, targetBookParams, index) {
  const rotX = isXSmallScreen ? targetBookParams.rotation.x + 0.16 : targetBookParams.rotation.x;
  book.position.x += currentTransitionSpeed * (targetBookParams.position.x - book.position.x);
  book.position.z += currentTransitionSpeed * (targetBookParams.position.z - book.position.z);
  book.rotation.x += currentTransitionSpeed * (rotX - book.rotation.x + scrollVelocity);
  book.rotation.y += currentTransitionSpeed * (targetBookParams.rotation.y - book.rotation.y);
  book.rotation.z += currentTransitionSpeed * (targetBookParams.rotation.z - book.rotation.z);
}

function updateScroll() {
  scrollVelocity *= SCROLL_FRICTION;
  
  if (isTransitioning) {
    let scrollAmount = currentTransitionSpeed * (scrollTarget - window.scrollY);
    document.scrollingElement.scrollTop = scrollTarget;
    if (Math.abs(scrollAmount) < 0.5) isTransitioning = false;
  }
  camera.position.y = canvasParams.camera.position.y;
}

function updateCssColor(book) {
  let color = `rgb(${Math.floor(book.color.r * 255)},${Math.floor(book.color.g * 255)},${Math.floor(book.color.b * 255)})`;
  let backgroundColor = `rgb(${Math.floor(book.backgroundColor.r * 255)},${Math.floor(book.backgroundColor.g * 255)},${Math.floor(book.backgroundColor.b * 255)})`;
  document.body.style.setProperty('--color', color);
  document.body.style.setProperty('--backgroundColor', backgroundColor);
}

function resetCssColor() {
  document.body.style.setProperty('--color', COLOR_HEX_STRING);
}

function resetCssBackgroundColor() {
  document.body.style.setProperty('--backgroundColor', BG_HEX_STRING);
}

function updateBackgroundColor() {
  const colorTransitionSpeed = currentTransitionSpeed * 2;
  const backgroundColor = renderer.backgroundColor;
  if (activeBook) {
    let newColorR = Number(backgroundColor.r) + colorTransitionSpeed * (activeBook.backgroundColor.r - backgroundColor.r);
    let newColorG = Number(backgroundColor.g) + colorTransitionSpeed * (activeBook.backgroundColor.g - backgroundColor.g);
    let newColorB = Number(backgroundColor.b) + colorTransitionSpeed * (activeBook.backgroundColor.b - backgroundColor.b);
    renderer.backgroundColor.r = newColorR
    renderer.backgroundColor.g = newColorG
    renderer.backgroundColor.b = newColorB;
  } else if (isDragging) {
    let newColorR = Number(backgroundColor.r) + colorTransitionSpeed * (hoveredSpine.backgroundColor.r - backgroundColor.r);
    let newColorG = Number(backgroundColor.g) + colorTransitionSpeed * (hoveredSpine.backgroundColor.g - backgroundColor.g);
    let newColorB = Number(backgroundColor.b) + colorTransitionSpeed * (hoveredSpine.backgroundColor.b - backgroundColor.b);
    renderer.backgroundColor.r = newColorR
    renderer.backgroundColor.g = newColorG
    renderer.backgroundColor.b = newColorB;
  } else {
    let newColorR = Number(backgroundColor.r) + colorTransitionSpeed * (BG_COLOR.r - backgroundColor.r);
    let newColorG = Number(backgroundColor.g) + colorTransitionSpeed * (BG_COLOR.g - backgroundColor.g);
    let newColorB = Number(backgroundColor.b) + colorTransitionSpeed * (BG_COLOR.b - backgroundColor.b);
    renderer.backgroundColor.r = newColorR
    renderer.backgroundColor.g = newColorG
    renderer.backgroundColor.b = newColorB;
  }
  environmentLight.color = renderer.backgroundColor;
  // renderer.setClearColor(renderer.backgroundColor);
  // renderer.setClearAlpha(1);
}

function updateSpotlights() {
  const mouseShiftX = mouseX / canvasWidth * 10;
  const mouseShiftY = mouseY / canvasHeight * -14;
  const shiftForce2 = 0.75;

  spotlight1.position.x = canvasParams.spotlight1.position.x;
  spotlight2.position.x = canvasParams.spotlight2.position.x;
  spotlight1.position.y = canvasParams.camera.position.y;
  spotlight2.position.y = canvasParams.camera.position.y;

  spotlight1.target.position.y = canvasParams.camera.position.y - CAMERA_START_Y;
  spotlight2.target.position.y = canvasParams.camera.position.y - CAMERA_START_Y;
  
  if (activeBook) {
    spotlight1.intensity = canvasParams.spotlight1.activeIntensity * canvasParams.exposure;
    spotlight2.intensity = canvasParams.spotlight2.activeIntensity * canvasParams.exposure;

    spotlight1.target.position.x = canvasParams.spotlight1.target.position.activeX;
    spotlight1.target.position.z = canvasParams.spotlight1.target.position.activeZ;

    spotlight2.target.position.x = canvasParams.spotlight2.target.position.activeX;
    spotlight2.target.position.z = canvasParams.spotlight2.target.position.activeZ;
  } else {
    spotlight1.intensity = canvasParams.spotlight1.intensity * canvasParams.exposure;
    spotlight2.intensity = canvasParams.spotlight2.intensity * canvasParams.exposure;

    spotlight1.target.position.x = canvasParams.spotlight1.target.position.x;
    spotlight1.target.position.z = canvasParams.spotlight1.target.position.z;

    spotlight2.target.position.x = canvasParams.spotlight2.target.position.x;
    spotlight2.target.position.z = canvasParams.spotlight2.target.position.z;
  }
}

function render() {
  requestAnimationFrame( render );
  if (isWindowBlurred) return;
  updateScroll();
  updateBackgroundColor();
  twirl();
  transformBookList();
  const maxTransitionSpeed = MAX_TRANSITION_SPEED;
  const transitionSpeedIncrement = TRANSITION_INCREMENT;
  currentTransitionSpeed = Math.min(maxTransitionSpeed, currentTransitionSpeed + transitionSpeedIncrement);
  renderer.render( scene, camera );
}

// UTILITIES

// DEV
function initializeDevTools() {
  console.log(location.search.includes('__dev'))
  if (!location.search.includes('__dev')) return;
  
  document.body.classList.add(DEV_CLASS);
  // scene.add(new THREE.GridHelper(40, 20));

  const pane = new Tweakpane.Pane();
  
  const globalFolder = pane.addFolder({title: "Global"});
  const cameraFolder = pane.addFolder({title: "Camera", expanded: false});
  const cameraPositionFolder = cameraFolder.addFolder({title: "Position"});
  const cameraRotationFolder = cameraFolder.addFolder({title: "Rotation"});

  globalFolder.addInput(canvasParams, 'exposure', {
    min: 0.1,
    max: 10,
    step: 0.1,
  })

  const ambientLightFolder = pane.addFolder({title: "Ambient light", expanded: false});
  
  const leftLightFolder = pane.addFolder({title: "Left light", expanded: false});
  const leftLightPositionFolder = leftLightFolder.addFolder({title: "Position"});
  const backLightFolder = pane.addFolder({title: "Back light", expanded: false});
  const backLightPositionFolder = backLightFolder.addFolder({title: "Position"});
  const frontLightFolder = pane.addFolder({title: "Front light", expanded: false});
  const frontLightPositionFolder = frontLightFolder.addFolder({title: "Position"}); 
  
  const spotlight1Folder = pane.addFolder({title: "Spotlight 1", expanded: false});
  const spotlight1PositionFolder = spotlight1Folder.addFolder({title: "Position"});
  const spotlight1TargetFolder = spotlight1Folder.addFolder({title: "Target"});

  const spotlight2Folder = pane.addFolder({title: "Spotlight 2", expanded: false});
  const spotlight2PositionFolder = spotlight2Folder.addFolder({title: "Position"});
  const spotlight2TargetFolder = spotlight2Folder.addFolder({title: "Target"});

  cameraFolder.addInput(canvasParams.camera, 'fov', {
    min: 1,
    max: 100, 
    step: 1,
  });

  cameraPositionFolder.addInput(canvasParams.camera.position, 'x', {
    min: -40,
    max: 40, 
    step: 1,
  });

  cameraPositionFolder.addInput(canvasParams.camera.position, 'y', {
    min: -100,
    max: 100, 
    step: 0.01,
  });

  cameraPositionFolder.addInput(canvasParams.camera.position, 'z', {
    min: 1, 
    max: 200, 
    step: 0.25,
  });
  
  cameraRotationFolder.addInput(canvasParams.camera.rotation, 'x', {
    min: -1, 
    max: 1, 
    step: 0.001,
  });

  ambientLightFolder.addInput(canvasParams.ambientLight, 'color', {
    picker: 'inline',
  });

  ambientLightFolder.addInput(canvasParams.ambientLight, 'intensity', {
    min: 0,
    max: 1,
    step: 0.05,
  });

  leftLightFolder.addInput(canvasParams.leftLight, 'intensity', {
    min: 0, 
    max: 3,
    step: 0.05,
  });

  leftLightFolder.addInput(canvasParams.leftLight, 'color', {
    picker: 'inline',
  });

  leftLightPositionFolder.addInput(canvasParams.leftLight.position, 'x', {
    min: -3, 
    max: 3,
    step: 0.1,
  });

  leftLightPositionFolder.addInput(canvasParams.leftLight.position, 'y', {
    min: -3, 
    max: 3,
    step: 0.1,
  });

  leftLightPositionFolder.addInput(canvasParams.leftLight.position, 'z', {
    min: -3, 
    max: 3,
    step: 0.1,
  });

  backLightFolder.addInput(canvasParams.backLight, 'intensity', {
    min: 0, 
    max: 3,
    step: 0.05,
  });

  backLightFolder.addInput(canvasParams.backLight, 'color', {
    picker: 'inline',
  });
  
  backLightPositionFolder.addInput(canvasParams.backLight.position, 'x', {
    min: -3, 
    max: 3,
    step: 0.1,
  });

  backLightPositionFolder.addInput(canvasParams.backLight.position, 'y', {
    min: -3, 
    max: 3,
    step: 0.1,
  });

  backLightPositionFolder.addInput(canvasParams.backLight.position, 'z', {
    min: -3, 
    max: 3,
    step: 0.1,
  });

  frontLightFolder.addInput(canvasParams.frontLight, 'intensity', {
    min: 0, 
    max: 3,
    step: 0.05,
  });
  
  frontLightFolder.addInput(canvasParams.frontLight, 'color', {
    picker: 'inline',
  });

  frontLightPositionFolder.addInput(canvasParams.frontLight.position, 'x', {
    min: -3, 
    max: 3,
    step: 0.1,
  });

  frontLightPositionFolder.addInput(canvasParams.frontLight.position, 'y', {
    min: -3, 
    max: 3,
    step: 0.1,
  });

  frontLightPositionFolder.addInput(canvasParams.frontLight.position, 'z', {
    min: -3, 
    max: 3,
    step: 0.1,
  });

  spotlight1Folder.addInput(canvasParams.spotlight1, 'intensity', {
    min: 0, 
    max: 3,
    step: 0.05,
  });

  spotlight1Folder.addInput(canvasParams.spotlight1, 'color', {
    picker: 'inline',
  });
  
  spotlight1Folder.addInput(canvasParams.spotlight1, 'angle', {
    min: 0, 
    max: 3,
    step: 0.05,
  });

  spotlight1Folder.addInput(canvasParams.spotlight1, 'penumbra', {
    min: 0, 
    max: 1,
    step: 0.05,
  });

  spotlight1PositionFolder.addInput(canvasParams.spotlight1.position, 'x', {
    min: -60, 
    max: 60,
    step: 0.1,
  });

  spotlight1PositionFolder.addInput(canvasParams.spotlight1.position, 'y', {
    min: -30, 
    max: 30,
    step: 0.1,
  });

  spotlight1PositionFolder.addInput(canvasParams.spotlight1.position, 'z', {
    min: -60, 
    max: 60,
    step: 0.1,
  });

  spotlight1TargetFolder.addInput(canvasParams.spotlight1.target.position, 'x', {
    min: -30, 
    max: 30,
    step: 0.1,
  });

  spotlight1TargetFolder.addInput(canvasParams.spotlight1.target.position, 'y', {
    min: -30, 
    max: 30,
    step: 0.1,
  });

  spotlight1TargetFolder.addInput(canvasParams.spotlight1.target.position, 'z', {
    min: -80, 
    max: 80,
    step: 0.1,
  });

  spotlight2Folder.addInput(canvasParams.spotlight2, 'intensity', {
    min: 0, 
    max: 3,
    step: 0.05,
  });

  spotlight2Folder.addInput(canvasParams.spotlight2, 'color', {
    picker: 'inline',
  });

  spotlight2Folder.addInput(canvasParams.spotlight2, 'angle', {
    min: 0, 
    max: 3,
    step: 0.05,
  });

  spotlight2Folder.addInput(canvasParams.spotlight2, 'penumbra', {
    min: 0, 
    max: 1,
    step: 0.05,
  });

  spotlight2PositionFolder.addInput(canvasParams.spotlight2.position, 'x', {
    min: -30, 
    max: 30,
    step: 0.1,
  });

  spotlight2PositionFolder.addInput(canvasParams.spotlight2.position, 'y', {
    min: -30, 
    max: 30,
    step: 0.1,
  });

  spotlight2PositionFolder.addInput(canvasParams.spotlight2.position, 'z', {
    min: -60, 
    max: 60,
    step: 0.1,
  });

  spotlight2TargetFolder.addInput(canvasParams.spotlight2.target.position, 'x', {
    min: -80, 
    max: 80,
    step: 0.1,
  });

  spotlight2TargetFolder.addInput(canvasParams.spotlight2.target.position, 'y', {
    min: -30, 
    max: 30,
    step: 0.1,
  });

  spotlight2TargetFolder.addInput(canvasParams.spotlight2.target.position, 'z', {
    min: -30, 
    max: 30,
    step: 0.1,
  });

  let btn = pane.addButton({
    title: 'export',
  });
  btn.on('click', function() {
    const preset = pane.exportPreset();
    console.log(preset);
  });

  pane.on('change', tweakScene);


  function tweakScene() {
    camera.position.x = canvasParams.camera.position.x;
    camera.position.y = canvasParams.camera.position.startY;
    camera.position.z = canvasParams.camera.position.z;
    camera.rotation.x = canvasParams.camera.rotation.x;
    camera.fov = canvasParams.camera.fov;
    camera.updateProjectionMatrix();

    ambientLight.intensity = canvasParams.ambientLight.intensity * canvasParams.exposure;
    ambientLight.color = new THREE.Color(canvasParams.ambientLight.color);
    
    leftLight.intensity = canvasParams.leftLight.intensity * canvasParams.exposure;
    leftLight.color = new THREE.Color(canvasParams.leftLight.color);
    leftLight.position.set(
      canvasParams.leftLight.position.x,
      canvasParams.leftLight.position.y,
      canvasParams.leftLight.position.z
    );
    
    backLight.intensity = canvasParams.backLight.intensity * canvasParams.exposure;
    backLight.color = new THREE.Color(canvasParams.backLight.color);
    backLight.position.set(
      canvasParams.backLight.position.x,
      canvasParams.backLight.position.y,
      canvasParams.backLight.position.z
    );

    frontLight.intensity = canvasParams.frontLight.intensity * canvasParams.exposure;
    frontLight.color = new THREE.Color(canvasParams.frontLight.color);
    frontLight.position.set(
      canvasParams.frontLight.position.x,
      canvasParams.frontLight.position.y,
      canvasParams.frontLight.position.z
    );

    spotlight1.position.set(
      canvasParams.spotlight1.position.x,
      canvasParams.camera.position.y + canvasParams.spotlight1.position.y - CAMERA_START_Y,
      canvasParams.spotlight1.position.z
    );
    spotlight1.target.position.set(
      canvasParams.spotlight1.target.position.x,
      canvasParams.camera.position.y + canvasParams.spotlight1.target.position.y - CAMERA_START_Y,
      canvasParams.spotlight1.target.position.z,
    );
    spotlight1.intensity = canvasParams.spotlight1.intensity * canvasParams.exposure;
    spotlight1.color = new THREE.Color(canvasParams.spotlight1.color);
    spotlight1.angle = canvasParams.spotlight1.angle;
    spotlight1.penumbra = canvasParams.spotlight1.penumbra;

    spotlight2.position.set(
      canvasParams.spotlight2.position.x,
      canvasParams.camera.position.y + canvasParams.spotlight2.position.y - CAMERA_START_Y,
      canvasParams.spotlight2.position.z
    );
    spotlight2.target.position.set(
      canvasParams.spotlight2.target.position.x,
      canvasParams.camera.position.y + canvasParams.spotlight2.target.position.y - CAMERA_START_Y,
      canvasParams.spotlight2.target.position.z,
    );
    spotlight2.intensity = canvasParams.spotlight2.intensity * canvasParams.exposure;
    spotlight2.color = new THREE.Color(canvasParams.spotlight2.color);
    spotlight2.angle = canvasParams.spotlight2.angle;
    spotlight2.penumbra = canvasParams.spotlight2.penumbra;
  }
  handleResize();
}