# 🧾 Proyecto Backend – Coderhouse

## Alumno: Silvio Columbran  
📆 Entrega N°1, N°2 y Final – Julio 2025  
👨‍💻 Comisión: 85490
📂 Repositorio: [github.com/columbran/backend-final-silvio-85490](https://github.com/columbran/backend-final-silvio-85490)  
✉️ Email: silvio.columbran@gmail.com

---

## ✅ Entrega N°1: API REST con Persistencia en Archivos

### Descripción General

Desarrollar un servidor en Node.js con Express que gestione productos y carritos de compra a través de endpoints REST.  
La información se guarda en archivos `.json`.

---

### 📌 Rutas para productos (`/api/products/`)

| Método | Ruta               | Descripción                                    |
|--------|--------------------|------------------------------------------------|
| GET    | `/`                | Lista todos los productos                      |
| GET    | `/:pid`            | Muestra el producto con id específico          |
| POST   | `/`                | Agrega un nuevo producto                       |
| PUT    | `/:pid`            | Actualiza un producto (sin modificar el id)    |
| DELETE | `/:pid`            | Elimina el producto con ese id                 |

---

### 📌 Rutas para carritos (`/api/carts/`)

| Método | Ruta                                   | Descripción                                               |
|--------|----------------------------------------|-----------------------------------------------------------|
| POST   | `/`                                    | Crea un nuevo carrito                                     |
| GET    | `/:cid`                                | Muestra los productos de un carrito                       |
| POST   | `/:cid/product/:pid`                   | Agrega producto al carrito (aumenta cantidad si ya existe) |

---

### 🗂 Persistencia

Los datos se almacenan en archivos `.json` usando las clases:

- `ProductManager.js`
- `CartManager.js`

---

## ✅ Entrega N°2: WebSockets + Handlebars

### Funcionalidad agregada

Se implementó un sistema de vistas con **Handlebars** y actualización en tiempo real usando **WebSockets (Socket.IO)**.

---

### 🔹 Vistas creadas

| Ruta                  | Vista                          | Descripción                                                 |
|-----------------------|----------------------------------|-------------------------------------------------------------|
| `/`                   | `home.handlebars`              | Muestra todos los productos (solo visualización)           |
| `/realtimeproducts`   | `realTimeProducts.handlebars`  | Permite agregar y eliminar productos en tiempo real         |

---

### 🔄 Funcionalidad WebSocket

- Cuando un cliente agrega un producto desde el formulario, **todos los clientes conectados ven el cambio al instante**.
- Si se elimina un producto, **también se actualiza automáticamente en todas las vistas**.

---

## ✅ Entrega Final: MongoDB, Vistas y Funcionalidades Avanzadas

### 🌐 Base de datos

- Migración de persistencia a **MongoDB Atlas**
- Conexión utilizando **Mongoose**
- Modelos: `Product` y `Cart`
- Plugin de paginación: `mongoose-paginate-v2`

---

### 🧩 Funcionalidades implementadas

- CRUD de productos y carritos usando MongoDB
- Filtros por categoría
- Ordenamiento por precio
- Paginación de productos
- Vista de carrito con productos
- Agregar productos al carrito desde la vista


---

### 📷 Vistas creadas

| Ruta            | Vista              | Descripción                                              |
|------------------|--------------------|----------------------------------------------------------|
| `/products`      | `products.handlebars` | Muestra productos paginados, filtrables, con botón de “Agregar al carrito” |
| `/cart/:cid`     | `cart.handlebars`     | Muestra los productos dentro del carrito especificado     |

---

### 🧪 ¿Cómo probarlo?

1. Ejecutá el proyecto:
   ```bash
   node src/app.js