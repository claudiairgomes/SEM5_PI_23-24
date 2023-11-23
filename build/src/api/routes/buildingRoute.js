"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../../config"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/buildings', route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.building.name);
    route.post('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            name: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            dimension: celebrate_1.Joi.string().required(),
            code: celebrate_1.Joi.string().required()
        })
    }), (req, res, next) => ctrl.createBuilding(req, res, next));
    route.put('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            name: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required(),
            dimension: celebrate_1.Joi.string().required(),
            code: celebrate_1.Joi.string().required()
        }),
    }), (req, res, next) => ctrl.updateBuilding(req, res, next));
    route.patch('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            name: celebrate_1.Joi.string(),
            description: celebrate_1.Joi.string(),
            dimension: celebrate_1.Joi.string(),
            code: celebrate_1.Joi.string()
        }),
    }), (req, res, next) => ctrl.updateBuilding(req, res, next));
    route.get('/findAll', (req, res, next) => ctrl.getBuildings(req, res, next));
    //  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, user_controller.getMe);
};
//# sourceMappingURL=buildingRoute.js.map
