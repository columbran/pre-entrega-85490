import express from 'express';
import { engine } from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

import productRoutes from './routes/products.routes.js';
import cartRoutes from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';

import Product from './models/Product.js'; // Modelo Mongoose

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// 🟢 Conexión a MongoDB
await connectDB();

// 🧩 Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

// 🛠️ Handlebars
app.engine('handlebars', engine({
  helpers: {
    eq: (a, b) => a === b
  }
}));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// 📦 Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewsRouter);

// WebSocket disponible en las rutas 
app.use((req, res, next) => {
  req.io = io;
  next();
});

// 🔄 WebSockets en tiempo real con MongoDB
io.on('connection', async (socket) => {
  console.log('🧠 Cliente conectado a WebSocket');

  const products = await Product.find().lean();
  socket.emit('products', products);

  socket.on('new-product', async (productData) => {
    try {
      await Product.create(productData);
      const updated = await Product.find().lean();
      io.emit('products', updated);
    } catch (error) {
      console.error('Error al crear producto:', error.message);
    }
  });

  socket.on('delete-product', async (id) => {
    try {
      await Product.findByIdAndDelete(id);
      const updated = await Product.find().lean();
      io.emit('products', updated);
    } catch (error) {
      console.error('Error al eliminar producto:', error.message);
    }
  });
});

server.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});