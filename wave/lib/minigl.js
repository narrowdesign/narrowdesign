// 
// Tiny and extremely limited WebGL library for simple scenes
// 

class MiniGL {

  //
  // Setup
  //

  constructor(canvas, width, height, debug = false) {

    const my = this;

    my.canvas = canvas;
    my.gl = my.canvas.getContext('webgl', { antialias: true });
    my.meshes = [];

    const gl = my.gl;

    if (width && height) this.setSize(width, height);

    // 
    // Debug
    // 

    my.lastDebugMsg;

    my.debug = debug ? function(sender) {
      const now = new Date();
      if (now - my.lastDebugMsg > 1000) console.log('---');

      console.log(
        now.toLocaleTimeString() 
          + Array(Math.max(0, 32 - sender.length)).join(' ') 
          + sender + ': ',
        ...Array.from(arguments).slice(1)
      );

      my.lastDebugMsg = now;
    } : () => {};

    // 
    // Child classes 
    // 

    Object.defineProperties(my, {

      //
      // Shader materials
      //

      Material: {
        enumerable: false,
        value: class Material {

          constructor(vertexSource, fragmentSource, uniforms = {}) {

            const material = this;

            material.uniforms = uniforms;
            material.uniformInstances = [];

            // Compile source code

            function compileShaderSource(type, source) {
              const shader = gl.createShader(type);
              gl.shaderSource(shader, source);
              gl.compileShader(shader);
            
              if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
              }

              my.debug(
                'Material.compileShaderSource',
                { source }
              );

              return shader;
            }

            function getUniformDeclarations(uniforms, exclude) {
              return Object.entries(uniforms)
                .map(([name, u]) => u.getDeclaration(name, exclude))
                .join('\n');
            }
          
            const headerSource = `
              precision highp float;
            `;

            material.vertexSource = `
              ${headerSource}
              attribute vec4 position;
              attribute vec2 uv;
              attribute vec2 uvNorm;
              ${ getUniformDeclarations(my.commonUniforms, 'vertex') }
              ${ getUniformDeclarations(uniforms,          'vertex') }
              ${vertexSource}
            `;

            material.fragmentSource = `
              ${headerSource}
              ${ getUniformDeclarations(my.commonUniforms, 'fragment') }
              ${ getUniformDeclarations(uniforms,          'fragment') }
              ${fragmentSource}
            `;

            material.vertexShader   = compileShaderSource(gl.VERTEX_SHADER,   material.vertexSource  );
            material.fragmentShader = compileShaderSource(gl.FRAGMENT_SHADER, material.fragmentSource);

            material.program = gl.createProgram();
            gl.attachShader(material.program, material.vertexShader);
            gl.attachShader(material.program, material.fragmentShader);
            gl.linkProgram (material.program);

            if (!gl.getProgramParameter(material.program, gl.LINK_STATUS)) {
              console.error(gl.getProgramInfoLog(material.program));
            }

            gl.useProgram(material.program);

            material.attachUniforms(undefined, my.commonUniforms);
            material.attachUniforms(undefined, material.uniforms);

          }

          // Attach uniforms to this program

          attachUniforms(name, uniform) {

            const material = this;

            // Entry loop

            if (name === undefined ) {
              Object.entries(uniform).forEach(([name2, uniform2]) => {
                material.attachUniforms(name2, uniform2)
              });
            }

            // Flatten arrays

            else if (uniform.type == 'array') {
              uniform.value.forEach((uniform2, i) =>
                material.attachUniforms(`${name}[${i}]`, uniform2)
              );
            } 

            // Flatten structs

            else if (uniform.type == 'struct') {
              Object.entries(uniform.value).forEach(([name2, uniform2]) => 
                material.attachUniforms(`${name}.${name2}`, uniform2)
              );
            }

            // Plain uniform

            else {
              my.debug(
                'Material.attachUniforms',
                { name, uniform }
              );

              material.uniformInstances.push({
                uniform,
                location: gl.getUniformLocation(material.program, name),
              });
            }

          }

        },
      },

      // 
      // Shader uniforms
      // 
      
      Uniform: {
        enumerable: false,
        value: class Uniform {
    
          constructor(opt) {

            this.type = 'float';

            Object.assign(this, opt);

            // Convert GLSL type name to WebGL function name

            const typeToFn = {
              float: '1f',
              int:   '1i',
              vec2:  '2fv',
              vec3:  '3fv',
              vec4:  '4fv',
              mat4:  'Matrix4fv',
            };

            this.typeFn = typeToFn[this.type] || '1f';
    
            this.update();

          }

          // Make values available in GL

          update(location) {

            if (this.value !== undefined) {
              
              gl[`uniform${this.typeFn}`](
                location, 
                this.typeFn.indexOf('Matrix') === 0 ? this.transpose : this.value,
                this.typeFn.indexOf('Matrix') === 0 ? this.value : null,
              );

            }

          }

          // Get GLSL shader declaration code

          getDeclaration(name, exclude, length) {
    
            const uniform = this;

            if (uniform.excludeFrom === exclude) {
              return;
            }

            // Fixed-length array with type defintion from first item

            else if (uniform.type === 'array') {
              return uniform.value[0].getDeclaration(name, exclude, uniform.value.length)
              + `\nconst int ${name}_length = ${uniform.value.length};`
            }

            // Struct declaration

            else if (uniform.type === 'struct') {
              let structName = name.replace('u_', '');
              structName = structName.charAt(0).toUpperCase() + structName.slice(1);

              return `uniform struct ${structName} {\n`
                + Object.entries(uniform.value).map(([name, uniform]) =>
                  uniform.getDeclaration(name, exclude).replace(/^uniform/, '')
                ).join('')
              + `\n} ${name}${ length > 0 ? `[${length}]` : '' };`
            }

            // Any other uniform

            else {
              return `uniform ${uniform.type} ${name}${length > 0 ? `[${length}]` : ''};`
            }

          }
    
        },
      },
    
      //
      // Calculate geometry for a simple, centered plane
      //
    
      PlaneGeometry: {
        enumerable: false,
        value: class PlaneGeometry {
    
          constructor(width, height, xSegCount, ySegCount, orientation) {

            const geometry = this;gl.createBuffer();

            geometry.attributes = {
              position: new my.Attribute({ target: gl.ARRAY_BUFFER,         size: 3 }),
              uv:       new my.Attribute({ target: gl.ARRAY_BUFFER,         size: 2 }),
              uvNorm:   new my.Attribute({ target: gl.ARRAY_BUFFER,         size: 2 }),
              index:    new my.Attribute({ target: gl.ELEMENT_ARRAY_BUFFER, size: 3, type: gl.UNSIGNED_SHORT }),
            };

            this.setTopology(xSegCount, ySegCount);
            this.setSize(width, height, orientation);
    
          }

          // Initialize geometry structure

          setTopology(xSegCount = 1, ySegCount = 1) {

            const geometry = this;

            geometry.xSegCount = xSegCount;
            geometry.ySegCount = ySegCount;

            geometry.vertexCount = (geometry.xSegCount + 1) * (geometry.ySegCount + 1);
            geometry.quadCount   = geometry.xSegCount * geometry.ySegCount * 2;

            geometry.attributes.uv.values     = new Float32Array(geometry.vertexCount * 2);
            geometry.attributes.uvNorm.values = new Float32Array(geometry.vertexCount * 2);
            geometry.attributes.index.values  = new Uint16Array (geometry.quadCount   * 3);
        
            for (let yIdx = 0; yIdx <= geometry.ySegCount; yIdx++) {
    
              for (let xIdx = 0; xIdx <= geometry.xSegCount; xIdx++) {
                const vertexIdx = yIdx * (geometry.xSegCount + 1) + xIdx;
    
                // UV coordinates of each vertex

                geometry.attributes.uv.values[vertexIdx * 2    ] =     xIdx / geometry.xSegCount;
                geometry.attributes.uv.values[vertexIdx * 2 + 1] = 1 - yIdx / geometry.ySegCount;

                geometry.attributes.uvNorm.values[vertexIdx * 2    ] = -1 + (xIdx / geometry.xSegCount) * 2;
                geometry.attributes.uvNorm.values[vertexIdx * 2 + 1] =  1 - (yIdx / geometry.ySegCount) * 2;
    
                // Vertex indices of each face quad (two triangles)

                if (xIdx < geometry.xSegCount && yIdx < geometry.ySegCount) {
                  const quadIdx = yIdx * geometry.xSegCount + xIdx;
    
                  // Bottom left triangle

                  geometry.attributes.index.values[quadIdx * 6    ] = vertexIdx;                           // BL vertex
                  geometry.attributes.index.values[quadIdx * 6 + 1] = vertexIdx + 1 + geometry.xSegCount;  // TL vertex
                  geometry.attributes.index.values[quadIdx * 6 + 2] = vertexIdx + 1;                       // BR vertex
    
                  // Top right triangle

                  geometry.attributes.index.values[quadIdx * 6 + 3] = vertexIdx + 1;                       // BR vertex
                  geometry.attributes.index.values[quadIdx * 6 + 4] = vertexIdx + 1 + geometry.xSegCount;  // TL vertex
                  geometry.attributes.index.values[quadIdx * 6 + 5] = vertexIdx + 2 + geometry.xSegCount;  // TR vertex
                }
              }
            }

            geometry.attributes.uv.update();
            geometry.attributes.uvNorm.update();
            geometry.attributes.index.update();

            my.debug(
              'Geometry.setTopology',
              {
                uv: geometry.attributes.uv,
                uvNorm: geometry.attributes.uvNorm,
                index: geometry.attributes.index
              }
            );

          }

          // Set vertex position values
          
          setSize(width = 1, height = 1, orientation = 'xz') {

            const geometry = this;

            geometry.width       = width;
            geometry.height      = height;
            geometry.orientation = orientation;

            if (!geometry.attributes.position.values || geometry.attributes.position.values.length !== geometry.vertexCount * 3)
              geometry.attributes.position.values = new Float32Array(geometry.vertexCount * 3);
    
            const xPosStart = width  / -2;
            const yPosStart = height / -2;
            const xSegLen = width  / geometry.xSegCount;
            const ySegLen = height / geometry.ySegCount;
    
            for (let yIdx = 0; yIdx <= geometry.ySegCount; yIdx++) {
              const yPos = yPosStart + yIdx * ySegLen;
    
              for (let xIdx = 0; xIdx <= geometry.xSegCount; xIdx++) {
                const xPos = xPosStart + xIdx * xSegLen;
                const vertexIdx = yIdx * (geometry.xSegCount + 1) + xIdx;
    
                geometry.attributes.position.values[ vertexIdx * 3 + 'xyz'.indexOf(orientation[0]) ] =  xPos;
                geometry.attributes.position.values[ vertexIdx * 3 + 'xyz'.indexOf(orientation[1]) ] = -yPos;
              }
            }

            geometry.attributes.position.update();

            my.debug(
              'Geometry.setSize',
              {
                position: geometry.attributes.position
              }
            );

          }
    
        },
      },
  
      // 
      // Assemble geometry and material into something we can render
      // 
    
      Mesh: {
        enumerable: false,
        value: class Mesh {
    
          constructor(geometry, material) {   
            
            const mesh = this;
    
            mesh.geometry = geometry;
            mesh.material = material;
            mesh.wireframe = false;
            mesh.attributeInstances = [];

            Object.entries(mesh.geometry.attributes).forEach(([name, attribute]) => {
              mesh.attributeInstances.push({
                attribute,
                location: attribute.attach(name, mesh.material.program),
              });
            });
    
            my.meshes.push(mesh);

            my.debug(
              'Mesh.constructor',
              { mesh }
            );
    
          }

          // Render

          draw() {
            
            const mesh = this;

            gl.useProgram(mesh.material.program);

            mesh.material.uniformInstances.forEach(({uniform, location}) => uniform.update(location));
            mesh.attributeInstances.forEach(({attribute, location}) => attribute.use(location));
      
            gl.drawElements(
              mesh.wireframe ? gl.LINES : gl.TRIANGLES, 
              mesh.geometry.attributes.index.values.length, 
              gl.UNSIGNED_SHORT, 
              0
            );

          }

          // Remove mesh from render loop.
          // Does NOT clean up any buffers.

          remove() {
            my.meshes = my.meshes.filter(m => m != this);
          }
    
        },
      },
    
      // 
      // Mesh attributes
      // 
  
      Attribute: {
        enumerable: false,
        value: class Attribute {

          constructor(opt) {
            
            this.type       = gl.FLOAT;
            this.normalized = false;
            this.buffer     = gl.createBuffer();

            Object.assign(this, opt);

            this.update();

          }

          // Send values to GL

          update() {

            if (this.values !== undefined) {
              gl.bindBuffer(this.target, this.buffer);
              gl.bufferData(this.target, this.values, gl.STATIC_DRAW);
            }

          }

          // Attach to a shader program

          attach(name, program) {

            const location = gl.getAttribLocation(program, name);

            if (this.target === gl.ARRAY_BUFFER) {
              gl.enableVertexAttribArray(location);
              gl.vertexAttribPointer(location, this.size, this.type, this.normalized, 0, 0);
            } 

            return location;

          }

          // Use for rendering

          use(location) {
            
            gl.bindBuffer(this.target, this.buffer);

            if (this.target === gl.ARRAY_BUFFER) {
              gl.enableVertexAttribArray(location);
              gl.vertexAttribPointer(location, this.size, this.type, this.normalized, 0, 0);
            } 
            
          }

        },
      },
      
    });

    // 
    // Common uniforms for all shaders
    // 

    const identityMatrix = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];

    my.commonUniforms = {
      projectionMatrix: new my.Uniform({ type: 'mat4', value: identityMatrix }),
      modelViewMatrix:  new my.Uniform({ type: 'mat4', value: identityMatrix }),
      resolution:       new my.Uniform({ type: 'vec2', value: [1, 1] }),
      aspectRatio:      new my.Uniform({ type: 'float', value: 1 }),
    };

  }

  // 
  // Set canvas size and viewport
  // 

  setSize(width = 640, height = 480) {

    this.width = width;
    this.height = height;

    this.canvas.width = width;
    this.canvas.height = height;

    this.gl.viewport(0, 0, width, height);

    this.commonUniforms.resolution.value  = [width, height];
    this.commonUniforms.aspectRatio.value = width / height;

    this.debug(
      'MiniGL.setSize',
      { width, height }
    );

  }

  // 
  // Set camera projection
  // 

  setOrthographicCamera(x = 0, y = 0, z = 0, near = -2000, far = 2000) {

    // Transform coordinates 1:1 to pixels

    this.commonUniforms.projectionMatrix.value = [
      2/(this.width),  0, 0, 0, 
      0, 2/(this.height), 0, 0, 
      0, 0, 2/(near-far),    0, 
      x, y, z,               1,
    ];

    this.debug(
      'setOrthographicCamera',
      this.commonUniforms.projectionMatrix.value
    );

  }

  //
  // Draw the scene
  //

  render() {

    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clearDepth(1);

    this.meshes.forEach(mesh => mesh.draw());

  }

}