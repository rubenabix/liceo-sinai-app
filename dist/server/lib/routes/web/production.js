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
        file: './dist/client/public/index.html'
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
          path: './dist/client/public/temp/',
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
    path: '/app/images/{path*}',
    config: {
      handler: {
        directory: {
          path: './dist/client/public/temp/images/',
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
          path: './dist/client/public/app/',
          listing: false
        }
      },
      tags: ['web'],
      validate: {
        query: {}
      }
    }
  }
];

//var routes = [
//  {
//    method: 'GET',
//    path: '/',
//    config: {
//      handler: handlers.getIndex,
//      tags: ['web'],
//      validate: {
//        query: {}
//      }
//    }
//  },
//  {
//    method: 'GET',
//    path: '/bower_components/{path*}',
//    config: {
//      handler: {
//        directory: {
//          path: './bower_components/',
//          listing: false
//        }
//      },
//      tags: ['web'],
//      validate: {
//        query: {}
//      }
//    }
//  },
//  {
//    method: 'GET',
//    path: '/app/{path*}',
//    config: {
//      handler: {
//        directory: {
//          path: './' + util.getMode() + '/public/',
//          listing: false
//        }
//      },
//      tags: ['web'],
//      validate: {
//        query: {}
//      }
//    }
//  },
//  {
//    method: 'GET',
//    path: '/favicon.ico',
//    config: {
//      handler: {
//        file: './src/server/favicon.ico'
//      },
//      tags: ['web'],
//      cache: {
//        expiresIn: 86400000,
//        privacy: 'public'
//      }
//    }
//  }
//];

module.exports = routes;
