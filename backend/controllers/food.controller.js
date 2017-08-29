const request = require('request');
const API_KEY = process.env.API_KEY;
const FOOD_DATA_BASE_URL = process.env.FOOD_DATA_BASE_URL;

function searchFood(req, res) {
  let name = '';
  let filters = '';

  if(req.query.q) {
    name = req.query.q;
  }

  // var filters = "";

  if(req.query.fg) {
    filters = req.query.fg;
  }

  var options = {
    url: `${FOOD_DATA_BASE_URL}/search/?format=json&q=${name}&max=50&ds=Standard Reference&fg=${filters}&api_key=${API_KEY}`
  };

  request(options, (error, response, body) => {
    console.log(body);
    var foodJson;

    if (error) {
      console.warn('searchFood: could not get food:', error);
      res.status(500).json({message: 'could not get food'});
      return;
    }
    foodJson = JSON.parse(body);



    res.status(200).json(foodJson);
  });
}

function getFoodGroups(req, res) {
  // 'https://api.nal.usda.gov/ndb/list?format=json&lt=f&sort=n&api_key=DEMO_KEY'

  var options = {
    url: `${FOOD_DATA_BASE_URL}/list?format=json&lt=g&sort=n&api_key=${API_KEY}`
  };

  request(options, (error, response, body) => {
    var foodGroupsJson;

    if (error) {
      console.warn('getFoodGroups: could not get food groups:', error);
      res.status(500).json({message: 'could not get food groups'});
      return;
    }
    foodGroupsJson = JSON.parse(body);



    res.status(200).json(foodGroupsJson);
  });
}

module.exports = {
  searchFood: searchFood,
  getFoodGroups: getFoodGroups
};
