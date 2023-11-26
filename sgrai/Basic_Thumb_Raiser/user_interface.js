import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import {mazeParameters,buildingA1Data,buildingA2Data,buildingB1Data,buildingB2Data,buildingB3Data } from "./default_data.js";
import Maze from "./maze.js";
import { merge } from "./merge.js";

export default class UserInteraction {
    constructor(scene, renderer, lights, fog, object, animations,finalMaze,thumbRaser) {

        this.buildingA1parameters = merge({}, buildingA1Data, mazeParameters);
        this.buildingA2parameters = merge({}, buildingA2Data, mazeParameters);
        this.buildingB1Parameters =merge({},buildingB1Data,mazeParameters);
        this.buildingB2Parameters =merge({},buildingB2Data,mazeParameters);
        this.buildingB3Parameters =merge({},buildingB3Data,mazeParameters);
        //thumbRaser.gameRunning=false;

        function colorCallback(object, color) {
            object.color.set(color);
        }

        function shadowsCallback(enabled) {
            scene.traverseVisible(function (child) { // Modifying the scene graph inside the callback is discouraged: https://threejs.org/docs/index.html?q=object3d#api/en/core/Object3D.traverseVisible
                if (child.material) {
                    child.material.needsUpdate = true;
                }
            });
        }

        function createEmoteCallback(animations, name) {
            callbacks[name] = function () {
                animations.fadeToAction(name, 0.2);
            };
            emotesFolder.add(callbacks, name);

        }


        // Create the graphical user interface
        this.gui = new GUI({ hideable: false });
        const buildingFolder = this.gui.addFolder('Buildings');
        //let finalMaze= new Maze(buildingA1Data);

                //Create the building A folder
                const buildingA=buildingFolder.addFolder("Building A")


                // Add a button to change building parameters
                buildingA.add({ 'Floor 1': () => changeBuildingParameters(this.buildingA1parameters) }, 'Floor 1');
                buildingA.add({ 'Floor 2': () => changeBuildingParameters(this.buildingA2parameters) }, 'Floor 2');


                 //Create the building B folder
                 const buildingB=buildingFolder.addFolder("Building B")

                 // Add a button to change building parameters
                buildingB.add({ 'Floor 1': () => changeBuildingParameters(this.buildingB1Parameters) }, 'Floor 1');
                buildingB.add({ 'Floor 2': () => changeBuildingParameters(this.buildingB2Parameters) }, 'Floor 2');
                buildingB.add({ 'Floor 3': () => changeBuildingParameters(this.buildingB3Parameters) }, 'Floor 3');


                function changeBuildingParameters(parameters){
                    if (parameters) {
                        console.log("New Floor:")
                        console.log(parameters);
                        // Cria um novo labirinto com base nos parâmetros fornecidos
                        createMaze(parameters);
                    }
                }

                function createMaze(parameters) {
                    // Remove o labirinto atual da cena se houver um
                    if (finalMaze) {
                        scene.remove(thumbRaser.maze.object);
                        thumbRaser.gameRunning=false;
                        scene.remove(thumbRaser.gui);
                    }

                    // Cria um novo labirinto
                    finalMaze = new Maze(parameters);
                    finalMaze.scale= thumbRaser.maze.scale
                    thumbRaser.maze= finalMaze;

                    // Adiciona o novo labirinto à cena
                    //scene.add(finalMaze);
                }




        // Create the lights folder
        const lightsFolder = this.gui.addFolder("Lights");

        // Create the ambient light folder
        const ambientLightFolder = lightsFolder.addFolder("Ambient light");
        const ambientLight = lights.object.ambientLight;
        const ambientColor = { color: "#" + new THREE.Color(ambientLight.color).getHexString() };
        ambientLightFolder.addColor(ambientColor, "color").onChange(color => colorCallback(ambientLight, color));
        ambientLightFolder.add(lights.object.ambientLight, "intensity", 0.0, 1.0, 0.01);

        // Create point light #1 folder
        const pointLight1Folder = lightsFolder.addFolder("Point light #1");
        const pointLight1 = lights.object.pointLight1;
        const pointColor1 = { color: "#" + new THREE.Color(pointLight1.color).getHexString() };
        pointLight1Folder.addColor(pointColor1, "color").onChange(color => colorCallback(pointLight1, color));
        pointLight1Folder.add(lights.object.pointLight1, "intensity", 0.0, 100.0, 1.0);
        pointLight1Folder.add(lights.object.pointLight1, "distance", 0.0, 20.0, 0.01);
        pointLight1Folder.add(lights.object.pointLight1.position, "x", -10.0, 10.0, 0.01);
        pointLight1Folder.add(lights.object.pointLight1.position, "y", 0.0, 20.0, 0.01);
        pointLight1Folder.add(lights.object.pointLight1.position, "z", -10.0, 10.0, 0.01);

        // Create point light #2 folder
        const pointLight2Folder = lightsFolder.addFolder("Point light #2");
        const pointLight2 = lights.object.pointLight2;
        const pointColor2 = { color: "#" + new THREE.Color(pointLight2.color).getHexString() };
        pointLight2Folder.addColor(pointColor2, "color").onChange(color => colorCallback(pointLight2, color));
        pointLight2Folder.add(lights.object.pointLight2, "intensity", 0.0, 100.0, 1.0);
        pointLight2Folder.add(lights.object.pointLight2, "distance", 0.0, 20.0, 0.01);
        pointLight2Folder.add(lights.object.pointLight2.position, "x", -10.0, 10.0, 0.01);
        pointLight2Folder.add(lights.object.pointLight2.position, "y", 0.0, 20.0, 0.01);
        pointLight2Folder.add(lights.object.pointLight2.position, "z", -10.0, 10.0, 0.01);

        // Create the shadows folder
        const shadowsFolder = this.gui.addFolder("Shadows");
        shadowsFolder.add(renderer.shadowMap, "enabled").onChange(enabled => shadowsCallback(enabled));

        // Create the fog folder
        const fogFolder = this.gui.addFolder("Fog");
        const fogColor = { color: "#" + new THREE.Color(fog.color).getHexString() };
        fogFolder.add(fog, "enabled").listen();
        fogFolder.addColor(fogColor, "color").onChange(color => colorCallback(fog.object, color));
        fogFolder.add(fog.object, "near", 0.01, 1.0, 0.01);
        fogFolder.add(fog.object, "far", 1.01, 20.0, 0.01);

        // Create the character folder
        const characterFolder = this.gui.addFolder("Character");

        // Create the emotes folder and add emotes
        const emotesFolder = characterFolder.addFolder("Emotes");
        const callbacks = [];
        for (let i = 0; i < animations.emotes.length; i++) {
            createEmoteCallback(animations, animations.emotes[i]);
        }

        // Create the expressions folder and add expressions
        const expressionsFolder = characterFolder.addFolder("Expressions");
        const face = object.getObjectByName("Head_4");
        const expressions = Object.keys(face.morphTargetDictionary);
        for (let i = 0; i < expressions.length; i++) {
            expressionsFolder.add(face.morphTargetInfluences, i, 0.0, 1.0, 0.01).name(expressions[i]);
        }
    }

    setVisibility(visible) {
        if (visible) {
            this.gui.show();
        }
        else {
            this.gui.hide();
        }
    }




}
