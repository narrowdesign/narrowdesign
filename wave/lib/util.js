// 
// Math utils
// 

function rangeRand(a, b) {
  return a + Math.random() * (b - a);
}

function arrayRand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Big int to [0-1] RGB array

function intToRgb(int) {
  return [
    ((int >> 16) & 255) / 255,
    ((int >>  8) & 255) / 255,
    ( int        & 255) / 255,
  ];
}

// Hex string to [0-1] RGB array

function hexToRgb(hex) {
  return intToRgb(parseInt(hex, 16));
}

// [0-1] RGB array to hex string

function rgbToHex([r, g, b]) {
  return ((1 << 24) 
    + (r * 255 << 16) 
    + (g * 255 << 8) 
    +  b * 255
  ).toString(16).slice(1);
}

// 
// Blend function constant definitions for JS and GLSL
// 

const BLEND = [
  'NORMAL', 'MULTIPLY', 'SCREEN', 'OVERLAY',
  'HARD_LIGHT', 'SOFT_LIGHT', 'LIGHTEN',
  'COLOR_DODGE', 'COLOR_BURN', 'VIVID_LIGHT',
  'LINEAR_BURN', 'LINEAR_DODGE', 'LINEAR_LIGHT',
].reduce((acc, val, i) => Object.assign(acc, { [val]: i }), {});
function buildBlendDefs(fns) {
  return Object.keys(fns).map(fn =>
    `const int BLEND_${fn} = ${fns[fn]};`
  ).join('\n');
}

// 
// Build GUI for shader uniforms
// 

class ColorControlHelper {
  constructor(obj, prop = 'value') {
    this.obj  = obj;
    this.prop = prop;
  }
  get value() {
    return `#${ rgbToHex(this.obj[this.prop]) }`;
  }
  set value(hex) {
    this.obj[this.prop] = hexToRgb(hex.substr(1));
  }
}

class ArrayControlHelper {
  constructor(obj, prop = 'value', index) {
    this.obj   = obj;
    this.prop  = prop;
    this.index = index;
  }
  get value() {
    return this.obj[this.prop][this.index];
  }
  set value(to) {
    this.obj[this.prop][this.index] = to;
    if (this.obj.update) this.obj.update();
  }
}

function buildUniformControl(name, uniform, gui) {

  if (uniform.control === false) return;

  // Array of uniforms

  if (uniform.type === 'array') {

    const folder = gui.addFolder(`${name}[${uniform.value.length}]`);
    // folder.open();

    uniform.value.forEach((uniform2, i) => {
      buildUniformControl(`[${i}]`, uniform2, folder);
    });

    return folder;

  }

  // Struct of uniforms

  else if (uniform.type === 'struct') {

    const folder = gui.addFolder(name);
    // folder.open();

    Object.entries(uniform.value).forEach(([name2, uniform2]) => {
      buildUniformControl(name2, uniform2, folder)
    });

    return folder;

  }

  // Plain uniform

  else { 

    uniform.control =

      // Color picker
      
      uniform.control && uniform.control.color === true ? 
        gui.addColor(new ColorControlHelper(uniform), 'value').name(name) :
        
      // Dropdown

      uniform.control && uniform.control.dropdown ? 
        gui.add(uniform, 'value', uniform.control.dropdown).name(name) :

      // Vector

      uniform.type.indexOf('vec') === 0 ?
        uniform.value.map((value2, i) => {
          gui.add(new ArrayControlHelper(uniform, 'value', i), 'value', 
            uniform.control && uniform.control.min, 
            uniform.control && uniform.control.max,
            uniform.control && uniform.control.step
          ).name(`${name}.${'xyzw'[i]}`);
        }) :

      // Otherwise assuming a single numerical slider

      gui.add(uniform, 'value', 
        (uniform.control && uniform.control.min)  || Math.floor(uniform.value * 0.01), 
        (uniform.control && uniform.control.max)  || Math.ceil (uniform.value * 3   ) || undefined,
        (uniform.control && uniform.control.step) || undefined
      ).name(name);

    return uniform.control;

  }

}