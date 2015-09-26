'use strict';

var Hapi = require('hapi');

var server;

var api;
var web;

var ip = require('ip');
var util = require('./util.js');

setupServer();
registerPlugins();
setupRoutes();
startServer();

// Auxiliary functions
/////////////////////

function setupServer() {

  // Creating a Hapi server
  server = new Hapi.Server({
    connections: {
      routes: {
        cors: true
      }
    }
  });

  createConnections();

}

function createConnections() {
  util.createConnections(server);
}

function registerPlugins() {
  util.registerPlugins(server);
}

function setupRoutes() {
  util.setupRoutes(server);
}

function startServer() {
  server.start(function () {
    console.log('ENV_NODE:', process.env.NODE_ENV);
    var connections = server.connections;
    connections.forEach(function (connection, index) {
      console.log('CONNECTION: ', index);
      console.log('Labels', connection.settings.labels);
      console.log(connection.info.uri);
    });
    console.log('IP: ' + ip.address());
  });
}
