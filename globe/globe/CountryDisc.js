import {
  MeshBasicMaterial,
  CircleGeometry,
  DoubleSide,
  Mesh,
  Group,
} from "./lib/three.min.js";

const MIN_SCALE = 0.001;
export class CountryDisc extends Group {
  constructor(texture) {
    super();
    this.interval = undefined;
    this.material = new MeshBasicMaterial({
      map: texture,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      side: DoubleSide,
    });
    this.geometry = new CircleGeometry(12, 30);

    this.mesh = new Mesh(this.geometry, this.material);

    this.mesh.position.set(0, 0, 0);

    this.add(this.mesh);
  }

  show() {
    this.mesh.scale.x = MIN_SCALE;
    this.mesh.scale.y = MIN_SCALE;
    setTimeout(() => this.animate());
  }

  hide() {
    cancelAnimationFrame(this.interval);
    this.mesh.scale.x = MIN_SCALE;
    this.mesh.scale.y = MIN_SCALE;
  }

  animate(frame = 0) {
    const progress = Math.sin(frame / 100);
    const newScale = Math.max(MIN_SCALE, progress);
    let newFrame = frame + 1;
    this.mesh.scale.x = newScale;
    this.mesh.scale.y = newScale;
    this.material.opacity = 1 - progress * progress;

    if (newScale > 0.99) {
      newFrame = 0;
    }
    this.interval = requestAnimationFrame(() => {
      this.animate(newFrame);
    });
  }
}
