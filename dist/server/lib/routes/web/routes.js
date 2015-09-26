'use strict';

var develop = require('./develop.js');
var production = require('./production.js');

var routes = {
  develop: develop,
  production: production
};

// Public
module.exports = routes;
