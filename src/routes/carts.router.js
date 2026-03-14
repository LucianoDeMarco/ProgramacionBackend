import { Router } from 'express';
import { cartModel } from '../models/carts.model.js'; 

const router = Router();

//Obtener carrito con populate
router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartModel.findById(cid).populate('products.product').lean();

    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    res.render('cartDetail', { cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

//Eliminar un producto específico del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    await cartModel.updateOne(
      { _id: cid },
      { $pull: { products: { product: pid } } }
    );
    res.json({ status: 'success', message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

//Actualizar solo la cantidad de un producto
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!quantity || isNaN(quantity)) return res.status(400).json({ message: 'Cantidad inválida' });

    await cartModel.updateOne(
      { _id: cid, "products.product": pid },
      { $set: { "products.$.quantity": quantity } }
    );
    res.json({ status: 'success', message: 'Cantidad actualizada' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Actualizar el carrito
router.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body; 
    
    await cartModel.findByIdAndUpdate(cid, { products }, { new: true });
    res.json({ status: 'success', message: 'Carrito actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

//Vaciar el carrito
router.delete('/:cid', async (req, res) => {
  try {
    await cartModel.updateOne({ _id: req.params.cid }, { $set: { products: [] } });
    res.json({ status: 'success', message: 'Carrito vaciado' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;