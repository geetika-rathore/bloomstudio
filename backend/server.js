const express = require('express');
const { connectMongoDB, connectMySQL } = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products');
const favoritesRoutes = require('./routes/favorites'); 
const app = express();

dotenv.config({ path: path.join(__dirname, '.env') });

connectMongoDB();
connectMySQL();

app.use(express.json());
app.use(cors()); 

app.use('/upload', express.static(path.join(__dirname, 'public/upload')));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/favorites', favoritesRoutes);

app.get('/', (req, res) => {
  res.send('A Bloom Studio Backend is running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));