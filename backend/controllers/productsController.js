const Product = require('../models/product');
const Category = require('../models/category');
const path = require('path');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, botanicalInfo } = req.body;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, error: 'Please upload at least one image.' });
    }

    const imageUrls = req.files.map(file => `/upload/${file.filename}`);

    const product = await Product.create({
      name,
      description,
      price,
      images: imageUrls,
      category,
      stock,
      botanicalInfo: JSON.parse(botanicalInfo),
    });

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};