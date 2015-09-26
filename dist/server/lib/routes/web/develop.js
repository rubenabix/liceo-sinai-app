/* jshint -W101*/

var Joi = require('joi');
var handlers = require('./handlers.js');
var constants = require('./constants.js');
var util = require('./util.js');

var routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: {
        file: './src/client/templates/index.html'
      },
      tags: ['web'],
      validate: {
        query: {}
      }
    }
  },
  {
    method: 'GET',
    path: '/firstLoad/{path*}',
    config: {
      handler: {
        directory: {
          path: './src/client/firstLoad/',
          listing: false
        }
      },
      tags: ['web'],
      validate: {
        query: {}
      }
    }
  },
  {
    method: 'GET',
    path: '/temp/{path*}',
    config: {
      handler: {
        directory: {
          path: './temp/',
          listing: false
        }
      },
      tags: ['web'],
      validate: {
        query: {}
      }
    }
  },
  {
    method: 'GET',
    path: '/app/{path*}',
    config: {
      handler: {
        directory: {
          path: './src/client/app/',
          listing: false
        }
      },
      tags: ['web'],
      validate: {
        query: {}
      }
    }
  },
  {
    method: 'GET',
    path: '/favicon.ico',
    config: {
      handler: {
        file: './src/server/favicon.ico'
      },
      tags: ['web'],
      cache: {
        expiresIn: 86400000,
        privacy: 'public'
      }
    }
  }
];

module.exports = routes;
