class PageScript {
  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.isClicked = false;
    this.winH = window.innerHeight;
    // clientside javascript here
    if (!window.location.search.includes('instrument')) {
      document.body.classList.remove('isInitialized');
    }
    this.scrollActivatedEls = document.querySelectorAll('.jsScrollActivated');
    if (this.scrollActivatedEls.length > 0) {
      this.scrollActivatedTops = this.scrollActivatedEls.map((el) => {
        el.getBoundingClientRect().top;
      })
      document.addEventListener('scroll', this.handleScroll);
    }
    
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('click', this.handleClick)
    
    this.initThree();
  }

  handleMouseMove = (e) => {
    const x = e.clientX - window.innerWidth / 2;
    const y = e.clientY - window.innerHeight / 2;
    const xPerc = x / window.innerWidth;
    const yPerc = y / window.innerHeight;
    this.mouseX = xPerc;
    this.mouseY = yPerc;
  }

  handleScroll = () => {
    const scrollY = window.scrollY;
    this.scrollActivatedTops.forEach((top, i) => {
      if (scrollY > top + this.winH / 2) {
        this.scrollActivatedEls[i].classList.add('isActive');
      }
    })
  }

  handleClick = (e) => {
    this.isClicked = !this.isClicked;
  }

  initThree = () => {
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialiase: true });
    //===================================================== canvas

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);

    //===================================================== this.scene
    this.scene = new THREE.Scene();

    //===================================================== this.camera
    this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.camera.position.y = 0;

    //===================================================== lights
    this.light = new THREE.DirectionalLight(0xffefef, 3);
    this.light.position.set(-1, -1, -1).normalize();
    this.scene.add(this.light);
    
    this.sunlight = new THREE.SpotLight(0xff55ff, 0.75);
    this.sunlight.position.set(0, 10, 10);

    this.scene.add(this.sunlight);

    this.leftlight = new THREE.SpotLight(0x55ffff, 0.75);
    this.leftlight.position.set(0, -10, 10);

    this.scene.add(this.leftlight);

    this.backlight = new THREE.SpotLight(0xff00ff, 0.75);
    this.backlight.position.set(-10, -10, -10);

    this.scene.add(this.backlight);

    //===================================================== resize
    window.addEventListener("resize", function() {
      let width = window.innerWidth;
      let height = window.innerHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });


    //===================================================== model
    this.loader = new THREE.GLTFLoader();
    this.model = null;
    const me = this;
    this.loader.load(
      "./envelope.gltf", function(gltf) {

        gltf.scene.traverse( function( node ) {
            if ( node instanceof THREE.Mesh ) { 
              node.castShadow = true; 
              node.material.side = THREE.DoubleSide;
              node.material = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                roughness: 0.5,
                metalness: 0.5,
                clearcoat: 0.5,
                clearcoatRoughness: 0.5,
                reflectivity: 0.5,
                envMapIntensity: 0.4,
                transparent: true,
                opacity: 0.5,
                premultipliedAlpha: true,
                transmission: 1.3,
                ior: 0.5,
                transmissionRoughness: 1.5,
                depthWrite: false,
                depthTest: false,
                side: THREE.DoubleSide,
                shadowSide: THREE.DoubleSide,
              })
            }
          });

          me.model = gltf.scene;
          const cardGeometry = new THREE.BoxGeometry(1.88,1.1,0.01);
          const cardMaterial = new THREE.ShaderMaterial({
            vertexShader: `
              varying vec2 vUv;
              uniform float u_time;
              uniform vec2 u_resolution;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                }`,
            fragmentShader: `
              varying vec2 vUv;
              uniform float u_time;
              uniform vec2 u_resolution;
              void main() {
                vec2 st = gl_FragCoord.xy/u_resolution.xy;
                vec4 color = vec4(1.0, 1.0, 1.0, 0.8);
                color.r = sin(u_time) * 0.5;
                color.g = cos(u_time * 0.3) * 0.5;
                color.r = 1. - distance(vec2(st.x - color.r, st.y - color.g), vec2(1., 1.));
                color.g = distance(vec2(st.x - color.r, st.y - color.g), vec2(1., 1.));
                color.a = distance(vec2(st.x, st.y), vec2(1., 1.));
                gl_FragColor = color;
              }`,
            uniforms: {
              u_time: { type: "f", value: 1.0 },
              u_resolution: { type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
              u_mouse: { type: "v2", value: new THREE.Vector2() }
            }
          })
          me.card = new THREE.Mesh(cardGeometry, cardMaterial);
          me.card.rotation.y = Math.PI / 2;

          me.model.add(me.card)
          me.model.position.y = -2;
          me.model.scale.set(1.35,1.35,1.35);
          me.scene.add(me.model);

    })
  
    
    //===================================================== animate
    function render() {
      requestAnimationFrame(render);
      if (me.model) {
        const mouseRotationY = me.mouseX * 0.5;
        me.model.rotation.x = me.mouseY * 0.5;
        me.renderer.render(me.scene, me.camera);

        // me.leftlight.position.x = Math.sin(performance.now() * 0.001) * 10;
        // me.leftlight.position.y = Math.cos(performance.now() * 0.001) * 5;

        if (me.isClicked) {
          me.card.position.y += 0.015 * (1 - me.card.position.y);
          me.model.position.y += 0.015 * (-1 - me.model.position.y);
          me.model.children[3].rotation.z += 0.015 * (0 - me.model.children[3].rotation.z);
          me.model.rotation.y += 0.015 * ((-Math.PI / 2  + mouseRotationY) - me.model.rotation.y)
        } else {
          me.card.position.y += 0.015 * (0 - me.card.position.y);
          me.model.position.y += 0.015 * (0 - me.model.position.y);
          me.model.children[3].rotation.z += 0.015 * (-Math.PI - me.model.children[3].rotation.z);
          me.model.rotation.y += 0.015 * ((Math.PI / 2 + mouseRotationY) - me.model.rotation.y)
          console.log(me.model.rotation.y)
        }
        me.card.material.uniforms.u_time.value = performance.now() * 0.001;
      }
    }
    
    render(this);
  }
}

const pageScript = new PageScript();