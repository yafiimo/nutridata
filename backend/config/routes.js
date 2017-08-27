const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');

router.get('/search', foodController.searchFood);

module.exports = router;
