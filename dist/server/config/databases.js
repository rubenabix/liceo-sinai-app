'use strict';

var redis = require('redis');
var parseRedisUrl = require('parse-redis-url')(redis);
var url = 'redis://h:p4vugdl746lkvdvtedp07tvj47@ec2-54-83-207-141.compute-1.amazonaws.com:9889';

console.log('process.env.REDIS_URL------> ', process.env.REDIS_URL);

function getRedisOptions() {

  var redisOptions = {
    port: parseRedisUrl.parse(url).port || 6379,
    host: parseRedisUrl.parse(url).host || 'localhost',
    password: parseRedisUrl.parse(url).password || ''
  };

  console.log('CURRENT REDIS OPTIONS: ');
  console.log(redisOptions);

  return redisOptions;
}

var develop = {
  redisDB: getRedisOptions()
};

var staging = {
  redisDB: getRedisOptions()
};

var production = {
  redisDB: getRedisOptions()
};

var deployProduction = {
  redisDB: getRedisOptions()
};

var config = {
  develop: develop,
  staging: staging,
  production: production,
  deployProduction: deployProduction
};

module.exports = config;
