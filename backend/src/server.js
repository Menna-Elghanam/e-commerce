import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import productRoutes from './routes/products.routes.js';
import categoryRoutes from './routes/category.routes.js';
import authRoutes from './routes/auth.routes.js';



dotenv.config();
const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/ctagories', categoryRoutes);
app.use('/api/auth', authRoutes);



app.get('/', (req, res) => {
  res.send('E-commerce API is running');
});
// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
