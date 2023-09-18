import {Group, Mesh, ShaderMaterial, SphereGeometry} from './lib/three.min.js';
import {latLngToXYZ} from './GlobeUtils.js';

const SPHERE_SCALE = 1.5;

export class CountryBubble extends Group {
  constructor(startLatLng, radius) {
    super();
    const [startLat, startLng] = startLatLng;

    const start = latLngToXYZ(startLat, startLng, radius);

    this.active = false;

    this.sphereMaterial = new ShaderMaterial({
      fragmentShader: `
        void main() {
          gl_FragColor = vec4(0.2, 0.2, 0.4, 1.0);
        }
      `,
    });

    this.sphereGeometry = new SphereGeometry(3, 8, 8);
    this.sphere = new Mesh(this.sphereGeometry, this.sphereMaterial);
    this.sphere.scale.set(0.01, 0.01, 0.01);
    this.sphere.position.set(start.x*1.005, start.y*1.005, start.z*1.005);
    this.add(this.sphere);

    this.drawBubble();
  }

  showBubble() {
    this.active = true;
    this.drawBubble();
  }

  hideBubble() {
    this.active = false;
    this.eraseBubble();
  }

  disposeBubble() {
    this.sphere.geometry.dispose();
    this.children = [];
  }

  drawBubble() {
    if (this.active) {
      if (this.sphere.scale.x < SPHERE_SCALE) {
        this.sphere.scale.x += 0.06;
        this.sphere.scale.y += 0.06;
        this.sphere.scale.z += 0.06;
      }
    }
    requestAnimationFrame(() => {
      if (this.active) {
        this.drawBubble();
      }
    });
  }

  eraseBubble() {
    if (this.sphere.scale.x > 0.1) {
      this.sphere.scale.x -= 0.1;
      this.sphere.scale.y -= 0.1;
      this.sphere.scale.z -= 0.1;
      requestAnimationFrame(this.eraseBubble);
    }
  }
}
