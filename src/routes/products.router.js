import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./data/products.json');


// GET productos
router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});


router.post('/', async (req, res) => {
  const newProduct = await productManager.addProduct(req.body);

  const io = req.app.get('io');
  const products = await productManager.getProducts();
  io.emit('products', products);

  res.status(201).json(newProduct);
});


router.delete('/:pid', async (req, res) => {
  const deleted = await productManager.deleteProduct(Number(req.params.pid));

  if (!deleted) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const io = req.app.get('io');
  const products = await productManager.getProducts();
  io.emit('products', products);

  res.json({ message: 'Producto eliminado' });
});

export default router;