"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = {
    info: (message) => {
        console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
    },
    error: (message, error = '') => {
        console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error);
    },
    warn: (message) => {
        console.warn(`[WARN] ${new Date().toISOString()}: ${message}`);
    },
};
exports.default = logger;
//# sourceMappingURL=logger.js.map