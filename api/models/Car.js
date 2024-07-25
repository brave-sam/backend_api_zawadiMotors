const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  year: Number,
  distance: Number,
  type: String,
  isNew: Boolean,
  image:String,
  images: [String],
  make: String,
  model: String,
  driveType: String,
  transmission: String,
  condition: String,
  mileage: String,
  fuelType: String,
  engineSize: String,
  doors: String,
  safetyFeatures: [String],
  features: [String]
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
