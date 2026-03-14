import { productModel } from '../models/products.model.js';

export default class ProductManager {
  async getProducts(filter = {}, options = {}) {
    try {
      return await productModel.paginate(filter, options);
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      return await productModel.findById(id).lean();
    } catch (error) {
      return null;
    }
  }

  async addProduct(product) {
    try {
      return await productModel.create(product);
    } catch (error) {
      throw new Error(`Error al guardar producto: ${error.message}`);
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      return await productModel.findByIdAndUpdate(
        id, 
        { $set: updatedFields }, 
        { new: true } //retorna el obj actualizado esto
      );
    } catch (error) {
      throw new Error(`Error al actualizar: ${error.message}`);
    }
  }

  async deleteProduct(id) {
    try {
      const result = await productModel.findByIdAndDelete(id);
      return result ? true : false;
    } catch (error) {
      throw new Error(`Error al eliminar: ${error.message}`);
    }
  }
}