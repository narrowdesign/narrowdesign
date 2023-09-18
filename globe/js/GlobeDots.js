import {
  BufferGeometry,
  CircleGeometry,
  DoubleSide,
  Geometry,
  Group,
  Float32BufferAttribute,
  Mesh,
  ShaderMaterial,
  ImageLoader,
  Vector2,
  Vector3,
} from "./lib/three.min.js";

const DOT_W = 1.8;

const COUNTRY_MAPPING = [
  [0, 'cccccc', 'xx'],
  [1, 'ff00ff', 'ae'],
  [2, 'ffffff', 'vn'],
  [3, 'ff0000', 'br'],
  [4, '00ff00', 'th'],
  [5, '0000ff', 'zm'],
];

const IMAGE_PATH = './img/map-sessions.png';

function getImageData(loadedImage) {
  const imageW = loadedImage.width;
  const imageH = loadedImage.height;
  // draw img to canvas
  const imgCanvas = document.createElement('canvas');
  imgCanvas.width = imageW;
  imgCanvas.height = imageH;
  const context = imgCanvas.getContext('2d');
  context.drawImage(loadedImage, 0, 0);
  return context.getImageData(0, 0, imageW, imageH);
}

function pointToUV(point, origin) {
  const dir = new Vector3();
  dir.subVectors(origin, point).normalize();

  const u = 1.0 - (0.5 + Math.atan2(dir.z, dir.x) / (2.0 * Math.PI));
  const v = 0.5 + Math.asin(dir.y) / Math.PI;

  return new Vector2(u, v);
}

function sampleImage(coords, imageData) {
  const SCALAR_X = imageData.width;
  const SCALAR_Y = imageData.height;
  const x = Math.floor(coords.x * SCALAR_X);
  const y = Math.floor(coords.y * SCALAR_Y);

  const pixelIndex = x * 4.0 + y * (4.0 * SCALAR_X);
  return imageData.data.slice(pixelIndex, pixelIndex + 4);
}

function getCountryId([r, g, b, _]) {
  const hex = [r, g, b]
    .map((color) => color.toString(16).padStart(2, '0'))
    .join('');
  const cid = COUNTRY_MAPPING.find(([_, id]) => id === hex) || [0, hex, 'xx'];
  return cid;
}

export class GlobeDots extends Group {
  constructor(radius, callback, isStatic, isDotsOnly) {
    super();

    this.callback = callback;
    this.isStatic = isStatic;
    this.rotation.x = -Math.PI;
    this.rotation.z = -Math.PI;
    this.radius = radius;
    this.isDragging = false;
    this.dragTime = 0;
    this.isDotsOnly = isDotsOnly;

    new ImageLoader().load(IMAGE_PATH, (mapImage) => {
      const imageData = getImageData(mapImage);
      this.mapLoaded(imageData);
    });
  }

  mapLoaded(imageData) {
    const SCALAR_RADIUS = this.radius / 450;
    const DOT_COUNT_MIN = 10000;
    const DOT_COUNT = DOT_COUNT_MIN + Math.floor(70000 * (this.radius / 600));
    const TEXTURE_RADIUS = this.radius;

    const dotShapeGeometry = new CircleGeometry(DOT_W * SCALAR_RADIUS, 5);
    const dotGeometry = new Geometry();

    const positions = []; // 3d coord on globe
    const rndId = [];
    const countryIds = [];
    // const rowCount = 240;
    // const maxRowDotCount = 500;
    // for (let i = rowCount; i >= 0; i -= 1) {
    //   // const phi = Math.acos(-1 + (2 * i) / DOT_COUNT); // PI to 0
    //   // const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi; // 184 to 0

    //   const rowDotCount = Math.floor(
    //     Math.sin((i / rowCount) * Math.PI) * maxRowDotCount,
    //   );
    //   // console.log(rowDotCount);
    //   for (let k = 0; k < rowDotCount; k++) {
    //     const vector = new Vector3();
    //     //vector.setFromSphericalCoords(TEXTURE_RADIUS, phi, theta);
    //     vector.x =
    //       Math.cos((k / rowDotCount) * Math.PI * 2) *
    //       this.radius *
    //       Math.sin((i / rowCount) * Math.PI);
    //     vector.y =
    //       Math.sin((i / rowCount) * (Math.PI / 2)) * this.radius * 2 -
    //       this.radius;

    //     vector.z =
    //       Math.sin((k / rowDotCount) * Math.PI * 2) *
    //       this.radius *
    //       Math.sin((i / rowCount) * Math.PI);

    const vector = new Vector3();

    for (let i = DOT_COUNT; i >= 0; i -= 1) {
      const phi = Math.acos(-1 + (2 * i) / DOT_COUNT); // -1 to 1
      const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;

      vector.setFromSphericalCoords(TEXTURE_RADIUS, phi, theta);
      dotGeometry.copy(dotShapeGeometry);
      dotGeometry.lookAt(vector);
      dotGeometry.translate(vector.x, vector.y, vector.z);

      dotGeometry.computeBoundingSphere();
      const uv = pointToUV(dotGeometry.boundingSphere.center, this.position);
      const sample = sampleImage(uv, imageData);
      if (sample[3] > 0 || this.isDotsOnly) {
        const rnd = Math.random();

        for (let j = 0; j < dotGeometry.faces.length; j += 1) {
          const face = dotGeometry.faces[j];
          positions.push(
            dotGeometry.vertices[face.a].x,
            dotGeometry.vertices[face.a].y,
            dotGeometry.vertices[face.a].z,
            dotGeometry.vertices[face.b].x,
            dotGeometry.vertices[face.b].y,
            dotGeometry.vertices[face.b].z,
            dotGeometry.vertices[face.c].x,
            dotGeometry.vertices[face.c].y,
            dotGeometry.vertices[face.c].z,
          );

          rndId.push(rnd, rnd, rnd);
          const [cid] = getCountryId(sample);
          countryIds.push(cid, cid, cid);
        }
      }
    }

    const bufferGeometry = new BufferGeometry();

    bufferGeometry.addAttribute(
      'position',
      new Float32BufferAttribute(positions, 3),
    );
    bufferGeometry.addAttribute(
      'countryId',
      new Float32BufferAttribute(countryIds, 1),
    );
    bufferGeometry.addAttribute('rndId', new Float32BufferAttribute(rndId, 1));

    this.material = new ShaderMaterial({
      transparent: true,
      uniforms: {
        activeCountry: {type: 'f', value: -1.0},
        prevCountry: {type: 'f', value: -1.0},
        u_time: {type: 'f', value: 0},
        activeTime: {type: 'f', value: 0},
        u_drag_time: {type: 'f', value: 0},
        u_resolution: {type: 'v2', value: new Vector2()},
      },
      vertexShader: `
        uniform float u_time;
        uniform float u_drag_time;
        uniform vec2 u_resolution;
        uniform float activeCountry;
        uniform float activeTime;
        uniform float prevCountry;
        attribute float rndId;
        varying float vRndId;

        attribute float countryId;
        varying float vCountryId;

        varying float pct;

        void main() {
          vRndId = rndId;
          vCountryId = countryId;
          vec2 st = position.xy/u_resolution;

          pct = min(1.0, u_time / (400. / max(0.2, 0.2 * sin(fract(rndId)))));
          float vNormal = rndId + ((1.0 - rndId) * pct);
          vNormal = rndId + ((1.0 - rndId));
          vNormal = smoothstep(0., 1.0, vNormal);
          if (u_drag_time > 0.) {
            vNormal -= ((sin(u_time / 400.0 * vRndId) + 1.0) * 0.04) * min(1., u_drag_time / 1200.0);
          }
          vec4 modelViewPosition = modelViewMatrix * vec4(position, vNormal);
          gl_Position = projectionMatrix * modelViewPosition;
        }
    `,
      fragmentShader: `
        uniform bool u_dragging;
        uniform float activeCountry;
        uniform float activeTime;
        uniform float prevCountry;
        uniform float u_time;
        uniform float u_drag_time;
        varying float vRndId;
        varying float vCountryId;
        varying float pct;

        void main() {
          float v = sin(vRndId * 1000.);
          float alpha = pct * 0.7 + v * 0.2;
          float r = 0.19;
          float g = 0.42;
          float b = 0.65;
          float dragDur = 1200.0;
          vec3 color = vec3(r, g, b);
          float activePct = min(1., activeTime / 6000.);

          if (vCountryId == activeCountry) {
            color = vec3((1. - activePct) * r + activePct * .4, (1. - activePct) * g + activePct * .94, (1. - activePct) * b + activePct * 0.96);
            alpha *= 1.5;
          }

          if (vCountryId == prevCountry) {
            color = vec3((1. - activePct) *  0.4 + activePct * r, (1. - activePct) * 0.94 + activePct * g, (1. - activePct) * 0.96 + activePct * b);
          }

          gl_FragColor = vec4(color, alpha);
        }
    `,
    });
    this.material.side = DoubleSide;

    const globeDotsParticles = new Mesh(bufferGeometry, this.material);

    this.add(globeDotsParticles);
    this.material.uniforms.u_resolution.value.x = window.innerWidth;
    this.material.uniforms.u_resolution.value.y = window.innerHeight;
    this.startTime = performance.now();
    this.dragStartTime = 0;
    this.callback();
  }

  startDragging() {
    if (!this.material || this.isStatic) return;
    this.isDragging = true;

    this.dragStartTime = performance.now();
    this.material.uniforms.u_time.value =
      performance.now() - this.dragStartTime;
  }

  stopDragging() {
    this.isDragging = false;
  }

  activateCountry(country) {
    let countryValue = COUNTRY_MAPPING.findIndex(
      ([, , mappingCountry]) => country === mappingCountry,
    );
    // if (countryValue === this.material.uniforms.activeCountry.value) return;
    this.activationTime = performance.now();
    this.material.uniforms.prevCountry.value = this.material.uniforms.activeCountry.value;
    this.material.uniforms.activeCountry.value = countryValue;
  }

  updateDragTimer() {
    if (this.isDragging) {
      this.dragTime = performance.now() - this.dragStartTime;
    } else if (this.dragTime > 0.1) {
      this.dragTime = Math.max(0, this.dragTime * 0.9);
    }
  }

  animate() {
    this.updateDragTimer();
    if (!this.material) return;
    this.material.uniforms.u_drag_time.value = this.dragTime;
    this.material.uniforms.activeTime.value =
      performance.now() - this.activationTime;
    const t = !this.isStatic ? performance.now() - this.startTime : 3000;

    this.material.uniforms.u_time.value = t;
  }
}
