const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');

router.get('/api/search', foodController.searchFood);
router.get('/api/food-groups', foodController.getFoodGroups);

module.exports = router;
