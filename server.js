require('dotenv').config();
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var routes = require('./backend/config/routes');
var app = express();
var PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
  console.log('App is listening on port', PORT);
});

module.exports = app;
