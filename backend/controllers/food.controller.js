const request = require('request');
const API_KEY = process.env.API_KEY;
const FOOD_DATA_BASE_URL = process.env.FOOD_DATA_BASE_URL;

function searchFood(req, res) {
  let name = '';
  let filters = '';

  if(req.query.q) {
    name = req.query.q;
  }
  const requestPromises = [];
  if(req.query.fg) {
    filters = req.query.fg.split('-');
    filters.forEach((filter) => {
      requestPromises.push(filteredSearch(name, filter));
    });
  } else {
    requestPromises.push(filteredSearch(name, filters));
  }

  Promise.all(requestPromises).then(
    (success) => {
      if(success.every((result) => result.errors)) {
        res.status(200).json(success[0]);
      } else {
        const responseJson = [];
        success.forEach((result) => {
          if(result.list) {
            responseJson.push(...result.list.item);
          }
        });
        res.status(200).json(responseJson.filter((val, index) => index < 70));
      }
    },
    (error) => {
      res.status(500).json(error);
    }
  );
}

function getFoodGroups(req, res) {
  const options = {
    url: `${FOOD_DATA_BASE_URL}/list?format=json&lt=g&sort=n&api_key=${API_KEY}`
  };

  request(options, (error, response, body) => {
    let foodGroupsJson = {};

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
    let max = 40;
    if(filter === '') max = 70;
    const options = {
      url: `${FOOD_DATA_BASE_URL}/search/?format=json&q=${name}&max=${max}&ds=Standard Reference&fg=${filter}&api_key=${API_KEY}`
    };

    request(options, (error, response, body) => {
      let foodJson = {};

      if (error) {
        console.warn('searchFood: could not get food:', error);
        reject({message: 'could not get food'});
      }
      foodJson = JSON.parse(body);

      console.log(foodJson);

      resolve(foodJson);
    });
  });
}

module.exports = {
  searchFood: searchFood,
  getFoodGroups: getFoodGroups
};
