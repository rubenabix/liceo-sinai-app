'use strict';

var ports = {
  develop: process.env.PORT || 7200,
  staging: process.env.PORT || 7300,
  production: process.env.PORT || 7400
};

module.exports = ports;
