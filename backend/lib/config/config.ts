require('dotenv').config();

const devConfig ={
  app: {
    port: parseInt(process.env.DEV_APP_PORT)
  },
  db: {
    host: process.env.DEV_DB_HOST,
    port: parseInt(process.env.DEV_DB_PORT),
    name: process.env.DEV_DB_NAME
  }
};

export const config = devConfig;