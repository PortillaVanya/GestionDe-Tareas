"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const env_1 = __importDefault(require("./env"));
exports.sequelize = new sequelize_1.Sequelize(env_1.default.DB_NAME, env_1.default.DB_USER, env_1.default.DB_PASS, {
    host: env_1.default.DB_HOST,
    port: env_1.default.DB_PORT,
    dialect: 'mysql',
    logging: env_1.default.NODE_ENV === 'development' ? console.log : false,
});
exports.default = exports.sequelize;
//# sourceMappingURL=database.js.map