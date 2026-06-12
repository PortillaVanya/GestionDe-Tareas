import { Sequelize } from 'sequelize';
import env from './env';

const dbOptions = {
  dialect: 'mysql' as const,
  logging: env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};

export const sequelize = env.DATABASE_URL
  ? new Sequelize(env.DATABASE_URL, dbOptions)
  : new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
      ...dbOptions,
      host: env.DB_HOST,
      port: env.DB_PORT,
    });

export default sequelize;
