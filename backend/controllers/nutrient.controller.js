const request = require('request');
const API_KEY = process.env.API_KEY;
const FOOD_DATA_BASE_URL = process.env.FOOD_DATA_BASE_URL;

function getNutrientList(req, res) {
  const options = {
    url: `${FOOD_DATA_BASE_URL}/list?format=json&lt=nr&max=190&sort=n&api_key=${API_KEY}`
  };

  request(options, (error, response, body) => {
    let nutrientsJson = {};

    if (error) {
      console.warn('getNutrientList: could not get nutrients:', error);
      res.status(500).json({message: 'could not get nutrients'});
      return;
    }
    nutrientsJson = JSON.parse(body);
    res.status(200).json(nutrientsJson);
  });
}

function getNutrients(req, res) {
  const ndbno = req.params.ndbno;
  const nutrientsObject = {
    proximates: {
      'Water': 255, 'Energy': 208, 'Protein': 203, 'Total lipid (fat)': 204,
      'Carbohydrate, by difference': 205, 'Fiber, total dietary': 291, 'Sugars, total': 269
    },
    minerals: {
      'Calcium, Ca': 301, 'Iron, Fe': 303, 'Magnesium, Mg': 304, 'Phosphorus, P': 305,
      'Potassium, K': 306, 'Sodium, Na': 307, 'Zinc, Zn': 309
    },
    vitamins: {
      'Vitamin A, RAE': 320, 'Vitamin B-12': 418, 'Vitamin C, total ascorbic acid': 401,
      'Vitamin D (D2 + D3)': 328, 'Vitamin E (alpha-tocopherol)': 323, 'Vitamin K (phylloquinone)': 430
    }
  };
  let nutrients = '';

  for(const nutrientGroup in nutrientsObject) {
    for(const nutrient in nutrientsObject[nutrientGroup]) {
      nutrients += `&nutrients=${nutrientsObject[nutrientGroup][nutrient]}`;
    }
  }

  const options = {
    url: `${FOOD_DATA_BASE_URL}/nutrients?format=json&api_key=${API_KEY}${nutrients}&ndbno=${ndbno}`
  };

  request(options, (error, response, body) => {
    let responseJson = JSON.parse(body);
    const nutrientsJson = {
      name: responseJson.report.foods[0].name,
      nutrients: {
        proximates: {
          data: [],
          chartData: { values: [], nutrients: [], units: [] }
        },
        minerals: {
          data: [],
          chartData: { values: [], nutrients: [], units: [] }
        },
        vitamins: {
          data: [],
          chartData: { values: [], nutrients: [], units: [] }
        }
      }
    };

    console.log('responseJson', responseJson.report.foods);


    if (error) {
      console.warn('getNutrientList: could not get nutrients:', error);
      res.status(500).json({message: 'could not get nutrients'});
      return;
    }

    responseJson = responseJson.report.foods[0].nutrients;


    for(const nutrientGroup in nutrientsObject) {
      for(const nutrient of responseJson) {
        if(nutrientsObject[nutrientGroup][nutrient.nutrient]) {
          if(nutrient.gm !== '--') {
            if(nutrient.nutrient !== 'Energy') {
              nutrientsJson.nutrients[nutrientGroup].data.push(nutrient);
            }
            nutrientsJson.nutrients[nutrientGroup].chartData.values.push(nutrient.gm);
            nutrientsJson.nutrients[nutrientGroup].chartData.nutrients.push(nutrient.nutrient);
            nutrientsJson.nutrients[nutrientGroup].chartData.units.push(nutrient.unit);
          }
        }
      }
    }



    console.log(nutrientsJson);
    res.status(200).json(nutrientsJson);
  });
}

// function createChartData() {
//   for(const nutrientGroup in controller.nutrients) {
//     controller.nutrients[nutrientGroup].chartData = [];
//     controller.nutrients[nutrientGroup].forEach((nutrient) => {
//       if(nutrient.value !== '--') {
//         controller.nutrients[nutrientGroup].chartData.push(parseInt(nutrient.value));
//       }
//     });
//     console.log(controller.nutrients[nutrientGroup]);
//   }
// }

module.exports = {
  getNutrientList: getNutrientList,
  getNutrients: getNutrients
};
