const request = require('request');
const API_KEY = process.env.API_KEY;
const FOOD_DATA_BASE_URL = process.env.FOOD_DATA_BASE_URL;

function searchFood(req, res) {
  var name = req.query.q;

  var options = {
    url: `${FOOD_DATA_BASE_URL}/search/?format=json&q=${name}&max=20&ds=Standard Reference&api_key=${API_KEY}`
  };

  request(options, (error, response, body) => {
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

module.exports = {
  searchFood: searchFood
};
