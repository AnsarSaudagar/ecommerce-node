// src/index.ts
import express, { Application } from 'express';
import sequelize from './config/database';
import dotenv from 'dotenv';
// import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());


// Register Routes
// app.use('/api/users', userRoutes);

// Start Server

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
