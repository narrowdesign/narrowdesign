varying vec3 v_color;

void main() {  
  float time = u_time * u_global.noiseSpeed;
  vec2 noiseCoord = resolution * uvNorm * u_global.noiseFreq;

  vec2 st = 1. - uvNorm.xy;
  float mask = max(st.x,st.y)*0.5;

  // 
  // Tilting the plane
  // 

  // Front-to-back tilt
  float tilt = resolution.y / 2.0 * uvNorm.y;

  // Left-to-right angle
  float incline = resolution.x * uvNorm.x / 2.0 * u_vertDeform.incline;

  // Up-down shift to offset incline
  float offset = resolution.x / 2.0 * u_vertDeform.incline * mix(u_vertDeform.offsetBottom, u_vertDeform.offsetTop, uv.y);

  // 
  // Vertex noise
  // 

  float noise = snoise(vec3( 
    noiseCoord.x * u_vertDeform.noiseFreq.x + time * u_vertDeform.noiseFlow,
    noiseCoord.y * u_vertDeform.noiseFreq.y,
    time * u_vertDeform.noiseSpeed + u_vertDeform.noiseSeed
  )) * u_vertDeform.noiseAmp;

  // Fade noise to zero at edges
  noise *= 1.0 - pow(abs(uvNorm.y), 2.0);

  // Clamp to 0
  // noise = max(0.0, noise);

  vec3 pos = vec3(
    position.x,
    position.y + tilt + incline + noise - offset,
    position.z
  );

  // 
  // Vertex color, to be passed to fragment shader
  // 

  v_color = u_baseColor;

  for (int i = 0; i < u_waveLayers_length; i++) {
    WaveLayers layer = u_waveLayers[i];

    float noise = smoothstep(
      layer.noiseFloor, 
      layer.noiseCeil, 
      snoise(vec3( 
        noiseCoord.x * layer.noiseFreq.x + time * layer.noiseFlow, 
        noiseCoord.y * layer.noiseFreq.y, 
        time * layer.noiseSpeed + layer.noiseSeed
      )) / 2.0 + 0.5
    ) * layer.opacity;

    v_color = layer.blend == BLEND_SCREEN       ? blendScreen     (v_color, layer.color, noise)
            : layer.blend == BLEND_MULTIPLY     ? blendMultiply   (v_color, layer.color, noise)
            : layer.blend == BLEND_OVERLAY      ? blendOverlay    (v_color, layer.color, noise)
            : layer.blend == BLEND_HARD_LIGHT   ? blendHardLight  (v_color, layer.color, noise)
            : layer.blend == BLEND_SOFT_LIGHT   ? blendSoftLight  (v_color, layer.color, noise)
            : layer.blend == BLEND_COLOR_DODGE  ? blendColorDodge (v_color, layer.color, noise)
            : layer.blend == BLEND_COLOR_BURN   ? blendColorBurn  (v_color, layer.color, noise)
            : layer.blend == BLEND_VIVID_LIGHT  ? blendVividLight (v_color, layer.color, noise)
            : layer.blend == BLEND_LIGHTEN      ? blendLighten    (v_color, layer.color, noise)
            : layer.blend == BLEND_LINEAR_BURN  ? blendLinearBurn (v_color, layer.color, noise)
            : layer.blend == BLEND_LINEAR_DODGE ? blendLinearDodge(v_color, layer.color, noise)
            : layer.blend == BLEND_LINEAR_LIGHT ? blendLinearLight(v_color, layer.color, noise)
            :                                     blendNormal     (v_color, layer.color, noise);
  }

  // 
  // Finish
  // 
  
  //v_color = vec3(mask);
  v_color = blendScreen(v_color,vec3(1.,.5,1.0) * 0.5, mask);
  //v_color = vec3(st, 0.);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}