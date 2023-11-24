import * as THREE from "three";

/*
 * parameters = {
 *  textureUrl: String
 * }
 */

export default class Door {
    constructor(parameters) {
        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }

        // Create a texture
        const texture = new THREE.TextureLoader().load(this.textureUrl);
        let material = new THREE.MeshPhongMaterial({ color: 0xffffffa, map: texture });
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // Create a door (seven faces) that casts and receives shadows

        // Create a group of objects
        this.object = new THREE.Group();

         // Create the front face (a rectangle)
         let geometry = new THREE.BoxGeometry(1, 2.0, 0.05);

         this.door = new THREE.Mesh(geometry, material);

         this.object.add(this.door);


            // Animation parameters
            this.animationSpeed = 0.01;
            this.opening = false;
            this.closing = false;
    
    }


    openDoor() {
        this.opening = true;
        this.closing = false;
        this.animateDoor();
    }

    closeDoor() {
        this.opening = false;
        this.closing = true;
        this.animateDoor
    }

    animateDoor() {
        if (this.opening) {
            this.door.rotation.y += this.animationSpeed;
            this.rightDoor.rotation.y -= this.animationSpeed;

            // Check if walls are fully opened
            if (this.door.rotation.y >= Math.PI / 2) {
                this.door.rotation.y = Math.PI / 2;
                this.opening = false;
            }
        } else if (this.closing) {
            this.door.rotation.y -= this.animationSpeed;
            

            // Check if walls are fully closed
            if (this.door.rotation.y <= 0) {
                this.door.rotation.y = 0;
                this.closing = false;
            }
        }

        
    }


}