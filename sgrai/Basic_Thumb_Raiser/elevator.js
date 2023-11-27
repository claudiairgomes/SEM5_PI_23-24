import * as THREE from "three";

/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3,
 * }
 */

export default class Elevator {

    constructor(parameters) {
        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }

        // Create a texture
        const texture = new THREE.TextureLoader().load(this.textureUrl);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;


         // Create a group of objects
         this.object = new THREE.Group();
         

        // Define the dimensions
        const width = 0.95;
        const height = 3;
        const depth = 0.075;

        // Create the four sides
        // const sideBoxGeometry = new THREE.PlaneGeometry(width, height);
        const topGeometry= new THREE.PlaneGeometry(width, width);
        const sideMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });

        const sideBoxGeometry= new THREE.BoxGeometry(width,height,depth);

        // Front side (without door)
        const frontGeometry = new THREE.BoxGeometry(width/2 , height,depth);
        const frontMaterial = new THREE.MeshStandardMaterial({ color: 0x606060 });
        this.front = new THREE.Mesh(frontGeometry, frontMaterial);
        this.front.position.x = width / 4;
        this.object.add(this.front);

        // Back side
        this.back = new THREE.Mesh(sideBoxGeometry, sideMaterial);
        this.back.rotation.y = Math.PI;
        this.back.position.z = -depth / 2;
        this.object.add(this.back);

        // Left side
        this.left = new THREE.Mesh(sideBoxGeometry, sideMaterial);
        this.left.rotation.y = -Math.PI / 2;
        this.left.position.x = -width / 2;
        this.left.position.z = -width/2;
        this.object.add(this.left);

        // Right side
        this.right = new THREE.Mesh(sideBoxGeometry, sideMaterial);
        this.right.rotation.y = Math.PI / 2;
        this.right.position.x = width / 2;
        this.right.position.z = -width/2;
        this.object.add(this.right);


        // Top side
        this.top = new THREE.Mesh(topGeometry, sideMaterial);
        this.top .rotation.x = -Math.PI / 2;
        this.top .position.y = height / 2;
        this.top .position.z= -width /2;
        this.object.add(this.top);



        // Left door
        this.leftDoor = new THREE.Mesh(frontGeometry, frontMaterial);
        this.leftDoor.position.x = (-width-0.05) / 4;
        this.leftDoor.position.z = -width-0.05;
        this.object.add(this.leftDoor);

        // Right door
        this.rightDoor = new THREE.Mesh(frontGeometry, frontMaterial);
        this.rightDoor.position.x = (width+0.05) / 4;
        this.rightDoor.position.z = -width-0.05;
        this.object.add(this.rightDoor);
    }

    openDoors() {
        this.leftDoor.position.x -= this.width / 4;
        this.rightDoor.position.x += this.width / 4;
    }

    closeDoors() {
        this.leftDoor.position.x += this.width / 4;
        this.rightDoor.position.x -= this.width / 4;
    }

    getMesh() {
        return this.object;
    }

}
    