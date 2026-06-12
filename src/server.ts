import app from './app';
import env from './config/env';
import { sequelize } from './config/database';
import logger from './utils/logger';

const PORT = env.PORT || 4000;

const startServer = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    logger.info('Connection to MySQL has been established successfully.');

    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      logger.info(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();
