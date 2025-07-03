import express from 'express';
import { engine } from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import productRoutes from './routes/products.routes.js';
import cartRoutes from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';
import ProductManager from './managers/ProductManager.js';

const app = express();
const server = http.createServer(app); // servidor http
const io = new Server(server); // servidor socket.io

const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public')); // carpeta para JS cliente

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewsRouter);

// Pasar io a req para usar en rutas
app.use((req, res, next) => {
  req.io = io;
  next();
});

// WebSockets
const productManager = new ProductManager('./src/data/products.json'); // ruta JSON

io.on('connection', async (socket) => {
  console.log('Cliente conectado');

  // Enviar productos al conectar
  const products = await productManager.getAll();
  socket.emit('products', products);

  // Agregar producto
  socket.on('new-product', async (product) => {
    await productManager.addProduct(product);
    const updated = await productManager.getAll();
    io.emit('products', updated);
  });

  // Eliminar producto
  socket.on('delete-product', async (id) => {
    await productManager.deleteProduct(id);
    const updated = await productManager.getAll();
    io.emit('products', updated);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
