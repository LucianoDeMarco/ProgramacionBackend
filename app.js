import express from 'express';
import ProductManager from './managers/ProductManager.js';
import CartManager from './managers/CartManager.js';

const app = express();
app.use(express.json());

const productManager = new ProductManager('./data/products.json');
const cartManager = new CartManager('./data/carts.json');

/* =======================
   ENDPOINTS PRODUCTS
======================= */

app.get('/api/products', async (req, res) => {
  res.json(await productManager.getProducts());
});

app.get('/api/products/:pid', async (req, res) => {
  const product = await productManager.getProductById(Number(req.params.pid));
  product
    ? res.json(product)
    : res.status(404).json({ error: 'Producto no encontrado' });
});

app.post('/api/products', async (req, res) => {
  const newProduct = await productManager.addProduct(req.body);
  res.status(201).json(newProduct);
});

app.put('/api/products/:pid', async (req, res) => {
  const updated = await productManager.updateProduct(
    Number(req.params.pid),
    req.body
  );

  updated
    ? res.json(updated)
    : res.status(404).json({ error: 'Producto no encontrado' });
});

app.delete('/api/products/:pid', async (req, res) => {
  await productManager.deleteProduct(Number(req.params.pid));
  res.json({ message: 'Producto eliminado' });
});

/* =======================
   ENDPOINTS CARTS
======================= */

app.post('/api/carts', async (req, res) => {
  const cart = await cartManager.createCart();
  res.status(201).json(cart);
});

app.get('/api/carts/:cid', async (req, res) => {
  const cart = await cartManager.getCartById(Number(req.params.cid));
  cart
    ? res.json(cart.products)
    : res.status(404).json({ error: 'Carrito no encontrado' });
});

app.post('/api/carts/:cid/product/:pid', async (req, res) => {
  const cart = await cartManager.addProductToCart(
    Number(req.params.cid),
    Number(req.params.pid)
  );

  cart
    ? res.json(cart)
    : res.status(404).json({ error: 'Carrito no encontrado' });
});

app.listen(8080, () => {
  console.log('Servidor escuchando en puerto 8080');
});
