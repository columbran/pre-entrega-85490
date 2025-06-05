import fs from 'fs/promises';

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    const data = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  }

  async getById(id) {
    const data = await this.getAll();
    return data.find(p => p.id == id);
  }

  async addProduct(product) {
    const products = await this.getAll();
    const newProduct = { id: Date.now().toString(), ...product };
    products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async updateProduct(id, updates) {
    const products = await this.getAll();
    const index = products.findIndex(p => p.id == id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updates, id: products[index].id };
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async deleteProduct(id) {
    const products = await this.getAll();
    const filtered = products.filter(p => p.id != id);
    await fs.writeFile(this.path, JSON.stringify(filtered, null, 2));
  }
}