// SETUP
if (location.search.includes('dev')) {
  document.body.classList.add('isDev');
}
window.onbeforeunload = function () {
  document.scrollingElement.scrollTo(0, 0);
}
const ACTIVE_BOOK_CLASS = 'isActiveBook';

const DEV_CANVAS_HEIGHT = 1018;
const DEV_SCREEN_WIDTH = 1792;
const BOOK_CENTER_EPSILON = 0.0037;
const ACTIVE_BOOK_CENTER_EPSILON = 0.00055;
const BOOK_TRIGGER_PERCENT = 0.13;
const CAMERA_Y_EPSILON = 0.0222;
const CAMERA_START_Y = 5.6;
const MOUSE_ROTATION_SPEED = 0.00015;
const SPINE_DRAG_ROTATION_SPEED = 0.003;
const DRAG_ROTATION_SPEED = 0.003;
const MAX_TRANSITION_SPEED = 0.15;
const HALF_PI = Math.PI * 0.5;
const TWO_PI = Math.PI * 2;
const MOBILE_MAX_WIDTH = 512;
const BG_COLOR = new THREE.Color(0x111111);
const SCROLL_FRICTION = 0.4;
const CSS_PERSPECTIVE = '5000px';

let settings = {
  camera: {
    position: {
      x: 0,
      y: CAMERA_START_Y,
      z: 100,
    },
    fov: 12,
  },
  book: {
    gap: -6,
    position: {
      x: 0,
      y: -0.1, 
      z: -3, // updated on resize for smaller screens
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
        order: 'ZYX',
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
      x: -10,
      y: -2,
      z: -56,
    },
    gap: -40,
    rotation: {
      x: -0.5,
      y: 0,
      z: 0.1,
    },
    cover: {
      position: {
        x: 0,
      },
      rotation: {
        order: 'XYZ',
      },      
    }
  }
};

const bookDetailsEl = document.querySelectorAll('.bookDetails');
const logoEl = document.querySelector('.logo');
const dragAreaEl = document.querySelector('.bookDragArea');
const scrollProgressEl = document.querySelector('.scrollProgress');
const scrollIndicatorEls = [];
const backgroundColor = 0x111111;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let centerX = canvasWidth * 0.5;
let centerY = canvasHeight * 0.5;

let books = [];
let activeBook;
let centerBookNum = 0;
let hoveredSpine;
let hoveredSpineTop = 0;
let currentBookNum = 0;
let scrollY = 0;
let oldScrollY = 0;
let scrollVelocity = 0;
let scrollTimeout;
let scrollTicking = false;
let scrollTarget = 0;
let isScrolling = false;
let isInitialized = false;
let isDragging = false;
let isTwirling = false;
let isBlurred = false;
let isTransitioning = false;
let mouseY = centerX;
let mouseX = centerY;
let isMouseDown = false;
let bookMouseY = 0;
let mouseDownX = 0;
let mouseDownY = 0;
let mouseUpX = 0;
let mouseUpY = 0;
let yAxisDirection = 1;
let dragStartRotationX = 0;
let dragStartRotationY = 0;
let dragEndRotationX = 0;
let dragEndRotationY = 0;
let coverRotationX = 0;
let coverRotationY = 0;
let mouseRotationX;
let mouseRotationY;
let oldMouseRotationX;
let oldMouseRotationY;
let twirlX = 0;
let twirlY = 0;
let screenHeightRatio = 1;
let bookGapRatio = -45 * screenHeightRatio;
let screenWidthRatio = 1;
let currentTransitionSpeed = 0;

// Scene

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(settings.camera.fov, canvasWidth / canvasHeight, 90, 250);
camera.position.set(settings.camera.position.x, settings.camera.position.y, settings.camera.position.z);
camera.rotation.x = -0.06;
camera.aspect = canvasWidth / canvasHeight;

const renderer = new THREE.WebGLRenderer({ 
  antialias: false, 
  preserveDrawingBuffer: true,
  alpha: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvasWidth, canvasHeight);
renderer.bgColor = new THREE.Color(backgroundColor);
renderer.setClearColor(renderer.bgColor);
renderer.powerPreference = "high-performance";
document.body.appendChild(renderer.domElement);

// Lights

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 0.35;
scene.add(ambientLight);

const frontLight = new THREE.DirectionalLight(0xffffdc);
frontLight.position.set(1.5, 1, 0.75);
frontLight.intensity = 0.5;
scene.add(frontLight);

const backLight = new THREE.DirectionalLight(0xddddff);
backLight.position.set(-0.25, -0.25, 0.5);
backLight.intensity = 0.35;
scene.add(backLight);

const leftLight = new THREE.DirectionalLight(0xddffff);
leftLight.position.set(4, 0, 1.5);
leftLight.intensity = 0.25;
scene.add(leftLight);

const rightSpotLight = new THREE.SpotLight(0xffeecc);
rightSpotLight.angle = 0.25;
rightSpotLight.position.set(-20, 10, 15);
rightSpotLight.intensity = 0.3;
rightSpotLight.penumbra = 0.2;
rightSpotLight.target.position.set(8, -2, 0);
scene.add(rightSpotLight);
scene.add(rightSpotLight.target);

const rightSpotLight2 = new THREE.SpotLight(0x99ffcc);
rightSpotLight2.angle = 0.25;
rightSpotLight2.position.set(-22, 11, 15);
rightSpotLight2.intensity = 0.3;
rightSpotLight2.penumbra = 0.2;
rightSpotLight2.target.position.set(8.5, -2.5, 0.5);
scene.add(rightSpotLight2);
scene.add(rightSpotLight2.target);


// 
// Material
// 
const textureLoader = new THREE.TextureLoader();
let textureCount = 0;
const textureFiles = [
  'shared_diffuse_overlay.jpg',
  'shared_diffuse_none.jpg',
  'shared_bump_none.jpg',
  'shared_bump_buckram.jpg',
  'shared_bump_paper.jpg',
  'shared_foil_none.jpg',
  'AEP_bump.jpg',
  'AEP_diffuse.jpg',
  'AEP_foil.jpg',
  'GT_bump.jpg',
  'GT_diffuse.jpg',
  'GT_foil.jpg',
  'HGH_bump.jpg',
  'HGH_diffuse.jpg',
  'HGH_foil.jpg',
  'POP_bump.jpg',
  'POP_diffuse.jpg',
  'ROTP_bump.jpg',
  'ROTP_diffuse.jpg',
  'ROTP_foil.jpg',  
  'SA_bump.jpg',
  'SA_diffuse.jpg',
  'SA_foil.jpg',  
  'SF_bump.jpg',
  'SF_diffuse.jpg',
  'SF_foil.jpg',
  'TADSE_bump.jpg',
  'TADSE_diffuse.jpg',
  'TADSE_foil.jpg',
  'TBS_bump.jpg',
  'TBS_diffuse.jpg',
  'TBS_foil.jpg',
  'TDM_bump.jpg',
  'TDM_diffuse.jpg',
  'TDM_foil.jpg',
  'WIP_bump.jpg',
  'WIP_diffuse.jpg',
];

const textures = textureFiles.reduce((textures, file, i) => {
  textures[file] = textureLoader.load(`covers/${file}`, (texture) => {
    textureCount++;
    if (textureCount === textureFiles.length) {
      loadBooks();
    }
    return texture;
  });
  textures[file].name = file;
  textures[file].anisotropy = renderer.capabilities.getMaxAnisotropy();
  return textures;
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

// coverPresets

const coverPresets = { 
  'Stubborn Attachments': {
    material: {
      shininess:        12,
      thickness:        0.8,
      diffuseMapCustom: textures["SA_diffuse.jpg"],
      bumpMapBase:      textures["shared_bump_buckram.jpg"],
      bumpScaleBase:    0.03,
      bumpMapCustom:    textures["SA_bump.jpg"],
      bumpScaleCustom:  0.05,
      foilMap:          textures["SA_foil.jpg"],
      foilDetail:       0.5,
      foilSpecular:     1.75,
      foilOpacity:      0.5,
    },
    bgColor: 0x590B0C,
    color: 0xFD6A6A,
  },     
  'Working in Public': {
    material: {
      shininess:        10,
      thickness:        0.8,
      diffuseMapCustom: textures["WIP_diffuse.jpg"],
      bumpMapBase:      textures["shared_bump_buckram.jpg"],
      bumpScaleBase:    0.07,
      bumpMapCustom:    textures["WIP_bump.jpg"],
      bumpScaleCustom:  0.1,
      foilMap:          textures["shared_foil_none.jpg"],
    },
    bgColor: 0x181662,
    color: 0xFF3333,
  },    
  'Get Together': {
    material: {
      shininess:        15,
      thickness:        0.8,
      diffuseMapCustom: textures["GT_diffuse.jpg"],
      bumpMapBase:      textures["shared_bump_paper.jpg"],
      bumpScaleBase:    0.07,
      bumpMapCustom:    textures["GT_bump.jpg"],
      bumpScaleCustom:  0.10,
      foilMap:          textures["GT_foil.jpg"],
      foilDetail:       1.5,
      foilSpecular:     -0.75,
    },
    bgColor: 0xAC630C,
    color: 0xFFE70E,
  },    
  'The Art of Doing Science and Engineering': {
    material: {
      shininess:        10,
      thickness:        1.4,
      diffuseMapCustom: textures["TADSE_diffuse.jpg"],
      bumpMapBase:      textures["shared_bump_buckram.jpg"],
      bumpScaleBase:    0.05,
      bumpMapCustom:    textures["TADSE_bump.jpg"],
      bumpScaleCustom:  0.10,
      foilMap:          textures["TADSE_foil.jpg"],
      foilDetail:       1,
      foilSpecular:     0.1,
    },
    bgColor: 0x303328,
    color: 0xE0E19F,
  },
  'Prince of Persia': {
    material: {
      shininess:        10,
      thickness:        1.3,
      diffuseMapCustom: textures["POP_diffuse.jpg"],
      bumpMapBase:      textures["shared_bump_buckram.jpg"],
      bumpScaleBase:    0.05,
      bumpMapCustom:    textures["POP_bump.jpg"],
      bumpScaleCustom:  0.15,
      foilMap:          textures["shared_foil_none.jpg"],
    },
    bgColor: 0x262BA5,
    color: 0xEC860F,
  },
  'Revolt of the Public': {
    material: {
      shininess:        15,
      thickness:        1.4,
      diffuseMapCustom: textures["ROTP_diffuse.jpg"],
      bumpMapBase:      textures["shared_bump_buckram.jpg"],
      bumpScaleBase:    0.07,
      bumpMapCustom:    textures["ROTP_bump.jpg"],
      bumpScaleCustom:  0.10,
      foilMap:          textures["ROTP_foil.jpg"],
      foilDetail:       1.5,
      foilSpecular:     0.75,
      foilOpacity:      0.75,      
    },
    bgColor: 0x201e8e,
    color: 0xf260ff,
  },
  'The Big Score': {
    material: {
      shininess:        10,
      thickness:        1.4,
      diffuseMapCustom: textures["TBS_diffuse.jpg"],
      bumpMapBase:      textures["shared_bump_buckram.jpg"],
      bumpScaleBase:    0.1,
      bumpMapCustom:    textures["TBS_bump.jpg"],
      bumpScaleCustom:  0.2,
      foilMap:          textures["TBS_foil.jpg"],
      foilDetail:       3.6,
      foilSpecular:     -1,
    },
    bgColor: 0x482b23,
    color: 0xe94718,
  },  
  'High Growth Handbook': {
    material: {
      shininess:        10,
      thickness:        1.4,
      diffuseMapCustom: textures["HGH_diffuse.jpg"],
      bumpMapBase:      textures["shared_bump_buckram.jpg"],
      bumpScaleBase:    0.05,
      bumpMapCustom:    textures["HGH_bump.jpg"],
      bumpScaleCustom:  0.15,
      foilMap:          textures["shared_foil_none.jpg"],
    },
    bgColor: 0x35453F,
    color: 0x08BA7A,
  },
  'The Dream Machine': {
    material: {
      shininess:        10,
      thickness:        1.4,
      diffuseMapCustom: textures["TDM_diffuse.jpg"],
      bumpMapBase:      textures["shared_bump_buckram.jpg"],
      bumpScaleBase:    0.05,
      bumpMapCustom:    textures["TDM_bump.jpg"],
      bumpScaleCustom:  0.10,
      foilMap:          textures["TDM_foil.jpg"],
      foilDetail:       0.5,
      foilSpecular:     0.1,
    },
    bgColor: 0x2E252D,
    color: 0xFBF87A,
  },
  'Scientific Freedom': {
    material: {
      shininess:        10,
      thickness:        0.8,
      diffuseMapCustom: textures["SF_diffuse.jpg"],
      bumpMapBase:      textures["shared_bump_buckram.jpg"],
      bumpScaleBase:    0.05,
      bumpMapCustom:    textures["SF_bump.jpg"],
      bumpScaleCustom:  0.10,
      foilMap:          textures["SF_foil.jpg"],
      foilOpacity:      0.5,
      foilDetail:       0.5,
      foilSpecular:     0.08,
    },
    bgColor: 0x3d3d3d,
    color: 0xed1c24,
  },
  'An Elegant Puzzle': {
    material: {
      shininess:        10,
      thickness:        1.4,
      diffuseMapCustom: textures["AEP_diffuse.jpg"],
      bumpMapBase:      textures["shared_bump_buckram.jpg"],
      bumpScaleBase:    0.02,
      bumpMapCustom:    textures["AEP_bump.jpg"],
      bumpScaleCustom:  0.05,
      foilMap:          textures["AEP_foil.jpg"],
      foilDetail:       0.05,
      foilSpecular:     0.08,
    },
    bgColor: 0x5d5d5d,
    color: 0xdddddd,
  },   
};

let bookCount = Object.entries(coverPresets).length;
let bookTopAcc = 0;

function loadBooks() {
  Object.entries(coverPresets).forEach(([key], i) => {
    loadBook(key, i)
  });
}

function loadBook(bookTitle, i) {
  document.querySelectorAll('.bookDetails__summary')[i].innerHTML = booksData[i].synopsis;
  document.querySelectorAll('.bookDetails__authorIntro')[i].innerHTML = `${booksData[i].author.name} ${booksData[i].author.intro}`;
  document.querySelectorAll('.bookDetails__authorBio')[i].innerHTML = booksData[i].author.desc;
  let indicatorEl = scrollProgressEl.appendChild(document.createElement("DIV"));
  let indicatorFillEl = indicatorEl.appendChild(document.createElement("DIV"));
  indicatorFillEl.classList.add('scrollIndicator__fill');
  indicatorEl.classList.add('scrollIndicator');
  indicatorEl.style.animationDelay = `${(bookCount - i) * 0.1}s`
  indicatorEl.addEventListener('click', () => handleClickBook(i));
  scrollIndicatorEls.push(indicatorEl);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: Object.assign(
      {
        specular:          { type: 'c', value: new THREE.Color(0x333333) },
        shininess:         { value: 10 },
        thickness:         { value: 1.4 },

        diffuseMapBase:    { type: 't', value: textures["shared_diffuse_overlay.jpg"] },
        diffuseMapCustom:  { type: 't'},

        bumpMapBase:       { type: 't', value: textures["shared_bump_buckram.jpg"] },
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
    book = gltf.scene;
    book.rotation.set(-0.2, -1.1, 0.8);
    book.children[0].material = material;
    book.cover = book.getObjectByName('book');
    book.cover.rotation.order = settings.book.cover.rotation.order;
    book.cover.position.x = settings.book.cover.position.x;
    books.push(book);
    scene.add(book);
  
    Object.entries(coverPresets[bookTitle].material).forEach(([key, val]) => {
      material.uniforms[key].value = val;
    });
    book.bgColor = new THREE.Color(coverPresets[bookTitle].bgColor);
    book.color = new THREE.Color(coverPresets[bookTitle].color);
    book.position.set(settings.book.position.x, -i, -i * 10);
    book.rotation.set(0.1, settings.book.rotation.y, settings.book.rotation.z);
    books[i] = book;
    const booksLength = books.reduce((acc,cv)=>(cv)?acc+1:acc,0);
    if (booksLength === bookCount) {
      initScene();
    }
  });
}

function initScene() {
  scrollY = 0;
  handleScroll();
  window.addEventListener('mousemove', handleMousemove);
  dragAreaEl.addEventListener('mousedown', handleDragStart);
  window.addEventListener('mouseup', handleMouseup);
  window.addEventListener('resize', handleResize);
  window.addEventListener('blur', handleBlur);
  window.addEventListener('focus', handleFocus);
  window.addEventListener('scroll', () => {
    oldScrollY = window.scrollY;

    if (!scrollTicking) {
      window.requestAnimationFrame(function() {
        handleScroll();
        scrollTicking = false;
      });

      scrollTicking = true;
    }
  });
  bookDetailsEl.forEach((el, i) => {
    el.addEventListener('mouseenter', () => handleMouseEnterSpine(i));
    el.addEventListener('mousedown', handleDragStartSpine);
    el.addEventListener('mouseleave', handleMouseLeaveSpine);
    el.addEventListener('focus', () => handleMouseEnterSpine(i));
    el.addEventListener('blur', () => handleMouseLeaveSpine(i));
    el.querySelector('.bookDetails__cta').addEventListener('mousedown', (e) => {e.stopPropagation(); e.preventDefault()})
    el.querySelector('.bookDetails__cta').addEventListener('click', () => handleClickBook(i));
  });
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      closeBook();
    }
    if (e.key === 'ArrowDown') {
      activateBook(Math.min(bookCount - 1, centerBookNum + 1));
    }
    if (e.key === 'ArrowUp') {
      activateBook(Math.max(0, centerBookNum - 1));
    }
  })
  logoEl.addEventListener('click', () => closeBook());
  handleResize();
  render();
  isInitialized = true;
  document.body.classList.add('isInitialized');
}

// EVENT HANDLERS

function handleBlur() {
  isBlurred = true;
}
function handleFocus() {
  isBlurred = false;
}
function handleResize() {

  canvasWidth = document.documentElement.clientWidth;
  canvasHeight = document.documentElement.clientHeight;
  // prevents mobile triggering a resize when address bar hides
  if (this.oldInnerWidth === canvasWidth && canvasWidth < MOBILE_MAX_WIDTH) return;

  measureDom();
  
  centerX = canvasWidth * 0.5;
  centerY = canvasHeight * 0.5;
  if (canvasWidth < 900) {
    canvasHeight = document.documentElement.clientHeight * 1.2;
    settings.book.position.z = -30;
    settings.activeBook.position.z = -160;
    settings.activeBook.position.x = 0;
  } else {
    settings.book.position.z = -3;
    settings.activeBook.position.z = -56;
    settings.activeBook.position.x = -10;
  }
  screenHeightRatio = canvasHeight / DEV_CANVAS_HEIGHT;
  screenWidthRatio = canvasWidth / DEV_SCREEN_WIDTH;
  bookGapRatio = -45 * screenHeightRatio;
  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( canvasWidth, canvasHeight );
}

function handleMouseEnterSpine(num) {
  if (isScrolling || isDragging) return;
  if (!activeBook) {
    hoveredSpine = books[num];
  } else {
    hoveredSpine = null;
  }
}
function handleMouseLeaveSpine() {
  if (isDragging) return;
  hoveredSpine = null;
}

function handleClickBook(num) {
  activateBook(num);
}

function handleMousemove(e) {
  if (isBlurred) handleFocus();

  if (hoveredSpine && isDragging) {
    handleMouseMoveSpine(e);
  } else if (activeBook && !isTwirling) {;
    handleMouseMoveCover(e);
  }
}

function handleMouseMoveCover(e) {
  mouseY = e.pageY - scrollY - centerY;
  mouseX = e.pageX - centerX;
  
  let rotationSpeedX = isDragging ? DRAG_ROTATION_SPEED : MOUSE_ROTATION_SPEED;
  let rotationSpeedY = rotationSpeedX * yAxisDirection;
  coverRotationX = ((mouseY - mouseDownY) * rotationSpeedX + dragStartRotationX + dragEndRotationX) % TWO_PI;
  coverRotationY = (-HALF_PI + (mouseX - mouseDownX) * rotationSpeedY + dragStartRotationY + dragEndRotationY) % TWO_PI;
  
  mouseRotationY = activeBook.cover.rotation.y;
  mouseRotationX = activeBook.cover.rotation.x;
  activeBook.cover.rotation.x = coverRotationX;
  activeBook.cover.rotation.y = coverRotationY;
  oldMouseRotationX = coverRotationX;
  oldMouseRotationY = coverRotationY;
}

function handleMouseMoveSpine(e) {
  if (isBlurred) handleFocus();
  mouseY = e.pageY - scrollY - hoveredSpineTop;
  mouseX = e.pageX - centerX;
  
  coverRotationX = ((mouseX - mouseDownX) * DRAG_ROTATION_SPEED);
  coverRotationY = -HALF_PI - (mouseY - mouseDownY) * DRAG_ROTATION_SPEED;
}

function handleDragStart(e) {
  isDragging = true;
  document.body.classList.add('isDragging');
  mouseY = e.pageY - scrollY - centerY;
  mouseX = e.pageX - centerX;
  coverRotationX = Math.abs(activeBook.cover.rotation.x);
  yAxisDirection = coverRotationX % TWO_PI > 1.57 && coverRotationX < TWO_PI - HALF_PI ? -1 : 1;
  twirlX = 0;
  twirlY = 0;
  mouseDownX = mouseX;
  mouseDownY = mouseY;
  dragEndRotationX = 0;
  dragEndRotationY = 0;
  if (!activeBook) return;
  dragStartRotationX = activeBook.cover.rotation.x;
  dragStartRotationY = HALF_PI + activeBook.cover.rotation.y;
}

function handleDragStartSpine(e) {
  isDragging = true;
  hoveredSpineTop = e.target.getBoundingClientRect().top;
  mouseY = e.pageY - scrollY - hoveredSpineTop;
  mouseX = e.pageX - centerX;
  coverRotationX = hoveredSpine.cover.rotation.x;
  coverRotationY = hoveredSpine.cover.rotation.y;
  mouseDownX = mouseX;
  mouseDownY = mouseY;
  dragEndRotationX = 0;
  dragEndRotationY = 0;
  dragStartRotationX = hoveredSpine.cover.rotation.x;
  dragStartRotationY = HALF_PI + hoveredSpine.cover.rotation.y;
}

function handleMouseup(e) {
  document.body.classList.remove('isDragging');
  isDragging = false;
  mouseY = e.pageY - scrollY - centerY;
  mouseX = e.pageX - centerX;
  mouseUpX = 0;
  mouseUpY = 0;
  dragStartRotationX = 0;
  dragStartRotationY = 0;
  if (!activeBook) return;
  dragEndRotationX = activeBook.cover.rotation.x;
  dragEndRotationY = HALF_PI + activeBook.cover.rotation.y;
  mouseDownX = mouseX;
  mouseDownY = mouseY;
  twirlX = Math.min(0.3, Math.max(-0.3, mouseRotationX - oldMouseRotationX));
  twirlY = Math.min(0.3, Math.max(-0.3, mouseRotationY - oldMouseRotationY));
}

function handleScroll() {
  if (isBlurred) handleFocus();
  scrollVelocity = (scrollY - oldScrollY) * 0.003;
  scrollY = oldScrollY;
  settings.camera.position.y = -scrollY * CAMERA_Y_EPSILON / screenHeightRatio + CAMERA_START_Y;
  clearTimeout(scrollTimeout);
  if (!isScrolling) {
    isScrolling = true;
    document.body.classList.add('isScrolling');
  }

  // check the time instead of a timeout
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
    document.body.classList.remove('isScrolling');
  }, 400);
  
  updateCenterBook();
  updateSpotlights();
}

function measureDom() {
  bookDetailsEl.forEach((el, i) => {
    console.log(i, el.querySelector('.bookDetails__content').getBoundingClientRect().bottom - el.querySelector('.bookDetails__content').getBoundingClientRect().top)
  });
}

function updateCenterBook() {
  const epsilon = activeBook ? ACTIVE_BOOK_CENTER_EPSILON : BOOK_CENTER_EPSILON;
  let newCenterBookNum = Math.min(bookCount - 1, Math.floor(scrollY * (epsilon / screenHeightRatio) + BOOK_TRIGGER_PERCENT));
  if (newCenterBookNum !== centerBookNum || !isInitialized) {
    scrollIndicatorEls[centerBookNum].classList.remove('isActive');
    bookDetailsEl[centerBookNum].classList.remove('isActive');
    centerBookNum = newCenterBookNum;
    scrollIndicatorEls[centerBookNum].classList.add('isActive');
    bookDetailsEl[centerBookNum].classList.add('isActive')
    resetDragRotation();
  }
  if (activeBook && !isTransitioning) {
    activeBook.cover.rotation.order = settings.book.cover.rotation.order;
    activeBook = books[centerBookNum];
    activeBook.cover.rotation.order = settings.activeBook.cover.rotation.order;
  }
}

function activateBook(num) {
  isDragging = false;
  isTransitioning = true;
  currentTransitionSpeed = 0;
  hoveredSpine = null;
  activeBook = books[num];
  activeBook.cover.rotation.order = settings.activeBook.cover.rotation.order;
  document.body.classList.add(ACTIVE_BOOK_CLASS);
  scrollTarget = num * settings.activeBook.gap * bookGapRatio;
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
  coverRotationX = 0;
  coverRotationY = -HALF_PI;
}

function closeBook() {
  document.body.style.color = 'white';
  isTransitioning = true;
  currentTransitionSpeed = 0;
  resetDragRotation();
  activeBook.cover.rotation.order = settings.book.cover.rotation.order;
  activeBook = null;
  document.body.classList.remove(ACTIVE_BOOK_CLASS);
  scrollTarget = centerBookNum * settings.book.gap * bookGapRatio;
}

function render (time) {
  requestAnimationFrame( render );
  if (isBlurred) return;
  updateScroll();
  updateBgColor();
  twirl();
  transformBooks();
  renderer.render( scene, camera );
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

function transformBooks() {
  // if (isScrolling && !isTransitioning) return;
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    let cover = book.cover;
    let gap = activeBook ? settings.activeBook.gap : settings.book.gap;
    book.position.y += currentTransitionSpeed * (bookTopAcc - book.position.y);
    bookTopAcc += gap;
    if (activeBook === book) {
      cover.position.x += currentTransitionSpeed * -cover.position.x;
      book.rotation.x += currentTransitionSpeed * (settings.activeBook.rotation.x - book.rotation.x + scrollVelocity);
      book.rotation.y += currentTransitionSpeed * (settings.activeBook.rotation.y - book.rotation.y);
      book.rotation.z += currentTransitionSpeed * (settings.activeBook.rotation.z - book.rotation.z);
      book.position.x += currentTransitionSpeed * (settings.activeBook.position.x - book.position.x);
      // book.position.y += currentTransitionSpeed * (settings.activeBook.position.y - book.position.y);
      book.position.z += currentTransitionSpeed * (settings.activeBook.position.z - book.position.z);
      if (twirlX || twirlY) {
        cover.rotation.x -= twirlX;
        cover.rotation.y -= twirlY;
      }
    } else {
      cover.position.x += currentTransitionSpeed * (settings.book.cover.position.x - cover.position.x);
      cover.rotation.x += currentTransitionSpeed * -cover.rotation.x;
      cover.rotation.y += currentTransitionSpeed * (-HALF_PI - cover.rotation.y);
      book.rotation.x += currentTransitionSpeed * (settings.book.rotation.x - book.rotation.x + scrollVelocity);

      book.rotation.y += currentTransitionSpeed * (settings.book.rotation.y - book.rotation.y);
      book.rotation.z += currentTransitionSpeed * (settings.book.rotation.z - book.rotation.z);   
      book.position.x += currentTransitionSpeed * (settings.book.position.x - book.position.x);
      book.position.z += currentTransitionSpeed * (settings.book.position.z - book.position.z);

      if (book === hoveredSpine) {
        hoveredSpine.position.z += 0.1 * (settings.hoveredSpine.position.z - book.position.z);

        if (isDragging) {
          cover.rotation.x = coverRotationX;
          cover.rotation.y = coverRotationY;
          // poles are flipped
          bookDetailsEl[i].style.transform = `perspective(${CSS_PERSPECTIVE}) rotateX(${coverRotationY + HALF_PI - 0.06}rad) rotateY(${coverRotationX}rad) rotateZ(${0}rad)`;
        } else {
          bookDetailsEl[i].style.transform = `perspective(${CSS_PERSPECTIVE}) rotateX(-0.06rad) rotateY(0) rotateZ(0)`;
        }
      } else {
        cover.rotation.x = 0;
        cover.rotation.y = -HALF_PI;
        bookDetailsEl[i].style.transform = `perspective(${CSS_PERSPECTIVE}) rotateX(-0.06rad) rotateY(0) rotateZ(0)`

        if (isDragging) {
          book.position.z += 0.1 * (-62 - book.position.z);
        }
      }
    }
  }
}

function updateScroll() {
  scrollVelocity *= SCROLL_FRICTION;
  currentTransitionSpeed = Math.min(MAX_TRANSITION_SPEED, currentTransitionSpeed + 0.01);
  
  if (isTransitioning) {
    let scrollAmount = currentTransitionSpeed * (scrollTarget - window.scrollY);
    document.scrollingElement.scrollTop += Math.round(scrollAmount);
    if (Math.abs(scrollAmount) < 0.5) isTransitioning = false;
  }
  camera.position.y = settings.camera.position.y;
}

function updateBgColor() {
  if (activeBook) {
    bookTopAcc = settings.activeBook.position.y;
    let newColorR = Number(renderer.bgColor.r) + currentTransitionSpeed * (activeBook.bgColor.r - renderer.bgColor.r);
    let newColorG = Number(renderer.bgColor.g) + currentTransitionSpeed * (activeBook.bgColor.g - renderer.bgColor.g);
    let newColorB = Number(renderer.bgColor.b) + currentTransitionSpeed * (activeBook.bgColor.b - renderer.bgColor.b);
    renderer.bgColor.r = newColorR
    renderer.bgColor.g = newColorG
    renderer.bgColor.b = newColorB;
    document.body.style.color = `rgb(${Math.floor(activeBook.color.r * 255)},${Math.floor(activeBook.color.g * 255)},${Math.floor(activeBook.color.b * 255)})`;
  } else {
    bookTopAcc = 0;
    renderer.bgColor.r = BG_COLOR.r;
    renderer.bgColor.g = BG_COLOR.g;
    renderer.bgColor.b = BG_COLOR.b;
  }
  renderer.setClearColor(renderer.bgColor);
  renderer.setClearAlpha(0.5);
}

function updateSpotlights() {
  let spotlightOffsetZ = activeBook ? -78 : 3;
  let spotlightOffsetX = activeBook ? 10 : -4;

  if (activeBook) {
    rightSpotLight.intensity = 0.06;
    rightSpotLight2.intensity = 0.06;    
  } else {
    rightSpotLight.intensity = 0.3;
    rightSpotLight2.intensity = 0.3;
  }
  rightSpotLight.position.y = settings.camera.position.y + 11;
  rightSpotLight.position.z = 15;
  rightSpotLight.target.position.z = spotlightOffsetZ;
  rightSpotLight.target.position.y = settings.camera.position.y - 6;
  rightSpotLight.target.position.x = settings.camera.position.x + spotlightOffsetX;

  rightSpotLight2.position.y = settings.camera.position.y + 11;
  rightSpotLight2.position.z = 15;
  rightSpotLight2.target.position.z = spotlightOffsetZ;
  rightSpotLight2.target.position.y = settings.camera.position.y - 6;
  rightSpotLight2.target.position.x = settings.camera.position.x + spotlightOffsetX; 

}

// UTILITIES
