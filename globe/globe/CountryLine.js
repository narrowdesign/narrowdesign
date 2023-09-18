import {
  Group,
  Mesh,
  MeshBasicMaterial,
  CubicBezierCurve3,
  ShaderMaterial,
  SphereGeometry,
  TubeBufferGeometry,
} from "./lib/three.min.js";
import { clamp } from "./utils/utils.js";
import geoInterpolate from "./lib/d3-geo/geoInterpolate.js";
import { latLngToXYZ } from "./GlobeUtils.js";

const DELAY = 700;
const TUBE_RADIUS = 0.5;
const HIT_AREA_RADIUS = 10;
const TUBE_SEGMENTS = 8;
const ARC_SEGMENTS = 44;
const MAX_ARC_INCREASE = 12;
const MAX_SPHERE_SCALE = 0.75;
const ARC_INCREMENT = 0.015;
const MAX_DRAW_RANGE = 3000;
const SPHERE_TRIGGER = MAX_DRAW_RANGE - 600;
const CURVE_MIN_ALTITUDE = 160;
const CURVE_MAX_ALTITUDE = 500;

export class CountryLine extends Group {
  constructor(startLatLng, endLatLng, texture, radius, lineType) {
    super();
    this.lineType = lineType;
    const startLat = startLatLng[0];
    const startLng = startLatLng[1];
    const endLat = endLatLng[0];
    const endLng = endLatLng[1];

    this.boundEraseLine = this.eraseLine.bind(this);

    const start = latLngToXYZ(startLat, startLng, radius);
    const end = latLngToXYZ(endLat, endLng, radius);
    const altitude = clamp(
      start.distanceTo(end) * 0.5,
      CURVE_MIN_ALTITUDE,
      CURVE_MAX_ALTITUDE
    );
    const interpolate = geoInterpolate([startLng, startLat], [endLng, endLat]);
    const midCoord1 = interpolate(0.25);
    const midCoord2 = interpolate(0.75);
    const mid1 = latLngToXYZ(midCoord1[1], midCoord1[0], radius + altitude);
    const mid2 = latLngToXYZ(midCoord2[1], midCoord2[0], radius + altitude);
    const curve = new CubicBezierCurve3(start, mid1, mid2, end);

    this.texture = texture;
    this.geometry = new TubeBufferGeometry(
      curve,
      ARC_SEGMENTS,
      TUBE_RADIUS,
      TUBE_SEGMENTS,
      false
    );

    if (this.lineType !== "random") {
      this.hitAreaGeometry = new TubeBufferGeometry(
        curve,
        ARC_SEGMENTS,
        HIT_AREA_RADIUS,
        TUBE_SEGMENTS / 2,
        false
      );
    }

    this.material = new ShaderMaterial({
      uniforms: {
        u_time: { type: "f", value: 0 },
        u_texture: {
          type: "t",
          value: null,
        },
        speedEpsilon: { type: "f", value: 0.0008 },
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform sampler2D u_texture;
        varying vec2 vUv;
        uniform float speedEpsilon;

        void main() {
          float ramp = vUv.x;
          float pct = fract(ramp - u_time * speedEpsilon);
          vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
          color = texture2D(u_texture, vec2(pct, 1.0));
          gl_FragColor = vec4(color);
        }
      `,
    });

    this.active = false;
    this.mesh = new Mesh(this.geometry, this.material);

    if (this.lineType !== "random") {
      this.hitAreaMesh = new Mesh(
        this.hitAreaGeometry,
        new MeshBasicMaterial({
          visible: false,
        })
      );
      this.add(this.hitAreaMesh);
    }

    this.add(this.mesh);

    this.material.uniforms.u_texture.value = this.texture;

    this.sphereMaterial = new ShaderMaterial({
      fragmentShader: `
        void main() {
          gl_FragColor = vec4(0.9,0.7,0.1,1.);
        }
      `,
    });

    this.sphereGeometry = new SphereGeometry(radius / 133, 6, 6);
    this.sphere1 = new Mesh(this.sphereGeometry, this.sphereMaterial);
    this.sphere2 = new Mesh(this.sphereGeometry, this.sphereMaterial);
    this.sphere1.scale.set(0.01, 0.01, 0.01);
    this.sphere2.scale.set(0.01, 0.01, 0.01);
    this.sphere1.position.set(start.x, start.y, start.z);
    this.sphere2.position.set(end.x, end.y, end.z);
    this.add(this.sphere1);
    this.add(this.sphere2);

    this.geometry.setDrawRange(0, 1);
    if (this.lineType !== "random") {
      this.hitAreaGeometry.setDrawRange(0, MAX_DRAW_RANGE);
    }
    setTimeout(() => this.drawLine(), DELAY);
  }

  showLine() {
    this.active = true;
    this.geometry.setDrawRange(0, 1);
    if (this.lineType !== "random") {
      this.material.uniforms.speedEpsilon.value = 0.0005;
      this.hitAreaGeometry.setDrawRange(0, MAX_DRAW_RANGE);
    }
    setTimeout(() => this.drawLine(), DELAY);
  }

  hideLine() {
    this.active = false;
    if (this.lineType !== "random") {
      this.hitAreaGeometry.setDrawRange(0, 1);
    }
    this.eraseLine();
  }

  disposeLine() {
    this.mesh.geometry.dispose();
    this.texture.dispose();
    this.mesh.material.dispose();
    if (this.lineType !== "random") {
      this.hitAreaGeometry.dispose();
      this.hitAreaMesh.geometry.dispose();
      this.hitAreaMesh.material.dispose();
    }
    this.sphere1.geometry.dispose();
    this.sphere1.material.dispose();
    this.sphere1.geometry.dispose();
    this.sphere2.geometry.dispose();
    this.children = null;
  }

  drawLine() {
    const drawRangeCount = this.geometry.drawRange.count;
    this.material.uniforms.u_time.value = performance.now();
    if (this.active && drawRangeCount < MAX_DRAW_RANGE) {
      const increase = Math.max(
        MAX_ARC_INCREASE,
        ARC_INCREMENT * drawRangeCount
      );
      const scale = this.sphere1.scale.x;
      if (scale < MAX_SPHERE_SCALE) {
        this.sphere1.scale.set(scale + 0.1, scale + 0.1, scale + 0.1);
      }
      if (drawRangeCount > SPHERE_TRIGGER) {
        const scale2 = this.sphere2.scale.x;
        if (scale2 < MAX_SPHERE_SCALE) {
          this.sphere2.scale.set(scale + 0.1, scale + 0.1, scale + 0.1);
        }
      }
      this.geometry.setDrawRange(0, drawRangeCount + increase);
    }
    requestAnimationFrame(() => {
      if (this.active) {
        this.drawLine();
      }
    });
  }

  eraseLine() {
    const drawRangeCount = this.geometry.drawRange.count;
    const drawRangeStart = this.geometry.drawRange.start;
    this.material.uniforms.u_time.value = performance.now();
    if (drawRangeStart < drawRangeCount) {
      const increase = MAX_ARC_INCREASE * 4;
      const scale = this.sphere1.scale.x;
      if (scale > 0.03) {
        this.sphere1.scale.set(scale - 0.03, scale - 0.03, scale - 0.03);
        this.sphere2.scale.set(scale - 0.03, scale - 0.03, scale - 0.03);
      }
      this.geometry.setDrawRange(drawRangeStart + increase, drawRangeCount);
      requestAnimationFrame(this.boundEraseLine);
    }
  }
}
