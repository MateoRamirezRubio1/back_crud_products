# Gestión de Productos API REST

![image](https://github.com/user-attachments/assets/932b1cc4-efb0-4b45-a47f-42c0721dfa0d)


## 🚀 Descripción

Esta aplicación está diseñada para gestionar productos mediante una API RESTful utilizando Express.js. La aplicación está Dockerizada para facilitar su despliegue y mantenimiento. La base de datos utilizada es PostgreSQL, y la API se documenta con Swagger.

**Puedes encontrar un FrontEnd movil funcional con Flutter que usa esta API con su demostración visual aquí:** [Frontend Flutter](https://github.com/MateoRamirezRubio1/flutter-app-to-crud-products)

---

## 🛠️ Tecnologías Utilizadas

- **Express.js:** Framework de Node.js para construir la API REST.
- **Docker:** Herramienta para crear, desplegar y ejecutar aplicaciones en contenedores.
- **PostgreSQL:** Sistema de gestión de bases de datos relacional.

---

## 📋 Tabla de Contenidos

- [🌐 Rutas de la API](#-rutas-de-la-api)
  - [Rutas Principales](#rutas-principales)
  - [Ruta para Imágenes](#ruta-para-imágenes)
  - [Documentación](#documentación)
- [🛠️ Guía para Ejecutar la Aplicación](#-guía-para-ejecutar-la-aplicación)
  - [Clonar el Repositorio](#clonar-el-repositorio)
  - [Configurar Variables de Entorno](#configurar-variables-de-entorno)
  - [Construir y Ejecutar los Contenedores](#construir-y-ejecutar-los-contenedores)
  - [Verificar el Funcionamiento](#verificar-el-funcionamiento)
 
---

## 🌐 Rutas de la API

### Rutas Principales

![image](https://github.com/user-attachments/assets/04f62d67-c17c-43f8-a016-0a628cf32199)

Base URL: `/api/v1`

1. **Obtener Todos los Productos**
   - **Método:** GET
   - **Ruta:** `/products`
   - **Descripción:** Recupera una lista de todos los productos en la base de datos.

2. **Crear un Nuevo Producto**
   - **Método:** POST
   - **Ruta:** `/products`
   - **Descripción:** Crea un nuevo producto con los datos proporcionados en el cuerpo de la solicitud.
   - **Cuerpo de la Solicitud (form-data):**
     - `name` (string): Nombre del producto.
     - `price` (number): Precio del producto.
     - `description` (string): Descripción del producto.
     - `image` (File, opcional): Imagen del producto (subida como archivo).
   - **Ejemplo de Respuesta:**
     ```json
     {
       "id": 1,
       "name": "New Product",
       "price": 29.99,
       "description": "This is a new product",
       "image_path": "123e4567-e89b-12d3-a456-426614174000.png"
     }
     ```

3. **Obtener un Producto Específico por ID**
   - **Método:** GET
   - **Ruta:** `/products/{id}`
   - **Descripción:** Recupera un producto específico basado en el ID proporcionado en la ruta.

4. **Actualizar un Producto Existente**
   - **Método:** PUT
   - **Ruta:** `/products/{id}`
   - **Descripción:** Actualiza los detalles de un producto existente identificado por el ID proporcionado.
   - **Cuerpo de la Solicitud (form-data):**
     - `name` (string): Nombre del producto.
     - `price` (number): Precio del producto.
     - `description` (string): Descripción del producto.
     - `image` (File, opcional): Imagen del producto (subida como archivo).
   - **Ejemplo de Respuesta:**
     ```json
     {
       "id": 1,
       "name": "Updated Product",
       "price": 39.99,
       "description": "This is an updated product",
       "image_path": "123e4567-e89b-12d3-a456-426614174000.png"
     }
     ```

5. **Eliminar un Producto por ID**
   - **Método:** DELETE
   - **Ruta:** `/products/{id}`
   - **Descripción:** Elimina un producto existente basado en el ID proporcionado.

### Ruta para Imágenes

1. **Mostrar Imagen**
   - **Método:** GET
   - **Ruta:** `/uploads/images/:image_path`
   - **Descripción:** Muestra una imagen que se encuentra en la ruta especificada por `image_path`. El `image_path` es el nombre de la imagen que se almacena en la base de datos como parte de los detalles del producto. Este nombre se utiliza para recuperar la imagen correspondiente desde el servidor.

### Documentación

- **Swagger:** Puedes visualizar la documentación interactiva de la API en Swagger en la ruta `/api-docs`. Esto te permitirá explorar las rutas disponibles y realizar pruebas directamente desde la interfaz de Swagger.

---
## 🛠️ Guía para Ejecutar la Aplicación

Con estos pasos clonaremos el repositorio, construiremos y ejecutaremos los contenedores Docker para la aplicación:

1. **Clonar el Repositorio**

   Clona eeste repositorio del proyecto desde GitHub:

   ```bash
   git clone https://github.com/MateoRamirezRubio1/back_crud_products.git
   cd back_crud_products

2. **Configurar Variables de Entorno**

    Crea un archivo `.env` en el directorio principal del proyecto con el siguiente contenido:

   ```plaintext
   PORT=3000
   DB_USER=postgres
   DB_HOST=db
   DB_NAME=technical_test
   DB_PASSWORD=root123
   DB_PORT=5432

3. **Construir y Ejecutar los Contenedores**

    Utiliza Docker Compose para construir las imágenes y ejecutar los contenedores. En el directorio principal del proyecto, ejecuta:

    ```bash
    docker-compose up --build
    ```
    
    Este comando construirá las imágenes para la aplicación y la base de datos, y luego iniciará los contenedores. El contenedor de la base de datos inicializará con el esquema definido en `init.sql` que se encuentra en la carpeta `init`.

4. **Verificar el Funcionamiento**

    Una vez que los contenedores estén en ejecución, verifica que tu aplicación esté funcionando correctamente:

    - Accede a la API: Visita http://localhost:3000/api/v1/products en tu navegador o usa una herramienta como Postman para probar las rutas de la API.
    - Accede a Swagger: Visita http://localhost:3000/api-docs para acceder a la documentación de Swagger y explorar la API.
