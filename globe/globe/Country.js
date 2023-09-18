import {Group, Vector3} from './lib/three.min.js';
import {CountryDisc} from './CountryDisc.js';

export class Country extends Group {
  constructor(position, countryCode, discTexture, discShadowTexture) {
    super();
    this.countryCode = countryCode;
    this.active = false;
    this.disc = new CountryDisc(discTexture, discShadowTexture);
    this.add(this.disc);
    this.position.set(position.x, position.y, position.z);
    this.lookAt(new Vector3(0, 0, 0));
    this.visible = false;
  }

  activate() {
    if (this.active) return;
    this.active = true;
    this.disc.show();
    this.visible = true;
  }

  deactivate() {
    if (!this.active) return;
    this.active = false;
    this.disc.hide();
  }
}
