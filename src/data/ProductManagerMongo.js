import Product from '../models/Product.js';

class ProductManagerMongo {
  async getAll({ limit = 10, page = 1, sort, query }) {
    const filter = {};

    if (query) {
      if (query === 'disponible') {
        filter.status = true;
      } else {
        filter.category = query;
      }
    }

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : undefined,
      lean: true
    };

    const products = await Product.find(filter)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit)
      .sort(options.sort || {});

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / options.limit);

    return {
      status: 'success',
      payload: products,
      totalPages,
      prevPage: options.page > 1 ? options.page - 1 : null,
      nextPage: options.page < totalPages ? options.page + 1 : null,
      page: options.page,
      hasPrevPage: options.page > 1,
      hasNextPage: options.page < totalPages,
      prevLink: options.page > 1 ? `/api/products?page=${options.page - 1}` : null,
      nextLink: options.page < totalPages ? `/api/products?page=${options.page + 1}` : null
    };
  }

  async getById(id) {
    return await Product.findById(id).lean();
  }

  async addProduct(productData) {
    return await Product.create(productData);
  }

  async updateProduct(id, updates) {
    return await Product.findByIdAndUpdate(id, updates, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default ProductManagerMongo;