import * as THREE from "three";
import { merge } from "./merge.js";
import MultiTexturedMaterial from "./material.js";

/*
 * parameters = {
 *  size: Vector3,
 *  segments: Vector3,
 *  materialParameters: {
 *   color: Color,
 *   mapUrl: String,
 *   aoMapUrl: String,
 *   aoMapIntensity: Float,
 *   displacementMapUrl: String,
 *   displacementScale: Float,
 *   displacementBias: Float,
 *   normalMapUrl: String,
 *   normalMapType: Integer,
 *   normalScale: Vector2,
 *   bumpMapUrl: String,
 *   bumpScale: Float,
 *   roughnessMapUrl: String,
 *   roughness: Float,
 *   wrapS: Integer,
 *   wrapT: Integer,
 *   repeat: Vector2,
 *   magFilter: Integer,
 *   minFilter: Integer
 *  },
 *  secondaryColor: Color
 * }
 */

export default class Roof extends THREE.Mesh {
    constructor(parameters) {
        super();
        merge(this, parameters);

        // Create the materials
        const primaryMaterial = new MultiTexturedMaterial(this.materialParameters);
        const secondaryMaterial = new THREE.MeshStandardMaterial({ color: this.secondaryColor });

        // Create a roof box
        this.geometry = new THREE.BoxGeometry(this.size.x, this.size.y, this.size.z, this.segments.x, this.segments.y, this.segments.z);
        this.material = [
            secondaryMaterial, // Positive X
            secondaryMaterial, // Negative X
            primaryMaterial,   // Positive Y (roof)
            secondaryMaterial, // Negative Y
            secondaryMaterial, // Positive Z
            secondaryMaterial  // Negative Z
        ];
        this.position.set(0.0, this.size.y / 2.0, 0.0); // Adjusted for roof positioning
        this.castShadow = true;  // Assuming you want the roof to cast shadows
        this.receiveShadow = false;
    }
}
