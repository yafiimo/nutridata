const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./backend/config/routes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser. urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
  console.log('App is listening on port', PORT);
});

module.exports = app;
