let WIN_H = window.innerHeight;
let WIN_W = window.innerWidth;
let scrollProgress = 0;
let scrollTotal;
let currentSection = 0;
let isCovered = true;
let scrollTop = 0;
let mouseY = 0;
let mouseScreenY = 0;
let pIndex = 0;

let principlesEl = document.querySelectorAll('.principles span');
let principlesElTops = [];
let sectionsEl = document.querySelectorAll('section');
let sectionsElTops = [];
let audioEl = document.querySelector('audio');
let audioProgressEl = document.querySelectorAll('.principle__progressInner');
let progressTitleEl = document.querySelectorAll('.principle__progressTitle');
let cropmarksEl = document.querySelectorAll('.cropmarks');
let cropmarksElTops = [];
let cursorEl = document.querySelector('.cursor');
let linkEl = document.querySelectorAll('a');

progressTitleEl.forEach((title, i) => {
  // title.innerHTML = sectionsEl[i].querySelector('.principle__title').innerText;
})

linkEl.forEach((link, i) => {
  link.addEventListener('click', (e) => {
    e.stopPropagation();
  })
  link.addEventListener('mouseenter', () => {
    document.body.classList.add('is-pointer');
  })
  link.addEventListener('mouseleave', () => {
    document.body.classList.remove('is-pointer');
  })
})

getMeasurements();

document.addEventListener('wheel', handleScroll);
document.addEventListener('scroll', handleScroll);
document.addEventListener('mousemove', handleMousemove);
document.addEventListener('click', playAudio);

window.addEventListener('resize', getMeasurements);
setTimeout(() => { // make sure fonts loaded and check scroll height again
  getMeasurements();
  createPatterns();
}, 2000);


function handleMousemove(e) {
  cursorEl.style.opacity = 1;
  mouseY = e.pageY;
  mouseScreenY = mouseY - scrollTop;
  cursorEl.style.transform = `translate(${e.pageX - WIN_W * .008}px,${mouseY - scrollTop - WIN_W * .008}px)`;
  updateCursorColor();
}

function getMeasurements() {
  WIN_H = window.innerHeight;
  WIN_W = window.innerWidth;
  scrollTotal = document.scrollingElement.scrollHeight - WIN_H;
  principlesElTops = [];
  principlesEl.forEach((el) => {
    principlesElTops.push(el.getBoundingClientRect().top);
  })
  sectionsElTops = [];
  sectionsEl.forEach((el) => {
    sectionsElTops.push(el.getBoundingClientRect().top + document.scrollingElement.scrollTop);
  })
  cropmarksElTops = [];
  cropmarksEl.forEach((el) => {
    cropmarksElTops.push(el.getBoundingClientRect().top);
  })
}

function handleScroll() {
  scrollTop = document.scrollingElement.scrollTop;
  scrollProgress = scrollTop / scrollTotal;
  sectionsElTops.forEach((top, i) => {
    principlesEl.forEach((el, j) => {
      if (scrollTop + principlesElTops[j] + 10 > top) {
        el.style.color = window.getComputedStyle(sectionsEl[i]).getPropertyValue('color');
      }
    })
    cropmarksEl.forEach((el, j) => {
      if (scrollTop + cropmarksElTops[j] > top) {
        el.style.color = window.getComputedStyle(sectionsEl[i]).getPropertyValue('color');
      }
    })
  })
  mouseY = scrollTop + mouseScreenY;
  updateCursorColor();
}

function updateCursorColor() {
  if (scrollTop) {
    sectionsElTops.forEach((top, i) => {
      if (mouseY > top) {
        cursorEl.style.color = window.getComputedStyle(sectionsEl[i]).getPropertyValue('color');
        cursorEl.style.stroke = window.getComputedStyle(sectionsEl[i]).getPropertyValue('background-color');
        currentSection = i;
      }
    })
  }
}

function playAudio() {
  if (audioEl.paused) {
    audioEl.play();
    document.body.classList.add('is-playing');
    audioEl.addEventListener('timeupdate', updateAudio);
  } else {
    document.body.classList.remove('is-playing');
    audioEl.pause();
    audioEl.removeEventListener('timeupdate', updateAudio);
  }
}

function updateAudio() {
  let progress = this.currentTime / this.duration;
  if (progress > .99) {
    document.body.classList.remove('is-playing');
  }
  audioProgressEl.forEach((el, j) => {
    el.style.width = `${progress * 100}%`;
  })
}


// PATTERN ANIMATIONS

let canvasEl = document.querySelectorAll('.principle__canvas');

function createPatterns() {
  canvasEl.forEach((canvas, canvasNum) => {
    let {offsetWidth: width, offsetHeight: height} = canvas;
    let aspect = width / height;
    let frame = 0;
    let timeSpeed = 1;
    let formationFrame = 0;
    let formationDuration = 14000;
    let formationNum = 0;
    const formations = [
      {
        name: 'taurus',
      },
      {
        name: 'flowField',
      },
      {
        name: 'grid',
      },
      {
        name: 'dials',
      },
      {
        name: 'wall',
      },
      {
        name: 'rings',
      },
    ]
    let formation = formations[(canvasNum + 1) % (formations.length)];
    let standouts = [];
    let initialized = false;
    let flowField = [];

    initialized = true;

    /*
      Renderer
      */
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
    });

    setPatternMeasurements();
    window.addEventListener('resize', setPatternMeasurements);
    const bgColor = new THREE.Color(window.getComputedStyle(sectionsEl[canvasNum + 1]).getPropertyValue('color'));
    renderer.setClearColor(bgColor, 1);
    canvas.appendChild(renderer.domElement);

    /*
      Camera
      */
    let cameraRadius = 26;
    let cameraStartPosition = {
      x: 0,
      y: 0,
      z: cameraRadius
    };
    let zoom = 5;

    const camera = new THREE.PerspectiveCamera(45, aspect, .01, 4000 );
    camera.position.set(cameraStartPosition.x, cameraStartPosition.y, cameraStartPosition.z);
    camera.lookAt(0,0,0);
    camera.zoom = cameraRadius;
    camera.updateProjectionMatrix();

    const scene = new THREE.Scene();

    /*
      Lights
      */
    // const ambientLight = new THREE.AmbientLight(0x331000, .45);
    // const centerLight = new THREE.PointLight(0xcccc22, 1.25, 20);
    // const rearLight = new THREE.PointLight(0x669922, .5, 280);
    // const leftLight = new THREE.PointLight(0x443311, .5, 80);
    // const rightLight = new THREE.PointLight(0x554411, .7, 180);
    // const redSpotLight = new THREE.PointLight( 0x332222, 1.5, 80);
    // const blueSpotLight = new THREE.PointLight( 0x664422, 5.5, 80);

    // addLights();

    // function addLights() {
    //   scene.add(ambientLight);
    //   centerLight.position.z = 1;
    //   scene.add(centerLight);

    //   rearLight.position.z = -5;
    //   rearLight.position.y = 10;
    //   scene.add(rearLight);

    //   leftLight.position.x = -10;
    //   leftLight.position.y = 10;
    //   leftLight.position.z = 10;
    //   scene.add(leftLight);

    //   rightLight.position.x = -5;
    //   rightLight.position.y = 10;
    //   rightLight.position.z = 10;
    //   scene.add(rightLight);

    //   redSpotLight.position.set( -10, 10, -20 );
    //   scene.add(redSpotLight);

    //   blueSpotLight.position.set( 10, 12, 30 );
    //   scene.add(blueSpotLight);
    // }

    //COMPOSER

    const composer = new THREE.EffectComposer(renderer);
    const renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    //custom shader pass
    const vertShader = document.getElementById('vertexShader').textContent;
    const fragShader = document.getElementById('fragmentShader').textContent;
    let counter = 0.0;
    let myEffect = {
      uniforms: {
        "tDiffuse": { value: null },
        "amount": { value: counter }
      },
      vertexShader: vertShader,
      fragmentShader: fragShader
    }

    let customPass = new THREE.ShaderPass(myEffect);
    customPass.renderToScreen = true;
    composer.addPass(customPass);

    /*
      Particles
      */
    const gridZoom = 10;
    const rowCount = 8;
    const colCount = 16;
    const rowHeight = gridZoom / rowCount;
    const colWidth = gridZoom * aspect / colCount;
    let ringRadius = 2;
    let ringFreq = 105;
    const particleCount = rowCount * colCount;
    const particleGroup = new THREE.Group();
    const particleColor = new THREE.Color(window.getComputedStyle(sectionsEl[canvasNum + 1]).getPropertyValue('background-color'));

    scene.add(particleGroup);

    const createParticle = () => {
      const geometry = new THREE.BoxBufferGeometry(.04, .04, .04, 6, 6, 6);
      const material = new THREE.MeshBasicMaterial({ 
        color: particleColor, wireframe: true
      });
      return new THREE.Mesh(geometry, material);
    }

    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        const particle = createParticle();
        particle.material.needsUpdate = true;
        particle.random = Math.random();
        particleGroup.add(particle);
        pIndex++;
      }
    }

    const render = () => {
      requestAnimationFrame(render);
      if (scrollTop < sectionsElTops[canvasNum + 1] - WIN_H / 2 || scrollTop > sectionsElTops[canvasNum + 2]) return;
      updateFormation();
      switch(formation.name) {
        case 'taurus':
          updateTaurus();
          break;
        case 'flowField':
          updateFlowField();
          break;
        case 'grid':
          updateGrid();
          break;
        case 'dials':
          updateDials();
          break;
        case 'rings':
          updateRings();
          break;
        case 'wall':
          updateWall();
          break;
      }


      if (!initialized) return;
      updateCamera();
      counter += 0.01;
      customPass.uniforms["amount"].value = counter;
      composer.render();


      if (Math.sin(frame * .02) > .5) {
        timeSpeed = 1;
      } else {
        timeSpeed = 1;
      }
      frame = frame + timeSpeed;
    }

    function setPatternMeasurements() {
      let {offsetWidth: w, offsetHeight: h} = canvas;
      aspect = w / h;
      renderer.setSize(w, h);
      renderer.setPixelRatio(window.devicePixelRatio);
    }

    function updateTaurus() {
      particleGroup.rotation.y = 0;
      particleGroup.rotation.z = 0;
      particleGroup.rotation.x += .006;
      // particleGroup.rotation.y += .002;
      const pAmplitude = 3.5 + Math.sin(frame * .011) * 3.5;
      const pRotInc = .03;
      if (pAmplitude < .01) {
        standouts = [
          Math.floor(Math.random() * particleCount),
          Math.floor(Math.random() * particleCount),
          Math.floor(Math.random() * particleCount),
          Math.floor(Math.random() * particleCount),
          Math.floor(Math.random() * particleCount),
          Math.floor(Math.random() * particleCount),
          Math.floor(Math.random() * particleCount),
          Math.floor(Math.random() * particleCount)
        ];
      }
      let pIndex = 0;
      for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
          const particle = particleGroup.children[pIndex];
          const pRatio = pIndex / particleCount;
          const pAngle = pRatio * Math.PI * 2;
          let pScale = (1.3 + Math.sin(frame * .06 + pAngle * 3)) * 3;
          if (pIndex === standouts[0] || pIndex === standouts[1] || pIndex === standouts[2] || pIndex === standouts[3]  || pIndex === standouts[4] || pIndex === standouts[5]) {
            pScale *= 2;
          }

          particle.rotation.x += pRotInc;
          particle.rotation.y += pRotInc;
          particle.rotation.z += pRotInc;
          particle.scale.set(pScale, pScale, pScale)

          let pOffsetAngle = frame * .01 + pAngle * ringFreq;
          particlePosition = {
            x: Math.cos(pAngle) * ringRadius + Math.sin(pOffsetAngle) * pAmplitude,
            z: Math.sin(pAngle) * ringRadius + Math.cos(pOffsetAngle) * pAmplitude
          }

          particle.position.x = particlePosition.x;
          particle.position.z = particlePosition.z;
          particle.position.y = pScale * .5;

          if (pIndex === particleCount - 1) {
            particle.position.x = 0;
            particle.position.y = 0;
            particle.position.z = 0;
            particle.scale.set(18,18,18);
          }
          pIndex++;
        }
      }
    }

    function updateRings() {
      particleGroup.rotation.z = Math.PI * .5;
      particleGroup.rotation.y -= .01;
      particleGroup.rotation.x = Math.PI * .5;
      const pRotInc = .02;
      for (let pIndex = 0; pIndex < particleCount; pIndex++) {
        const particle = particleGroup.children[pIndex];
        const pRatio = pIndex / particleCount;
        const pAngle = pRatio * Math.PI * 2;

        particle.rotation.x = (Math.sin(frame * .01 + pRatio * .4 + pIndex * .05) + 1) * Math.PI;
        particle.rotation.z = (Math.cos(frame * .02 + pRatio * .5 + pIndex * .04) + 1) * Math.PI;
        particle.rotation.y = (Math.sin(frame * .03 + pRatio * .6 + pIndex * .03) + 1) * Math.PI;

        particle.position.y = Math.sin(pRatio * 165) * 5 * pRatio * Math.sin(pRatio * .2 + frame * .01);
        particle.position.z = Math.cos(pRatio * 165) * 5 * pRatio * Math.sin(pRatio * .2 + frame * .01);
        particle.position.x = pRatio * 24 - 12;

        let pScale = (Math.cos(pRatio * 2 + frame * .01) + 1.2) * 10 + (Math.sin(frame * .05 + pRatio * 10) + 1.2) + particle.position.x + 3;
        particle.scale.set(pScale, pScale, pScale)

        if (pIndex === particleCount - 1) {
          particle.position.x = 0;
          particle.position.y = 0;
          particle.position.z = 0;
          particle.scale.set(18,18,18);
        }
      }
    }

    function updateGrid() {
      particleGroup.rotation.y = 0;
      particleGroup.rotation.z = 0;
      particleGroup.rotation.x += .004;
      const pAmplitude = 3.5 + Math.sin(frame * .01) * 3.5;
      const pRotInc = .03;
      let pIndex = 0;
      for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
          const particle = particleGroup.children[pIndex];
          const pRatio = pIndex / particleCount;
          const pAngle = pRatio * Math.PI * 2;
          let pScale = (1.3 + Math.sin(frame * .06 + pAngle * 2)) * 3;

          particle.rotation.x += pRotInc;
          particle.rotation.y += pRotInc;
          particle.rotation.z += pRotInc;

          if (pIndex === standouts[0] || pIndex === standouts[1] || pIndex === standouts[2] || pIndex === standouts[3]  || pIndex === standouts[4]  || pIndex === standouts[5]) {
            pScale *= 2;
          }

          particle.scale.set(pScale, pScale, pScale)

          gridParticlePosition = {
            x: c * colWidth - gridZoom * aspect * .5,
            z: r * rowHeight + (Math.sin(c / colCount * 9.5)) * 5 - gridZoom * .55
          }

          particle.position.x = gridParticlePosition.x;
          particle.position.z = gridParticlePosition.z;
          particle.position.y = pScale * .5;

          pIndex++;

          if (pIndex === particleCount) {
            particle.position.x = 0;
            particle.position.y = 0;
            particle.position.z = 0;
            particle.scale.set(18,18,18);
          }
        }
      }
    }

    function updateWall() {
      particleGroup.rotation.y = 0;
      particleGroup.rotation.z = 0;
      particleGroup.rotation.x = 0;
      let pIndex = 0;
      for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
          const particle = particleGroup.children[pIndex];
          const pRatio = pIndex / particleCount;
          const pScale = (Math.sin((frame + (pIndex * .05 + .75)) * .04) + 1.2) * 5.5;
          particle.scale.set(pScale, pScale, pScale);

          gridParticlePosition = {
            x: c * colWidth - gridZoom * aspect * .5,
            y: r * rowHeight - gridZoom * .5,
            z: pScale * .5
          }


          if (pIndex === particleCount - 1) {
            gridParticlePosition.x = 0;
            gridParticlePosition.y = 0;
            gridParticlePosition.z = 0;
            particle.scale.set(18,18,18);
          }

          particle.position.x = gridParticlePosition.x;
          particle.position.y = gridParticlePosition.y;
          particle.position.z = gridParticlePosition.z - (gridParticlePosition.x * gridParticlePosition.x) * .02;
          particle.rotation.x += gridParticlePosition.x * .01 + .02;
          particle.rotation.y += gridParticlePosition.y * .01 + .02;
          particle.rotation.z = 0;
          pIndex++;
        }
      }
    }

    let dials = [];
    createDials();
    function createDials() {
      let dialSum = 0;
      let dialSize = 16;
      while (dialSum < particleCount) {
        dialSize++;
        if (dialSum + dialSize > particleCount) {
          dialSize = particleCount - dialSum;
        }
        dialSum += dialSize;
        dials.push(dialSize);
      }
    }

    function updateDials() {
      particleGroup.rotation.y = 0;
      particleGroup.rotation.z = Math.PI;
      particleGroup.rotation.x = -Math.PI * .5;
      const pRotInc = .02;
      let pIndex = 0;
      for (let g = 0; g < dials.length; g++) {
        const dialSize = dials[g];
        for (let i = 0; i < dialSize; i++) {
          const particle = particleGroup.children[pIndex];

          const pRatio = i / dialSize;
          const pAngle = pRatio * Math.PI * 2;
          let pScale = (Math.sin((frame + pAngle * 10) * .05) + 1.2) * 6;

          particle.rotation.x += pRotInc + pRatio * .002;
          particle.rotation.y += pRotInc + pRatio * .004;
          particle.rotation.z += pRotInc + pRatio * .006;
          particle.scale.set(pScale, pScale, pScale);
          const angle = i / dialSize * Math.PI * 2 + dialSize * .06 + frame * .02;

          dialParticlePosition = {
            x: Math.cos(angle) * dialSize * .12,
            z: Math.sin(angle) * dialSize * .12,
          }

          particle.position.x = dialParticlePosition.x;
          particle.position.z = dialParticlePosition.z;
          particle.position.y = pScale * .02;
          pIndex++;
          if (pIndex === particleCount) {
            particle.position.x = 0;
            particle.position.y = 0;
            particle.position.z = 0;
            particle.scale.set(18,18,18);
          }
        }
      }
    }

    createFlowField()

    function createFlowField() {
      let i = 0;
      var simplex = new SimplexNoise();
      for (let z = 0; z < 100; z++) {
        for (let y = 0; y < 100; y++) {
          for (let x = 0; x < 100; x++) {
            flowField[i] = {
              vxy: simplex.noise3D(x * .01, y * .01, z * .01),
              vz: simplex.noise2D(z * .02, i * .001)
            }
            i++;
          }
        }
      }
    }

    function updateFlowField() {
      particleGroup.rotation.y = 0;
      particleGroup.rotation.z = 0;
      particleGroup.rotation.x += .003;
      for (let pIndex = 0; pIndex < particleCount; pIndex++) {
        const particle = particleGroup.children[pIndex];
        let ffX = Math.floor(particle.position.x + cameraRadius * 0.5);
        let ffY = Math.floor(particle.position.y + cameraRadius * 0.5);
        const ffIndex = (ffX + ffY);
        particle.position.y += Math.sin(flowField[ffIndex].vxy * .23) * .2 - .1;
        particle.position.z += (Math.cos(flowField[ffIndex].vxy * 12) + 1) * .1;
        particle.rotation.x += .02 + Math.sin(flowField[ffIndex].vxy * .23) * .04;
        particle.rotation.y += .03 + Math.sin(flowField[ffIndex].vxy * .23) * .04;
        particle.rotation.z += .03 + Math.sin(flowField[ffIndex].vxy * .23) * .04;
        const maxPos = Math.max(Math.abs(particle.position.x), Math.abs(particle.position.y), Math.abs(particle.position.z));

        let scale = Math.min(particle.scale.x + .4, 10);
        if (maxPos > 11) {
          scale *= .7;
        }
        particle.scale.set(scale, scale, scale);
        if (maxPos > 12) {
          particle.position.x = Math.random() * 22 - 11;
          particle.position.y = Math.random() * 22 - 11;
          particle.position.z = -11;
          particle.scale.set(0,0,0);
        }
        if (pIndex === particleCount - 1) {
          particle.position.x = 0;
          particle.position.y = 0;
          particle.position.z = 0;
          particle.scale.set(18,18,18);
        }
      }
    }

    function updateCamera() {
      zoom += .02 * (.99 - zoom);

      if (zoom < 3) {
        zoom = 3;
      }
      camera.zoom = zoom;
      camera.updateProjectionMatrix();
    }

    function updateFormation() {
      // only used if you want to add transitions between formations
      formationProgress = 1;
      return;
    }

    function changeFormation() {
      formationFrame = 0;
      formationNum = formationNum < formations.length - 1 ? formationNum + 1 : 0;
      formation = formations[canvasNum % (formations.length - 1)];
    }

    requestAnimationFrame(render);
  })
}

setTimeout(() => {
  document.body.classList.add('is-uncovered');
}, 2000);
