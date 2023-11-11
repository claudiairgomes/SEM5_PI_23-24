"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BuildingSchema = new mongoose_1.default.Schema({
    domainId: { type: String, unique: true },
    name: {
        type: String,
        required: [true, 'Please enter building name'],
        //index: true,
    },
    description: {
        type: String,
        required: [false, 'Enter description (optional)'],
        //index: true,
    },
    dimension: {
        type: String,
        required: [true, 'Please enter building dimension'],
        //index: true,
    },
    code: {
        type: String,
        required: [true, 'Please enter building code'],
        //index: true,
    },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Building', BuildingSchema);
//# sourceMappingURL=buildingSchema.js.map