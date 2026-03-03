import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./data/products.json');

// GET all
router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// GET by id
router.get('/:pid', async (req, res) => {
  const product = await productManager.getProductById(Number(req.params.pid));

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(product);
});

// POST
router.post('/', async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails
  } = req.body;

  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({
      error: 'Faltan campos obligatorios'
    });
  }

  const newProduct = await productManager.addProduct(req.body);
  res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
  const updated = await productManager.updateProduct(
    Number(req.params.pid),
    req.body
  );

  if (!updated) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(updated);
});

router.delete('/:pid', async (req, res) => {
  const deleted = await productManager.deleteProduct(
    Number(req.params.pid)
  );

  if (!deleted) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json({ message: 'Producto eliminado' });
});

export default router;