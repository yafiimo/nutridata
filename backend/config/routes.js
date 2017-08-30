const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');
const nutrientController = require('../controllers/nutrient.controller');

router.get('/api/search', foodController.searchFood);
router.get('/api/food-groups', foodController.getFoodGroups);

router.get('/api/nutrients', nutrientController.getNutrientList);
router.get('/api/nutrients/:ndbno', nutrientController.getNutrients);


module.exports = router;
