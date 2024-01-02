import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import {mazeParameters,buildingA1Data,buildingA2Data,buildingB1Data,buildingB2Data,buildingB3Data, buildingC1Data, buildingC2Data, buildingC3Data, buildingC4Data, buildingD1Data, buildingD2Data, buildingD3Data} from "./default_data.js";
import Maze from "./maze.js";
import { merge } from "./merge.js";

export default class UserInteraction {
    constructor(scene, renderer, lights, finalMaze, thumbRaser) {

        this.buildingA1Parameters = merge({},buildingA1Data,mazeParameters);
        this.buildingA2Parameters = merge({},buildingA2Data,mazeParameters);
        this.buildingB1Parameters = merge({},buildingB1Data,mazeParameters);
        this.buildingB2Parameters = merge({},buildingB2Data,mazeParameters);
        this.buildingB3Parameters = merge({},buildingB3Data,mazeParameters);
        this.buildingC1Parameters = merge({},buildingC1Data,mazeParameters);
        this.buildingC2Parameters = merge({},buildingC2Data,mazeParameters);
        this.buildingC3Parameters = merge({},buildingC3Data,mazeParameters);
        this.buildingC4Parameters = merge({},buildingC4Data,mazeParameters);
        this.buildingD1Parameters = merge({},buildingD1Data,mazeParameters);
        this.buildingD2Parameters = merge({},buildingD2Data,mazeParameters);
        this.buildingD3Parameters = merge({},buildingD3Data,mazeParameters);

        this.floorParametersA = new Array();
        this.floorParametersA.push(this.buildingA1Parameters);
        this.floorParametersA.push(this.buildingA2Parameters);

        this.floorParametersB = new Array();
        this.floorParametersB.push(this.buildingB1Parameters);
        this.floorParametersB.push(this.buildingB2Parameters);
        this.floorParametersB.push(this.buildingB3Parameters);

        this.floorParametersC = new Array();
        this.floorParametersC.push(this.buildingC1Parameters);
        this.floorParametersC.push(this.buildingC2Parameters);
        this.floorParametersC.push(this.buildingC3Parameters);
        this.floorParametersC.push(this.buildingC4Parameters);

        this.floorParametersC.push(this.buildingC333Parameters);

        this.floorParametersD = new Array();
        this.floorParametersD.push(this.buildingD1Parameters);
        this.floorParametersD.push(this.buildingD2Parameters);
        this.floorParametersD.push(this.buildingD3Parameters);

        this.thumbRaser = thumbRaser;
        this.scene = scene;
        this.finalMaze = finalMaze;

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

        // Create the graphical user interface
        this.gui = new GUI({ hideable: false });
        const buildingFolder = this.gui.addFolder('Buildings');

        //Create the building A folder
        const buildingA=buildingFolder.addFolder("Building A")

        // Add a button to change building parameters
        buildingA.add({ 'Floor 1': () => changeBuildingParameters(this.buildingA1Parameters) }, 'Floor 1');
        buildingA.add({ 'Floor 2': () => changeBuildingParameters(this.buildingA2Parameters) }, 'Floor 2');


         //Create the building B folder
         const buildingB=buildingFolder.addFolder("Building B")

         // Add a button to change building parameters
        buildingB.add({ 'Floor 1': () => changeBuildingParameters(this.buildingB1Parameters) }, 'Floor 1');
        buildingB.add({ 'Floor 2': () => changeBuildingParameters(this.buildingB2Parameters) }, 'Floor 2');
        buildingB.add({ 'Floor 3': () => changeBuildingParameters(this.buildingB3Parameters) }, 'Floor 3');


        //Create the building C folder
        const buildingC=buildingFolder.addFolder("Building C")

        // Add a button to change building parameters
        buildingC.add({ 'Floor 1': () => changeBuildingParameters(this.buildingC1Parameters) }, 'Floor 1');
        buildingC.add({ 'Floor 2': () => changeBuildingParameters(this.buildingC2Parameters) }, 'Floor 2');
        buildingC.add({ 'Floor 3': () => changeBuildingParameters(this.buildingC3Parameters) }, 'Floor 3');
        buildingC.add({ 'Floor 4': () => changeBuildingParameters(this.buildingC4Parameters) }, 'Floor 4');


        //Create the building D folder
        const buildingD=buildingFolder.addFolder("Building D")

        // Add a button to change building parameters
        buildingD.add({ 'Floor 1': () => changeBuildingParameters(this.buildingD1Parameters) }, 'Floor 1');
        buildingD.add({ 'Floor 2': () => changeBuildingParameters(this.buildingD2Parameters) }, 'Floor 2');
        buildingD.add({ 'Floor 3': () => changeBuildingParameters(this.buildingD3Parameters) }, 'Floor 3');


        function changeBuildingParameters(parameters){
            if (parameters) {
                console.log("New Floor:")
                console.log(parameters);
                // Cria um novo edifício com base nos parâmetros fornecidos
                createMaze(parameters);
            }
        }

        function createMaze(parameters) {
            // Remove o labirinto atual da cena se houver um
            if (finalMaze) {
                console.log("tr.doors");
                console.log(thumbRaser.maze.doors);
                for(let i=0; i< thumbRaser.maze.doors.length; i++){
                    scene.remove(thumbRaser.maze.doors[i].object);
                }

                scene.remove(thumbRaser.maze.object);

                thumbRaser.gameRunning=false;
                scene.remove(thumbRaser.gui);

            }

            // Cria um novo edifício
            finalMaze = new Maze(parameters,thumbRaser.doorParameters,0);
            finalMaze.scale= thumbRaser.maze.scale
            thumbRaser.maze= finalMaze;
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
    }


    selectFloor(numFloors, currentBuilding, playerPosition) {
        // Remove todos os elementos com a classe 'floorSelectionRect'
        const existingRects = document.querySelectorAll('.floorSelectionRect');
        existingRects.forEach(rect => rect.parentNode.removeChild(rect));

        // Remove a sobreposição
        const existingOverlay = document.querySelector('.overlay');
        if (existingOverlay) {
            existingOverlay.parentNode.removeChild(existingOverlay);
        }

        // Cria um elemento de sobreposição para cobrir a página
        const overlay = document.createElement('div');
        overlay.classList.add('overlay'); // Adicionar a classe 'overlay'
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0, 0, 0, 0.0)'; // Cor de fundo com transparência para um efeito de sobreposição
        overlay.style.backdropFilter = 'blur(10px)'; 
        document.body.appendChild(overlay);

        // Calcula a altura do retângulo com base no número de botões
        const rectHeight = 20 + numFloors * 60;

        // Cria um retângulo para a seleção do piso
        const floorSelectionRect = document.createElement('div');
        floorSelectionRect.classList.add('floorSelectionRect'); // Adiciona a classe 'floorSelectionRect'
        floorSelectionRect.style.width = '300px'; // Largura
        floorSelectionRect.style.height = `${rectHeight}px`; // Altura proporcional aos botões
        floorSelectionRect.style.backgroundColor = '#808080'; // Cor cinza
        floorSelectionRect.style.position = 'absolute';
        floorSelectionRect.style.top = '50%'; // Centra verticalmente
        floorSelectionRect.style.left = '50%'; // Centra horizontalmente
        floorSelectionRect.style.transform = 'translate(-50%, -50%)'; // Centra corretamente
        floorSelectionRect.style.cursor = 'pointer';
        floorSelectionRect.style.display = 'flex'; // Organiza os botões
        floorSelectionRect.style.flexDirection = 'column'; // Dispõem os botões verticalmente
        floorSelectionRect.style.alignItems = 'center'; // Centra os botões horizontalmente
        floorSelectionRect.style.textAlign = 'center'; // Centra o texto

        // Adicionar um parágrafo para a frase informativa
        const floorSelectionText = document.createElement('p');
        floorSelectionText.innerText = 'Escolha o piso que quer aceder';
        floorSelectionText.style.fontSize = '20px'; // Tamanho da fonte
        floorSelectionText.style.marginBottom = '10px'; // Margem
        floorSelectionRect.appendChild(floorSelectionText);

        for (let i = 1; i <= numFloors; i++) {
            const floorButton = document.createElement('button');
            floorButton.innerText = 'Piso ' + i;
            floorButton.addEventListener('click', () => {
                console.log("BOTÃO ELEVADOR")
                this.changeFloor(i, currentBuilding, playerPosition);
                document.body.removeChild(floorSelectionRect); // Remove o retângulo de seleção ao clicar num botão de piso
                document.body.removeChild(overlay); // Remove a sobreposição ao clicar num botão de piso
            });
            floorButton.style.fontSize = '16px'; // Tamanho da fonte
            floorButton.style.padding = '10px 80px'; // Preenchimento
            floorSelectionRect.appendChild(floorButton);
        }

        // Adiciona o retângulo à página
        document.body.appendChild(floorSelectionRect);
    }

    selectPassageWay(floorNumber, building, playerPosition) {
        // Remover todos os retângulos existentes
        const existingRects = document.querySelectorAll('.floorSelectionRect');
        existingRects.forEach(rect => rect.parentNode.removeChild(rect));
    
        // Remover a sobreposição
        const existingOverlay = document.querySelector('.overlay');
        if (existingOverlay) {
            existingOverlay.parentNode.removeChild(existingOverlay);
        }
    
        // Criar um elemento de sobreposição para cobrir a página
        const overlay = document.createElement('div');
        overlay.classList.add('overlay'); // Adicionar a classe 'overlay'
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0, 0, 0, 0.0)'; // Cor de fundo com transparência para um efeito de sobreposição
        overlay.style.backdropFilter = 'blur(10px)'; 
        document.body.appendChild(overlay);
    
        // Cria um retângulo 
        const floorSelectionRect = document.createElement('div');
        floorSelectionRect.classList.add('floorSelectionRect'); // Adiciona a classe 'floorSelectionRect'
        floorSelectionRect.style.width = '400px'; // Largura
        floorSelectionRect.style.height = '100px'; // Altura
        floorSelectionRect.style.backgroundColor = '#808080'; // Cor cinza
        floorSelectionRect.style.position = 'absolute';
        floorSelectionRect.style.top = '50%'; // Centra verticalmente
        floorSelectionRect.style.left = '50%'; // Centra horizontalmente
        floorSelectionRect.style.transform = 'translate(-50%, -50%)'; // Centra corretamente
        floorSelectionRect.style.cursor = 'pointer';
        floorSelectionRect.style.display = 'flex'; // Organiza os elementos
        floorSelectionRect.style.flexDirection = 'column'; // Dispõe os elementos verticalmente
        floorSelectionRect.style.alignItems = 'center'; // Centra os elementos horizontalmente
        floorSelectionRect.style.textAlign = 'center'; // Centra o texto
    
        // Adiciona um parágrafo para a frase informativa
        const floorSelectionText = document.createElement('p');
        floorSelectionText.innerText = 'Corredor de passagem para o piso ' + floorNumber + ' do edifício ' + building;
        floorSelectionText.style.fontSize = '20px'; // Tamanho da fonte
        floorSelectionText.style.marginBottom = '10px'; // Margem
        floorSelectionRect.appendChild(floorSelectionText);
    
        // Adiciona o botão "Ok"
        const okButton = document.createElement('button');
        okButton.innerText = 'Ok';
        okButton.style.fontSize = '16px'; // Tamanho da fonte
        okButton.style.padding = '10px 80px'; // Preenchimento
        okButton.style.backgroundColor = '#ffffff'; // Cor branca
        okButton.style.cursor = 'pointer';

        // Adiciona um ouvinte de evento de clique diretamente ao botão
        okButton.addEventListener('click', () => {
            this.changeFloor(floorNumber, building, playerPosition);
            document.body.removeChild(floorSelectionRect); // Remove o retângulo ao clicar no botão
            document.body.removeChild(overlay); // Remove a sobreposição ao clicar no botão
        });

        floorSelectionRect.appendChild(okButton);
    
        // Adiciona o retângulo à página
        document.body.appendChild(floorSelectionRect);
    }

     
    // Função para alterar o piso 
    changeFloor(floorNumber, currentBuilding, playerPosition) {

        console.log("CHANGE FLOORS - CURRENT BUILDING");
        console.log(currentBuilding);

        switch (currentBuilding) {
            case 'A':
                console.log("BUILDING A");
                console.log(floorNumber);
                this.handleFloors(floorNumber, this.floorParametersA, playerPosition);
                break;
            case 'B':
                console.log("BUILDING B");
                console.log(floorNumber);
                this.handleFloors(floorNumber, this.floorParametersB, playerPosition);
                break;
            case 'C':
                console.log("BUILDING C");
                console.log(floorNumber);
                this.handleFloors(floorNumber, this.floorParametersC, playerPosition);
                break;
            case 'D':
                console.log("BUILDING D");
                console.log(floorNumber);
                this.handleFloors(floorNumber, this.floorParametersD, playerPosition);
                break;
            default:
                console.error('Edifício não suportado:', currentBuilding);
                break;
        }

        //alert('Piso ' + floorNumber + ' selecionado do edifício ' + currentBuilding);
    }

    handleFloors(selectFloor, floorParameters, playerPosition){
        console.log("HANDLE FLOORS - SELECT FLOOR");
        console.log(selectFloor);

        switch (selectFloor) {
            case 1:
                console.log("FLOOR 1");
                console.log(floorParameters[0]);
                this.changeBuildingParameters(floorParameters[0], playerPosition);
                break;
            case 2:
                console.log("FLOOR 2");
                console.log(floorParameters[1]);
                this.changeBuildingParameters(floorParameters[1], playerPosition);
                break;
            case 3:
                console.log("FLOOR 3");
                console.log(floorParameters[2]);
                this.changeBuildingParameters(floorParameters[2], playerPosition);
                break;
            case 4:
                console.log("FLOOR 4");
                console.log(floorParameters[3]);
                this.changeBuildingParameters(floorParameters[3], playerPosition);
                break;
            default:
                console.error('Floor não existe:', selectFloor);
                break;
        }
    }

    changeBuildingParameters(parameters, playerPosition) {
        if (parameters) {
            console.log("New Floor:")
            console.log(parameters);
            // Cria um novo edifício com base nos parâmetros fornecidos
            this.createMaze(parameters, playerPosition);
        }
    }

    createMaze(parameters, playerPosition) {
        // Remove o labirinto atual da cena se houver um
        if (this.finalMaze) {
            for(let i=0; i< this.thumbRaser.maze.doors.length; i++){
                this.scene.remove(this.thumbRaser.maze.doors[i].object);
            }

            this.scene.remove(this.thumbRaser.maze.object);

            this.thumbRaser.gameRunning=false;
            this.scene.remove(this.thumbRaser.gui);
        }

        // Cria um novo edifício
        this.finalMaze = new Maze(parameters, this.thumbRaser.doorParameters, playerPosition);
        this.finalMaze.scale = this.thumbRaser.maze.scale;
        this.thumbRaser.maze = this.finalMaze;

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

