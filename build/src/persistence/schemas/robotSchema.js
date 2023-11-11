"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RobotSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    codRobot: {
        type: String,
        unique: true
    },
    nickname: {
        type: String,
        required: [true, 'Please enter robot nickname'],
        index: true,
    },
    type: {
        type: String,
        required: [true, 'Please select type'],
        index: true,
    },
    serialNumber: {
        type: String,
        lowercase: true,
        unique: true,
        index: true,
    },
    description: {
        type: String,
        required: [true, 'Please write description'],
        index: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('robot', RobotSchema);
//# sourceMappingURL=robotSchema.js.map