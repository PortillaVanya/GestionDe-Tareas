"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: '📋 API Gestión de Tareas',
            version: '1.0.0',
            description: 'API REST para gestión de tareas con autenticación JWT. Regístrate, inicia sesión y gestiona tus tareas.',
            contact: {
                name: 'Soporte',
                email: 'soporte@tareas.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:4000',
                description: 'Servidor de Desarrollo',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Ingresa el token JWT obtenido al iniciar sesión con el prefijo **Bearer**. Ejemplo: `Bearer eyJhbGci...`',
                },
            },
            schemas: {
                RegisterInput: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        name: { type: 'string', example: 'Juan Pérez' },
                        email: { type: 'string', format: 'email', example: 'juan@example.com' },
                        password: { type: 'string', minLength: 6, example: 'secreto123' },
                    },
                },
                LoginInput: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', format: 'email', example: 'juan@example.com' },
                        password: { type: 'string', example: 'secreto123' },
                    },
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        user: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer', example: 1 },
                                name: { type: 'string', example: 'Juan Pérez' },
                                email: { type: 'string', example: 'juan@example.com' },
                            },
                        },
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                    },
                },
                TaskInput: {
                    type: 'object',
                    required: ['title'],
                    properties: {
                        title: { type: 'string', example: 'Terminar el proyecto' },
                        description: { type: 'string', example: 'Completar el módulo de pagos' },
                        status: {
                            type: 'string',
                            enum: ['pending', 'in-progress', 'completed'],
                            example: 'pending',
                        },
                    },
                },
                Task: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        title: { type: 'string', example: 'Terminar el proyecto' },
                        description: { type: 'string', example: 'Completar el módulo de pagos' },
                        status: { type: 'string', enum: ['pending', 'in-progress', 'completed'], example: 'pending' },
                        userId: { type: 'integer', example: 1 },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        error: { type: 'string', example: 'Mensaje de error' },
                    },
                },
            },
        },
        tags: [
            { name: 'Auth', description: 'Registro e inicio de sesión' },
            { name: 'Tasks', description: 'Gestión de tareas (requiere autenticación)' },
        ],
        paths: {
            '/api/users/register': {
                post: {
                    tags: ['Auth'],
                    summary: 'Registrar un nuevo usuario',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/RegisterInput' },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'Usuario registrado exitosamente',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } },
                        },
                        400: {
                            description: 'Email ya en uso o datos inválidos',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
                        },
                    },
                },
            },
            '/api/users/login': {
                post: {
                    tags: ['Auth'],
                    summary: 'Iniciar sesión',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/LoginInput' },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Login exitoso. Copia el token y úsalo en el botón Authorize 🔓',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } },
                        },
                        401: {
                            description: 'Credenciales inválidas',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
                        },
                    },
                },
            },
            '/api/users/profile': {
                get: {
                    tags: ['Auth'],
                    summary: 'Obtener perfil del usuario autenticado',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Perfil del usuario',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            name: { type: 'string' },
                                            email: { type: 'string' },
                                            createdAt: { type: 'string', format: 'date-time' },
                                        },
                                    },
                                },
                            },
                        },
                        401: { description: 'No autenticado' },
                    },
                },
            },
            '/api/tasks': {
                post: {
                    tags: ['Tasks'],
                    summary: 'Crear una nueva tarea',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/TaskInput' } } },
                    },
                    responses: {
                        201: {
                            description: 'Tarea creada',
                            content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } },
                        },
                        401: { description: 'No autenticado' },
                    },
                },
                get: {
                    tags: ['Tasks'],
                    summary: 'Obtener todas las tareas del usuario',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: 'Lista de tareas',
                            content: {
                                'application/json': {
                                    schema: { type: 'array', items: { $ref: '#/components/schemas/Task' } },
                                },
                            },
                        },
                        401: { description: 'No autenticado' },
                    },
                },
            },
            '/api/tasks/{id}': {
                get: {
                    tags: ['Tasks'],
                    summary: 'Obtener una tarea por ID',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID de la tarea' },
                    ],
                    responses: {
                        200: { description: 'Tarea encontrada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } } },
                        404: { description: 'Tarea no encontrada' },
                        401: { description: 'No autenticado' },
                    },
                },
                put: {
                    tags: ['Tasks'],
                    summary: 'Actualizar una tarea',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID de la tarea' },
                    ],
                    requestBody: {
                        required: true,
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/TaskInput' } } },
                    },
                    responses: {
                        200: { description: 'Tarea actualizada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Task' } } } },
                        404: { description: 'Tarea no encontrada' },
                        401: { description: 'No autenticado' },
                    },
                },
                delete: {
                    tags: ['Tasks'],
                    summary: 'Eliminar una tarea',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID de la tarea' },
                    ],
                    responses: {
                        200: { description: 'Tarea eliminada', content: { 'application/json': { schema: { type: 'object', properties: { message: { type: 'string', example: 'Task deleted successfully' } } } } } },
                        404: { description: 'Tarea no encontrada' },
                        401: { description: 'No autenticado' },
                    },
                },
            },
        },
    },
    apis: [],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, {
        customSiteTitle: 'API Gestión de Tareas',
        customCss: `
        .topbar { background-color: #1a1a2e; }
        .topbar-wrapper img { content: url('https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png'); height: 40px; }
        .swagger-ui .info .title { color: #16213e; font-size: 2rem; }
        .swagger-ui .opblock.opblock-post { border-color: #6366f1; background: rgba(99,102,241,0.05); }
        .swagger-ui .opblock.opblock-get { border-color: #22c55e; background: rgba(34,197,94,0.05); }
        .swagger-ui .opblock.opblock-put { border-color: #f59e0b; background: rgba(245,158,11,0.05); }
        .swagger-ui .opblock.opblock-delete { border-color: #ef4444; background: rgba(239,68,68,0.05); }
        .swagger-ui .btn.authorize { background-color: #6366f1; border-color: #6366f1; color: #fff; }
      `,
        swaggerOptions: {
            persistAuthorization: true,
            displayRequestDuration: true,
            docExpansion: 'list',
            filter: true,
            tryItOutEnabled: true,
        },
    }));
    console.log(`[INFO] Swagger docs available at http://localhost:4000/api/docs`);
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.js.map