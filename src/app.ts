import express, { Application } from 'express';
import corsMiddleware from './middleware/cors';
import rateLimiter from './middleware/rateLimiter';
import errorHandler from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import { setupSwagger } from './config/swagger';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(rateLimiter);

// Swagger Docs
setupSwagger(app);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Error Handler Middleware (must be last)
app.use(errorHandler);

export default app;
