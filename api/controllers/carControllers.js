const multer = require('multer');
const Car = require('../models/Car');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

exports.createCar = [
  upload.single('image'),
  async (req, res) => {
    try {
      const carData = req.body;
      if (req.file) {
        carData.image = req.file.path;
      }
      const car = new Car(carData);
      await car.save();
      res.status(201).json(car);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];

exports.updateCar = [
  upload.single('image'),
  async (req, res) => {
    try {
      const carData = req.body;
      if (req.file) {
        carData.image = req.file.path;
      }
      const car = await Car.findByIdAndUpdate(req.params.id, carData, { new: true });
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
      res.json(car);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCarbyID = async (req, res) => {
  try {
    const car = await Car.findOne({ id: parseInt(req.params.id, 10) });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchCars = async (req, res) => {
  try {
    const { term } = req.query;
    const regex = new RegExp(term, 'i');
    const cars = await Car.find({
      $or: [
        { name: regex },
        { make: regex },
        { model: regex }
      ]
    });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getModelTypes = async (req, res) => {
  try {
    const modelTypes = await Car.distinct('model');
    res.json(modelTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDriveTypes = async (req, res) => {
  try {
    const driveTypes = await Car.distinct('driveType');
    res.json(driveTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getFilteredCars = async (req, res) => {
  try {
    const { modelType, driveType, mileage } = req.query;
    const filters = {};

    if (modelType) filters.model = modelType;
    if (driveType) filters.driveType = driveType;
    if (mileage) filters.mileage = { $lte: Number(mileage) };

    const cars = await Car.find(filters);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

console.log(module.exports); // Add this line to debug
