import ProductModel from '../data/models/product.js';
import CartModel from '../data/models/cart.js';

// Vista para mostrar productos con paginación y botón "Agregar al carrito"
export const renderProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const options = {
      page,
      limit: 10,
      lean: true,
    };

    const result = await ProductModel.paginate({}, options);

    // Buscar el primer carrito (puede ajustarse a un usuario específico en el futuro)
    const cart = await CartModel.findOne();
    const cartId = cart ? cart._id.toString() : null;

    res.render('products', {
      ...result,
      cartId,
    });
  } catch (error) {
    console.error('❌ Error al renderizar productos:', error);
    res.status(500).send('Error al cargar productos');
  }
};

// Vista para mostrar un carrito específico
export const renderCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await CartModel.findById(cid).populate('products.product').lean();

    if (!cart) return res.status(404).send('Carrito no encontrado');

    res.render('cart', { cart });
  } catch (error) {
    console.error('❌ Error al renderizar carrito:', error);
    res.status(500).send('Error al cargar carrito');
  }
};
