import {
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  CubicBezierCurve3,
  ShaderMaterial,
  PlaneGeometry,
  TubeBufferGeometry,
  Vector3,
} from "./lib/three.min.js";

import {easeOutQuart, clamp} from './utils/utils.js';

import {geoInterpolate} from './lib/d3-geo/geoInterpolate.js';
import {latLngToXYZ} from './GlobeUtils.js';

const TUBE_RADIUS_MIN = 0.2;
const TUBE_SEGMENTS = 8;
const ARC_SEGMENTS = 44;
const MAX_ARC_INCREASE = 24;
const MAX_CIRCLE_SCALE = 0.35;
const MAX_DRAW_RANGE = 3000;
const CIRCLE_TRIGGER = MAX_DRAW_RANGE * 0.5;
const CURVE_MIN_ALTITUDE = 160;
const CURVE_MAX_ALTITUDE = 500;
const SCALE_INC = 0.01;
const SCALE_DEC = 0.01;
const REVEAL_DURATION = 2500;

export class GlobeLine extends Group {
  constructor(
    startLatLng,
    endLatLng,
    colors,
    texture,
    circleTexture,
    radius,
    isStatic,
  ) {
    super();
    this.colors = colors;
    this.texture = texture;
    this.isStatic = isStatic;

    /* eslint-disable prefer-destructuring */
    this.startLat = startLatLng[0];
    this.startLng = startLatLng[1];
    const endLat = endLatLng[0];
    const endLng = endLatLng[1];

    const start = latLngToXYZ(this.startLat, this.startLng, radius);
    const end = latLngToXYZ(endLat, endLng, radius * 1.002);
    const altitude = clamp(
      start.distanceTo(end) * 0.5,
      CURVE_MIN_ALTITUDE,
      CURVE_MAX_ALTITUDE,
    );
    const interpolate = geoInterpolate(
      [this.startLng, this.startLat],
      [endLng, endLat],
    );
    const midCoord1 = interpolate(0.25);
    const midCoord2 = interpolate(0.75);
    const mid1 = latLngToXYZ(midCoord1[1], midCoord1[0], radius + altitude);
    const mid2 = latLngToXYZ(midCoord2[1], midCoord2[0], radius + altitude);
    const curve = new CubicBezierCurve3(start, mid1, mid2, end);

    this.geometry = new TubeBufferGeometry(
      curve,
      ARC_SEGMENTS,
      TUBE_RADIUS_MIN + radius / 1200,
      TUBE_SEGMENTS,
      false,
    );

    this.material = new ShaderMaterial({
      uniforms: {
        u_time: {type: 'f', value: 0},
        u_texture: {
          type: 't',
          value: null,
        },
        speedEpsilon: {type: 'f', value: 0.0004},
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
          float ramp = vUv.x * 0.5;
          float pct = fract(ramp - u_time * speedEpsilon);
          vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
          color = texture2D(u_texture, vec2(pct, 0.6));
          gl_FragColor = vec4(color);
        }
      `,
    });

    this.active = false;
    this.mesh = new Mesh(this.geometry, this.material);

    this.add(this.mesh);

    this.material.uniforms.u_texture.value = this.texture;

    this.circleMaterial1 = new MeshBasicMaterial({
      map: circleTexture,
      color: colors[0],
      transparent: true,
      opacity: 1,
      side: DoubleSide,
    });

    this.circleMaterial2 = new MeshBasicMaterial({
      map: circleTexture,
      color: colors[1],
      transparent: true,
      opacity: 1,
      side: DoubleSide,
    });

    this.circleGeometry = new PlaneGeometry(radius * 0.1, radius * 0.1, 2);
    this.circle1 = new Mesh(this.circleGeometry, this.circleMaterial1);
    this.circle2 = new Mesh(this.circleGeometry, this.circleMaterial2);
    this.circle1.scale.set(0.01, 0.01, 0.01);
    this.circle2.scale.set(0.01, 0.01, 0.01);
    this.circle1.position.set(start.x, start.y, start.z);
    this.circle2.position.set(end.x, end.y, end.z);
    this.circle1.rotation.set(Math.PI, Math.PI, Math.PI);
    this.circle2.rotation.set(Math.PI, Math.PI, Math.PI);
    this.circle1.lookAt(new Vector3(0, 0, 0));
    this.circle2.lookAt(new Vector3(0, 0, 0));
    this.add(this.circle1);
    this.add(this.circle2);
    this.showLine();
  }

  showLine() {
    this.active = true;
    this.geometry.setDrawRange(0, 1);

    if (this.isStatic) {
      this.drawStaticLine();
    } else {
      this.startTime = performance.now();
      this.drawAnimatedLine();
    }
  }

  hideLine() {
    this.active = false;
    this.eraseLine();
  }

  disposeLine() {
    this.mesh.geometry.dispose();
    this.texture.dispose();
    this.mesh.material.dispose();
    this.circle1.geometry.dispose();
    this.circle1.material.dispose();
    this.circle2.geometry.dispose();
    this.circle2.material.dispose();
    this.children = null;
  }

  drawAnimatedLine = () => {
    if (!this.active) return;

    let drawRangeCount = this.geometry.drawRange.count;
    const timeElapsed = performance.now() - this.startTime;
    this.material.uniforms.u_time.value = timeElapsed;
    const progress = easeOutQuart(timeElapsed, 0, 1, REVEAL_DURATION);

    drawRangeCount = Math.min(
      MAX_DRAW_RANGE,
      Math.ceil(progress * MAX_DRAW_RANGE),
    );
    if (this.active && drawRangeCount < MAX_DRAW_RANGE) {
      const scale = this.circle1.scale.x;
      if (scale < MAX_CIRCLE_SCALE) {
        this.circle1.scale.set(
          scale + SCALE_INC,
          scale + SCALE_INC,
          scale + SCALE_INC,
        );
      }
      if (drawRangeCount > CIRCLE_TRIGGER) {
        const scale2 = this.circle2.scale.x;
        if (scale2 < MAX_CIRCLE_SCALE) {
          this.circle2.scale.set(
            scale2 + SCALE_INC * 1.5,
            scale2 + SCALE_INC * 1.5,
            scale2 + SCALE_INC * 1.5,
          );
        }
      }
      this.geometry.setDrawRange(0, drawRangeCount);
    }

    this.animationFrame = requestAnimationFrame(this.drawAnimatedLine);
  };

  drawStaticLine = () => {
    this.geometry.setDrawRange(0, MAX_DRAW_RANGE);
    this.circle1.scale.set(
      MAX_CIRCLE_SCALE,
      MAX_CIRCLE_SCALE,
      MAX_CIRCLE_SCALE,
    );
    this.circle2.scale.set(
      MAX_CIRCLE_SCALE,
      MAX_CIRCLE_SCALE,
      MAX_CIRCLE_SCALE,
    );
  };

  eraseLine = () => {
    const drawRangeCount = this.geometry.drawRange.count;
    const drawRangeStart = this.geometry.drawRange.start;
    this.material.uniforms.u_time.value = performance.now() - this.startTime;
    if (drawRangeStart > drawRangeCount) return;

    const increase = MAX_ARC_INCREASE * 2;
    const scale = this.circle1.scale.x;
    const scale2 = this.circle2.scale.x;
    if (scale > 0.03) {
      const newScale = scale - SCALE_DEC;
      this.circle1.scale.set(newScale, newScale, newScale);
    }
    if (drawRangeStart > CIRCLE_TRIGGER && scale2 > 0.03) {
      const newScale2 = scale2 - SCALE_DEC * 1.5;
      this.circle2.scale.set(newScale2, newScale2, newScale2);
    }
    this.geometry.setDrawRange(drawRangeStart + increase, drawRangeCount);
    this.animationFrame = requestAnimationFrame(this.eraseLine);
  };

  pause() {
    cancelAnimationFrame(this.animationFrame);
  }

  play() {
    if (this.isStatic) {
      this.drawStaticLine();
    } else if (this.active) {
      this.animationFrame = requestAnimationFrame(this.drawAnimatedLine);
    } else {
      this.animationFrame = requestAnimationFrame(this.eraseLine);
    }
  }
}
