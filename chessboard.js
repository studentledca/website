import * as three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(init, 0.0));
} else {
  setTimeout(init, 0.0);
}

function init() {
  const container = document.getElementById('chessboard');
  
  // Create canvas so three.js knows where to render
  const canvas = document.createElement('canvas');
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  container.appendChild(canvas);
  
  const scene = new three.Scene();
  
  // Setting up canvas element
  const renderer = new three.WebGLRenderer({canvas: canvas});
  renderer.setSize(canvas.width, canvas.height);
  container.appendChild(renderer.domElement);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  const camera = new three.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  camera.position.setZ(20);
  camera.position.setY(10);
  
  const top_light = new three.PointLight(0xffffff, 750);
  top_light.position.y += 10;
  scene.add(top_light);

  const bottom_light = new three.PointLight(0xffffff, 750);
  bottom_light.position.y -= 10;
  scene.add(bottom_light);
  
  const controls = new OrbitControls(camera, renderer.domElement);
  // So that it zooms out very slowly
  controls.enableZoom = false;
  
  // Load chessboard
  const loader = new GLTFLoader();
  let chess_board;
  loader.load('public/chess_scene.glb', function (gltf) {
    chess_board = gltf.scene;
    chess_board.scale.set(0.25, 0.25, 0.25)
    scene.add(chess_board);
    animate()
  }, undefined, function (error) {
    console.error(error);
  });

  // Resize the chessboard scene
  window.addEventListener('resize', onWindowResize);

  function onWindowResize() {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
  }

  function animate() {
    requestAnimationFrame(animate);
  
    controls.update();
  
    chess_board.rotation.y += 0.005;
  
    renderer.render(scene, camera);
  }
}

