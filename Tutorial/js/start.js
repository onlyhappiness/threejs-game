import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';


function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 75;     // 시야각
  const aspect = 2;   // 가로 세로 비율canvas default
  const near = 0.1;   // 공간 범위
  const far = 5;      // 공간 범위
  
  // 원근 카메라
  const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  camera.position.z = 2;

  const scene = new THREE.Scene();

  // 광원 추가
  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4); // 위치
    scene.add(light);
  }

  // boxGeometry
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );

  // 큐브 추가
  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ];
  
  function render(time) {
    time *= 0.001;
  
    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  // material
  // const material = new THREE.MeshBasicMaterial({
  //   color: 0x44aa88
  // });  // 광원에 반응하지 않음
  
  // const material = new THREE.MeshPhongMaterial({ 
  //   color: 0x44aa88
  // });

  // const cube = new THREE.Mesh(geometry, material);

  // scene.add(cube);

  // // 3D
  // function render(time) {
  //   time *= 0.001;  // convert time to seconds
  
  //   cube.rotation.x = time;
  //   cube.rotation.y = time;
  
  //   renderer.render(scene, camera);
  
  //   requestAnimationFrame(render);
  // }
  
  // requestAnimationFrame(render);

}

main();




