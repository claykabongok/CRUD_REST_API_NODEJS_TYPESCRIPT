"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdValidation = exports.UserValidation = void 0;
var joi_1 = __importDefault(require("joi"));
exports.UserValidation = joi_1.default.object({
    username: joi_1.default.string().email().min(6).max(255).required(),
    name: joi_1.default.string().required(),
    surname: joi_1.default.string().required(),
});
exports.UserIdValidation = joi_1.default.string().alphanum().required();
