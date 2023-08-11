const HALF_PI = Math.PI / 2;

const dotHoverArray = [
  'SOFT BODY SKIN', 'HYDRO THRUST NOSECONE', 'ORKA FIN QUAD TAIL', 'VENETIAN GONDOLA',
]

const dotHoverEl = document.querySelector('.dotHover');

const winProps = {
  width: window.innerWidth,
  height: window.innerHeight,
  scrollY: window.scrollY,
  scrollVelocity: 0,
  mouseX: 0,
  mouseY: 0,
  isMouseDown: false,
  devScreenW: 1680,
  devScreenH: 915,
  devScreenAspect: undefined,
  aspect: undefined,
  scrollbarWidth: window.innerWidth - document.querySelector('body').offsetWidth,
  scrollTimeout: undefined
}

const contentProps = {
  
}

const cityProps = {
  aX: 0,
  aY: 0,
  aZ: 0,
  vX: 0,
  vY: 0,
  vZ: 0,
  x: -0.2,
  y: -0.5,
  z: 0,
  rX: 0.4,
  rY: -Math.PI / 2,
}

const cameraProps = {
  x: 0,
  y: 0,
  z: 2.5,
}

const canvasProps = {
  isInitialized: false,
  mouseX: 0,
  mouseY: 0,
  mouseStartX: 0,
  mouseStartY: 0,
  frame: 0,
  revealFrame: 0,
  transitionProgress: 0,
  hoveredDot: null,
}

winProps.devScreenAspect = winProps.devScreenW / winProps.devScreenH;
winProps.aspect = winProps.width / winProps.height;
canvasProps.scaleAspect = winProps.aspect / winProps.devScreenAspect;

let camera;
let scene;
let renderer;
let light;
let light2;
let city;
let cityContainer;

setTimeout(() => {
  init()
}, 200);

function init() {
  handleResize();
  canvasProps.isInitialized = true;
  canvasProps.frame = 0;

  const container = document.createElement( 'div' );
  document.body.appendChild( container );

  // renderer

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, winProps.height );
  renderer.outputEncoding = THREE.sRGBEncoding;

  // scene

  scene = new THREE.Scene();

  // camera

  camera = new THREE.PerspectiveCamera( 15, winProps.width / winProps.height, 1, 1000 );

  camera.position.x = 0;
  camera.aspect = winProps.width / winProps.height;
  camera.position.y = 0.8;
  camera.position.z = 0;

  scene.add( camera );

  // lights

  scene.add( new THREE.AmbientLight( 0xf23fff, 0.2 ) );

  light = new THREE.DirectionalLight( 0xce33f8, 0.5 );
  light.position.set( -2.7, 2.7, 2.3);

  light.castShadow = true;
  light.shadow.mapSize.width = 4096;
  light.shadow.mapSize.height = 4096;
  light.shadow.camera.top = 2.5;
  light.shadow.camera.bottom = -2.5;
  light.shadow.camera.right = 2.5;
  light.shadow.camera.left = -2.5;
  
  
  light2 = new THREE.PointLight( 0xffffff, 1.13, 15, 0.8 );
  light2.position.set( 4, 17, 15.5 );

  light3 = new THREE.PointLight( 0xccccff, .13, 25, 1.8 );
  light3.position.set( -1, -4, -2.5 );

  lightTop = new THREE.PointLight( 0xffffee, .63, 25, 1.8 );
  lightTop.position.set( -1, 2, -0.5 );
  
  lightFront = new THREE.PointLight( 0x3333ff, 0.1, 25, 2.8 );
  lightFront.position.set( 3, -2, 3.5 );
  
  lightFrontLeft = new THREE.PointLight( 0xff9922, 0.04, 25, 2.8 );
  lightFrontLeft.position.set( -3, -2, 3.5 );
  

  scene.add( light );
  scene.add( light2 );
  scene.add( light3 );
  scene.add( lightTop );
  scene.add( lightFront );
  scene.add( lightFrontLeft );
  

  scene.background = new THREE.Color(0xb032b4);
  
  container.appendChild( renderer.domElement );

  const loader = new THREE.GLTFLoader();
  cityContainer = new THREE.Group();
  scene.add(cityContainer);
  
  loader.load( 'shibuya_crossing.gltf', function ( gltf ) {
    city = gltf.scene;
    city.scale.set(0.015,0.015,0.015)
    cityContainer.add( city );
    cityContainer.rotation.x = cityProps.rX;
    cityContainer.rotation.y = cityProps.rY;

    animate(100, 0);

  } );
  
  window.addEventListener('resize', handleResize );
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('touchmove', handleMouseMove)
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('touchstart', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)
  window.addEventListener('touchend', handleMouseUp)
  window.addEventListener('scroll', handleScroll);
}

function setScene(scene) {
  startTransition();
  cityProps.vX = 0;
  cityProps.vY = 0;
  cityProps.vZ = 0;
  cityProps.x = 0;
  cityProps.y = 0;
  cityProps.z = 0;
  
  if (scene === 0) {
    cityProps.rX = -0.3;
    cityProps.rY = -Math.PI * 0.3;
    cameraProps.x = 0;
    cameraProps.y = 0.3;
    cameraProps.z = 8.5;
  } else if (scene === 1) {
    cityProps.rX = -0.3;
    cityProps.rY = -Math.PI * 0.3;
    cameraProps.x = -0.4;
    cameraProps.y = -0.05;
    cameraProps.z = 2.1;
  } else if (scene === 2) {
    cityProps.rX = 1.3;
    cityProps.rY = -Math.PI * 0.1;
    cameraProps.x = -1.4;
    cameraProps.y = 0.2;
    cameraProps.z = 3;
  } else if (scene === 3) {
    cityProps.rX = -0.1;
    cityProps.rY = -2.1;
    cameraProps.x = -0.55;
    cameraProps.y = 0.3;
    cameraProps.z = 3.5;
  } else if (scene === 4) {
    cityProps.rX = -0.1;
    cityProps.rY = -Math.PI * 0.1;
    cameraProps.x = -0.6;
    cameraProps.y = -0.45;
    cameraProps.z = 1.5;
  }
}

function handleMouseMove(e) {
  const {clientX} = e.touches ? e.touches[0] : e;
  const {clientY} = e.touches ? e.touches[0] : e;
  winProps.mouseX = (clientX / winProps.width) * 2 - 1;
  winProps.mouseY = -(clientY / winProps.height) * 2 + 1;
  canvasProps.mouseX = winProps.mouseX;
  canvasProps.mouseY = winProps.mouseY;

  light.position.x = winProps.mouseX * 3;
  light.position.y = winProps.mouseY + 2;
  light.position.z = Math.abs(winProps.mouseX) + 2;
  light2.position.x = winProps.mouseX * 6;
  light2.position.y = winProps.mouseY * 4;

  if (winProps.isMouseDown) {
    cityContainer.rotation.y += (canvasProps.mouseX - canvasProps.mouseStartX) * Math.PI;
    cityContainer.rotation.x -= (canvasProps.mouseY - canvasProps.mouseStartY) * Math.PI * 0.05;
    cityProps.rY = cityContainer.rotation.y;
    cityProps.rX = cityContainer.rotation.x;
    canvasProps.mouseStartX = canvasProps.mouseX;
    canvasProps.mouseStartY = canvasProps.mouseY;
  }
}

function handleMouseDown(e) {
  const {clientX} = e.touches ? e.touches[0] : e;
  const {clientY} = e.touches ? e.touches[0] : e;
  canvasProps.mouseStartX = (clientX / winProps.width) * 2 - 1;
  canvasProps.mouseStartY = -(clientY / winProps.height) * 2 + 1;
  winProps.isMouseDown = true;
}

function handleMouseUp() {
  winProps.isMouseDown = false;
}

function handleScroll() {
  winProps.isScrolling = true;
  clearTimeout(winProps.scrollTimeout)
  winProps.scrollTimeout = setTimeout(() => {
    winProps.isScrolling = false;
  }, 300)
  let oldScrollY = winProps.scrollY
  winProps.scrollY = window.scrollY;
  winProps.scrollVelocity = Math.min(winProps.scrollY - oldScrollY);
}

//

function handleResize() {
  const newWidth = window.innerWidth - winProps.scrollbarWidth;
  if (canvasProps.isInitialized && winProps.width === newWidth) return;
  winProps.width = newWidth;
  winProps.height = window.innerHeight;
  if (!camera) return;
  camera.aspect = winProps.width / winProps.height;
  camera.updateProjectionMatrix();

  renderer.setSize( winProps.width, winProps.height );
}

//

function animate(now, then) {
  const elapsed = now - then;
  if (elapsed > 16) {
    renderer.render(scene, camera);
    canvasProps.transitionProgress = Math.min(1, canvasProps.transitionProgress + 0.001);
    cityProps.vX += cityProps.aX;
    cityProps.vY += cityProps.aY;
    cityProps.vZ += cityProps.aZ;
    cityProps.aX = 0;
    cityProps.aY = 0;
    cityProps.aZ = 0;

    cityProps.x += cityProps.vX;
    cityProps.y += cityProps.vY;
    cityProps.z += cityProps.vZ;

    // dotGroup.position.y = -Math.sin(now / 1000) * 0.012;

    if (!winProps.isMouseDown) {
      transformScene();
    }
    
  } else {
    now = then;
  }

  requestAnimationFrame( (next) => { animate(next, now)} );

}

function startTransition() {
  canvasProps.transitionProgress = 0;
}

function transformScene() {
  cityContainer.position.x += canvasProps.transitionProgress * (cityProps.x - cityContainer.position.x);
  cityContainer.position.y += canvasProps.transitionProgress * (cityProps.y - cityContainer.position.y);
  cityContainer.position.z += canvasProps.transitionProgress * (cityProps.z - cityContainer.position.z);
  
  cityContainer.rotation.x += canvasProps.transitionProgress * (cityProps.rX - cityContainer.rotation.x);
  cityContainer.rotation.y += canvasProps.transitionProgress * (cityProps.rY - cityContainer.rotation.y);
  
  camera.position.x += canvasProps.transitionProgress * (cameraProps.x - camera.position.x);
  camera.position.y += canvasProps.transitionProgress * (cameraProps.y - camera.position.y);
  camera.position.z += canvasProps.transitionProgress * (cameraProps.z - camera.position.z);
}

function animateProperty(props) {
  const startTime = performance.now();
  const duration = props[0].duration;
  updateProperty(startTime)
  
  function updateProperty(now) {
    const progress = (now - startTime) / duration;
    if (progress < 1) {
      props.forEach((prop) => {
        prop.el[prop.transform][prop.property] = prop.start + (prop.end - prop.start) * progress;
      })
      requestAnimationFrame(updateProperty);
    }
  }
}
