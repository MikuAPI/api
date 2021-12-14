module.exports = {
  apps: [
    {
      name: 'mikuapi',
      script: './build/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: true,
      env: {
        PG_DB_NAME: 'mikuapi_dev',
        PORT: 3333,
        NODE_ENV: 'development',
      },
      env_production: {
        PG_DB_NAME: 'mikuapi',
        PORT: 8080,
        NODE_ENV: 'production',
      },
    },
  ],
}
