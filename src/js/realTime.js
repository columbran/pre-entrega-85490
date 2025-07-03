const socket = io();

const form = document.getElementById('productForm');
const list = document.getElementById('productList');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const product = Object.fromEntries(formData.entries());
  socket.emit('new-product', product);
  form.reset();
});

socket.on('products', (products) => {
  list.innerHTML = '';
  products.forEach((p) => {
    const li = document.createElement('li');
    li.innerHTML = `${p.title} - $${p.price} <button onclick="deleteProduct('${p.id}')">Eliminar</button>`;
    list.appendChild(li);
  });
});

function deleteProduct(id) {
  socket.emit('delete-product', id);
}