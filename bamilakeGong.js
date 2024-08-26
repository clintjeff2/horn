import './style.css';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#Gong'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(0);
camera.position.setX(30);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(14, 3, 16, 80);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);


// Lights
 
const pointLight = new THREE.PointLight(0xffffff,8000);
pointLight.position.set(30, 10, 20);

const pointLight2 = new THREE.PointLight(0xffffff,8000);
pointLight2.position.set(-30, 5, 10);
scene.add(pointLight2);

const ambientLight = new THREE.AmbientLight(0xffffff,3);
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera,renderer.domElement);

// Helpers
const loader = new GLTFLoader();
    loader.load(
      '/bamike-gong.gltf',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(3,3,3);
        model.name = 'Gong';
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the GLTF model:', error);
      }
    );

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);
const drum = scene.children
console.log(drum);

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  if(scene.children[3]){scene.children[3].rotation.y += 0.004;}
  scene.children[0].rotation.y += 0.01;
  scene.children[1].rotation.y += 0.01;
  torus.rotation.x += 0.01
  controls.update();
  // controls.update();
 
  renderer.render(scene, camera); 
}

animate();
