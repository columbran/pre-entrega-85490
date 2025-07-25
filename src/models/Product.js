import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: { type: String },
  thumbnails: [String],
  status: { type: Boolean, default: true }
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

export default Product;

