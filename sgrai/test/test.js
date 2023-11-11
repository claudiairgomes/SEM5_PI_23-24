import * as THREE from "three";

export default class Cube extends THREE.Group {
    

    // Defina as dimensões do paralelepípedo
const width = 1;
const height = 1;
const depth = 1;

// Crie a geometria do paralelepípedo
const geometry = new THREE.BoxGeometry(width, height, depth);

// Remova a face desejada (por exemplo, a face frontal)
geometry.faces.splice(4, 2); // Isso remove os triângulos que formam a face frontal

// Crie um material para o paralelepípedo
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Crie a malha (Mesh) do paralelepípedo
const parallelepiped = new THREE.Mesh(geometry, material);

// Adicione a malha à cena ou ao objeto desejado
scene.add(parallelepiped);

}