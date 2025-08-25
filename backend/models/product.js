const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  botanicalInfo: {
    scientificName: { type: String },
    origin: { type: String },
    meaning: { type: String },
    careInstructions: { type: String },
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);