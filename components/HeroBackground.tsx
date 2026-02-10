
import React, { useEffect, useRef } from 'react';

const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Helper to get Primary Color RGB normalized 0-1
    const getPrimaryRGB = () => {
        const rootStyle = getComputedStyle(document.documentElement);
        const color = rootStyle.getPropertyValue('--primary').trim();
        let r=0.13, g=0.82, b=0.93; // default cyan
        if (color.startsWith('#')) {
            if (color.length === 7) {
                r = parseInt(color.slice(1, 3), 16) / 255;
                g = parseInt(color.slice(3, 5), 16) / 255;
                b = parseInt(color.slice(5, 7), 16) / 255;
            }
        }
        return [r, g, b];
    };

    let [pr, pg, pb] = getPrimaryRGB();

    // Vertex Shader
    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    // Fragment Shader - Optimized & Dynamic Theme
    const fsSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec3 iColor; 
      
      const float overallSpeed = 0.15; // Slower speed
      const float gridSmoothWidth = 0.015;
      const float axisWidth = 0.05;
      const float majorLineWidth = 0.025;
      const float minorLineWidth = 0.0125;
      const float majorLineFrequency = 5.0;
      const float minorLineFrequency = 1.0;
      const float scale = 5.0;
      
      const float minLineWidth = 0.01;
      const float maxLineWidth = 0.12; 
      const float lineSpeed = 0.8 * overallSpeed;
      const float lineAmplitude = 0.6; // Reduced amplitude
      const float lineFrequency = 0.2;
      const float warpSpeed = 0.1 * overallSpeed;
      const float warpFrequency = 0.4;
      const float warpAmplitude = 0.5; // Reduced warp
      const float offsetFrequency = 0.5;
      const float offsetSpeed = 1.33 * overallSpeed;
      const float minOffsetSpread = 0.6;
      const float maxOffsetSpread = 2.0;
      const int linesPerGroup = 8; // Reduced line count for performance
      
      #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
      #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))
      
      float random(float t) {
          return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;   
      }
      
      float getPlasmaY(float x, float horizontalFade, float offset) {
          return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
      }
      
      void main() {
          vec2 fragCoord = gl_FragCoord.xy;
          vec4 fragColor;
          
          vec2 uv = fragCoord.xy / iResolution.xy;
          vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;
          
          float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
          float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);
      
          // Subtle Wind/turbulence effect
          space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
          space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;
          
          vec4 lines = vec4(0.0);
          vec4 lineColor = vec4(iColor, 0.5); // Use passed color with alpha

          for(int l = 0; l < linesPerGroup; l++) {
              float normalizedLineIndex = float(l) / float(linesPerGroup);
              float offsetTime = iTime * offsetSpeed;
              float offsetPosition = float(l) + space.x * offsetFrequency;
              float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
              float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
              float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
              float linePosition = getPlasmaY(space.x, horizontalFade, offset);
              float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);
              
              lines += line * lineColor * rand;
          }
          
          // Apply vertical fade to lines
          fragColor = lines * verticalFade;
          fragColor.a = 1.0;
          
          gl_FragColor = fragColor;
      }
    `;

    // Shader Helper Functions
    const loadShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    if (!vertexShader || !fragmentShader) return;

    const shaderProgram = gl.createProgram();
    if (!shaderProgram) return;

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        resolution: gl.getUniformLocation(shaderProgram, 'iResolution'),
        time: gl.getUniformLocation(shaderProgram, 'iTime'),
        color: gl.getUniformLocation(shaderProgram, 'iColor'),
      },
    };

    const resizeCanvas = () => {
        // Update color on resize just in case
        [pr, pg, pb] = getPrimaryRGB();

      const dpr = window.devicePixelRatio || 1;
      if (canvasRef.current) {
        canvas.width = canvasRef.current.clientWidth * dpr;
        canvas.height = canvasRef.current.clientHeight * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const startTime = Date.now();
    let animationFrameId: number;

    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000;

      gl.clearColor(0.0, 0.0, 0.0, 0.0); // Transparent clear
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(programInfo.program);

      gl.uniform2f(programInfo.uniformLocations.resolution, canvas.width, canvas.height);
      gl.uniform1f(programInfo.uniformLocations.time, currentTime);
      gl.uniform3f(programInfo.uniformLocations.color, pr, pg, pb);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full -z-[1] pointer-events-none opacity-40 mix-blend-screen"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default HeroBackground;
