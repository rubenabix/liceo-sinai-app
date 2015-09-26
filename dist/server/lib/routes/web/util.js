'use strict';

function getMode() {
  return process.env.NODE_ENV ? (process.env.NODE_ENV === 'production' ? 'release' : 'debug') : 'debug';
}

var util = {
  getMode: getMode
};

// Public
module.exports = util;
