"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("./middleware/cors"));
const rateLimiter_1 = __importDefault(require("./middleware/rateLimiter"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const swagger_1 = require("./config/swagger");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default);
app.use(rateLimiter_1.default);
// Swagger Docs
(0, swagger_1.setupSwagger)(app);
// Routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/tasks', taskRoutes_1.default);
// Root Endpoint
app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});
// Error Handler Middleware (must be last)
app.use(errorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map