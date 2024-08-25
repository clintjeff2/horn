import * as THREE from 'three';
//import { PointerLockControls } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'


    // Setup

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // var pointer = new PointerLockControls()

    const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    });

    const pointLight = new THREE.PointLight(0xffffff, 4000);
    pointLight.position.set(15, 20, 20);

    const lightHelper = new THREE.PointLightHelper(pointLight);
    const gridHelper = new THREE.GridHelper(200, 50);

    // Add lighting
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.75);

    scene.add(lightHelper,light);

    const geometry = new THREE.TorusGeometry(9, 3, 16, 80);
    const material = new THREE.MeshStandardMaterial({ color: 0xffaa47 });
    const torus = new THREE.Mesh(geometry, material);

    // Moon

    const moonTexture = new THREE.TextureLoader().load('moon.jpg');
    const normalTexture = new THREE.TextureLoader().load('normal.jpg');

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(9, 32, 32),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
      })
    );
    sphere.position.set(-30,0,0);

    scene.add(torus,sphere);

    const ambientLight = new THREE.AmbientLight(0xffdddddd);
    scene.add(pointLight,ambientLight);
    const controls = new OrbitControls(camera,renderer.domElement);


    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    camera.position.setX(-3);

     // Load the 3D model
    const loader = new GLTFLoader();
    loader.load(
      '/houseSet.gltf',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(3,3,3);
        model.name = 'House';
        model.position.setZ(-35);
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the GLTF model:', error);
      }
    );
    
    function animate() {
        requestAnimationFrame(animate);
      
        torus.rotation.y += 0.01;
        if(scene.children[6]){scene.children[6].rotation.y += 0.009;}
        //sphere.lookAt();
        
        
        controls.update();
        // controls.update();
      
        renderer.render(scene, camera);
      }
      const bgColor = new THREE.Color(0xffffff);
      //console.log(scene.children);
      console.log()
      scene.background = bgColor;
      animate();
    

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);