// Importe a biblioteca Three.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Crie uma cena
const scene = new THREE.Scene();

// Crie uma câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
//camera.position.z = 5;
camera.position.set(4,5,11);
camera.lookAt(0,0,0);


// Crie um renderizador
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.outputColorSpace= THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);
//document.getElementById('cubo-container').appendChild(renderer.domElement);

// Crie um cubo
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//Ground
const groundGeometry = new THREE.PlaneGeometry(20,20,32,32);
groundGeometry.rotateX(-Math.PI/2);

const groundMaterial = new THREE.MeshStandardMaterial({
    color:0x555555,
    side: THREE.DoubleSide
});

const groundMesh = new THREE.Mesh(groundGeometry,groundMaterial);
scene.add(groundMesh);

// Crie uma luz ambiente
const ambientLight = new THREE.AmbientLight(0x404040); // Cor da luz ambiente
scene.add(ambientLight);

//light
const spotLight = new THREE.SpotLight(0xffffff,3,100,0.2,0.5);
spotLight.position.set(0,25,0);
scene.add(spotLight);

//glts
const loader = new GLTFLoader().setPath('Butter_Robo');
loader.load('scene.gltf',(gltf) =>{
    const mesh = gltf.scene;
    mesh.position.set(0,1.05,-1);
    scene.add(mesh);
});

// Animação
const animate = () => {
    requestAnimationFrame(animate);

    // Rotação simples do cubo
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

// Chamada para iniciar a animação
animate();
