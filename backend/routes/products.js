const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getProducts,
  getProductById,
  getCategories,
  createProduct
} = require('../controllers/productsController');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/upload/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.route('/').get(getProducts).post(upload.array('images', 5), createProduct);
router.route('/:id').get(getProductById);
router.route('/categories').get(getCategories);

module.exports = router;