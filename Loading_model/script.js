import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

// 애니메이션 모델 함수 추가 코드
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
// gltf 를 실행하기 위해 필요한 코드
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';


class LoadModelDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    const fov = 60;
    const aspect = 1920/1080;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(75, 20, 0);
    this._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xffffff);
    light.position.set(100, 100, 100);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.01;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.mapSize.near = 1.0;
    light.shadow.mapSize.far = 500;
    light.shadow.mapSize.left = 200;
    light.shadow.mapSize.right = -200;
    light.shadow.mapSize.top = 200;
    light.shadow.mapSize.bottom = -200;
    this._scene.add(light);

    light = new THREE.AmbientLight(0x404040);
    this._scene.add(light);

    const control = new OrbitControls(
      this._camera, this._threejs.domElement);
    control.target.set(0,0,0);
    control.update();

    // const loader = new THREE.CubeTextureLoader();
    // const texture = loader.load([
    // ]);
    // this._scene.background = texture;

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100, 0, 0),
      new THREE.MeshStandardMaterial({
        color: 0xffffff
      }));

    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    this._scene.add(plane);

    this._previousRAF = null;

    this._LoadModel();
    this._RAF();
  }

  _LoadModel() {
    const loader = new FBXLoader();
    loader.setPath('./resources/');
    loader.load('Rumba_Dancing.fbx', (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;
      });

      // const anim = new FBXLoader();
      // anim.setPath('../resources');
      // anim.load('Rumba Dancing.fbx', (anim) => {
      //   this._mixer = new THREE.AnimationMixer(fbx);
      //   const idle = this._mixer.clipAction(anim.animations[0]);
      //   idle.play();
      // });
      this._scene.add(fbx);
    });

    // // GLFT
    // const loader = new GLTFLoader();
    // // 모델 경로 호출
    // loader.load('shiba/scene.gltf', (gltf) => {
    //   gltf.scene.traverse(c => {
    //     c.castShadow = true;
    //   });
    //   // 콜백을 해야 실행됨
    //   this._scene.add(gltf.scene);
    // })
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      this._RAF();
    });
  }
}

let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new LoadModelDemo();
});