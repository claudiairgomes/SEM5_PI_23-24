import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';

import {IBuildingDTO} from "../../dto/IBuildingDTO";
import IBuildingService from "../../services/IServices/IBuildingService";
import BuildingController from "../buildingController";
import {Result} from "../../core/logic/Result";


describe('building controller', function () {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    Container.reset();
    let buildingSchemaInstance = require("../src/persistence/schemas/buildingSchema").default;
    Container.set("buildingSchema", buildingSchemaInstance);

    let buildingRepoClass = require("../src/repos/buildingRepo").default;
    let buildingRepoInstance = Container.get(buildingRepoClass);
    Container.set("BuildingRepo", buildingRepoInstance);

    let buildingServiceClass = require("../src/services/buildingService").default;
    let buildingServiceInstance = Container.get(buildingServiceClass);
    Container.set("BuildingService", buildingServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('buildingController unit test using buildingService stub', async function () {
    // Arrange
    let body = {
      "id":"123",
      "name":"20x30",
      "description": "Eletro",
      "dimension":"321",
      "code":"123a"
    };
    let req: Partial<Request> = {};
    req.body = body;
    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {};

    let buildingServiceInstance = Container.get("BuildingService");
    sinon.stub(buildingServiceInstance, "createBuilding").returns(Result.ok<IBuildingDTO>({ "id": req.body.id, "name": req.body.name,"description": req.body.name,"dimension":req.body.dimension,"code":req.body.code }));

    const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

    // Act
    await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({ "id": req.body.id, "name": req.body.name,"description": req.body.name,"dimension":req.body.dimension,"code":req.body.code }));
  });

  // Add more test cases as needed
});
