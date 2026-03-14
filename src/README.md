# Programación Backend

## Instalación
1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. Iniciar con `npm start`.
4. Abrir `http://localhost:8080` en el navegador.

## 🛠️ Tecnologías utilizadas
- Node.js & Express
- Handlebars (Motor de plantillas)
- Socket.io (Comunicación en tiempo real)
- FS (Persistencia en archivos JSON)

## 📡 Endpoints principales
- **GET /**: Vista estática de productos.
- **GET /realtimeproducts**: Vista con WebSockets y formulario de carga.
- **POST /api/products**: Agregar producto (dispara evento socket).
- **DELETE /api/products/:pid**: Eliminar producto (dispara evento socket).