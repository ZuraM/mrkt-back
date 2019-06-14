var bunyan = require('bunyan');
var config = require('../config');

var logger = bunyan.createLogger(config.logger);

logger.logErr = function (error, msg) {
  var obj = { error: error };
  if (error instanceof Error) {
    obj.error = error.message;
    obj.stack = error.stack
  }

  this.error(obj, msg);
};

logger.logFatal = function (error, msg) {
  var obj = { error: error };
  if (error instanceof Error) {
    obj.error = error.message;
    obj.stack = error.stack
  }

  this.error(obj, msg);
};

module.exports = logger;