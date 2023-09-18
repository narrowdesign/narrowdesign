import {
  BufferGeometry,
  CircleGeometry,
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
  [0, "99cc99", "at"],
  [1, "993333", "au"],
  [2, "cccc00", "be"],
  [3, "cc6666", "br"],
  [4, "666633", "ca"],
  [5, "66ff66", "ch"],
  [6, "996600", "de"],
  [7, "cc3333", "dk"],
  [8, "ff0000", "es"],
  [9, "33ff33", "fi"],
  [10, "cccc66", "fr"],
  [11, "999933", "gb"],
  [12, "ff6666", "hk"],
  [13, "996666", "ie"],
  [14, "33cc33", "in"],
  [15, "cc0000", "it"],
  [16, "990000", "jp"],
  [17, "ff6666", "lu"],
  [18, "ff9999", "mx"],
  [19, "33cccc", "my"],
  [20, "663333", "nl"],
  [21, "ffcccc", "no"],
  [22, "66cc66", "nz"],
  [23, "ccffcc", "pt"],
  [24, "ffff33", "se"],
  [25, "ff6666", "sg"],
  [26, "99ff99", "us"],
];

function getImageData(loadedImage) {
  const imageW = loadedImage.width;
  const imageH = loadedImage.height;
  // draw img to canvas
  const imgCanvas = document.createElement("canvas");
  imgCanvas.width = imageW;
  imgCanvas.height = imageH;
  const context = imgCanvas.getContext("2d");
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
    .map((color) => color.toString(16).padStart(2, "0"))
    .join("");
  const cid = COUNTRY_MAPPING.find(([_, id]) => id === hex) || [0, hex, "xx"];
  return cid;
}

export class GlobeDots extends Group {
  constructor(radius, callback) {
    super();

    this.callback = callback;
    this.rotation.x = -Math.PI;
    this.rotation.z = -Math.PI;

    new ImageLoader().load("img/map_fill.png", (mapImage) => {
      const imageData = getImageData(mapImage);
      this.mapLoaded(radius, imageData);
    });
  }

  mapLoaded(radius, imageData) {
    const SCALAR_RADIUS = radius / 450;
    const DOT_COUNT = Math.floor(50000 * (radius / 300));
    const TEXTURE_RADIUS = radius;

    const dotShapeGeometry = new CircleGeometry(DOT_W * SCALAR_RADIUS, 7);
    const dotGeometry = new Geometry();

    const positions = []; // 3d coord on globe
    const rndId = [];
    const countryIds = [];

    const vector = new Vector3();
    for (let i = DOT_COUNT; i >= 0; i--) {
      const phi = Math.acos(-1 + (2 * i) / DOT_COUNT); // PI to 0
      const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi; // 184 to 0

      vector.setFromSphericalCoords(TEXTURE_RADIUS, phi, theta);
      dotGeometry.copy(dotShapeGeometry);
      dotGeometry.lookAt(vector);
      dotGeometry.translate(vector.x, vector.y, vector.z);

      dotGeometry.computeBoundingSphere();
      const uv = pointToUV(dotGeometry.boundingSphere.center, this.position);
      const sample = sampleImage(uv, imageData);
      if (sample[3] > 0) {
        const rnd = Math.random();

        for (let i = 0; i < dotGeometry.faces.length; i++) {
          const face = dotGeometry.faces[i];
          positions.push(
            dotGeometry.vertices[face.a].x,
            dotGeometry.vertices[face.a].y,
            dotGeometry.vertices[face.a].z,
            dotGeometry.vertices[face.b].x,
            dotGeometry.vertices[face.b].y,
            dotGeometry.vertices[face.b].z,
            dotGeometry.vertices[face.c].x,
            dotGeometry.vertices[face.c].y,
            dotGeometry.vertices[face.c].z
          );

          rndId.push(rnd, rnd, rnd);
          const [cid] = getCountryId(sample);
          countryIds.push(cid, cid, cid);
        }
      }
    }

    const bufferGeometry = new BufferGeometry();

    bufferGeometry.addAttribute(
      "position",
      new Float32BufferAttribute(positions, 3)
    );
    bufferGeometry.addAttribute(
      "countryId",
      new Float32BufferAttribute(countryIds, 1)
    );
    bufferGeometry.addAttribute("rndId", new Float32BufferAttribute(rndId, 1));

    this.material = new ShaderMaterial({
      transparent: true,
      uniforms: {
        activeCountry: { type: "f", value: -1.0 },
        previousCountry: { type: "f", value: -1.0 },
        u_time: { type: "f", value: 0 },
        activeTime: { type: "f", value: 0 },
        u_mouse: { type: "v2", value: new Vector2() },
        u_resolution: { type: "v2", value: new Vector2() },
      },
      vertexShader: `
        uniform float u_time;
        uniform float activeTime;
        uniform vec2 u_mouse;
        uniform vec2 u_resolution;
        uniform float activeCountry;
        uniform float previousCountry;
        attribute float rndId;
        varying float vRndId;

        attribute float countryId;
        varying float vCountryId;

        varying float pct;
        varying float activePct;

        void main() {
          vRndId = rndId;
          vCountryId = countryId;
          float mouseX = u_mouse.x / u_resolution.x;
          float mouseY = u_mouse.y / u_resolution.y;
          vec2 st = position.xy/u_resolution;

          pct = min(1., u_time / (1000. / max(.2, .2 * sin(fract(rndId)))));
          activePct = min(1., activeTime / 1000.);
          float vNormal = rndId + ((1. - rndId) * pct);
          vNormal = rndId + ((1. - rndId));
          vNormal = smoothstep(0., 1., vNormal);
          vec4 modelViewPosition = modelViewMatrix * vec4(position, vNormal);
          gl_Position = projectionMatrix * modelViewPosition;
        }
    `,
      fragmentShader: `
        uniform float u_time;
        uniform float activeTime;
        uniform float activeCountry;
        uniform float previousCountry;
        varying float vRndId;
        varying float vCountryId;
        varying float pct;
        varying float activePct;

        void main() {
          vec3 activeColor = vec3(0.407, 0.831, .972);
          vec3 color = vec3(0.,0.,0.);
          float b = sin(u_time / 200.0 * vRndId);
          float alpha = pct * .7 + b * 0.2;
          vec3 inactiveColor = vec3(0.19, 0.42, .65);

          if (vCountryId == activeCountry) {
            color = mix(inactiveColor, activeColor, activePct);
          } else if (vCountryId == previousCountry) {
            color = mix(inactiveColor, activeColor, 1. - activePct);
          } else {
            color = inactiveColor;
          }

          gl_FragColor = vec4(color, alpha);
        }
    `,
    });

    const globeDotsParticles = new Mesh(bufferGeometry, this.material);

    this.add(globeDotsParticles);
    this.material.uniforms.u_resolution.value.x = window.innerWidth;
    this.material.uniforms.u_resolution.value.y = window.innerHeight;

    document.addEventListener("mousemove", (e) => {
      if (this.material) {
        this.material.uniforms.u_mouse.value.x = e.pageX;
        this.material.uniforms.u_mouse.value.y = e.pageY;
      }
    });
    this.startTime = performance.now();
    this.callback();
  }

  activateCountry(country) {
    this.activationTime = performance.now();
    this.material.uniforms.activeCountry.value = COUNTRY_MAPPING.findIndex(
      ([, , mappingCountry]) => country === mappingCountry
    );
  }

  deactivateCountry() {
    this.material.uniforms.previousCountry.value = this.material.uniforms.activeCountry.value;
    this.material.uniforms.activeCountry.value = -1;
  }

  animate() {
    if (this.material) {
      this.material.uniforms.activeTime.value =
        performance.now() - this.activationTime;
      this.material.uniforms.u_time.value = performance.now() - this.startTime;
    }
  }
}
