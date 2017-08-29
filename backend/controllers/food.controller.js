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
  const requestPromises = [];

  if(req.query.fg) {
    filters = req.query.fg.split('-');
    filters.forEach((filter) => {
      requestPromises.push(filteredSearch(name, filter));
    });
  } else {
    requestPromises.push(filteredSearch(name, ''));
  }



  Promise.all(requestPromises).then(
    (success) => {
      const responseJson = [];
      success.forEach((result) => {
        responseJson.push(...result);
      });
      res.status(200).json(responseJson);
    },
    (error) => {
      res.status(500).json(error);
    }
  );
  //
  //
  // filters = 'baby foods';
  //
  // var options = {
  //   url: `${FOOD_DATA_BASE_URL}/search/?format=json&q=${name}&max=50&ds=Standard Reference&fg=${filters}&api_key=${API_KEY}`
  // };
  //
  // request(options, (error, response, body) => {
  //   console.log(body);
  //   var foodJson;
  //
  //   if (error) {
  //     console.warn('searchFood: could not get food:', error);
  //     res.status(500).json({message: 'could not get food'});
  //     return;
  //   }
  //   foodJson = JSON.parse(body);
  //
  //
  //
  //   res.status(200).json(foodJson);
  // });
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


function filteredSearch(name, filter) {
  return new Promise((resolve, reject) => {
    var options = {
      url: `${FOOD_DATA_BASE_URL}/search/?format=json&q=${name}&max=70&ds=Standard Reference&fg=${filter}&api_key=${API_KEY}`
    };

    request(options, (error, response, body) => {
      let foodJson = {};

      if (error) {
        console.warn('searchFood: could not get food:', error);
        reject({message: 'could not get food'});
      }
      foodJson = JSON.parse(body);

      resolve(foodJson.list.item);
    });
  });
}

module.exports = {
  searchFood: searchFood,
  getFoodGroups: getFoodGroups
};
