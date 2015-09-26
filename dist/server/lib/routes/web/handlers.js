'use strict';

function getIndex(request, reply) {
  reply.view('index.html');
}

var handlers = {
  getIndex: getIndex
};

module.exports = handlers;
