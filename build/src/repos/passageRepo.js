"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const mongoose_1 = require("mongoose");
const floorId_1 = require("../domain/floorId");
const PassageMap_1 = require("../mappers/PassageMap");
let PassageRepo = class PassageRepo {
    constructor(passageSchema) {
        this.passageSchema = passageSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async findByDomainId(passageId) {
        const query = { domainId: passageId };
        const passageRecord = await this.passageSchema.findOne(query);
        if (passageRecord != null) {
            return PassageMap_1.PassageMap.toDomain(passageRecord);
        }
        else
            return null;
        -console.log("Passage doesn't exist");
    }
    async exists(passageId) {
        const idx = passageId instanceof floorId_1.FloorId ? passageId.id.toValue() : passageId;
        const query = { domainId: idx };
        const passageDocument = await this.passageSchema.findOne(query);
        return !!passageDocument === true;
    }
    async save(passage) {
        const query = { domainId: passage.id.toString() };
        const passageDocument = await this.passageSchema.findOne(query);
        try {
            if (passageDocument === null) {
                const rawPassage = PassageMap_1.PassageMap.toPersistence(passage);
                const passageCreated = await this.passageSchema.create(rawPassage);
                return PassageMap_1.PassageMap.toDomain(passageCreated);
            }
            else {
                passageDocument.name = passage.name;
                passageDocument.fromFloor = passage.fromFloor;
                passageDocument.toFloor = passage.toFloor;
                passageDocument.description = passage.description;
                await passageDocument.save();
                return passage;
            }
        }
        catch (err) {
            throw err;
        }
    }
};
PassageRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('passageSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PassageRepo);
exports.default = PassageRepo;
//# sourceMappingURL=passageRepo.js.map
