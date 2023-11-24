

import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import {mazeParameters,buildingA1Data,buildingA2Data } from "./default_data.js";
import Maze from "./maze.js";
import { merge } from "./merge.js";


export default class FloorInterface {
    constructor(scene,renderer,maze) {
        this.buildingA1parameters = merge({}, buildingA1Data, mazeParameters);
        this.buildingA2parameters = merge({}, buildingA2Data, mazeParameters);

        // GUI setup
        const gui = new GUI({ hideable: false });
        const buildingFolder = gui.addFolder('Buildings');
        let finalMaze= new Maze(buildingA1Data);

     
   

        //Create the building A folder
        const buildingA=buildingFolder.addFolder("Building A")


        // Add a button to change building parameters
        buildingA.add({ 'Floor 1': () => changeBuildingParameters(this.buildingA1parameters) }, 'Floor 1');
        buildingA.add({ 'Floor 2': () => changeBuildingParameters(this.buildingA2parameters) }, 'Floor 2');


         //Create the building B folder
         const buildingB=buildingFolder.addFolder("Building B")

         // Add a button to change building parameters
        buildingB.add({ 'Floor 1': () => changeBuildingParameters(/*vazio*/) }, 'Floor 1');
        buildingB.add({ 'Floor 2': () => changeBuildingParameters(/*vazio*/) }, 'Floor 2');


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
                scene.remove(finalMaze.object);
            }
    
            // Cria um novo labirinto
            finalMaze = new Maze(parameters);
    
            // Adiciona o novo labirinto à cena
            scene.add(finalMaze.object);
        }
    
        function getScene(){
            return scene;
        }


        function getMaze(){
            return finalMaze;
        }

       

    }

 
    


    }