"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = __importDefault(require("./config/env"));
const database_1 = require("./config/database");
const logger_1 = __importDefault(require("./utils/logger"));
const PORT = env_1.default.PORT || 4000;
const startServer = async () => {
    try {
        await database_1.sequelize.authenticate();
        logger_1.default.info('Connection to MySQL has been established successfully.');
        await database_1.sequelize.sync({ alter: true });
        app_1.default.listen(PORT, () => {
            logger_1.default.info(`Server running in ${env_1.default.NODE_ENV} mode on port ${PORT}`);
        });
    }
    catch (error) {
        logger_1.default.error('Unable to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map