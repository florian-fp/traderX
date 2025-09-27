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
exports.GetPersonDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class GetPersonDto {
}
exports.GetPersonDto = GetPersonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Logon (user name)',
        required: false,
        example: 'user01'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPersonDto.prototype, "logonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee ID (MSID)',
        required: false,
        example: 'E0001'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPersonDto.prototype, "employeeId", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => !o.logonId && !o.employeeId, {
        message: 'Either logonId or employeeId must be provided'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPersonDto.prototype, "_validation", void 0);
//# sourceMappingURL=get-person.dto.js.map