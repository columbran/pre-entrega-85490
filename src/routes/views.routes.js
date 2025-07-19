import { Router } from 'express';
import ProductModel from '../models/Product.js';
import CartModel from '../models/Cart.js';

const router = Router();

// ID de carrito fijo 
const USER_CART_ID = '6879c4bf4907b22099e3aeb5';

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const result = await ProductModel.paginate({}, { page, limit, lean: true });

    res.render('products', {
      products: result.docs,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      totalPages: result.totalPages,
      cartId: USER_CART_ID // Se pasa el ID del carrito a Handlebars
    });
  } catch (error) {
    console.error('❌ Error al cargar productos:', error);
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/cart/:cid', async (req, res) => {
  try {
    const cart = await CartModel.findById(req.params.cid).populate('products.product').lean();

    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    res.render('cart', { cart });
  } catch (error) {
    console.error('❌ Error al cargar el carrito:', error);
    res.status(500).send('Error interno del servidor');
  }
});

export default router;