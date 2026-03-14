import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager();


router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    
    const filter = query ? { 
      $or: [
        { category: query },
        { stock: query === 'disponible' ? { $gt: 0 } : 0 }
      ] 
    } : {};

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
      lean: true
    };

    const result = await productManager.getProducts(filter, options);

    res.json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});


// Agregar producto y emitir por socket
router.post('/', async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);

    const io = req.app.get('io');
    const result = await productManager.getProducts({}, { lean: true });
    
    io.emit('products', result.docs);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Eliminar producto y emitir por socket
router.delete('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid; 
    const deleted = await productManager.deleteProduct(pid);

    if (!deleted) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const io = req.app.get('io');
    const result = await productManager.getProducts({}, { lean: true });
    
    io.emit('products', result.docs);

    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;