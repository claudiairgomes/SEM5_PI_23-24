"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const floorSchema = new mongoose_1.default.Schema({
    domainId: { type: String, unique: true },
    buildingId: {
        type: String,
        required: [true, 'Please enter building id'],
        index: true,
    },
    floorNumber: {
        type: Number,
        required: [true, 'Please enter floor number'],
    },
    description: {
        type: String,
        required: [false, 'Enter description (optional)'],
        index: true,
    },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('floor', floorSchema);
//# sourceMappingURL=floorSchema.js.map