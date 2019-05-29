const devConfig = {
    app: {
      port: parseInt(process.env.DEV_APP_PORT) || 4041
    },
    db: {
      host: process.env.DEV_DB_HOST || 'localhost',
      port: parseInt(process.env.DEV_DB_PORT) || 27017,
      name: process.env.DEV_DB_NAME || 'masterit'
    }
  };
  
  export const config = devConfig;