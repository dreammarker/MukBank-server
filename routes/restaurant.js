const express = require('express');

const router = express.Router();

const { restaurantController } = require('../controller');

router.post('/distance', restaurantController.restdistance.post);
router.post('/distancestartend', restaurantController.distancestend.post);
router.get('/category', restaurantController.fdcategory.get);
module.exports = router;
