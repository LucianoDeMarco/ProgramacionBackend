import { Router } from 'express';
import CartManager from '../managers/CartManager.js';
import ProductManager from '../managers/ProductManager.js';

const router = Router();

const cartManager = new CartManager('./data/carts.json');
const productManager = new ProductManager('./data/products.json');

// crear carrito
router.post('/', async (req, res) => {
  const cart = await cartManager.createCart();
  res.status(201).json(cart);
});

// obtener productos del carrito
router.get('/:cid', async (req, res) => {
  const cart = await cartManager.getCartById(Number(req.params.cid));

  if (!cart) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  res.json(cart.products);
});

// agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {

  const pid = Number(req.params.pid);
  const cid = Number(req.params.cid);

  const product = await productManager.getProductById(pid);

  if (!product) {
    return res.status(404).json({
      error: 'El producto no existe'
    });
  }

  const cart = await cartManager.addProductToCart(cid, pid);

  if (!cart) {
    return res.status(404).json({
      error: 'Carrito no encontrado'
    });
  }

  res.json(cart);
});

export default router;