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
    app.use('/floors', route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.floor.name);
    route.post('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            buildingId: celebrate_1.Joi.string().required(),
            floorNumber: celebrate_1.Joi.number().required(),
            description: celebrate_1.Joi.string().required(),
        })
    }), (req, res, next) => ctrl.createFloor(req, res, next));
    route.put('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            buildingId: celebrate_1.Joi.string().required(),
            floorNumber: celebrate_1.Joi.number().required(),
            description: celebrate_1.Joi.string().required(),
        }),
    }), (req, res, next) => ctrl.updateFloor(req, res, next));
    route.patch('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            buildingId: celebrate_1.Joi.string(),
            floorNumber: celebrate_1.Joi.number(),
            description: celebrate_1.Joi.string(),
        }),
    }), (req, res, next) => ctrl.updateFloor(req, res, next));
};
//# sourceMappingURL=floorRoute.js.map