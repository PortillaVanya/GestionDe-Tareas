"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = __importDefault(require("../middleware/auth"));
const validation_1 = __importDefault(require("../middleware/validation"));
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
const registerSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
router.post('/register', (0, validation_1.default)(registerSchema), userController_1.register);
router.post('/login', (0, validation_1.default)(loginSchema), userController_1.login);
router.get('/profile', auth_1.default, userController_1.getProfile);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map