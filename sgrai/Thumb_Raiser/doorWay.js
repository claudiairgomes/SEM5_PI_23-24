import * as THREE from "three";
import { merge } from "./merge.js";
import MultiTexturedMaterial from "./material.js";

export default class DoorWay extends THREE.Group {
    constructor(parameters) {
        super();
        merge(this, parameters);
        const halfGroundHeight = this.groundHeight / 2.0;

        // Create the materials
        const primaryMaterial = new MultiTexturedMaterial(this.materialParameters);
        const secondaryMaterial = new THREE.MeshStandardMaterial({ color: this.secondaryColor });

        // Create a doorway (seven faces) that casts and receives shadows

        // Create the front face (a rectangle)
        let geometry = new THREE.PlaneGeometry(0.95, 1.5 + this.groundHeight, 1, 1);
        let uv = geometry.getAttribute("uv");
        let uv1 = uv.clone();
        geometry.setAttribute("uv1", uv1);
        let face = new THREE.Mesh(geometry, primaryMaterial);
        face.position.set(0.0, -halfGroundHeight, 0.025);
        face.castShadow = true;
        face.receiveShadow = true;
        this.add(face);

        // Create the rear face (a rectangle)
        face = new THREE.Mesh().copy(face, false);
        face.rotation.y = Math.PI;
        face.position.set(0.0, -halfGroundHeight, -0.025);
        this.add(face);

        // Create the two left faces (a four-triangle mesh)
        let points = new Float32Array([
            -0.475, -0.25 - this.groundHeight, 0.025,
            -0.475, 0.75, 0.025,
            -0.5, 0.75, 0.0,
            -0.5, -0.25 - this.groundHeight, 0.0,

            -0.5, 0.75, 0.0,
            -0.475, 0.75, -0.025,
            -0.475, -0.25 - this.groundHeight, -0.025,
            -0.5, -0.25 - this.groundHeight, 0.0
        ]);

        let normals = new Float32Array([
            -0.707, 0.0, 0.707,
            -0.707, 0.0, 0.707,
            -0.707, 0.0, 0.707,
            -0.707, 0.0, 0.707,

            -0.707, 0.0, -0.707,
            -0.707, 0.0, -0.707,
            -0.707, 0.0, -0.707,
            -0.707, 0.0, -0.707
        ]);

        let indices = [
            0, 1, 2,
            2, 3, 0,
            4, 5, 6,
            6, 7, 4
        ];

        geometry = new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(points, 3));
        geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
        geometry.setIndex(indices);
        face = new THREE.Mesh(geometry, secondaryMaterial);
        face.castShadow = true;
        face.receiveShadow = true;
        this.add(face);

        // Create the two right faces (a four-triangle mesh)
        face = new THREE.Mesh().copy(face, false);
        face.rotation.y = Math.PI;
        this.add(face);

        // Create the top face (a four-triangle mesh)
        points = new Float32Array([
            -0.5, 0.75, 0.0,
            -0.475, 0.75, 0.025,
            -0.475, 0.75, -0.025,
            0.475, 0.75, 0.025,
            0.475, 0.75, -0.025,
            0.5, 0.75, 0.0
        ]);

        normals = new Float32Array([
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
        ]);

        indices = [
            0, 1, 2,
            2, 1, 3,
            3, 4, 2,
            4, 3, 5
        ];

        geometry = new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(points, 3));
        geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
        geometry.setIndex(indices);
        face = new THREE.Mesh(geometry, secondaryMaterial);
        face.castShadow = true;
        face.receiveShadow = true;
        this.add(face);
    }

    clone() {
        const doorWay = new DoorWay();
        this.children.forEach(mesh => {
            doorWay.add(mesh.clone());
        });
        return doorWay;
    }
}
