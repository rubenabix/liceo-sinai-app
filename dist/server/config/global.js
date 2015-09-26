'use strict';

var ports = require('./ports.js');
var databases = require('./databases.js');
var apiModules = require('./apiModules.js');

function getEnvNode() {
  console.log('ENV_NODE');
  console.log(process.env.NODE_ENV || 'develop');
  return process.env.NODE_ENV || 'develop';
}

var develop = {
  server: './src/server/app.js',
  path: './src/',
  API: {
    port: ports.develop,
    labels: ['api', 'web']
  },
  client: {
    port: ports.develop + 1
  },
  redisDB: databases.develop.redisDB,
  views: '/../client/templates'
};

var staging = {
  server: './src/server/app.js',
  path: './src/',
  API: {
    port: ports.staging,
    labels: ['api', 'web']
  },
  client: {
    port: ports.staging + 1
  },
  redisDB: databases.staging.redisDB,
  views: '/../client/templates'
};

var production = {
  server: './dist/server/app.js',
  path: './dist/',
  API: {
    port: ports.production,
    labels: ['api', 'web']
  },
  client: {
    port: ports.production + 1
  },
  redisDB: databases.production.redisDB,
  views: '/../client/public'
};

var deployProduction = {
  server: './dist/server/app.js',
  path: './dist/',
  API: {
    port: ports.production,
    labels: ['api', 'web']
  },
  client: {
    port: ports.production + 1
  },
  redisDB: databases.deployProduction.redisDB,
  views: '/../client/public'
};

var config = {
  defaultPort: 7777,
  apiModules: apiModules,
  connectionsLabels: {
    api: 'api',
    web: 'web'
  },
  modes: {
    develop: 'develop',
    staging: 'staging',
    production: 'production',
    'deploy-production': 'deploy-production'
  },
  develop: develop,
  staging: staging,
  production: production,
  'deploy-production': deployProduction,
  currentMode: getEnvNode()
};

module.exports = config;
