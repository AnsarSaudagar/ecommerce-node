// src/index.ts
import express, { Application } from 'express';
import sequelize from './config/database';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import productCategoryRoutes from './routes/productCategoryRoutes';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes'
import userRoutes from './routes/userRoutes'
import addressRoutes from './routes/addressRoutes'
import productReviewsRoutes from './routes/productReviewsRoutes'
import cors from 'cors';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

// Register Routes
app.use('/auth', authRoutes);
app.use('/product-category', productCategoryRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/user', userRoutes);
app.use('/address', addressRoutes);
app.use("/product-review", productReviewsRoutes)

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500).json({ message: err.message });
});

try {
  const AWS = require('aws-sdk');
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION, // e.g., 'us-east-1'
  });
  
} catch (error) {
  
}


// Start Server
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
