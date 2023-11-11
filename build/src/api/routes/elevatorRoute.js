"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../../config"));
const celebrate_1 = require("celebrate");
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/elevators', route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.elevator.name);
    route.post('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            building: celebrate_1.Joi.string().required(),
            floorList: celebrate_1.Joi.array().items(celebrate_1.Joi.string().required()).required(),
            //floorsIdList: Joi.array().items(Joi.object({id:Joi.string().required()})).required(),
            brand: celebrate_1.Joi.string().required(),
            model: celebrate_1.Joi.string().required(),
            serialNumber: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().optional()
        })
    }), (req, res, next) => ctrl.createElevator(req, res, next));
    route.put('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            elevatorDomainId: celebrate_1.Joi.string().required(),
            building: celebrate_1.Joi.string().required(),
            floorList: celebrate_1.Joi.array().items(celebrate_1.Joi.string()).required(),
            brand: celebrate_1.Joi.string().required(),
            model: celebrate_1.Joi.string().required(),
            serialNumber: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().optional()
        })
    }), (req, res, next) => ctrl.updateElevator(req, res, next));
    route.get('/findAll', (req, res, next) => ctrl.getElevators(req, res, next));
};
//# sourceMappingURL=elevatorRoute.js.map