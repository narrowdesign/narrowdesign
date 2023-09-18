// Big int to [0-1] RGB object

function intToRgb(int) {
  return {
    r: ((int >> 16) & 255) / 255,
    g: ((int >>  8) & 255) / 255,
    b: ( int        & 255) / 255,
  };
}

// Hex string to [0-1] RGB object

function hexToRgb(hex) {
  return intToRgb(parseInt(hex, 16));
}

// [0-1] RGB object to hex string

function rgbToHex({ r, g, b }) {
  return ((1 << 24) 
    + (r * 255 << 16) 
    + (g * 255 << 8) 
    +  b * 255
  ).toString(16).slice(1);
}

class ColorControlHelper {
  constructor(obj, prop = 'color') {
    this.obj  = obj;
    this.prop = prop;
  }
  get color() {
    return `#${ rgbToHex(this.obj[this.prop]) }`;
  }
  set color(hex) {
    this.obj[this.prop] = hexToRgb(hex.substr(1));
  }
}


class TextureControlHelper {
  constructor(obj, prop = 'value') {
    this.obj  = obj;
    this.prop = prop;
  }
  get texture() {
    return this.obj[this.prop].name;
  }
  set texture(file) {
    this.obj[this.prop] = textures[file];
  }
}