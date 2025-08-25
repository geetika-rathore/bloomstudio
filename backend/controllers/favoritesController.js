const { mysqlPool } = require('../config/db');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Product = require('../models/product');

// 🔹 POST /api/v1/favorites — Like / Unlike a product
exports.toggleFavorite = async (req, res) => {
    const { productId } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id;

        // Check if already favorited
        const [rows] = await mysqlPool.query(
            'SELECT * FROM favorites WHERE user_id = ? AND product_id = ?',
            [userId, productId]
        );

        if (rows.length > 0) {
            // Unlike
            await mysqlPool.query(
                'DELETE FROM favorites WHERE user_id = ? AND product_id = ?',
                [userId, productId]
            );
            return res.json({ message: 'Product un-favorited successfully', isFavorite: false });
        } else {
            // Like
            await mysqlPool.query(
                'INSERT INTO favorites (user_id, product_id) VALUES (?, ?)',
                [userId, productId]
            );
            return res.json({ message: 'Product favorited successfully', isFavorite: true });
        }
    } catch (err) {
        console.error('Toggle Favorite Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// 🔹 GET /api/v1/favorites — Get all favorites for the logged-in user
exports.getFavorites = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id;

        // Get all favorite product IDs from MySQL
        const [rows] = await mysqlPool.query(
            'SELECT product_id FROM favorites WHERE user_id = ?',
            [userId]
        );

        const favoriteProductIds = rows.map(row => row.product_id);

        let favoriteProducts = [];
        if (favoriteProductIds.length > 0) {
            favoriteProducts = await Product.find({
                _id: { $in: favoriteProductIds.map(id => new mongoose.Types.ObjectId(id)) }
            });
        }

        res.json({
            favorites: favoriteProductIds, 
            favoriteProducts              
        });
    } catch (err) {
        console.error('Get Favorites Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
