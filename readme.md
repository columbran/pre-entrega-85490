# 🧾 Proyecto Backend – Coderhouse

## Alumno: Silvio Columbran  
📆 Entrega N°1 y N°2 – Julio 2025  
👨‍💻 Comisión: 85490

---

## ✅ Entrega N°1: API REST con Persistencia en Archivos

### Descripción General

Desarrollar un servidor en Node.js con Express que gestione productos y carritos de compra a través de endpoints REST.  
La información se guarda en archivos `.json`.

---

### 📌 Rutas para productos (`/api/products/`)

| Método | Ruta               | Descripción                                    |
|--------|--------------------|------------------------------------------------|
| GET    | `/`                | Lista todos los productos                     |
| GET    | `/:pid`            | Muestra el producto con id específico         |
| POST   | `/`                | Agrega un nuevo producto                      |
| PUT    | `/:pid`            | Actualiza un producto (sin modificar el id)   |
| DELETE | `/:pid`            | Elimina el producto con ese id                |

---

### 📌 Rutas para carritos (`/api/carts/`)

| Método | Ruta                                   | Descripción                                        |
|--------|----------------------------------------|----------------------------------------------------|
| POST   | `/`                                    | Crea un nuevo carrito                              |
| GET    | `/:cid`                                | Muestra los productos de un carrito                |
| POST   | `/:cid/product/:pid`                   | Agrega producto al carrito (aumenta cantidad si ya existe) |

---

### 🗂 Persistencia

Los datos se almacenan en:

- `products.json`
- `carts.json`

Usando las clases:

- `ProductManager.js`
- `CartManager.js`

---

## ✅ Entrega N°2: WebSockets + Handlebars

### Funcionalidad agregada

Se implementó un sistema de vistas con **Handlebars** y actualización en tiempo real usando **WebSockets (Socket.IO)**.

---

### 🔹 Vistas creadas

| Ruta                          | Vista                    | Descripción                                        |
|-------------------------------|--------------------------|----------------------------------------------------|
| `/`                           | `home.handlebars`        | Muestra todos los productos (solo visualización)   |
| `/realtimeproducts`           | `realTimeProducts.handlebars` | Permite agregar y eliminar productos en tiempo real |

---

### 🔄 Funcionalidad WebSocket

- Cuando un cliente agrega un producto desde el formulario, **todos los clientes conectados ven el cambio al instante**.
- Si se elimina un producto, **también se actualiza automáticamente en todas las vistas**.

---

### 🧪 ¿Cómo probarlo?

1. Ejecutá el proyecto:
   ```bash
   node src/app.js