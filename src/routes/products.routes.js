import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const pm = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
  const products = await pm.getAll();
  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const product = await pm.getById(req.params.pid);
  product ? res.json(product) : res.status(404).json({ error: 'No encontrado' });
});

router.post('/', async (req, res) => {
  const product = await pm.addProduct(req.body);
  res.status(201).json(product);
});

router.put('/:pid', async (req, res) => {
  const updated = await pm.updateProduct(req.params.pid, req.body);
  res.json(updated);
});

router.delete('/:pid', async (req, res) => {
  await pm.deleteProduct(req.params.pid);
  res.status(204).send();
});

export default router;