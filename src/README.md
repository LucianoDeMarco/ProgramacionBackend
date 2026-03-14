# Programación Backend

## Instalación
1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. Configurar la URL de MongoDB en app.js 
4. Iniciar con `npm start`.
5. Abrir `http://localhost:8080` en el navegador.

## 🛠️ Tecnologías utilizadas
- Node.js & Express
- MongoDB Atlas: Base de datos en la nube
- Moongose: Modelado de datos y paginacion
- Handlebars (Motor de plantillas)
- Socket.io (Comunicación en tiempo real)

## 📡 Endpoints principales
- **GET /**: Vista estática de productos.
- **GET /realtimeproducts**: Vista con WebSockets y formulario de carga.
- **POST /api/products**: Agregar producto (dispara evento socket).
- **DELETE /api/products/:pid**: Eliminar producto (dispara evento socket).