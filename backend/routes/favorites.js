const express = require('express');
const router = express.Router();
const { toggleFavorite, getFavorites } = require('../controllers/favoritesController');

router.route('/')
    .post(toggleFavorite)
    .get(getFavorites);

module.exports = router;