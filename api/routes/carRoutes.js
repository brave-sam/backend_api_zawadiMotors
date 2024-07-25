const express = require('express');
const router = express.Router();
const carController = require('../controllers/carControllers');

console.log(carController); // Add this line to debug

router.post('/cars', carController.createCar);
router.get('/cars', carController.getCars);
router.get('/cars/search', carController.searchCars);
router.get('/cars/modelTypes', carController.getModelTypes);
router.get('/cars/driveTypes', carController.getDriveTypes);
router.get('/cars/filteredCars', carController.getFilteredCars);
router.get('/cars/:id', carController.getCarbyID);
router.put('/cars/:id', carController.updateCar);
router.delete('/cars/:id', carController.deleteCar);

module.exports = router;

