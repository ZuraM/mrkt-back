const express = require('express'),
  mongoose = require('mongoose'),
  _ = require('lodash'),
  fs = require('fs'),
  passport = require('passport'),
  config = require('./config'),
  cors = require('cors'),
  bodyParser = require('body-parser');

mongoose.Promise = Promise;

require('./util/Passport');

/* Init Mongoose models */
let modelsDir = __dirname + '/models/';
let modelFiles = fs.readdirSync(modelsDir);

modelFiles.forEach(function (file) {
  if (/^[^\.].*\.js$/.test(file)) {
    require(modelsDir + file);
    console.log(modelsDir + file);
  }
});


let app = express();
app.use(bodyParser.json({
  limit: '300mb'
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

mongoose.connect(config.db.url);

const index = require('./routes/index');
app.use('/', index);


app.listen(config.port, function () {
  console.info('App listening on port: ' + config.port)
  console.info('DATABASE: ' + config.db.url)
});


process.on('uncaughtException', function (err) {
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  console.error(err.stack)
});

module.exports = app;