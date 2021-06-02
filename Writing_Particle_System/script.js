import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

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

    this._points = new THREE.Points(this._geometry, this._material);

    params.parent.add(this._points);

    this._AddParticles();
    this._UpdateGeometry();
  }

  
}