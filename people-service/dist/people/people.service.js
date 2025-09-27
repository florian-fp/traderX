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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let PeopleService = class PeopleService {
    constructor() {
        this.people = [];
        this.cache = new Map();
        this.CACHE_DURATION = 60 * 1000;
        this.loadPeopleData();
    }
    loadPeopleData() {
        try {
            const dataPath = path.join(__dirname, '../../data/people.json');
            const rawData = fs.readFileSync(dataPath, 'utf8');
            this.people = JSON.parse(rawData);
        }
        catch (error) {
            console.error('Error loading people data:', error);
            this.people = [];
        }
    }
    async getPerson(logonId, employeeId) {
        if (!logonId && !employeeId) {
            return null;
        }
        if (logonId) {
            return this.people.find(p => p.logonId === logonId) || null;
        }
        return this.people.find(p => p.employeeId === employeeId) || null;
    }
    async getMatchingPeople(searchText, take = 10) {
        if (!searchText) {
            return [];
        }
        const cacheKey = `${searchText},${take}`;
        const cached = this.cache.get(cacheKey);
        if (cached && cached.expiry > Date.now()) {
            return cached.value.people;
        }
        const matchingPeople = this.people
            .filter(p => p.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
            p.logonId.toLowerCase().includes(searchText.toLowerCase()))
            .slice(0, take);
        this.cache.set(cacheKey, {
            value: { people: matchingPeople },
            expiry: Date.now() + this.CACHE_DURATION
        });
        return matchingPeople;
    }
    async validatePerson(logonId, employeeId) {
        const person = await this.getPerson(logonId, employeeId);
        return person !== null;
    }
};
exports.PeopleService = PeopleService;
exports.PeopleService = PeopleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PeopleService);
//# sourceMappingURL=people.service.js.map