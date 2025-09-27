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
exports.PeopleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const people_service_1 = require("./people.service");
let PeopleController = class PeopleController {
    constructor(peopleService) {
        this.peopleService = peopleService;
    }
    async getPerson(logonId, employeeId) {
        if (!logonId && !employeeId) {
            throw new common_1.BadRequestException('Either LogonId or EmployeeId must be provided');
        }
        console.log(`PeopleService.GetPerson called with LogonId: ${logonId}, EmployeeId: ${employeeId}`);
        const person = await this.peopleService.getPerson(logonId, employeeId);
        if (!person) {
            console.warn(`Person not found with LogonId: ${logonId}, EmployeeId: ${employeeId}.`);
            throw new common_1.NotFoundException();
        }
        console.log(`Person found with LogonId: ${logonId}, EmployeeId: ${employeeId}.`);
        return person;
    }
    async getMatchingPeople(searchText, take) {
        if (!searchText) {
            throw new common_1.BadRequestException('SearchText must be provided');
        }
        if (searchText.length < 3) {
            throw new common_1.BadRequestException('SearchText must be at least 3 characters long');
        }
        console.log(`PeopleService.GetMatchingPeople called with searchtext: ${searchText}`);
        const people = await this.peopleService.getMatchingPeople(searchText, take || 10);
        if (people.length === 0) {
            console.warn(`People do not exist with searchtext: ${searchText}.`);
            throw new common_1.NotFoundException();
        }
        console.log(`People found when using searchtext: ${searchText}.`);
        return people;
    }
    async validatePerson(logonId, employeeId) {
        if (!logonId && !employeeId) {
            throw new common_1.BadRequestException('Either LogonId or EmployeeId must be provided');
        }
        console.log(`PeopleService.ValidatePerson called with LogonId: ${logonId}, EmployeeId: ${employeeId}`);
        const isValid = await this.peopleService.validatePerson(logonId, employeeId);
        if (!isValid) {
            console.warn(`Person does not exist with LogonId: ${logonId}, EmployeeId: ${employeeId}.`);
            throw new common_1.NotFoundException();
        }
        console.log(`Valid person with LogonId: ${logonId}, EmployeeId: ${employeeId}.`);
    }
};
exports.PeopleController = PeopleController;
__decorate([
    (0, common_1.Get)('GetPerson'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a person from directory by logon or employee ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The person with the specified identity was found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'The request was invalid' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'The person with the specified identity was not found' }),
    (0, swagger_1.ApiQuery)({ name: 'LogonId', required: false, description: 'Logon (user name)' }),
    (0, swagger_1.ApiQuery)({ name: 'EmployeeId', required: false, description: 'Employee ID (MSID)' }),
    __param(0, (0, common_1.Query)('LogonId')),
    __param(1, (0, common_1.Query)('EmployeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PeopleController.prototype, "getPerson", null);
__decorate([
    (0, common_1.Get)('GetMatchingPeople'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all the people from the directory whose logonId or full name contain the search text' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of People whose LogonId or FullName contain the search text' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'The request was invalid' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'People with the specified search text were not found' }),
    (0, swagger_1.ApiQuery)({ name: 'SearchText', required: true, description: 'Search text to match against logonId or fullName' }),
    (0, swagger_1.ApiQuery)({ name: 'Take', required: false, description: 'Number of results to return (default 10)' }),
    __param(0, (0, common_1.Query)('SearchText')),
    __param(1, (0, common_1.Query)('Take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], PeopleController.prototype, "getMatchingPeople", null);
__decorate([
    (0, common_1.Get)('ValidatePerson'),
    (0, swagger_1.ApiOperation)({ summary: 'Validate a person against the directory without returning any attributes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The person with the specified identity was found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'The request was invalid' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'The person with the specified identity was not found' }),
    (0, swagger_1.ApiQuery)({ name: 'LogonId', required: false, description: 'Logon (user name)' }),
    (0, swagger_1.ApiQuery)({ name: 'EmployeeId', required: false, description: 'Employee ID (MSID)' }),
    __param(0, (0, common_1.Query)('LogonId')),
    __param(1, (0, common_1.Query)('EmployeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PeopleController.prototype, "validatePerson", null);
exports.PeopleController = PeopleController = __decorate([
    (0, common_1.Controller)('People'),
    __metadata("design:paramtypes", [people_service_1.PeopleService])
], PeopleController);
//# sourceMappingURL=people.controller.js.map