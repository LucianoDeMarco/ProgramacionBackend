import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';

import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import ProductManager from './managers/ProductManager.js';
import mongoose from 'mongoose';

const URLmongo = 'mongodb+srv://luchodemarco13_db_user:Lucho123@cluster0.mrmdkyz.mongodb.net/?appName=Cluster0'

mongoose.connect(URLmongo)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión', err));

const app = express();
const productManager = new ProductManager('./data/products.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// static
app.use(express.static(path.join(__dirname, 'public')));

// routers
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);

// server
const httpServer = app.listen(8080, () => {
  console.log('Servidor escuchando en puerto 8080');
});

// socket.io
const io = new Server(httpServer);
app.set('io', io);

// conexión socket
io.on('connection', async (socket) => {
  console.log('Cliente conectado');

  const products = await productManager.getProducts();
  socket.emit('products', products);
});