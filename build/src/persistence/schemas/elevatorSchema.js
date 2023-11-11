"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ElevatorSchema = new mongoose_1.default.Schema({
    domainId: { type: String, unique: true },
    building: {
        type: String //Building
        ,
        required: [true, 'Please enter building id'],
        //index: true,
    },
    floorsList: {
        type: Array(),
        required: [true, 'Please enter floor ids']
    },
    brand: {
        type: String,
        required: [true, 'Please enter brand'],
    },
    model: {
        type: String,
        required: [true, 'Please enter model'],
    },
    serialNumber: {
        type: String,
        required: [true, 'Please enter serial number'],
    },
    description: {
        type: String,
        required: [false, 'Please enter description (optional)'],
    },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Elevator', ElevatorSchema);
//# sourceMappingURL=elevatorSchema.js.map