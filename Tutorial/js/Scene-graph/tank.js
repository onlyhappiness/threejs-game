import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas: canvas});
  renderer.setClearColor(0xAAAAAA);
  renderer.shadowMap.enabled = true;

  function makeCamera(fov = 40) {
    const aspect = 2;  // the canvas default
    const zNear = 0.1;
    const zFar = 1000;
    return new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
  }

  const camera = makeCamera();
  camera.position.set(8, 4, 10).multiplyScalar(3);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();
}


// 움직이는 목표
targetOrbit.rotation.y = time * 27;
targetBob.position.y = Math.sin(time * 2) * 4;
targetMesh.rotation.x = time * 7;
targetMesh.rotation.y = time * 13;
targetMaterial.emissive.setHSL(time * 10 % 1, 1, .25);
targetMaterial.color.setHSL(time * 10 % 1, 1, .25);

const tankPosition = new THREE.Vector2();
const tankTarget = new THREE.Vector2();

// move tank
const tankTime = time * .05;
curve.getPointAt(tankTime % 1, tankPosition);
curve.getPointAt((tankTime + 0.01) % 1, tankTarget);
tank.position.set(tankPosition.x, 0, tankPosition.y);
tank.lookAt(tankTarget.x, 0, tankTarget.y);


const targetPosition = new THREE.Vector3();

// 목표를 조준하도록
targetMesh.getWorldPosition(targetPosition);
turretPivot.lookAt(targetPosition);

// 포탑 카메라가 목표물을 바라보도록
turretCamera.lookAt(targetPosition);


// targetCameraPivot이 탱크를 바라보도록
tank.getWorldPosition(targetPosition);
targetCameraPivot.lookAt(targetPosition);

// 바퀴 회전
wheelMeshes.forEach((obj) => {
  obj.rotation.x = time * 3;
});

// 카메라
const cameras = [
  { cam: camera, desc: 'detached camera', },
  { cam: turretCamera, desc: 'on turret looking at target', },
  { cam: targetCamera, desc: 'near target looking at tank', },
  { cam: tankCamera, desc: 'above back of tank', },
];

const infoElem = document.querySelector('#info');

// 시간에 따라 카메라 변경
const camera = cameras[time * .25 % cameras.length | 0];
infoElem.textContent = camera.desc;