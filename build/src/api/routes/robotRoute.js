"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../../config"));
//var user_controller = require('../../controllers/userController');
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/robot', route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.robot.name);
    route.post('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            codRobot: celebrate_1.Joi.string().required(),
            nickname: celebrate_1.Joi.string().required(),
            type: celebrate_1.Joi.string().required(),
            serialNumber: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required()
        }),
    }), (req, res, next) => ctrl.createRobot(req, res, next));
    route.put('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            codRobot: celebrate_1.Joi.string().required(),
            nickName: celebrate_1.Joi.string().required(),
            type: celebrate_1.Joi.string().required(),
            serialNumber: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().optional(),
        }),
    }), (req, res, next) => ctrl.updateRobot(req, res, next));
    route.patch('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            codRobot: celebrate_1.Joi.string(),
            nickName: celebrate_1.Joi.string(),
            type: celebrate_1.Joi.string(),
            serialNumber: celebrate_1.Joi.string(),
            description: celebrate_1.Joi.string(),
        }),
    }), (req, res, next) => ctrl.updateRobot(req, res, next));
    route.get('', (req, res, next) => ctrl.getAllRobots(req, res, next));
    route.get('/id', (req, res, next) => ctrl.getRobotById(req, res, next));
};
//# sourceMappingURL=robotRoute.js.map
