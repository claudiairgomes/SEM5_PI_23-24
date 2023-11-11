import * as THREE from "three";
import { OBB } from "three/addons/math/OBB.js";
import { merge } from "./merge.js";
import Ground from "./ground.js";
import Wall from "./wall.js";

export default class Mapa extends THREE.Group {
    constructor(generalParameters, audioParameters, cubeTexturesParameters, mazeParameters, playerParameters, ambientLightParameters, directionalLightParameters, spotLightParameters, flashLightParameters, shadowsParameters, fogParameters, collisionDetectionParameters, fixedViewCameraParameters, firstPersonViewCameraParameters, thirdPersonViewCameraParameters, topViewCameraParameters, miniMapCameraParameters) {
        this.generalParameters = merge({}, generalData, generalParameters);
        this.audioParameters = merge({}, audioData, audioParameters);
        this.cubeTexturesParameters = merge({}, cubeTextureData, cubeTexturesParameters);
        this.mazeParameters = merge({}, mazeData, mazeParameters);
        this.playerParameters = merge({}, playerData, playerParameters);
        this.ambientLightParameters = merge({}, ambientLightData, ambientLightParameters);
        this.directionalLightParameters = merge({}, directionalLightData, directionalLightParameters);
        this.spotLightParameters = merge({}, spotLightData, spotLightParameters);
        this.flashLightParameters = merge({}, flashLightData, flashLightParameters);
        this.shadowsParameters = merge({}, shadowsData, shadowsParameters);
        this.fogParameters = merge({}, fogData, fogParameters);
        this.collisionDetectionParameters = merge({}, collisionDetectionData, collisionDetectionParameters);
        this.fixedViewCameraParameters = merge({}, cameraData, fixedViewCameraParameters);
        this.firstPersonViewCameraParameters = merge({}, cameraData, firstPersonViewCameraParameters);
        this.thirdPersonViewCameraParameters = merge({}, cameraData, thirdPersonViewCameraParameters);
        this.topViewCameraParameters = merge({}, cameraData, topViewCameraParameters);
        this.miniMapCameraParameters = merge({}, cameraData, miniMapCameraParameters);

        // Set the game state
        this.gameRunning = false;

        // Create the audio listener, the audio sources and load the sound clips
        this.audio = new Audio(this.audioParameters);

        // Create two 2D scenes (the viewports' background and frame)
        this.background = new THREE.Scene();
        this.frame = new THREE.Scene();

        // Create the background (a square)
        const geometry = new THREE.PlaneGeometry(1.0, 1.0);
        let material = new THREE.MeshBasicMaterial();
        let square = new THREE.Mesh(geometry, material);
        square.position.set(0.5, 0.5, 0.0);
        this.background.add(square);

        // Create the frame (the edges of the same square)
        const edges = new THREE.EdgesGeometry(geometry);
        material = new THREE.LineBasicMaterial();
        square = new THREE.LineSegments(edges, material);
        square.position.set(0.5, 0.5, 0.0);
        this.frame.add(square);

        // Create the camera corresponding to the 2D scenes
        this.camera2D = new THREE.OrthographicCamera(0.0, 1.0, 1.0, 0.0, 0.0, 1.0);

        // Create a 3D scene (the game itself)
        this.scene = new THREE.Scene();

        // Create the cube texture
        this.cubeTexture = new CubeTexture(this.cubeTexturesParameters.skyboxes[this.cubeTexturesParameters.selected]);

        // Create the maze
        this.maze = new Maze(this.mazeParameters);

}
}