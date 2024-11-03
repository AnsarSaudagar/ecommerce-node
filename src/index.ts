// src/index.ts
import express, { Application } from 'express';
import sequelize from './config/database';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import productCategoryRoutes from './routes/productCategoryRoutes';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());


// Register Routes
app.use('/auth', authRoutes);
app.use('/product-category', productCategoryRoutes);


// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500).json({ message: err.message });
});


// Start Server
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
