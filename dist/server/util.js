'use strict';

var config = require('./config/global.js');

var redis = require('redis');
var parseRedisUrl = require('parse-redis-url')(redis);
var url = 'redis://h:p4vugdl746lkvdvtedp07tvj47@ec2-54-83-207-141.compute-1.amazonaws.com:9889';

/*
 *
 * WEB CLIENT ROUTES
 *
 * */
var clientRoutes = require('./lib/routes/web/routes.js');

// PRIVATE

function getWEBRoutes() {
  var routes = [];
  routes = routes.concat(clientRoutes[config.currentMode]);
  return routes;
}

// PUBLIC

function createConnections(server) {

  var currentMode = config.currentMode;

  var connections =
    [
      config[currentMode].API
    ];

  connections.forEach(function (connection) {
    server.connection(connection);
  });
}

function setupRoutes(server) {

  var web = server.select('web');

  var webRoutes = getWEBRoutes();

  // Setting up routes
  webRoutes.forEach(function (route) {
    web.route(route);
  });

}

function registerPlugins(server) {

  var currentMode = config.currentMode;
  var redisOptions = config[currentMode].redisDB;

  var plugins = [
    {
      register: require('vision'),
      options: {}
    },
    {
      register: require('inert'),
      options: {}
    },
    {
      register: require('hapi-swagger'),
      options: {apiVersion: '1.0'}
    },
    // TODO: check use
    //{
    //  register: require('tv'),
    //  options: {}
    //},
    {
      register: require('blipp'),
      options: {}
    },
    {
      register: require('hapi-redis'),
      options: {
        port: parseRedisUrl.parse(url).port || 6379,
        host: parseRedisUrl.parse(url).host || 'localhost',
        password: parseRedisUrl.parse(url).password || ''
      }
    },
    {
      register: require('good'),
      options: {
        reporters: [
          {
            reporter: require('good-console'),
            events: {
              log: '*',
              response: '*'
            }
          }
        ]
      }
    },
    {
      register: require('hapi-mongoose-db-connector'),
      options: {
        mongodbUrl: 'mongodb://admin:admin@ds041663.mongolab.com:41663/liceo-sinai'
      }
    }
  ];

  plugins.forEach(function (plugin) {
    server.register(plugin, function (err) {
      if (err) {
        console.log(err);
        throw err;
      }
    });
  });
}

var util = {
  createConnections: createConnections,
  registerPlugins: registerPlugins,
  setupRoutes: setupRoutes
};

module.exports = util;
