import * as THREE from "three";

export default class DoorAnimations {
    constructor(door) {
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
            door.rotation.y += this.animationSpeed;
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
