"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = __importDefault(require("../config/env"));
const logger_1 = __importDefault(require("../utils/logger"));
const transporter = nodemailer_1.default.createTransport({
    host: env_1.default.SMTP_HOST,
    port: Number(env_1.default.SMTP_PORT),
    auth: {
        user: env_1.default.SMTP_USER,
        pass: env_1.default.SMTP_PASS,
    },
});
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: '"Gestión de Tareas" <no-reply@example.com>',
            to,
            subject,
            text,
            html,
        });
        logger_1.default.info(`Email sent: ${info.messageId}`);
    }
    catch (error) {
        logger_1.default.error(`Error sending email: ${error.message}`);
        throw error;
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=emailService.js.map