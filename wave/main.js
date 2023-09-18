Promise.all(
  [
    'vertex', 
    'fragment', 
    'noise', 
    'blend'
  ].map(file => 
    fetch(`shaders/${file}.glsl`)
    .then(res => 
      res.text()
      .then(text => ({ [file]: text }))
    )
  )
).then(files => {
  files = files.reduce((acc, val) => Object.assign(acc, val), {});

  // 
  // Scene
  // 

  const minigl = new MiniGL(document.querySelector('canvas'), null, null, true);
  let isMouseDown = false;

  const conf = {
    presetName: Object.keys(presets)[Object.keys(presets).length - 1],
    wireframe: false,
    density: [0.03, 0.08],
    zoom: 1,
    rotation: 0,
    playing: true,
  };

  const randomParams = {
    colors: [ 0x241065, 0xffbb44, 0xff444d, 0x8644ff, 0x00c1c3 ].map(intToRgb),
    layerCountMin: 2,
    layerCountMax: 5,
  };

  // 
  // Material
  // 

  function initMaterial(opt) {
    let layerCount = rangeRand(randomParams.layerCountMin, randomParams.layerCountMax);
    let uniformValues = false;

    if (typeof opt === 'number') {
      layerCount = rangeRand(randomParams.layerCountMin, randomParams.layerCountMax);
    }
    else if (typeof opt === 'object') {
      layerCount = opt.u_waveLayers.length;
      uniformValues = opt;
    }

    const angle = Math.PI * 12 / 180;

    // Values to be passed to the shaders
    
    const uniforms = {
      u_time:         new minigl.Uniform({ value: 0, control: false }),

      u_global:       new minigl.Uniform({ 
        value: {
          noiseFreq:    new minigl.Uniform({ value: [0.00015, 0.0005], type: 'vec2', 
                                            control: { min: 0, max: 0.001 } }),
          noiseSpeed:   new minigl.Uniform({ value: 0.00001, control: { min: 0, max: 0.00002 } }),
        }, 
        type: 'struct'
      }),

      u_vertDeform:   new minigl.Uniform({ 
        value: {
          incline:      new minigl.Uniform({ value: Math.sin(angle) / Math.cos(angle), control: { min: -1, max: 1, step: 0.001 }  }),
          offsetTop:    new minigl.Uniform({ value: -1, control: { min: -1, max: 1, step: 0.001 }  }),
          offsetBottom: new minigl.Uniform({ value: -1, control: { min: -1, max: 1, step: 0.001 }  }),
          noiseFreq:    new minigl.Uniform({ value: [rangeRand(1, 2), rangeRand(1, 3)],  
                                            type: 'vec2', control: { min: 0, max: 10  } }),
          noiseAmp:     new minigl.Uniform({ value: rangeRand(100, 300), control: { min: 0, max: 999 } }),
          noiseSpeed:   new minigl.Uniform({ value: rangeRand(5, 15),    control: { min: 0, max:  50 } }),
          noiseFlow:    new minigl.Uniform({ value: rangeRand(5, 15),    control: { min: -50, max: 50 } }),
          noiseSeed:    new minigl.Uniform({ value: rangeRand(0, 100),   control: { min: 0, max: 100 } }),
        }, 
        type:         'struct',
        excludeFrom:  'fragment', 
      }),

      u_baseColor:    new minigl.Uniform({ value: arrayRand(randomParams.colors), type: 'vec3', 
                                          excludeFrom: 'fragment', control: { color: true } }),
      u_waveLayers:   new minigl.Uniform({ value: [], excludeFrom: 'fragment', type: 'array' }),
    };
    
    // Generate a random number of wave layers

    for (let i = 0; i < layerCount; i++) {
      uniforms.u_waveLayers.value.push(new minigl.Uniform({ 
        value: {
          color:        new minigl.Uniform({ value: arrayRand(randomParams.colors), type: 'vec3', control: { color: true } }),
          opacity:      new minigl.Uniform({ value: rangeRand(0.7, 1), control: { min: 0, max: 1 } }),
          blend:        new minigl.Uniform({ value: Math.floor(Math.random() * Object.keys(BLEND).length), 
                                            type: 'int', control: { dropdown: BLEND } }),
          noiseFreq:    new minigl.Uniform({ value: [rangeRand(1, 3), rangeRand(1, 3)],  
                                            type: 'vec2', control: { min: 0, max: 10 } }),
          noiseSpeed:   new minigl.Uniform({ value: rangeRand(5, 15),  control: { min: 0, max:  50 } }),
          noiseFlow:    new minigl.Uniform({ value: rangeRand(2, 10),  control: { min: -50, max: 50 } }),
          noiseSeed:    new minigl.Uniform({ value: rangeRand(0, 100), control: { min: 0, max: 100 } }),
          noiseFloor:   new minigl.Uniform({ value: rangeRand(0, 0.2), control: { min: 0, max:   1 } }),
          noiseCeil:    new minigl.Uniform({ value: rangeRand(0.9, 1), control: { min: 0, max:   1 } }),
        },
        type: 'struct'
      }));
    }

    // Apply uniform value overrides, if specified

    function applyValues(values, to) {
      Object.entries(values).forEach(([name, val]) => {
        if (to[name].type === 'struct') {
          applyValues(val, to[name].value);
        }
        else if (to[name].type === 'array') {
          val.forEach((v, i) => applyValues(v, to[name].value[i].value));
        }
        else {
          to[name].value = val;
        }
      });
    }

    if (uniformValues) {
      console.log('Loading uniform values:', uniformValues);
      applyValues(uniformValues, uniforms);
    }

    // Compile

    const vertexShader = [
      files.noise, 
      files.blend, 
      buildBlendDefs(BLEND),
      files.vertex,
    ].join('\n\n');

    const fragmentShader = files.fragment;

    return new minigl.Material(vertexShader, fragmentShader, uniforms);
  }

  // 
  // Mesh
  // 

  let mesh;

  function initMesh(opt) {
    if (mesh) mesh.remove();

    const material = initMaterial(opt);
    const geometry = new minigl.PlaneGeometry();
    mesh = new minigl.Mesh(geometry, material);

    initUniformsGUI();
  }

  // 
  // GUI
  // 

  const gui = new dat.GUI();

  // Setup functions

  const setupFns = {

    loadConfig() {
      let input = prompt('Paste JSON:');
      input = JSON.parse(input);

      if (input) {
        initMesh(input);
        resize();
        updateDebugCamera();
      }
    },

    saveConfig() {

      function serialize(uniform) {
        if (uniform.control === false) {
          return;
        }
        else if (uniform.type == 'struct') {
          return Object.entries(uniform.value).reduce(
            (acc, [name, uniform]) => Object.assign(acc, { [name]: serialize(uniform) }), {}
          );
        }
        else if (uniform.type == 'array') {
          return uniform.value.map(serialize);
        }
        else {
          return uniform.value;
        }
      }

      const output = serialize({ type: 'struct', value: mesh.material.uniforms });
      console.log('Exported uniform values:', output);

      prompt('Boom:', JSON.stringify(output));

    },

    downloadCode(e) {
      const a = document.createElement('a');
      a.href = './shaderwaves.zip';
      a.click();
    },

    playPause() {
      conf.playing = !conf.playing;
    }

  }

  const setupFolder = gui.addFolder('setup');

  setupFolder.add(conf, 'presetName', Object.keys(presets)).name('loadPreset')
    .onChange(presetName => {
      initMesh(presets[presetName]);
      resize();
      updateDebugCamera();
    });

  Object.keys(setupFns).forEach(fn => setupFolder.add(setupFns, fn));

  // Randomize functions

  const randomFns = {

    randomizeAll() {
      initMesh();
      resize();
      updateDebugCamera();
    },

    randomizeColors() {
      mesh.material.uniforms.u_baseColor.value = arrayRand(randomParams.colors);

      mesh.material.uniforms.u_waveLayers.value.forEach(layer => {
        layer.value.color.value = arrayRand(randomParams.colors);
        layer.value.blend.value = Math.floor(Math.random() * Object.keys(BLEND).length);
      });
    },

    randomizeSeeds() {
      mesh.material.uniforms.u_vertDeform.value.noiseSeed.value = rangeRand(0, 100);

      mesh.material.uniforms.u_waveLayers.value.forEach(layer => {
        layer.value.noiseSeed.value = rangeRand(0, 100);
      });
    },

  }

  const randomFolder = gui.addFolder('randomize');  

  const randomParamsFolder = randomFolder.addFolder('params');

  randomParams.colors.forEach((c, i) => 
    randomParamsFolder.addColor(new ColorControlHelper(randomParams.colors, i), 'value').name(`color[${i}]`)
  );

  randomParamsFolder.add(randomParams, 'layerCountMin', 0, 10, 1);
  randomParamsFolder.add(randomParams, 'layerCountMax', 0, 10, 1);

  Object.keys(randomFns).forEach(fn => randomFolder.add(randomFns, fn));

  // Debug camera

  function updateDebugCamera() {
    const mvm = minigl.commonUniforms.modelViewMatrix;
    glMatrix.mat4.fromYRotation(mvm.value, conf.rotation);
    glMatrix.mat4.scale(mvm.value, mvm.value, [conf.zoom, conf.zoom, conf.zoom]);

    mesh.wireframe = conf.wireframe;
  }
  
  const cameraFolder = gui.addFolder('camera');
  
  cameraFolder.add(conf, 'wireframe').onChange(updateDebugCamera);
  cameraFolder.add(conf, 'zoom', 0, 2).onChange(updateDebugCamera);
  cameraFolder.add(conf, 'rotation', -Math.PI/2, Math.PI/2, 0.01).onChange(updateDebugCamera);

  // Geometry
  
  const geometryFolder = gui.addFolder('geometry');

  geometryFolder.add(new ArrayControlHelper(conf, 'density', 0), 'value', 0.001, 0.2)
    .name('density.x').onChange(resize);
  geometryFolder.add(new ArrayControlHelper(conf, 'density', 1), 'value', 0.001, 0.2)
    .name('density.y').onChange(resize);

  // Uniforms

  let uniformsFolder;

  function initUniformsGUI() {
    if (uniformsFolder) gui.removeFolder(uniformsFolder);

    uniformsFolder = gui.addFolder('uniforms');
  
    Object.entries(mesh.material.uniforms).forEach(([name, uniform]) => 
      buildUniformControl(name, uniform, uniformsFolder)
    );
  }

  // 
  // Render
  // 

  function resize() {
    const w = window.innerWidth;
    const h = 580;

    minigl.setSize(w, h);
    minigl.setOrthographicCamera();

    const xSegCount = Math.ceil(window.innerWidth  * conf.density[0]);
    const ySegCount = Math.ceil(window.innerHeight * conf.density[1]);
    mesh.geometry.setTopology(xSegCount, ySegCount);
    mesh.geometry.setSize(w, h);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousedown', () => {isMouseDown = true;});

  window.addEventListener('mouseup', () => {isMouseDown = false;});
  let t = 0;
  let last = 0;

  function animate(now) {
    if (conf.playing) {
      t += Math.min(now - last, 1000/15);
      last = now;
    }
    if (isMouseDown) {
        t += 100;
    }
    mesh.material.uniforms.u_time.value = t;

    minigl.render();
    requestAnimationFrame(animate);
  };

  // 
  // Start
  // 

  initMesh(presets[conf.presetName]);

  resize();
  updateDebugCamera();
  requestAnimationFrame(animate);

});