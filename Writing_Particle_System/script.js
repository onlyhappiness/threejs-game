import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

// 프레임 마지막에 셰이더 추가

// vertex shader
// 위치를 지정하고 점의 크기를 설정
const _VS = `
uniform float pointMultiplier;

void main() {
  
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = pointMultiplier / gl_Position.w;
}`;

// fragment shader
// 모든 작업이 완료되면 로드
const _FS = `
uniform sampler2D diffuseTexture;

void main() {
  gl_FragColor = texture2D(diffuseTexture, gl_Pointcoord);
}`;

class ParticleSystem {
  constructor(param) {
    const uniforms = {
      diffuseTexture: {
        value: new THREE.TextureLoader().load('./resources/fire.png')
      },
      pointMultiplier: {
        value: window.innerHeight /(2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
      }
    };

    // 머티리얼을 생성
    this._material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: _VS,
      fragmentShader: _FS,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      transparent: true,
      vertexColors: true
    });

    this._camera = params.camera;
    this._particles = [];

    this._geometry = new THREE.BufferGeometry();
    this._geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));

    // 데이터를 렌더링 할 포인트 목록
    this._points = new THREE.Points(this._geometry, this._material);

    params.parent.add(this._points);

    this._AddParticles();
    this._UpdateGeometry();
  }

  _AddParticles() {
    // 10개의 입자를 만들어서 각각 임의의 위치에서 시작
    for (let i=0; i<10; i++) {
      this._particles.push({
        position: new THREE.Vector3(
          (Math.random() * 2 - 1) * 1.0,
          (Math.random() * 2 - 1) * 1.0,
          (Math.random() * 2 - 1) * 1.0),
      });
    }
  }

  // 입자 배열을 반복해서 버퍼 형상 오브젝트를
  // 분리하여 매개 변수를 애니메이션화
  _UpdateGeometry() {
    const positions = [];

    for (let p of this._particles) {
      positions.push(p.position.x, p.position.y, p.position.z);
    }

    this._geometry.setAttribute(
      'position', new THREE.Float32BufferAttribute(positions, 3));
    
    this._geometry.attributes.position.needsUpdate = true;
  }
}

